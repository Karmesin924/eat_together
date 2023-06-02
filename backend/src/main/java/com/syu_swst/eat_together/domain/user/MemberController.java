package com.syu_swst.eat_together.domain.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/member")
public class MemberController {

    private MemberRepository memberRepository = MemberRepository.getInstance();
    @PostMapping("/save")
    public String members(
            @RequestParam("name")
            String name,
            @RequestParam("email")
            String email,
            @RequestParam("nickname")
            String nickname,
            @RequestParam("password")
            String password,
            Model model){

        Member member = new Member(name, email, nickname, password);
        memberRepository.save(member);
        System.out.println(name+email+nickname+password);
        model.addAttribute("member",member);
        return "save-result";
    }


}
