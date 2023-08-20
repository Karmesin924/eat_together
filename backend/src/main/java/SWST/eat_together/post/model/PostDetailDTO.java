package SWST.eat_together.post.model;

import SWST.eat_together.post.Post;
import lombok.Data;

@Data
public class PostDetailDTO extends Post {
    private boolean isAuthor;
}
