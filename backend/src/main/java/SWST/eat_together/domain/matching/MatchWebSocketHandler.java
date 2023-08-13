/*

package SWST.eat_together.domain.matching;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;


@RequiredArgsConstructor
@Component
public class MatchWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final MatchService matchService;
    private MatchedList matchedList;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        System.out.println("payload = " + payload);

        //프론트로부터 필터 정보와 소켓 연결 여부를 MatchRequest로 파싱하여 받는다.
        MatchRequest matchRequest = objectMapper.readValue(payload,MatchRequest.class);
        System.out.println("matchRequest = " + matchRequest);

//        1. 큐가 진행중인지 확인 -> 받은 요청 정보를 큐에다 넣고 -> 매칭이 완료됨() -> 리스트 형식에 넣기()
//        여기로 닉네임리스트 꺼냄
        matchedList = matchService.handleMatchRequest(matchRequest);
        System.out.println("matchedList = " + matchedList);

//        2. 꺼낸 리스트의 사이즈가 2일 경우 post로 채팅 서버에 보내기 -> 방 번호 받기
        if (matchedList.getUser_nicknames().size() ==2){
            int roomPk = matchService.interectionWithChat(matchedList);
            System.out.println("roomPk = " + roomPk);

//        3. 프론트에다 보낼 형식으로 만들기
//        4. 여기로 꺼냄

            MatchingCompletedMessage matchingCompletedMessage = matchService.CreateMessageToFront(roomPk,matchedList);
            System.out.println("matchingCompletedMessage = " + matchingCompletedMessage);

//       5. 소켓 통해서 프론트로 보냄
            matchService.sendMessage(session, matchingCompletedMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);

    }
}

*/