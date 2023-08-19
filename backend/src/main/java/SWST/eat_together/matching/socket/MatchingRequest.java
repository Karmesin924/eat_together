package SWST.eat_together.matching.socket;
import lombok.Data;

import java.time.Instant;

@Data
public class MatchingRequest {
    private String type;
    private String nickname;

    private String people;
    private String gender;
    private String age;
    private String menu;
    private String conversation;
    private double latitude;
    private double longitude;
    private String startTime;
    private Instant receivedTimestamp;
}

/*
    각 key별로 들어올 수 있는 value값과 형식.
    (any는 어느 값이건 상관 없다는 것을 의미한다)
            "type" : "matching_start"
            "nickname" : "user1"
            "people : any, 2, 3, 4
            "gender" : any, same
            "age" : any, peer
            "menu" : any, Korean, Chinese, Japanese, Western, Vietnamese, Bunsik, Dessert
            "conversation" : Little, Normal, Many
            "latitude":
            "longitude":
            "time" : hh:mm
*/