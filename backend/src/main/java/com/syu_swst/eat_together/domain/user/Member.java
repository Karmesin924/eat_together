package com.syu_swst.eat_together.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Member {
    private Long id;
    private String name;
    private String email;
    private String nickname;
    private String password;

    public Member(String name, String email, String nickname, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    public Member(){
    }
}
