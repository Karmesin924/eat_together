package SWST.eat_together.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
@RequiredArgsConstructor
public class MatchWebSocketController {

    private final MatchService matchService;

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchRequest matchRequest) {
        matchRequest.setReceivedTimestamp(Instant.now());
        System.out.println("matchRequest = " + matchRequest);

        // 요청이 들어왔을 시 매칭 로직 수행
        matchService.handleMatchRequest(matchRequest);
    }
}
