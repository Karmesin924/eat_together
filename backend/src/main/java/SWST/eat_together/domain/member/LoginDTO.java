package SWST.eat_together.domain.member;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
}