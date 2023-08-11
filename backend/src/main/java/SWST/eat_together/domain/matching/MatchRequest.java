package SWST.eat_together.domain.matching;
import lombok.Data;

@Data
public class MatchRequest {
    private String nickname;
    private String people;
    private String gender;
    private String age;
    private String menu;
    private String conversation;
    private double latitude;
    private double longitude;
    private String startTime;
}
