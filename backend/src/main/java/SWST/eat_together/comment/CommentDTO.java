package SWST.eat_together.comment;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDTO {
    private Long idx;
    private Long postIdx;
    private String contents;
    private String nickname;
    private String createdDate;
    private String email;
}
