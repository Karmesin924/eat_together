package SWST.eat_together.domain.matching;


import SWST.eat_together.domain.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping("/matching/start")
    public ResponseEntity startMatching(@RequestBody MatchRequest matchRequest, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("member");
        matchRequest.setNickname(member.getNickname());

        System.out.println("matchRequest = " + matchRequest);
        matchService.handleMatchRequest(matchRequest);

        return ResponseEntity.ok().build();
    }

    private String getUserIdFromSession(HttpServletRequest request) {
        return (String) request.getSession().getAttribute("member");
    }
}
