package SWST.eat_together.domain.post;

import SWST.eat_together.domain.member.Member;
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
    public ResponseEntity add(@RequestBody RegiPostDTO post, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        Member loginMember = (Member)session.getAttribute("member");

        postService.addPost(loginMember, post);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{idx}")
    public ResponseEntity<Post> detail(@PathVariable("idx") String id, HttpServletRequest request) {
        String email = "0"; // 기본값으로 '0'으로 설정

        HttpSession session = request.getSession(false);
        if (session != null) {
            Member loginMember = (Member) session.getAttribute("member");
            if (loginMember != null) {
                email = loginMember.getEmail();
            }
        }

        Post post = postService.detail(Integer.parseInt(id), email);

        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        System.out.println("post = " + post.getId());
        return ResponseEntity.ok(post);
    }
    
    @DeleteMapping("{idx}")
    public ResponseEntity delete(@PathVariable("idx") String id, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();

        Member loginMember = (Member) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.delete(Integer.parseInt(id), email);

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("{idx}")
    public ResponseEntity edit(@PathVariable("idx") String id, @RequestBody RegiPostDTO post, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();
        System.out.println("post = " + post);
        Member loginMember = (Member) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.edit(Integer.parseInt(id), email, post.getTitle(), post.getContents());

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

}