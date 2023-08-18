package SWST.eat_together.domain.matching;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.List;

@Data
public class MatchingCompletedMessage {
    private String type;
    private List<String> nickname;
    private int roomPk;

    public String toJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (Exception e) {
            e.printStackTrace();
            return ""; // 또는 적절한 오류 처리
        }
    }
}
