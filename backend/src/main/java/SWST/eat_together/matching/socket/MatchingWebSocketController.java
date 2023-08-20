package SWST.eat_together.matching.socket;

import SWST.eat_together.matching.algorithm.MatchingAlgorithm;
import SWST.eat_together.matching.model.MatchingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
@RequiredArgsConstructor
public class MatchingWebSocketController {

    private final MatchingAlgorithm matchingAlgorithm;

    @MessageMapping("/matching/start")
    @SendTo("/topic/matching/start")
    public void receiveMatching(MatchingRequest matchingRequest) {
        matchingRequest.setReceivedTimestamp(Instant.now());
        System.out.println("matchRequest = " + matchingRequest);

        matchingAlgorithm.insertQueue(matchingRequest);
    }
}
