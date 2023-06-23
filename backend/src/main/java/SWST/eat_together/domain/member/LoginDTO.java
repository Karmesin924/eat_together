package SWST.eat_together.domain.member;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class LoginDTO {
    private String email;
    private String password;
}