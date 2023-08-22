package SWST.eat_together.board;

import SWST.eat_together.post.Post;
import SWST.eat_together.post.PostRepository;
import SWST.eat_together.post.model.PostDetailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final PostRepository postRepository;
    private static final int pageSize = 10;

    public Map<String, Object> getBoardByPage(int pageNumber) {
        PageRequest pageRequest = PageRequest.of(pageNumber - 1, pageSize, Sort.by("id").descending());
        Page<Post> postPage = postRepository.findAll(pageRequest);

        if (postPage.isEmpty()) {
            return null;
        }

        List<PostDetailDTO> board = postPage.map(post -> new PostDetailDTO(post)).getContent();
        long totalPages = (countTotalPages(pageSize));

        Map<String, Object> response = new HashMap<>();
        response.put("totalPages", totalPages);
        response.put("data", board);

        return response;
    }

    private long countTotalPages(int pageSize) {
        long totalPosts = postRepository.count();
        return (totalPosts + pageSize - 1) / pageSize;
    }
}