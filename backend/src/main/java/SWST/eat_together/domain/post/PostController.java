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
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");

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

        // 인덱스 번호와 일치하는 게시글이 없을 경우
        if (post == null){
            return ResponseEntity.notFound().build();
        }
        System.out.println("post = " + post);
        return ResponseEntity.ok(post);
    }
    
    @DeleteMapping("{idx}")
    public ResponseEntity delete(@PathVariable("idx") String idx, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();

        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.delete(Integer.parseInt(idx), email);

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("{idx}")
    public ResponseEntity edit(@PathVariable("idx") String idx, @RequestBody PostDTO post, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();
        System.out.println("post = " + post);
        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.edit(Integer.parseInt(idx), email, post.getTitle(), post.getContents());

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}