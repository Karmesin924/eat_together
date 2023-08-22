package SWST.eat_together.matching.algorithm;

import SWST.eat_together.matching.model.MatchingRequest;
import SWST.eat_together.matching.communication.SendingMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ArrayBlockingQueue;

@RequiredArgsConstructor
@Service
public class MatchingAlgorithm {
    private final SendingMessage sendingMessage;
    private final MatchingUtil matchingUtil;
    private static final int QUEUE_CAPACITY = 100;
    public static final String anyValue = "any";

    private final Queue<MatchingRequest> matchQueue = new ArrayBlockingQueue<>(QUEUE_CAPACITY);

    public Queue<MatchingRequest> getMatchQueue() {
        return matchQueue;
    }

    public void startMatching() {
        List<MatchingRequest> matchedRequests = new ArrayList<>();

        for (MatchingRequest request1 : matchQueue) {
            if (matchedRequests.contains(request1)) {   //이미 매칭된 유저라면 패스.
                continue;
            }

            List<MatchingRequest> overThreeScoreList = new ArrayList<>();

            for (MatchingRequest request2 : matchQueue) {
                if (matchingUtil.checkMatchableRequest(request1, request2)) {
                    int score = matchingUtil.calculateMatchingScore(request1, request2);

                    if (score >= 3) {
                        overThreeScoreList.add(request2);
                    }
                }
            }

            if (!overThreeScoreList.isEmpty()) {
                if (request1.getPeople().equals(anyValue)) {
                    matchingUtil.caseOfRequest1PeopleIsAny(matchedRequests, overThreeScoreList, request1);
                    matchQueue.removeAll(matchedRequests);
                } else {
                    matchingUtil.caseOfRequest1PeopleIsNotAny(matchedRequests, overThreeScoreList, request1);
                }
            }
        }

        matchQueue.removeAll(matchedRequests);
        sendingMessage.completeMessageToFront(matchedRequests);
    }

    public void insertQueue(MatchingRequest newRequest){
        for (MatchingRequest existingRequest : matchQueue) {
            if (existingRequest.getNickname().equals(newRequest.getNickname())) {
                sendingMessage.alreadyExistMessageToFront(newRequest);
                return;
            }
        }

        matchQueue.offer(newRequest);
        System.out.println("현재 큐 상태 = " + matchQueue);
    }

    public void removeQueue(MatchingRequest matchingRequest) {
        String nickname = matchingRequest.getNickname();
        MatchingRequest removeRequest = null;
        for (MatchingRequest request : matchQueue) {
            if (request.getNickname().equals(nickname)) {
                removeRequest = request;
                break;
            }
        }

        matchQueue.remove(removeRequest);
        System.out.println("현재 큐 상태 = " + matchQueue);
    }

}
