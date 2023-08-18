package SWST.eat_together.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    Member findByEmail(String email);
    List<Member> findAll();

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Member findByNickname(String nickname);
}
