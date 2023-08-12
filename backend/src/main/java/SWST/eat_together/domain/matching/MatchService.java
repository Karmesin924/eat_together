package SWST.eat_together.domain.matching;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class MatchService {

    private Queue<MatchRequest> matchQueue = new ArrayBlockingQueue<>(100);
    private boolean isMatchingInProgress = false;
    private MatchedList matchedList;
    private MatchingCompletedMessage matchingCompletedMessage;
    private ObjectMapper objectMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public MatchedList handleMatchRequest(MatchRequest matchRequest) {
        System.out.println("*****MatchService.handleMatchRequest*****");

        matchQueue.offer(matchRequest);

        if (!isMatchingInProgress && matchQueue.size() >= 2) {
            isMatchingInProgress = true;
            matchedList = startMatching();
            if (matchedList != null) { // startMatching에서 null 반환 시 예외 처리
                int roomPk = interectionWithChat(matchedList);
                MatchingCompletedMessage matchingCompletedMessage = CreateMessageToFront(roomPk, matchedList);
                messagingTemplate.convertAndSend("/topic/matching/start", matchingCompletedMessage);
            }
            isMatchingInProgress = false;
        }

        return matchedList;
    }

    private MatchedList startMatching() {
        System.out.println("*****MatchService.startMatching*****");

        if (matchQueue.size() < 2) {
            return null; // 매칭할 수 있는 사람이 두 명 미만인 경우 null 반환
        }

        matchedList = new MatchedList();
        List<MatchRequest> matchedRequests = new ArrayList<>();

        while (matchQueue.size() >= 2) {
            matchedRequests.clear();
            for (int i = 0; i < 2; i++) {
                matchedRequests.add(matchQueue.poll());
            }

            System.out.println("matchedRequests = " + matchedRequests);

            List<String> matchedUserNicknames = new ArrayList<>();
            for (MatchRequest request : matchedRequests) {
                matchedUserNicknames.add(request.getNickname());
            }

            matchedList.setUser_nicknames(matchedUserNicknames);

            break; // 두 명의 매칭이 완료되면 매칭 종료
        }

        return matchedList;
    }

    public int interectionWithChat(MatchedList matchedList) {
        System.out.println("*****MatchService.interectionWithChat*****");

        int roomPk=0;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        MatchedList messageToChat = new MatchedList();
        System.out.println("messageToChat = " + messageToChat);
        messageToChat.setUser_nicknames(matchedList.getUser_nicknames());

        HttpEntity<MatchedList> requestEntity = new HttpEntity<>(messageToChat, headers);

        // 대상 서버 URL 설정
        String targetUrl = "http://127.0.0.1:8000/chat/new_matching_room/";

        // HTTP POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(targetUrl, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Map<String, Object>>() {
        });
        System.out.println("response = " + response);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("room_pk")) {
                roomPk = (int) responseBody.get("room_pk");
                System.out.println("roomPk = " + roomPk);
            }
        } else {
            System.err.println("Failed to send matching completed message. Status code: " + response.getStatusCode());
        }
        return roomPk;
    }

    public MatchingCompletedMessage CreateMessageToFront(int roomPk, MatchedList matchedList) {
        MatchingCompletedMessage message = new MatchingCompletedMessage();
        message.setType("matching_completed");
        message.setNickname(matchedList.getUser_nicknames());
        message.setRoomPk(roomPk);

        return message;
    }

    public void sendMessage(WebSocketSession session, MatchingCompletedMessage matchingCompletedMessage) {
        try{
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(matchingCompletedMessage)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}