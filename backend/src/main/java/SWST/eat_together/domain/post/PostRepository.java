package SWST.eat_together.domain.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    Post findById(long id);

    List<Post> findAll();

}
