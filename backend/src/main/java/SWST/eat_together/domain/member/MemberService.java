package SWST.eat_together.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private MemberRepository memberRepository = MemberRepository.getInstance();

    public int saveUser(MemberDTO member) {
        memberRepository.save(member);
        //성공시 0 return, 실패시 1 return
        return 0;
    }

    public MemberDTO login(String loginId, String password)
    //loginId를 조회해 password와 일치하는지 검증. 일치하면 MemberDTO 객체 반환, 일치하지 않으면 null 반환.
    {
        MemberDTO memberDTO = memberRepository.findByLoginId(loginId);
        if (memberDTO == null) {
            // 오류
            return null;
        }

        if (memberDTO.getPassword().equals(password))
            return memberDTO;

        return null;
    }
}