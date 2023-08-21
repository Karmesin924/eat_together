package SWST.eat_together.matching.algorithm;

import SWST.eat_together.matching.model.MatchingRequest;
import SWST.eat_together.matching.socket.SendingMessage;
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

    private final Queue<MatchingRequest> matchQueue = new ArrayBlockingQueue<>(QUEUE_CAPACITY);

    public Queue<MatchingRequest> getMatchQueue() {
        return matchQueue;
    }

    public void startMatching() {
        List<MatchingRequest> matchedRequests = new ArrayList<>();

        for (MatchingRequest request1 : matchQueue) {
            if (matchedRequests.contains(request1)) {
                //매칭완료 리스트에 존재하는 요청일시 반복문을 패스한다.
                continue;
            }

            System.out.println("[현재 기준 요청] : " + request1);

            List<MatchingRequest> overThreeScoreList = new ArrayList<>();

            //매칭 가능 요청인지 검증.
            for (MatchingRequest request2 : matchQueue) {
                if (matchingUtil.checkMatchableRequest(request1, request2)) {
                    int score = matchingUtil.calculateMatchingScore(request1, request2);

                    //request1과 request2의 score가 3 이상일 경우 overThreeScoreList에 추가
                    if (score >= 3) {
                        overThreeScoreList.add(request2);
                        System.out.println(request2.getNickname() + "님의 요청은 score 기준을 넘겼습니다.");
                        System.out.println("overThreeScoreList = " + overThreeScoreList);
                    } else {
                        System.out.println(request2.getNickname() + "님의 요청은 score 기준을 넘기지 못했습니다.");
                    }
                }
            }

            if (!overThreeScoreList.isEmpty()) {

                // requst1의 people이 any일 경우
                if ("any".equals(request1.getPeople())) {
                    matchingUtil.caseOfRequest1PeopleIsAny(matchedRequests, overThreeScoreList, request1);
                    matchQueue.removeAll(matchedRequests);
                } else {
                    matchingUtil.caseOfRequestPeopleIsNotAny(matchedRequests, overThreeScoreList, request1);
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
