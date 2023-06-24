package SWST.eat_together.domain.comment;

import lombok.Data;

@Data
public class CommentDTO {
    private Long idx;
    private Long postIdx;
    private String contents;
    private String nickname;
    private String createdDate;
    private String email;
}
