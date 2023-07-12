package SWST.eat_together.domain.comment;

import lombok.Data;

@Data
public class CommentDetailDTO extends Comment{
    private boolean isAuthor;
}
