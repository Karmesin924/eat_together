package SWST.eat_together.domain.comment;

import SWST.eat_together.domain.member.Member;
import SWST.eat_together.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/posts/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping("/{idx}/add")
    public ResponseEntity addComment(@PathVariable("idx") String idx, @RequestBody CommentDTO regiComment, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        Member loginMember = (Member) session.getAttribute("member");

        commentService.addComment(loginMember, regiComment, Long.valueOf(idx));

        return ResponseEntity.ok().build();
    }

    @GetMapping("{idx}")
    public List<Comment> getComments(@PathVariable("idx") String idx){
        System.out.println("idx = " + idx);
        List<Comment> comments = commentService.getComments(idx);
        System.out.println("comments = " + comments);

        return comments;
    }

//    @GetMapping("/{idx}/comment")
//    public ResponseEntity getComment(@RequestBody)
}