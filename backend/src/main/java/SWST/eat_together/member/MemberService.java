package SWST.eat_together.member;

import SWST.eat_together.member.model.LoginDTO;
import SWST.eat_together.member.model.SignUpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository ;

    public String saveUser(SignUpDTO form) {
        if (memberRepository.existsByEmail(form.getEmail())) {
            return "email";
        }

        if (memberRepository.existsByNickname(form.getNickname())) {
            return "nickname";
        }

        String DjangoApiUrl = "http://127.0.0.1:8000/accounts/signup/";
        signUpRequest(DjangoApiUrl, form.getNickname(), form.getEmail(), form.getPassword());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(form.getPassword());

        Member member = new Member();
        member.setEmail(form.getEmail());
        member.setName(form.getName());
        member.setNickname(form.getNickname());
        member.setDate(form.getBirthDate());
        member.setPassword(encodedPassword); // 암호화된 비밀번호 저장
        member.setGender(form.getGender());

        memberRepository.save(member);

        return "0";
    }
    public Member login(LoginDTO form){
        Member member = memberRepository.findByEmail(form.getEmail());
        if (member == null) {
            // 오류
            System.out.println("회원정보 없음");
            return null;
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(form.getPassword(), member.getPassword()))
            return member;

        return null;
    }

    public static void signUpRequest(String apiUrl, String nickname, String email, String password) {
        String jsonBody = String.format("{\"nickname\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}", nickname, email, password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
        HttpStatus statusCode = response.getStatusCode();
        String responseBody = response.getBody();

        System.out.println("Response Status Code: " + statusCode);
        System.out.println("Response Body: " + responseBody);
    }
}