package SWST.eat_together.matching.socket;

import SWST.eat_together.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
@RequiredArgsConstructor
public class MatchingWebSocketController {

    private final MatchingService matchingService;

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchingRequest matchingRequest) {
        matchingRequest.setReceivedTimestamp(Instant.now());
        System.out.println("matchRequest = " + matchingRequest);

        // 요청이 들어왔을 시 매칭 로직 수행
        matchingService.handleMatchRequest(matchingRequest);
    }
}
