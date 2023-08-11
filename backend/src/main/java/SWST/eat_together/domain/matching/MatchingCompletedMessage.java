package SWST.eat_together.domain.matching;

import lombok.Data;

@Data
public class MatchingCompletedMessage {
    private String type;
    private String member;
    private int roomPk;
}
