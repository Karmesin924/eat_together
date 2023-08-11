package SWST.eat_together.domain.matching;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MatchWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MatchService matchService;

    @MessageMapping("/start")
    public void startMatching(MatchRequest matchRequest) {
        System.out.println("matchRequest = " + matchRequest);
        matchService.handleMatchRequest(matchRequest);
        
    }
}
