package SWST.eat_together.matching.algorithm;

import SWST.eat_together.matching.model.MatchingRequest;
import SWST.eat_together.member.Member;
import SWST.eat_together.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

import static SWST.eat_together.matching.algorithm.MatchingAlgorithm.anyValue;

@RequiredArgsConstructor
@Component
public class MatchingUtil {

    private final MemberRepository memberRepository;
    private static final int MAX_DISTANCE_METERS = 700;
    private static final int maxAgeDifference  = 2;

    public boolean checkMatchableRequest(MatchingRequest request1, MatchingRequest request2) {
        return (request1 != request2) &&    //비교대상이 나 자신이 아님, 기준 요청의 people이 any이거나 서로의 people이 같음, 시간/ 거리 조건 만족 시.
                (anyValue.equals(request1.getPeople()) || request1.getPeople().equals(request2.getPeople())) &&
                isWithinOneHour(request1.getStartTime(), request2.getStartTime()) &&
                checkDistance(request1.getLatitude(), request1.getLongitude(), request2.getLatitude(), request2.getLongitude());
    }

    public void caseOfRequest1PeopleIsAny(List<MatchingRequest> matchedRequests, List<MatchingRequest> overThreeScoreList, MatchingRequest request1){
        matchedRequests.add(request1);

        //가장 빈도수 높은 희망 인원 수 구하기
        String mostFrequentPeople = findMostFrequentPeople(overThreeScoreList);

        // 가장 빈도가 높은 인원 값을 key로 가진 key값만큼의 개수(-1)의요청들을 MathedRequests에 추가한다.
        if (mostFrequentPeople != null) {
            if (mostFrequentPeople.equals(anyValue)){
                if (overThreeScoreList.size() < 4) {
                    matchedRequests.addAll(overThreeScoreList);
                } else {
                    matchedRequests.addAll(overThreeScoreList.subList(0 , 3));
                }

            } else {
                int targetMatchCount = Integer.parseInt(mostFrequentPeople) - 1; // 매칭완료 리스트에 추가해야할 인원수

                for (MatchingRequest tempMatch : overThreeScoreList) {
                    if (tempMatch.getPeople().equals(mostFrequentPeople) && targetMatchCount > 0) {
                        matchedRequests.add(tempMatch);
                        targetMatchCount--;
                    }
                }
            }
        }
    }

    public void caseOfRequest1PeopleIsNotAny(List<MatchingRequest> matchedRequests, List<MatchingRequest> overThreeScoreList, MatchingRequest request1){
        matchedRequests.add(request1);

        int targetMatchCount = Integer.parseInt(request1.getPeople());

        for (MatchingRequest tempMatch : overThreeScoreList) {
            //인원 수와 일치하는 요청들을 찾음.
            if (tempMatch.getPeople().equals(request1.getPeople()) && targetMatchCount > 0) {
                matchedRequests.add(tempMatch);
                targetMatchCount--;
            }
        }
    }

    public String findMostFrequentPeople(List<MatchingRequest> overThreeScoreList) {
        // overThreeScoreList에 있는 모든 요청중 제일 빈도가 큰 people을 구하는 로직.

        Map<String, Integer> peopleFrequency = new HashMap<>();
        for (MatchingRequest tempMatch : overThreeScoreList) {
            String people = tempMatch.getPeople();
            peopleFrequency.put(people, peopleFrequency.getOrDefault(people, 0) + 1);
        }

        String mostFrequentPeople = null;
        int highestFrequency = 0;

        // 가장 빈도가 높은 인원 값을 찾는다. (highestFrequency)
        for (Map.Entry<String, Integer> entry : peopleFrequency.entrySet()) {
            if (entry.getValue() > highestFrequency) {
                mostFrequentPeople = entry.getKey();
                highestFrequency = entry.getValue();
            }
        }
        return mostFrequentPeople;
    }

    public int calculateMatchingScore(MatchingRequest request1, MatchingRequest request2) {
        int score = 0;

        if (request1.getMenu().equals(anyValue) || request1.getMenu().equals(request2.getMenu())) {
            score++;
        }

        if (request1.getAge().equals(anyValue)) {  // request1의 age가 any일 경우 ++
            score++;
        }
        else if (request1.getAge().equals("peer")) {    //만약 request1의 age가 peer일 경우 서로의 나이 차이차가 maxAgeDifference 이하일 경우에만 ++
            int ageDifference = calculateAgeDifference(request1.getNickname(), request2.getNickname());
            if (ageDifference <= maxAgeDifference) {
                score++;
            }
        }

        if (request1.getGender().equals(anyValue)){    //request1의 gender이 any이면 ++
            score++;
        }
        else if (request1.getGender().equals("same")){  //혹은 requst1의 gender이 same일경우 request2과 성별이 같을 경우 ++
            if (memberRepository.findByNickname(request1.getNickname()).getGender().equals(memberRepository.findByNickname(request2.getNickname()).getGender())){
                score ++;
            }
        }

        if (request1.getConversation().equals(anyValue) || request1.getConversation().equals(request2.getConversation())) {
            score++;
        }

        return score;
    }

    public int calculateAge(Date birthDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(birthDate);
        int birthYear = calendar.get(Calendar.YEAR);

        Calendar currentCalendar = Calendar.getInstance();
        int currentYear = currentCalendar.get(Calendar.YEAR);

        return currentYear - birthYear;
    }

    public int calculateAgeDifference(String nickname1, String nickname2) {
        Member member1 = memberRepository.findByNickname(nickname1);
        Member member2 = memberRepository.findByNickname(nickname2);

        if (member1 != null && member2 != null) {
            int age1 = calculateAge(member1.getDate());
            int age2 = calculateAge(member2.getDate());

            return Math.abs(age1 - age2);
        }

        return Integer.MAX_VALUE;
    }


    public boolean isWithinOneHour(String time1, String time2) {
        LocalTime startTime1 = LocalTime.parse(time1);
        LocalTime startTime2 = LocalTime.parse(time2);

        Duration duration = Duration.between(startTime1, startTime2).abs();
        return duration.compareTo(Duration.ofHours(1)) <= 0;
    }

    public boolean checkDistance(double lat1, double lon1, double lat2, double lon2) {
        int earthRadiusInMeters = 6371000; // Earth's radius in meters

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = earthRadiusInMeters * c;
        return distance <= MAX_DISTANCE_METERS;
    }

}
