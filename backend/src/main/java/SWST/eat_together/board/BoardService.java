package SWST.eat_together.board;

import SWST.eat_together.post.Post;
import SWST.eat_together.post.PostRepository;
import SWST.eat_together.post.model.PostDetailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final PostRepository postRepository;

    public Page<PostDetailDTO> getPostsByPage(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("id").descending());
        Page<Post> postPage = postRepository.findAll(pageRequest);

        return postPage.map(post -> new PostDetailDTO(post));
    }

    public long count() {
        return postRepository.count();
    }
}
