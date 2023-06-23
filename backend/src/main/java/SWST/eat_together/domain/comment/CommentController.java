package SWST.eat_together.domain.comment;

import SWST.eat_together.domain.member.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class CommentController {
    @PostMapping("/{idx}/comment/add")
    public ResponseEntity addComment(@PathVariable("idx") String idx, @RequestBody CommentDTO comment, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }
        MemberDTO loginMember = (MemberDTO) session.getAttribute("member");

        CommentService.addComment(loginMember, comment);

        return ResponseEntity.ok().build();
    }

//    @GetMapping("/{idx}/comment")
//    public ResponseEntity getComment(@RequestBody)
}