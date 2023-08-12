package SWST.eat_together.domain.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MatchWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MatchService matchService;

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchRequest matchRequest) {
        System.out.println("matchRequest = " + matchRequest);

        // 매칭 로직 수행
        MatchedList matchedList = matchService.handleMatchRequest(matchRequest);

        // 매칭 결과가 null이 아닌 경우에만 API 호출
        if (matchedList != null && matchedList.getUser_nicknames().size() == 2) {
            int roomPk = matchService.interectionWithChat(matchedList);
            MatchingCompletedMessage matchingCompletedMessage = matchService.CreateMessageToFront(roomPk, matchedList);
            System.out.println("matchingCompletedMessage = " + matchingCompletedMessage);

            // 프론트엔드로 매칭 완료 메시지 전송
            messagingTemplate.convertAndSend("/topic/matching/start", matchingCompletedMessage.toJson());
            System.out.println("matchingCompletedMessage.toJson() = " + matchingCompletedMessage.toJson());
        }
    }
}

