package SWST.eat_together.matching;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class MatchService {
    private final SimpMessagingTemplate messagingTemplate;

    public void handleMatchRequest(MatchRequest newRequest) {
        MatchingAlgorithm.insertQueue(newRequest);
    }

    public int interactionWithChat(List<MatchRequest> matchedRequests) {
        System.out.println("*****MatchService.interactionWithChat*****");

        int roomPk = 0;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        MatchedList messageToChat = new MatchedList();

        List<String> userNicknames = new ArrayList<>();
        for (MatchRequest request : matchedRequests) {
            userNicknames.add(request.getNickname());
        }
        messageToChat.setUser_nicknames(userNicknames);

        HttpEntity<MatchedList> requestEntity = new HttpEntity<>(messageToChat, headers);

        // 대상 서버 URL 설정
        String targetUrl = "http://127.0.0.1:8000/chat/new_matching_room/";

        // HTTP POST 요청 보내기
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    targetUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<>() {
                    }
            );

            if (response.getStatusCode() == HttpStatus.CREATED) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("room_pk")) {
                    roomPk = (int) responseBody.get("room_pk");
                    System.out.println("roomPk = " + roomPk);
                }
            } else {
                System.err.println("Failed to send matching completed message. Status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Error while sending matching completed message: " + e.getMessage());
        }

        return roomPk;
    }

    public void completeMessageToFront(@NotNull List<MatchRequest> matchedRequests) {
        if (!matchedRequests.isEmpty()) {
            int roomPk = interactionWithChat(matchedRequests);

            MatchingCompletedMessage message = new MatchingCompletedMessage();
            message.setType("matching_completed");

            List<String> userNicknames = new ArrayList<>();
            for (MatchRequest request : matchedRequests) {
                userNicknames.add(request.getNickname());
            }
            message.setNickname(userNicknames);
            message.setRoomPk(roomPk);
            messagingTemplate.convertAndSend("/topic/matching/start", message.toJson());
        }
    }

    public void failureMessageToFront(MatchRequest request) {
        System.out.println("***** MatchService.handleMatchingFailure ***** ");

        MatchingFailedMessage errorMessage = new MatchingFailedMessage();
        errorMessage.setType("matching_failed");
        errorMessage.setNickname(request.getNickname());
        messagingTemplate.convertAndSend("/topic/matching/start", errorMessage.toJson());

        System.out.println("매칭 실패 메시지 전송: " + errorMessage);
    }
}