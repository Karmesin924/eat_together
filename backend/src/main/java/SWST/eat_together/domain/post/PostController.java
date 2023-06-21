package SWST.eat_together.domain.post;

import SWST.eat_together.domain.member.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    @PostMapping("/add")
    public ResponseEntity add(@RequestBody PostDTO post, HttpServletRequest request){
        System.out.println("post = " + post);
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");

        System.out.println("loginMember = " + loginMember);

        postService.addPost(loginMember, post);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{idx}")
    public ResponseEntity detail(@PathVariable("idx") String idx, HttpServletRequest request){

        String email = null;
        HttpSession session = request.getSession(false);
        if (session != null) {
            MemberDTO loginMember = (MemberDTO) session.getAttribute("member");
            email = loginMember.getEmail();
        }

        PostDTO post = postService.detail(Integer.parseInt(idx), email);


        if (post == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }
    
    //@DeleteMapping("{idx}") 게시글 삭제
}
