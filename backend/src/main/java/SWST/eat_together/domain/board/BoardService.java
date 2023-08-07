package SWST.eat_together.domain.board;

import SWST.eat_together.domain.post.Post;
import SWST.eat_together.domain.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BoardService {
    private final PostRepository postRepository;

    public Page<Post> getPostsByPage(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("id").descending());
        return postRepository.findAll(pageRequest);
    }

    public long count() {
        return postRepository.count();
    }
}
