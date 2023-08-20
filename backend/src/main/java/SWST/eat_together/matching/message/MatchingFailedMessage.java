package SWST.eat_together.matching.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

@Data
public class MatchingFailedMessage {
    private String type;
    private String nickname;

    public String toJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
