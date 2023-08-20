package SWST.eat_together.comment;

import SWST.eat_together.comment.model.CommentDTO;
import SWST.eat_together.comment.model.CommentDetailDTO;
import SWST.eat_together.member.Member;
import SWST.eat_together.member.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        System.out.println("idx = " + idx);
        System.out.println("regiComment = " + regiComment);
        HttpSession session = request.getSession(false);

        String email = AuthUtil.checkLoggedInUserOr401(session);
        if (email == AuthUtil.Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member loginMember = (Member) session.getAttribute("member");
        commentService.addComment(loginMember, regiComment, Long.valueOf(idx));

        return ResponseEntity.ok().build();
    }

    @GetMapping("{idx}")
    public ResponseEntity<List<CommentDetailDTO>> getComments(@PathVariable("idx") String idx, HttpServletRequest request) {
        String email = AuthUtil.checkLoggedInUserOr401(request.getSession(false));

        List<CommentDetailDTO> comments = commentService.getCommentDetailDTOs(idx, email);
        System.out.println("comments = " + comments);

        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("{commentIdx}")
    public ResponseEntity deleteComment(@PathVariable("commentIdx") Long commentIdx, HttpServletRequest request) {
        System.out.println("commentIdx = " + commentIdx);

        String email = AuthUtil.checkLoggedInUserOr401(request.getSession(false));
        if (email == AuthUtil.Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer result = commentService.deleteComment(commentIdx, email);
        if (result == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 작성자 본인이 아닐 경우 401 Unauthorized 반환
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("{commentIdx}")
    public ResponseEntity editComment(@PathVariable("commentIdx") Long commentIdx, @RequestBody CommentDTO regiComment, HttpServletRequest request){
        System.out.println("commentIdx = " + commentIdx);
        System.out.println("CommentDTO = " + regiComment);

        String email = AuthUtil.checkLoggedInUserOr401(request.getSession(false));
        if (email == AuthUtil.Not_logged_in){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer result = commentService.editComment(commentIdx, email, regiComment.getContents());

        if (result == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 작성자 본인이 아닐 경우 401 Unauthorized 반환
        }

        return ResponseEntity.ok().build();
    }
}