# 한밭대학교 컴퓨터공학과 PSE팀

**팀 구성**
- 20207125 김재연 
- 20207123 홍유정
- 20207128 이주민
- 20207129 정지윤

## <u>Teamate</u> Project Background
- ### 필요성
  - 디지털 시대에 프로그래밍은 필수 기술로 자리 잡았다. 이는 창의성과 사고력 향상에 도움을 주며, 기업에서는 직종에 관계없이 프로그래밍 능력을 중요시한다. 이에 따라 학교에서도 프로그래밍 교육의 중요성이 높아지고 있다.
    
  - 프로그래밍은 문제를 분석하고 해결하는 능력을 길러준다. 이러한 능력은 일상과 다른 학문에서도 큰 도움이 된다. 디지털 기술이 중심인 현시대에 프로그래밍 능력은 창업부터 기업 활동까지 다양한 분야에서 크게 인정받는다. 이제 프로그래밍 교육은 선택이 아닌 필수이며, 프로그래밍 교육의 품질을 높이고 접근성을 높일 필요가 있다.
![image](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121489065/0afa8207-27d6-4f42-abe7-86d49572f52c)



- ### 기존 해결책의 문제점
  - 코딩은 그 자체로 복잡하며, 많은 이론과 실습을 요구하기 때문에 초보자들에게는 큰 진입 장벽이 될 수 있다. 이 때문에 많은 사람들이 코딩에 대한 부담감을 느끼고, 시작조차 고민하는 경우가 흔하다.
    
  - 본 프로젝트의 플랫폼은 초보자를 위해 다양한 난이도의 코딩 테스트와 게임을 통해 각자의 수준에 맞게 학습할 수 있도록 지원하며, 즉각적인 피드백으로 학습 효과를 극대화해 사용자의 실력을 빠르게 향상시키도록 도와준다.
    
  - AI 챗봇과 커뮤니티 공간의 제공을 통해 실시간으로 질문에 답하고 코드를 평가받을 수 있어, 코딩 환경에 대한 더 깊은 이해와 높은 품질의 코드 작성 능력을 길러주는 역할을 한다.
<img src="https://github.com/jaeyeonkk/test/assets/121489065/e5c4d493-0393-4323-bf6d-cb28bf51e6b1.png" width="500" height="300"/>

## System Design

<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src ="https://img.shields.io/badge/AWS-232F3E.svg?&style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src ="https://img.shields.io/badge/rds-527FFF.svg?&style=for-the-badge&logo=amazonrds&logoColor=white"/>
<img src ="https://img.shields.io/badge/docker-2496ED.svg?&style=for-the-badge&logo=docker&logoColor=white"/>


### - System Architecture
![image](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/93113812/fa2fa633-a4ba-4f41-aaed-f141f4b0d73c)
>- Web Server: Python의 Flask 웹 프레임워크 사용
>- Web FrontEnd: HTML, CSS, JavaScript를 사용하여 웹 페이지 디자인 및 동적 요소 구현
>- Database: AWS RDS를 사용하여 데이터베이스 관리(MySQL)
>- Compiler: Docker 컨테이너를 사용하여 C, C++, Java, Python  컴파일 환경 구성
>- AWS를 통해 서비스 배포 및 관리

### - System Dependencies
[requirements.txt](https://github.com/HBNU-SWUNIV/come-capstone23-pse/blob/main/003%20Code/requirements.txt
)

### - Installing and Running
#### 로컬 환경에서의 프로젝트 실행
- git 프로젝트 클론
```git
https://github.com/HBNU-SWUNIV/come-capstone23-pse.git
```
- docker-compose.yml이 존재하는 디렉토리로 이동
```
cd "Project-Directory\come-capstone23-pse\003 Code\codepse"
```
- Docker compose로 프로젝트 실행
```
Docker-compose up
```

## 
  - 메인페이지
    ![pse_메인1](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/fa214ced-ecb6-4f0e-9662-492a5595ffa7)
    메인페이지 소개 넣기
    ![image](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/b3e32f1b-7c77-4a5a-8b3b-04524d5e3e47)
    섹션부분 소개 넣기

  - 로그인 회원가입
    ![pse_로그인](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/9288167c-57d1-43de-ad73-c259288f6ef4)
    로그인 부분 설명
    ![pse_회원가입](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/a48f4fcd-b214-4cb1-9339-c76a10557682)
    회원가입 부분 설명

  - 코딩 테스트
    ![pse_코딩테스트](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/133abdb7-ab42-4148-853d-6d6c47f4772b)
    코딩테스트 리스트 부분 설명

    +코딩테스트 문제 화면, 정답,피드백등 화면 추가 후 설명 추가

  - 타이핑 게임
    ![pse_타이핑2](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/21acd8a0-c50f-4fe0-87bb-6e42fd555488)
    타이핑 게임 설명


  - 드래그 게임
    ![pse_드래그게임](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/5aec527b-9131-48d7-a858-08047a7356ef)
    ![pse_드래그게임2](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/a4ad5749-f424-494c-955f-5831bb79e75e)
    게임 동작 화면, 랭킹 화면 추가 후 설명


  - 출력값 게임
    ![pse_출력값](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/ed2dabea-1f1d-42e0-8f10-609662fed766)
    ![pse_출력값2](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/7fd5acf1-a816-4889-bb31-cb668ca4890b)
    랭킹 화면 추가 후 설명글

  - AI 챗봇
    ![pse_챗봇](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/f71ac77b-34ae-4acf-8220-ebfd88fad4bb)
    질의응답 화면 추가 후 설명글

  - 게시판
    ![pse_게시판_글](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/781392db-7d19-4a96-8da2-56b9931eebc3)
    게시판 글
    ![pse_게시판 댓글](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/c67f61ae-6fff-4485-aba9-e472da3dd952)
    게시판 댓글
    ![pse_글쓰기](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/1456c54c-acec-4ede-9712-2681478e26f4)
    게시판 글쓰기

    +게시판 리스트, 글 수정 화면 추가 후 설명


  - 마이페이지
    ![pse_마이페이지_코드](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/121539184/40090575-05b3-42bc-85c0-93326e16185d)
    마이페이지 중 내가 쓴 코드 화면

    +마이페이지 화면, 내가 쓴 게시글,댓글 게임랭킹 화면 추가 후 설명 추가




## Case Study
  - ### Description
  
  
## Conclusion
  - ### OOO
  - ### OOO
  
## Project Outcome
- ### 20XX 년 OO학술대회 


## 기대효과 및 활용방안 ##
- 흥미 지속: PSE 웹 플랫폼은 코딩을 배우고자 하는 사람들에게 코딩게임 및 다양한 재미있는 학습 경험을 제공함으로써 학구열을 지속시킬 수 있다. 이를 통해 코딩에 대한 흥미와 열정을 계속해서 유지할 수 있어, 지루하지 않고 지속적인 학습을 촉진한다.
- 능력 향상: PSE 웹 플랫폼은 사용자들이 다양한 코딩 문제를 해결하고 프로그래밍 능력을 습득하고 향상시킬 수 있는 환경을 제공한다. 코딩 테스트, 피드백 그리고 게임을 통해 사용자는 실제 프로그래밍 기술을 연마하고, 프로젝트를 통해 실무 경험을 쌓을 수 있다. 이러한 경험들은 프로그래머로서의 역량을 향상시키고, 코딩 기술을 실전에서 활용할 수 있는 능력으로 이어진다.
- 교육 지원: 코딩스터디 웹플랫폼은 학교 및 교육 기관에서 코딩 및 컴퓨터 과학 교육을 강화하고 학생들에게 도움을 줄 수 있는 강력한 도구로 활용 될 수 있다. 교사와 학생들이 PSE 웹 플랫폼을 활용하여 맞춤된 교육 자료에 접근하도록 할 수 있고, 각 학생의 마이페이지 데이터를 통해 진행 상황을 실시간으로 추적할 수 있다. 이는 교사가 개별 학생에 맞게 교육을 조정하고 효율적인 학습 경험을 제공하는 데 도움을 줄 수 있다. 또한, 학생들은 흥미로운 코딩 프로젝트를 통해 실무 경험을 쌓을 수 있으며, 이는 그들의 학문적 성과와 진로 선택에 긍정적인 영향을 미칠 것이다.


![스크린샷 2023-10-17 185339](https://github.com/HBNU-SWUNIV/come-capstone23-pse/assets/90593474/22b16f6c-2169-4e1c-a835-7f19b8c4d52a)

 PSE 웹 플랫폼은 코딩을 배우고자 하는 많은 사람들에게 코딩을 쉽고 흥미롭게 익힐 수 있는 다양한 방법과 접근을 제공하여 사용자들은 코딩에 대한 관심을 높이고 학습에 대한 흥미를 계속 유지시킬 것이다. 또한, 이 플랫폼은 학교와 교육 기관에서도 활용될 수 있어 학생들에게 코딩 교육과 실력을 강화하는 데 도움을 줄 것이다. 교육지원 도구로 활용하여 교사와 학생들은 PSE 웹 플랫폼을 통해 맞춤화된 교육 자료를 이용하고, 학생 개개인의 학습 성과를 평가해 볼 수 있는 기회를 얻게 된다. 이를 통해 교사는 학생들에게 효과적인 교육을 제공할 수 있으며, 학생들은 자율 학습을 촉진하고 프로그래밍에 대한 이해를 높일 수 있는 도구로 활용할 수 있다. 이러한 방식으로 PSE 웹 플랫폼은 코딩 커뮤니티와 생태계를 확장하고 새로운 프로그래머들을 양성하는 데 기여할 것이다.

