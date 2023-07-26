package SWST.eat_together.domain.post;

import lombok.*;
import javax.persistence.*;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "post_info")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String contents;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "created_date")
    private String createdDate;

    @Column(name = "email")
    private String email;
}
