package SWST.eat_together.matching.algorithm;

import SWST.eat_together.matching.model.MatchingRequest;
import SWST.eat_together.matching.communication.SendingMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Queue;

import static SWST.eat_together.matching.algorithm.MatchingAlgorithm.anyValue;

@RequiredArgsConstructor
@Component
public class MatchingTimeoutChecker {
    private final MatchingAlgorithm matchingAlgorithm;
    private final SendingMessage sendingMessage;
    private static final long WAITING_TIME_THRESHOLD_SECONDS = 10; //해당 초가 지나면 시간 초과로 인식, 기준 완화 실행

    public void handleMatchRequest() {
        Instant currentTime = Instant.now();

        Queue<MatchingRequest> matchQueue = matchingAlgorithm.getMatchQueue();

        for (MatchingRequest request : matchQueue) {
            if (hasRequestExceededWaitingTime(request, currentTime)) {  //시간 초과 시 실행
                if (easeTheOption(request)) {
                    System.out.println("시간 초과. 조건 완화 완료 : " + request);
                    matchQueue.remove(request);
                    matchQueue.offer(request);
                } else {
                    sendingMessage.failureMessageToFront(request);
                    matchQueue.remove(request);
                }
            }
        }
    }

    private boolean hasRequestExceededWaitingTime(MatchingRequest request, Instant currentTime) {
        return Duration.between(request.getReceivedTimestamp(), currentTime).getSeconds() >= WAITING_TIME_THRESHOLD_SECONDS;
    }

    private boolean easeTheOption(MatchingRequest request) {

        if (!request.getMenu().equals(anyValue)) {
            request.setMenu(anyValue);
            return true;
        } else if (!request.getAge().equals(anyValue)) {
            request.setAge(anyValue);
            return true;
        } else if (!request.getGender().equals(anyValue)) {
            request.setGender(anyValue);
            return true;
        } else if (!request.getConversation().equals(anyValue)) {
            request.setConversation(anyValue);
            return true;
        }
        return false;
    }
}
