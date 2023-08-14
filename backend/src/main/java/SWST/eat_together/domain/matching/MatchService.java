package SWST.eat_together.domain.matching;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ArrayBlockingQueue;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class MatchService {

    private Queue<MatchRequest> matchQueue = new ArrayBlockingQueue<>(100);
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public List<MatchRequest> handleMatchRequest(MatchRequest newRequest) {
        System.out.println("*****MatchService.handleMatchRequest*****");

        matchQueue.offer(newRequest);

        List<MatchRequest> matchingRequests = new ArrayList<>();
        List<MatchRequest> matchedRequests = new ArrayList<>();

        for (MatchRequest request1 : matchQueue) {
            if (matchedRequests.contains(request1)) {
                continue; // Skip already matched requests
            }

            List<MatchRequest> tempMatches = new ArrayList<>();

            for (MatchRequest request2 : matchQueue) {
                if (request1 != request2 &&
                        ("any".equals(request1.getPeople()) || "any".equals(request2.getPeople()) || request1.getPeople().equals(request2.getPeople())) &&
                        compareHours(request1.getStartTime(), request2.getStartTime()) &&
                        checkDistanceWithin700Meters(request1.getLatitude(), request1.getLongitude(), request2.getLatitude(), request2.getLongitude())) {
                    System.out.println("실행");
                    int score = calculateMatchingScore(request1, request2);

                    if (score >= 3) {
                        tempMatches.add(request2);
                    }
                }
            }

            if (tempMatches.size() > 0) {
                if ("any".equals(request1.getPeople())) {
                    matchingRequests.add(request1);
                    matchingRequests.addAll(tempMatches);
                    matchedRequests.addAll(tempMatches);
                } else {
                    Map<String, Integer> peopleFrequency = new HashMap<>();

                    for (MatchRequest tempMatch : tempMatches) {
                        String people = tempMatch.getPeople();
                        peopleFrequency.put(people, peopleFrequency.getOrDefault(people, 0) + 1);
                    }

                    String mostFrequentPeople = null;
                    int highestFrequency = 0;

                    for (Map.Entry<String, Integer> entry : peopleFrequency.entrySet()) {
                        if (entry.getValue() > highestFrequency) {
                            mostFrequentPeople = entry.getKey();
                            highestFrequency = entry.getValue();
                        }
                    }

                    int targetMatchCount = Math.min(highestFrequency, Integer.parseInt(request1.getPeople()) - 1);

                    if (targetMatchCount > 0) {
                        matchingRequests.add(request1);
                        for (MatchRequest tempMatch : tempMatches) {
                            if (tempMatch.getPeople().equals(mostFrequentPeople) && targetMatchCount > 0) {
                                matchingRequests.add(tempMatch);
                                targetMatchCount--;
                                matchedRequests.add(tempMatch);
                            }
                        }
                    }
                }
            }
        }

        matchQueue.removeAll(matchedRequests);

        return matchingRequests;
    }
    private int calculateMatchingScore(MatchRequest request1, MatchRequest request2) {
        int score = 0;
        if (request1.getMenu().equals("any") || request1.getMenu().equals(request2.getMenu())) {
            score++;
        }
        if (request1.getAge().equals("any") || request1.getAge().equals(request2.getAge())) {
            score++;
        }
        if (request1.getGender().equals("any") || request1.getGender().equals(request2.getGender()) || request1.getGender().equals("same")) {
            score++;
        }
        if (request1.getConversation().equals("any") || request1.getConversation().equals(request2.getConversation())) {
            score++;
        }
        return score;
    }

    public boolean compareHours(String time1, String time2) {
        String[] timeParts1 = time1.split(":");
        String[] timeParts2 = time2.split(":");

        System.out.println("timeParts1[0] = " + timeParts1[0]);
        System.out.println("timeParts2[0] = " + timeParts2[0]);
        return timeParts1[0].equals(timeParts2[0]);
    }

    public boolean checkDistanceWithin500Meters(double lat1, double lon1, double lat2, double lon2) {
        int earthRadiusInMeters = 6371000; // Earth's radius in meters

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double distance = earthRadiusInMeters * c;

        return distance <= 500; // Check if the distance is within 500 meters
    }

    public int interectionWithChat(List<MatchRequest> matchedRequests) {
        System.out.println("*****MatchService.interectionWithChat*****");

        int roomPk = 0;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        MatchedList messageToChat = new MatchedList();

        List<String> userNicknames = new ArrayList<>();
        for (MatchRequest request : matchedRequests) {
            userNicknames.add(request.getNickname());
        }
        messageToChat.setUser_nicknames(userNicknames);

        HttpEntity<MatchedList> requestEntity = new HttpEntity<>(messageToChat, headers);

        // 대상 서버 URL 설정
        String targetUrl = "http://127.0.0.1:8000/chat/new_matching_room/";

        // HTTP POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                targetUrl,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("room_pk")) {
                roomPk = (int) responseBody.get("room_pk");
                System.out.println("roomPk = " + roomPk);
            }
        } else {
            System.err.println("Failed to send matching completed message. Status code: " + response.getStatusCode());
        }

        return roomPk;
    }

    public MatchingCompletedMessage CreateMessageToFront(int roomPk, List<MatchRequest> matchedRequests) {
        MatchingCompletedMessage message = new MatchingCompletedMessage();
        message.setType("matching_completed");

        List<String> userNicknames = new ArrayList<>();
        for (MatchRequest request : matchedRequests) {
            userNicknames.add(request.getNickname());
        }
        message.setNickname(userNicknames);

        message.setRoomPk(roomPk);

        return message;
    }

    public boolean checkDistanceWithin700Meters(double lat1, double lon1, double lat2, double lon2) {
        int earthRadiusInMeters = 6371000; // Earth's radius in meters

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double distance = earthRadiusInMeters * c;

        return distance <= 700; // Check if the distance is within 700 meters
    }
}