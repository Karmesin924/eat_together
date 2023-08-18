package SWST.eat_together.board;

import SWST.eat_together.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/{page}")
    public ResponseEntity<Map<String, Object>> getBoard(@PathVariable("page") int page) {
        int pageSize = 10;
        int pageNumber = page - 1;

        Page<Post> postPage = boardService.getPostsByPage(pageNumber, pageSize);

        if (postPage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Post> board = postPage.getContent();
        long totalPosts = boardService.count()/10+1;
        Map<String, Object> response = new HashMap<>();
        response.put("totalPages", totalPosts);
        response.put("data", board);

        return ResponseEntity.ok(response);
    }
}
