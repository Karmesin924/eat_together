package SWST.eat_together.domain.post;

import SWST.eat_together.domain.member.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PostService {
    private PostRepository postRepository = PostRepository.getInstance();

    public void addPost(MemberDTO member, PostDTO post){
        post.setEmail(member.getEmail());
        post.setCreatedDate(LocalDate.now().toString());
        post.setNickname(member.getNickname());
        //post 객체에 inx 값을 적절히 할당하고, 데이터베이스에 추가하는 과정 필요.
        postRepository.save(post);
    }

    public PostDTO detail(long idx, String email) {
        //idx값이 일치하는 post 객체 반환. 만약 일치하는 post가 없다면 null 반환.
        PostDTO post=postRepository.findByIdx(idx);

        PostDetail postDetail = new PostDetail();

        postDetail.setIdx(post.getIdx());
        postDetail.setEmail(post.getEmail());
        postDetail.setNickname(post.getNickname());
        postDetail.setCreatedDate(post.getCreatedDate());
        postDetail.setAuthor(false);

        if (email != null && post.getEmail()==email) {
            postDetail.setAuthor(true);
        }

        return postDetail;
    }
}
