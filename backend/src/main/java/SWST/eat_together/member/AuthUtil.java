package SWST.eat_together.member;

import javax.servlet.http.HttpSession;

public class AuthUtil {
    public static final String Not_logged_in = "401";
    public static String checkLoggedInUserOr401(HttpSession session) {
        if (session == null) {
            return Not_logged_in;
        }

        Member loginMember = (Member) session.getAttribute("member");

        if (loginMember == null) {
            return Not_logged_in;
        }

        String email = loginMember.getEmail();
        return email;
    }
}