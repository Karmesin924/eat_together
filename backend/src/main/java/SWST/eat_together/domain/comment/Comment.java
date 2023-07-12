package SWST.eat_together.domain.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "commentInfo")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "content")
    private String contents;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "created_date")
    private String createdDate;

    @Column(name = "email")
    private String email;


}
