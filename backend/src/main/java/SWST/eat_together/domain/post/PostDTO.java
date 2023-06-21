package SWST.eat_together.domain.post;

import lombok.Data;

@Data
public class PostDTO {
    private Long idx;
    private String title;
    private String contents;
    private String nickname;
    private String createdDate;

    private String email;
}