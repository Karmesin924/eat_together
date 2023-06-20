package SWST.eat_together.domain.member;

import lombok.Data;
@Data
public class MemberDTO {
    private Long id;
    private String name;
    private String email;
    private String nickname;
    private String date;
    private String password;
}
