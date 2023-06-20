package SWST.eat_together.domain.member;

import SWST.eat_together.domain.member.MemberDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemberRepository {
    private static Map<Long, MemberDTO> store = new HashMap<>();
    private static long sequence = 0L;

    private static final MemberRepository instance = new MemberRepository();

    public static MemberRepository getInstance(){
        return instance;
    }

    private MemberRepository(){

    }

    public MemberDTO save(MemberDTO member){
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    public MemberDTO findByLoginId(String loginId) {
        return store.values().stream()
                .filter(memberDTO -> memberDTO.getEmail().equals(loginId))
                .findAny().orElse(null);
    }

    public MemberDTO findById(long id){
        return store.get(id);
    }

    public List<MemberDTO> findAll(){
        return new ArrayList<>(store.values());
    }

    public void clearStore(){
        store.clear();
    }
}
