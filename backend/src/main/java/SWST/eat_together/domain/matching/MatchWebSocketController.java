package SWST.eat_together.domain.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MatchWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MatchService matchService;

    @MessageMapping("/matching/start")
    public void receiveMatching(MatchRequest matchRequest) {
        System.out.println("matchRequest = " + matchRequest);

        // 매칭 로직 수행
        MatchedList matchedList = matchService.handleMatchRequest(matchRequest);
        int roomPk = matchService.interectionWithChat(matchedList);
        MatchingCompletedMessage matchingCompletedMessage = matchService.CreateMessageToFront(roomPk, matchedList);

        // 프론트엔드로 매칭 완료 메시지 전송
        messagingTemplate.convertAndSend("/topic/matching/start", matchingCompletedMessage);
    }
}
