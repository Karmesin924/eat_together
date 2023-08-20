package SWST.eat_together.post;

import SWST.eat_together.member.Member;
import SWST.eat_together.post.model.RegiPostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static SWST.eat_together.member.AuthUtil.Not_logged_in;
import static SWST.eat_together.member.AuthUtil.checkLoggedInUserOr401;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody RegiPostDTO post, HttpServletRequest request){
        HttpSession session = request.getSession(false);

        String email = checkLoggedInUserOr401(session);
        if (email == Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member loginMember = (Member)session.getAttribute("member");
        postService.addPost(loginMember, post);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{idx}")
    public ResponseEntity<Post> detail(@PathVariable("idx") String id, HttpServletRequest request) {
        String email = checkLoggedInUserOr401(request.getSession(false));

        Post post = postService.detail(Integer.parseInt(id), email);

        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        System.out.println("post = " + post.getId());
        return ResponseEntity.ok(post);
    }
    
    @DeleteMapping("{idx}")
    public ResponseEntity delete(@PathVariable("idx") String id, HttpServletRequest request){
        String email = checkLoggedInUserOr401(request.getSession(false));
        if (email == Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer result = postService.delete(Integer.parseInt(id), email);

        if (result == -1){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("{idx}")
    public ResponseEntity edit(@PathVariable("idx") String id, @RequestBody RegiPostDTO post, HttpServletRequest request){
        String email = checkLoggedInUserOr401(request.getSession(false));
        if (email == Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer result = postService.edit(Integer.parseInt(id), email, post.getTitle(), post.getContents());

        if (result == -1){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }
}