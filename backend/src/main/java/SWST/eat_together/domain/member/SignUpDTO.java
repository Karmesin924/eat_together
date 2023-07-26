package SWST.eat_together.domain.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDTO {
    private String email;
    private String name;
    private String nickname;
    private Date birthDate;
    private String password;
    private String gender;
}
