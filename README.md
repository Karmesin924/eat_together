# 🍚 같이 먹자
>외로운 혼밥러를 위한 매칭 웹 서비스

🏆 2023 삼육대학교 SW경진대회 **대상**! 🏆 

## 📅 개발 기간
- 2023.06~2023.08

## 👨‍💻 참가자 👩‍💻
  | 이름  | 역할                                          |
  | ----- | ---------------------------------------------- |
  | 남동우 | 메인 백엔드, 채팅 프론트엔드, 채팅 백엔드, 배포 |
  | 김진홍 | 메인 프론트엔드 |
  | 송서연 | 메인 프론트엔드 |
  | 이현지 | 메인 백엔드 |


## 📚 기술 스택

### 메인 Front-end
<img src="https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React%20Router&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=while"/>
<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=for-the-badge&logo=Socket.io&logoColor=while"/>
<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white"/>


### 메인 Back-end
<img src="https://img.shields.io/badge/java-orange.svg?style=for-the-badge&logo=java&logoColor=black"/> <img src="https://img.shields.io/badge/spring-6DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"/>
<img src="https://img.shields.io/badge/spring%20boot-6DB33F.svg?style=for-the-badge&logo=spring%20boot&logoColor=white"/>
<img src="https://img.shields.io/badge/spring%20security-6DB33F.svg?style=for-the-badge&logo=springsecurity&logoColor=white"/>
<img src="https://img.shields.io/badge/JPA-6DB33F.svg?style=for-the-badge&logo=JPA&logoColor=white"/>
<img src="https://img.shields.io/badge/stomp-black.svg?style=for-the-badge&logo=stomp&logoColor="/>
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"/>


### 채팅 Front-end / Back-end
<img src="https://img.shields.io/badge/django-092E20.svg?style=for-the-badge&logo=django&logoColor=white"/> <img src="https://img.shields.io/badge/DRF-092E20.svg?style=for-the-badge&logo=DRF&logoColor=white"/>
<img src="https://img.shields.io/badge/django%20channels-092E20.svg?style=for-the-badge&logo=django%20channels&logoColor=white"/>
<img src="https://img.shields.io/badge/bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img src="https://img.shields.io/badge/sqlite-003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white"/>
<img src="https://img.shields.io/badge/redis-DC382D.svg?style=for-the-badge&logo=redis&logoColor=white"/>


### 배포 (미완성 종료)
<img src="https://img.shields.io/badge/amazon%20aws-232F3E.svg?style=for-the-badge&logo=amazon%20aws&logoColor="/> <img src="https://img.shields.io/badge/amazon%20ec2-FF9900.svg?style=for-the-badge&logo=amazon%20ec2&logoColor=white"/>
<img src="https://img.shields.io/badge/linux-FCC624.svg?style=for-the-badge&logo=linux&logoColor=black"/>
<img src="https://img.shields.io/badge/ubuntu-E95420.svg?style=for-the-badge&logo=ubuntu&logoColor=white"/>
<img src="https://img.shields.io/badge/vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor="/>


## ⚙️ 환경 설정
* 메인 프론트엔드
  1. `/frontend` 폴더로 이동합니다.
  2. `npm install` 를 입력해 필요 패키지들을 설치합니다.
  3. `npm start` 를 입력해 리액트를 실행합니다.
* 메인 백엔드
  1. `/backend` 폴더로 이동합니다.
  2. `MySql.sql` 파일을 사용해 MySql 데이터베이스를 구축합니다.
  3. `EatTogetherApplication` 의 메인 메서드를 통해 스프링부트를 실행합니다.
* 채팅
  1. `/Django_MVT_chatting` 폴더로 이동합니다.
  2. `.env` 파일을 생성해  `SECRET_KEY`와 `CHANNEL_LAYER_REDIS_URL`를 입력합니다. (※ Redis 서버가 구축되어 있어야 합니다.)
  3. `pip freeze > requirements.txt` 명령어를 사용해 필요 라이브러리를 설치합니다. (※ 가상환경을 사용할 것을 권장합니다.)
  4. `python manage.py migrate --run-syncdb` 를 입력해 Sqlite 데이터베이스를 구축합니다.
  5. `python manage.py runserver` 를 입력해 서버를 실행합니다.


### ERD

* 메인 DB
![eat_together_db](https://github.com/udonehn/eat_together/assets/104974751/d33be321-9181-4aca-a8cf-47ad0a609925)


* 채팅 DB
![main](https://github.com/udonehn/eat_together/assets/104974751/ff94cb4e-9d60-441a-87d2-9b12b73e59f2)


## 📸 스크린샷
* 메인 페이지
![메인 페이지](https://github.com/udonehn/eat_together/assets/104974751/d12cd622-9083-4578-8f73-8a499e10bb01)


* 같이 먹자
![같이먹자 ](https://github.com/udonehn/eat_together/assets/104974751/1ac08469-1b81-4752-8c2c-e63180a82d40)

* 채팅
![채팅방](https://github.com/udonehn/eat_together/assets/104974751/4684d6d6-701d-45b6-a095-f867f96256a2)

* 같이 하자
![같이하자](https://github.com/udonehn/eat_together/assets/104974751/8bd3e180-7dd5-4c88-a476-02965658a164)
