package SWST.eat_together.post;

import SWST.eat_together.member.Member;
import SWST.eat_together.post.model.PostDetailDTO;
import SWST.eat_together.post.model.RegiPostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd 'at' HH:mm:ss zzz");

    public void addPost(Member member, RegiPostDTO regiPost){
        Post post = new Post();

        post.setTitle(regiPost.getTitle());
        post.setContents(regiPost.getContents());
        post.setUser(member);

        post.setCreatedDate(LocalDateTime.now());
        post.setNickname(member.getNickname());

        try {
            postRepository.save(post);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Post detail(long id, String email) {

        Post post=postRepository.findById(id);

        PostDetailDTO postDetail = new PostDetailDTO(post, email);

        postDetail.setNickname(post.getNickname());
        postDetail.setCreatedDate(post.getCreatedDate());
        postDetail.setTitle(post.getTitle());
        postDetail.setContents(post.getContents());

        postDetail.setAuthor(false);

        if (email != null && post.getUser().getEmail().equals(email)) {
            postDetail.setAuthor(true);
        }

        return postDetail;
    }

    public Integer delete(int id, String email) {
        Post post=postRepository.findById(id);

        if (!email.equals(post.getUser().getEmail()))
            return -1;
        postRepository.delete(post);

        return 0;
    }

    public Integer edit(int id, String email, String title, String contents) {
        Post post=postRepository.findById(id);

        if (!email.equals(post.getUser().getEmail()))
            return -1;

        post.setTitle(title);
        post.setContents(contents);
        postRepository.save(post);
        return 0;
    }
}
