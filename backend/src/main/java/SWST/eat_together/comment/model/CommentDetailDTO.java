package SWST.eat_together.comment.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDetailDTO {
    private Long id;
    private Long postId;
    private String contents;
    private String nickname;
    private LocalDateTime createdDate;
    private String email;
    private boolean isAuthor;
}
