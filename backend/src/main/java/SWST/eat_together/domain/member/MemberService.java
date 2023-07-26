package SWST.eat_together.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private MemberRepository memberRepository ;

    @Autowired
    public void setMemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;}

    public void saveUser(SignUpDTO form) {
        Member member = new Member();

        member.setEmail(form.getEmail());
        member.setName(form.getName());
        member.setNickname(form.getNickname());
        member.setDate(form.getBirthDate());
        member.setPassword(form.getPassword());
        member.setGender(form.getGender());

        memberRepository.save(member);
    }

    public Member login(LoginDTO form)
    //loginId를 조회해 password와 일치하는지 검증. 일치하면 MemberDTO 객체 반환, 일치하지 않으면 null 반환.
    {
        Member member = new Member();
        member = memberRepository.findByEmail(form.getEmail());
        if (member == null) {
            // 오류
            System.out.println("회원정보 없음");
            return null;
        }

        if (member.getPassword().equals(form.getPassword()))
            return member;

        return null;
    }
}