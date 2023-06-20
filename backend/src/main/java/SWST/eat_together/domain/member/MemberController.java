package SWST.eat_together.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody MemberDTO member) {
        System.out.println("member = " + member);
        int result = memberService.saveUser(member);

        if (result == 0)
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO form, HttpServletRequest request) {
        System.out.println("form = " + form);

        MemberDTO loginMember = memberService.login(form.getEmail(), form.getPassword());
        if (loginMember == null) {
            return ResponseEntity.notFound().build();
        }

        HttpSession session = request.getSession();
        session.setAttribute("member", loginMember);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate")
    public ResponseEntity validate(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");

        if (loginMember == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loginMember);
    }
}