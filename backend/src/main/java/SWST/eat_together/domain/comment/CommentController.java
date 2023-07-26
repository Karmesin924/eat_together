package SWST.eat_together.domain.comment;

import SWST.eat_together.domain.member.Member;
import lombok.RequiredArgsConstructor;
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
            System.out.println("비로그인 상태");
            return ResponseEntity.badRequest().build();
        }
        Member loginMember = (Member) session.getAttribute("member");

        commentService.addComment(loginMember, regiComment, Long.valueOf(idx));

        return ResponseEntity.ok().build();
    }

    @GetMapping("{idx}")
    public ResponseEntity<List<CommentDetailDTO>> getComments(@PathVariable("idx") String idx, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Member loginMember = null;
        String email = "0"; // 기본값으로 '0'으로 설정

        if (session != null) {
            loginMember = (Member) session.getAttribute("member");
            if (loginMember != null) {
                email = loginMember.getEmail();
            }
        }

        List<CommentDetailDTO> comments = commentService.getCommentDetailDTOs(idx, email);
        System.out.println("comments = " + comments);

        return ResponseEntity.ok(comments);
    }
    @DeleteMapping("{commentIdx}")
    public ResponseEntity delete(@PathVariable("commentIdx") Long commentIdx, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null)
            return ResponseEntity.notFound().build();

        Member loginMember = (Member) session.getAttribute("member");
        String email = loginMember.getEmail();
        Integer result = commentService.delete(commentIdx, email);

        if (result == 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }


}