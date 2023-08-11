package SWST.eat_together.domain.matching;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
@Service
public class MatchService {

    private Queue<MatchRequest> matchQueue = new ArrayBlockingQueue<>(100);
    private boolean isMatchingInProgress = false;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void handleMatchRequest(MatchRequest matchRequest) {

        matchQueue.offer(matchRequest);
        System.out.println("matchQueue = " + matchQueue);

        if (!isMatchingInProgress) {
            isMatchingInProgress = true;
            startMatching();
        }
    }

    private void startMatching() {
        System.out.println("*****MatchService.startMatching*****");

        while (matchQueue.size() >= 2) {
            List<MatchRequest> matchedRequests = new ArrayList<>();
            for (int i = 0; i < 2; i++) {
                matchedRequests.add(matchQueue.poll());
            }

            System.out.println("matchedRequests = " + matchedRequests);

            // Perform matching logic here...

            List<String> matchedUserNicknames = new ArrayList<>();
            for (MatchRequest request : matchedRequests) {
                matchedUserNicknames.add(request.getNickname());
            }
            System.out.println("matchedUserNicknames = " + matchedUserNicknames);
            sendMatchingCompletedMessage(matchedUserNicknames);
        }

        isMatchingInProgress = false;
    }

    private void sendMatchingCompletedMessage(List<String> matchedUserNicknames) {

        System.out.println("----- MatchService.sendMatchingCompletedMessage -----");
        MatchedList messageToChat = new MatchedList();
//        message.setMember(String.join(", ", matchedUserNicknames));
        messageToChat.setUser_nicknames(matchedUserNicknames);


        System.out.println("message = " + messageToChat);

        // HTTP 요청을 보내고 응답을 받아오기 위한 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MatchedList> requestEntity = new HttpEntity<>(messageToChat, headers);
        MatchingCompletedMessage messageToFront = new MatchingCompletedMessage();


        // 대상 서버 URL 설정
        String targetUrl = "http://127.0.0.1:8000/chat/new_matching_room/";

        // HTTP POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(targetUrl, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Map<String, Object>>() {});
        System.out.println("response = " + response);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("room_pk")) {
                int roomPk = (int) responseBody.get("room_pk");
                System.out.println("roomPk = " + roomPk);

                messageToFront.setRoomPk(roomPk);
                messagingTemplate.convertAndSend("/matching/result", messageToFront);
            }

        } else {
            System.err.println("Failed to send matching completed message. Status code: " + response.getStatusCode());
        }
    }
}
