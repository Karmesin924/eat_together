package SWST.eat_together.domain.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MatchWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MatchService matchService;

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchRequest matchRequest) {
        matchRequest.setReceivedTimestamp(Instant.now());
        System.out.println("matchRequest = " + matchRequest);

        // 매칭 로직 수행
        List<MatchRequest> matchedRequests = matchService.handleMatchRequest(matchRequest);

        // 매칭이 완료된 상태에서만 API 호출
        if (!matchedRequests.isEmpty()) {
            int roomPk = matchService.interectionWithChat(matchedRequests);
            MatchingCompletedMessage matchingCompletedMessage = matchService.CreateMessageToFront(roomPk, matchedRequests);
            System.out.println("matchingCompletedMessage = " + matchingCompletedMessage);

            // 프론트엔드로 매칭 완료 메시지 전송
            messagingTemplate.convertAndSend("/topic/matching/start", matchingCompletedMessage.toJson());
            System.out.println("matchingCompletedMessage.toJson() = " + matchingCompletedMessage.toJson());
        }
    }
}

/*

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchRequest matchRequest) {
        System.out.println("matchRequest = " + matchRequest);

        // 매칭 로직 수행
        MatchedList matchedList = matchService.handleMatchRequest(matchRequest);

        // 매칭이 완료된 상태에서만 API 호출
        if (matchService.isMatchingCompleted()) {
            int roomPk = matchService.interectionWithChat(matchedList);
            MatchingCompletedMessage matchingCompletedMessage = matchService.CreateMessageToFront(roomPk, matchedList);
            System.out.println("matchingCompletedMessage = " + matchingCompletedMessage);

            // 프론트엔드로 매칭 완료 메시지 전송
            messagingTemplate.convertAndSend("/topic/matching/start", matchingCompletedMessage.toJson());
            System.out.println("matchingCompletedMessage.toJson() = " + matchingCompletedMessage.toJson());
        }
    }
*/