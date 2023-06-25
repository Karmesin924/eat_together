package SWST.eat_together.domain.post;

import SWST.eat_together.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public void addPost(Member member, RegiPostDTO regiPost){
        Post post = new Post();

        post.setTitle(regiPost.getTitle());
        post.setContents(regiPost.getContents());

        post.setEmail(member.getEmail());
        post.setCreatedDate("asdf");
        post.setNickname(member.getNickname());
        //post 객체에 inx 값을 적절히 할당하고, 데이터베이스에 추가하는 과정 필요.
        try {
            postRepository.save(post);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Post detail(long id, String email) {

        Post post=postRepository.findById(id);

        PostDetailDTO postDetail = new PostDetailDTO();

        postDetail.setId(post.getId());
        postDetail.setEmail(post.getEmail());
        postDetail.setNickname(post.getNickname());
        postDetail.setCreatedDate(post.getCreatedDate());
        postDetail.setTitle(post.getTitle());
        postDetail.setContents(post.getContents());

        postDetail.setAuthor(false);

        if (email != null && post.getEmail().equals(email)) {
            postDetail.setAuthor(true);
        }

        return postDetail;
    }

    public Integer delete(int id, String email) {
        Post post=postRepository.findById(id);

        if (!email.equals(post.getEmail()))
            return 1;
        postRepository.delete(post);

        return 0;
    }

    public Integer edit(int id, String email, String title, String contents) {
        Post post=postRepository.findById(id);

        if (!email.equals(post.getEmail()))
            return 1;
        /*postRepository.edit(idx, title, contents);*/
        post.setTitle(title);
        post.setContents(contents);
        postRepository.save(post);
        return 0;
    }

}
