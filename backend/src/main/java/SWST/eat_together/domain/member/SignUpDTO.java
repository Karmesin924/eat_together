package SWST.eat_together.domain.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Table;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDTO {
    private String email;
    private String name;
    private String nickname;
    private Date date;
    private String password;
}
