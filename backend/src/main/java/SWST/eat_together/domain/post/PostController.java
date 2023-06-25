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
    public ResponseEntity detail(@PathVariable("idx") int id, HttpServletRequest request){

        String email = null;
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member loginMember = (Member) session.getAttribute("member");
            email = loginMember.getEmail();
        }

        Post post = postService.detail(id, email);

        if (post == null){
            return ResponseEntity.notFound().build();
        }
        System.out.println("post = " + post);
        return ResponseEntity.ok(post);
    }
    
    @DeleteMapping("{idx}")
    public ResponseEntity delete(@PathVariable("idx") int id, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();

        Member loginMember = (Member) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.delete(id, email);

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("{idx}")
    public ResponseEntity edit(@PathVariable("idx") int id, @RequestBody Post post, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();
        System.out.println("post = " + post);
        Member loginMember = (Member) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = postService.edit(id, email, post.getTitle(), post.getContents());

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}