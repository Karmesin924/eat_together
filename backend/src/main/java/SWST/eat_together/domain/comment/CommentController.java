package SWST.eat_together.domain.comment;

import SWST.eat_together.domain.member.Member;
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
    public ResponseEntity deleteComment(@PathVariable("commentIdx") Long commentIdx, HttpServletRequest request) {
        System.out.println("commentIdx = " + commentIdx);
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 세션이 없는 경우 401 Unauthorized 반환
        }

        Member loginMember = (Member) session.getAttribute("member");
        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 로그인 회원 정보가 없는 경우 401 Unauthorized 반환
        }

        String email = loginMember.getEmail();
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
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 세션이 없는 경우 401 Unauthorized 반환
        }

        Member loginMember = (Member) session.getAttribute("member");
        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 로그인 회원 정보가 없는 경우 401 Unauthorized 반환
        }

        Integer result = commentService.editComment(commentIdx, loginMember.getEmail(), regiComment.getContents());

        if (result == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 작성자 본인이 아닐 경우 401 Unauthorized 반환
        }

        return ResponseEntity.ok().build();
    }
}