package SWST.eat_together.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MatchingManager {

    private final MatchingTimeoutChecker matchingTimeoutChecker;
    private final MatchingAlgorithm matchingAlgorithm;

    @Scheduled(fixedRate = 1000)
    private void checkForMatches() {
        matchingAlgorithm.startMatching();
        matchingTimeoutChecker.handleMatchRequest();
    }
}
