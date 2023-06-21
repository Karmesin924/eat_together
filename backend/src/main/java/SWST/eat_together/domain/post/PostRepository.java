package SWST.eat_together.domain.post;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostRepository {
    private static Map<Long, PostDTO> store = new HashMap<>();
    private static long post_sequence = 0L;

    private static final PostRepository instance = new PostRepository();

    public static PostRepository getInstance(){
        return instance;
    }

    private PostRepository(){

    }

    public PostDTO save(PostDTO post){
        post.setIdx(++post_sequence);
        store.put(post.getIdx(), post);
        return post;
    }

    public PostDTO findByIdx(long idx){
        return store.get(idx);
    }

    public List<PostDTO> findAll(){
        return new ArrayList<>(store.values());
    }

    public void clearStore(){
        store.clear();
    }
}
