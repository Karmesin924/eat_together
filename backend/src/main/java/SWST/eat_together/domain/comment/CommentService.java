package SWST.eat_together.domain.comment;


import SWST.eat_together.domain.member.Member;

import java.time.LocalDate;

public class CommentService {
    public static void addComment(Member member, CommentDTO comment) {
        comment.setEmail(member.getEmail());
        comment.setCreatedDate(LocalDate.now().toString());
        comment.setNickname(member.getNickname());
        //comment 객체에 inx 값을 적절히 할당하고, 데이터베이스에 추가하는 과정 필요.
        //commentRepository.save(comment);
        System.out.println("post = " + comment);
    }
}
