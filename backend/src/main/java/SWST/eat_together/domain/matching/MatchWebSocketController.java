package SWST.eat_together.domain.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;

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

        // 요청이 들어왔을 시 매칭 로직 수행
        matchService.handleMatchRequest(matchRequest);


    }

}
