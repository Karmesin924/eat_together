package SWST.eat_together.post.model;

import SWST.eat_together.post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
public class PostDetailDTO extends Post {
    private boolean isAuthor;
    private String email;

    public PostDetailDTO(Post post, String currentUserEmail) {
        this.isAuthor = post.getUser().getEmail().equals(currentUserEmail);
        BeanUtils.copyProperties(post, this); // 엔티티의 필드를 DTO로 복사
        this.email = post.getUser().getEmail();
    }}
