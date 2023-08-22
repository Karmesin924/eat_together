package SWST.eat_together.board;

import SWST.eat_together.post.Post;
import SWST.eat_together.post.model.PostDetailDTO;
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
        System.out.println("page = " + page);
        int pageSize = 10;
        Map<String, Object> response = boardService.getBoardByPage(page, pageSize);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }
}
