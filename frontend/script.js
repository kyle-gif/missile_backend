// Game State Management
const gameState = {
    playerName: '',
    currentRoute: null,
    currentChapter: 'prologue',
    storyIndex: 0,
    affection: {
        hyun: 0,
        lee: 0,
        seok: 0,
        ryu: 0
    }
};

// Character Configuration
const characters = {
    hyun: { name: '현정욱', images: { default: '/static/assets/images/Hyun.jpg', happy: '/static/assets/images/Hyun.jpg', angry: '/static/assets/images/Hyun.jpg', sad: '/static/assets/images/Hyun.jpg' } },
    lee: { name: '이윤서', images: { default: '/static/assets/images/Lee.jpg', happy: '/static/assets/images/Lee.jpg', angry: '/static/assets/images/Lee.jpg', sad: '/static/assets/images/Lee.jpg' } },
    seok: { name: '석성택', images: { default: '/static/assets/images/Seok.jpg', happy: '/static/assets/images/Seok.jpg', angry: '/static/assets/images/Seok.jpg', sad: '/static/assets/images/Seok.jpg' } },
    ryu: { name: '류한석', images: { default: '/static/assets/images/Ryu.jpg', happy: '/static/assets/images/Ryu.jpg', angry: '/static/assets/images/Ryu.jpg', sad: '/static/assets/images/Ryu.jpg' } }
};

// DOM Elements
const elements = {
    screens: {
        landing: document.getElementById('landing-screen'),
        login: document.getElementById('login-screen'),
        game: document.getElementById('game-screen'),
        ending: document.getElementById('ending-screen')
    },
    landing: {
        enterBtn: document.getElementById('enter-btn')
    },
    login: {
        username: document.getElementById('username'),
        btn: document.getElementById('login-btn'),
        message: document.getElementById('login-message')
    },
    game: {
        background: document.getElementById('background'),
        characterImage: document.getElementById('character-image'),
        speakerName: document.getElementById('speaker-name'),
        dialogueText: document.getElementById('dialogue-text'),
        nextBtn: document.getElementById('next-btn'),
        choicesContainer: document.getElementById('choices-container'),
        affectionBars: {
            hyun: { bar: document.getElementById('affection-hyun'), val: document.getElementById('affection-hyun-value') },
            lee: { bar: document.getElementById('affection-lee'), val: document.getElementById('affection-lee-value') },
            seok: { bar: document.getElementById('affection-seok'), val: document.getElementById('affection-seok-value') },
            ryu: { bar: document.getElementById('affection-ryu'), val: document.getElementById('affection-ryu-value') }
        }
    },
    ending: {
        title: document.getElementById('ending-title'),
        text: document.getElementById('ending-text'),
        replayBtn: document.getElementById('replay-btn'),
        restartBtn: document.getElementById('restart-btn')
    }
};

// Story Data Generator
const getStory = (playerName) => ({
    prologue: [
        { speaker: '나레이션', text: `선린인터넷고등학교. 전국 최고의 IT 특성화 고등학교.\n\n당신은 121기 신입생 ${playerName}이다. 입학 첫날부터 들려오는 소문 하나. 학교 최고의 기술 동아리 '뉴럴'에는 입학하기만 하면 자동으로 들어갈 수 있다는 것. 하지만 그건 거짓말이었다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `'뉴럴'은 선발제였다. 수백 명의 지원자 중 단 한 명만 뽑는, 지옥 같은 경쟁률. 하지만 당신은 호기심에 지원서를 냈다. 그리고 기적처럼 합격했다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `합격 통지서에는 특이한 메시지가 적혀 있었다.\n\n"351호 서버실. 자정. 혼자 와라. 그리고... 입 다물어라."`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `그날 밤, 당신은 학교 건물 3층 끝에 있는 351호 서버실 문 앞에 섰다. 문고리는 녹슬어 있었고, 손잡이에는 먼지가 쌓여 있었다. 마치 몇 년간 사용되지 않은 방 같았다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `문을 열자, 어둠 속에서 수십 개의 모니터가 동시에 켜졌다. 푸른 빛이 어둠을 밝혔고, 그 빛 속에서 네 명의 실루엣이 드러났다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `119기. 학교에서 가장 악명 높은 천재 4인방. 그들은 이미 2학년이었지만, 학교 전체를 공포에 떨게 만드는 존재들이었다.`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '...오셨군요. 121기.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '현정욱', text: '자, 들어와요. 그리고 문 닫고요. 이 방의 존재는... 비밀이에요.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '나레이션', text: `당신은 조심스럽게 방 안으로 들어섰다. 서버실은 생각보다 넓었다. 벽면 전체가 서버 랙으로 가득 차 있었고, 중앙에는 거대한 원형 테이블이 있었다. 그 위에는 수십 개의 모니터가 배치되어 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '이윤서', text: '오, 후배님! 드디어 왔네요!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
        { speaker: '이윤서', text: '저는 이윤서예요. 119기. 애플 제품만 쓰는 앱등이죠. 근데 후배님 폰은... 어? 샤오미네요?', bg: 'bg-server-room', character: 'lee', expression: 'sad' },
        { speaker: '이윤서', text: '흠... 일단 이거라도 드세요. 배달 시켰는데, 맛있을 거예요.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
        { speaker: '나레이션', text: `이윤서가 당신에게 마카롱 상자를 건넨다. 상자에는 유명한 파티세리의 로고가 새겨져 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '거기 121기, 네가 뭘 할 수 있는데?', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
        { speaker: '현정욱', text: '이 열등한 것아. 네가 짠 코드는 내 컴파일러가 "코드로 인식하기를 거부합니다"라고 하던데.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
        { speaker: '이윤서', text: '야, 현정욱. 후배한테 너무 빡빡하게 굴지 마.', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '이윤서', text: '"파괴는 우아해야지." 잡스가 말했잖아.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
        { speaker: '석성택', text: '李潤瑞(이윤서), 你懂什么? (니가 뭘 알아?)', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '나레이션', text: `어둠 속에서 중국어로 말하는 목소리가 들렸다. 당신은 그 방향을 바라봤지만, 아무도 보이지 않았다.`, bg: 'bg-server-room', character: null },
        { speaker: '석성택', text: '121기, 맞죠?', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '나레이션', text: `갑자기 당신 옆에 누군가 나타났다. 검은 후드티를 입은 여학생이었다. 그의 눈은 날카롭고, 손가락은 키보드 위에 떠 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '석성택', text: '나는 석성택. 중국에서 온 해커야. 그리고...', bg: 'bg-server-room', character: 'seok', expression: 'happy' },
        { speaker: '석성택', text: '너희 집 와이파이 비번 내가 "SeongTaek_Love_1234"로 바꿨어. 감사 인사는 토마토 달걀볶음으로 받아줄게.', bg: 'bg-server-room', character: 'seok', expression: 'happy' },
        { speaker: '나레이션', text: `당신은 경악했다. 집 주소도, 와이파이 비밀번호도 아무에게도 말한 적이 없는데...`, bg: 'bg-server-room', character: null },
        { speaker: '류한석', text: '다들 조용히 좀 해봐.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
        { speaker: '나레이션', text: `바닥에 앉아 있던 또 다른 학생이 말했다. 그는 정체불명의 기계 부품을 손에 들고 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '류한석', text: '이 아름다운 기계의 완벽한 작동을 방해하지 말라고.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
        { speaker: '류한석', text: '왜 후배까지 끌어들여서 변수를 늘리는거지?', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
        { speaker: '현정욱', text: '류한석, 닥쳐. 이미 결정된 일이야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '현정욱', text: '121기, 앉아. 우리가 할 일을 설명해줄게.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '나레이션', text: `현정욱이 모니터를 가리켰다. 화면에는 "프로젝트: 미연시"라는 제목이 떠 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '"미연시". 이게 우리 프로젝트의 코드명이야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '이윤서', text: '실제로는 미연시가 아니에요. 그냥... 코드명일 뿐이죠.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
        { speaker: '석성택', text: '우리가 할 일은 간단해. 세상을 바꾸는 거야.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '류한석', text: '...기계로.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
        { speaker: '나레이션', text: `당신은 그들의 말을 듣고 있었다. 이것이 정말 고등학교 동아리 활동일까?`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '자세한 건 나중에 설명할게. 일단 오늘은... 환영회야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '이윤서', text: '맞아요! 후배님 환영 파티예요!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
        { speaker: '나레이션', text: `이윤서가 또 다른 상자를 꺼냈다. 이번에는 케이크였다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `그렇게 당신의 '뉴럴' 동아리 생활이 시작되었다. 그리고 당신은 아직 몰랐다. 이들이 계획하고 있는 것이 얼마나 위험한 일인지...`, bg: 'bg-server-room', character: null }
    ],
    chapter1: [
        { speaker: '나레이션', text: `며칠 후. 351 서버실.\n\n'미연시' 프로젝트의 첫 번째 회의가 열렸다. 이번 회의의 주제는 하나였다.`, bg: 'bg-server-room', character: null },
        { speaker: '나레이션', text: `첫 번째 타겟을 정하는 것.`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '자, 그럼 시작할게요.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '현정욱', text: '우리가 보여줄 것은 단 하나. "움직이는 다수의 표적 동시 격추"야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '현정욱', text: '단순 파괴가 아니에요. 완벽한 통제력. 그게 진짜 실력이죠.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '이윤서', text: '야, 현정욱. 그런 건 재미없어요.', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '이윤서', text: '타겟은 당연히 "삼성전자 서초사옥" 서버실이죠!', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '이윤서', text: '감히 우리 애플의 디자인을 베껴? 그런 건 용납할 수 없어요!', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '현정욱', text: '이윤서, 감정적으로 접근하지 마.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
        { speaker: '현정욱', text: '우리가 해야 할 건 수학적으로 완벽한 증명이야. 감정이 개입할 여지가 없어.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '이윤서', text: '수학? 현정욱, 넌 정말 재미없어요.', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '이윤서', text: '우리가 하는 건 예술이에요! 예술!', bg: 'bg-server-room', character: 'lee', expression: 'angry' },
        { speaker: '석성택', text: '你们两个都错了. (너희 둘 다 틀렸어.)', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '석성택', text: '스케일이 작잖아.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '석성택', text: '야스쿠니 신사 홈페이지 서버 날리자. 모든 트래픽은 CIA 서버 경유하게 만들었어.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '현정욱', text: '석성택, 그건... 국제 문제가 될 수 있어.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
        { speaker: '석성택', text: '그래서 재미있는 거 아니야?', bg: 'bg-server-room', character: 'seok', expression: 'happy' },
        { speaker: '류한석', text: '...다들 지구에만 얽매여 있어.', bg: 'bg-server-room', character: 'ryu', expression: 'sad' },
        { speaker: '나레이션', text: `류한석이 조용히 말했다. 그는 여태까지 한 마디도 하지 않았다.`, bg: 'bg-server-room', character: null },
        { speaker: '류한석', text: '왜 다들 지구에만 얽매여 있어?', bg: 'bg-server-room', character: 'ryu', expression: 'sad' },
        { speaker: '류한석', text: '중국의 폐기 인공위성 "톈궁 1호" 잔해를 요격하고...', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
        { speaker: '류한석', text: '"건담 위성 RX-78-2 선린(SUNRIN)"을 궤도에 올리는 거야.', bg: 'bg-server-room', character: 'ryu', expression: 'happy' },
        { speaker: '류한석', text: '전 세계의 그 어떤 네트워크에도 종속되지 않는, 우리만의 별을 만드는 거라고.', bg: 'bg-server-room', character: 'ryu', expression: 'happy' },
        { speaker: '이윤서', text: '류한석... 너 정말 미쳤어.', bg: 'bg-server-room', character: 'lee', expression: 'sad' },
        { speaker: '현정욱', text: '류한석, 그건 물리적으로 불가능해. 예산도, 기술도...', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
        { speaker: '류한석', text: '불가능?', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
        { speaker: '류한석', text: '내가 만든 건담 모델은 이미 1/1 스케일로 완성됐어. 로켓 엔진도 테스트했고.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
        { speaker: '석성택', text: '...운동장 잔디 다 태워먹은 거 말하는 거야?', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '류한석', text: '그건... 부수적인 피해였어.', bg: 'bg-server-room', character: 'ryu', expression: 'sad' },
        { speaker: '나레이션', text: `네 명의 선배들이 서로의 계획을 비판하며 논쟁을 벌이고 있었다. 당신은 그들의 말을 듣고만 있었다.`, bg: 'bg-server-room', character: null },
        { speaker: '현정욱', text: '자, 그럼 121기. 네 의견은 뭐야?', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
        { speaker: '나레이션', text: `갑자기 네 명의 시선이 당신에게로 향했다.`, bg: 'bg-server-room', character: null },
        { speaker: '이윤서', text: '맞아요! 후배님 의견도 들어봐야죠!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
        { speaker: '석성택', text: '121기, 뭐라고 생각해?', bg: 'bg-server-room', character: 'seok', expression: 'default' },
        { speaker: '류한석', text: '...의견 같은 건 필요 없어. 하지만 말해봐.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
        { speaker: '나레이션', text: `당신의 선택이 이들의 계획을 결정할 것이다. 그리고 당신의 운명도...`, bg: 'bg-server-room', character: null }
    ],
    routes: {
        hyun: {
            chapter2: [
                { speaker: '나레이션', text: `당신은 현정욱의 제안을 선택했다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...좋은 선택이야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '현정욱', text: '그럼 내일부터 함께 작업하자. 준비해.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '나레이션', text: `며칠 후. 자정을 넘긴 시각.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `351 서버실에는 당신과 현정욱만이 남아 있었다. 다른 선배들은 각자의 작업을 하고 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '121기, 이쪽 와봐.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '나레이션', text: `현정욱이 모니터를 가리켰다. 화면에는 복잡한 수식들이 가득했다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '이게 내가 만든 궤도 계산식이야.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '현정욱', text: '5개의 자탄이 동시에 발사되어, 각각 다른 경로로 움직이는 드론 5대를 동시에 격추하는 거지.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: 'PLAYER', text: '선배, 이건... 정말 복잡하네요.', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '당연하지. 이건 수학이니까.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '현정욱', text: '하지만...', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `현정욱의 목소리가 작아졌다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...그 자식은 늘 웃고 있지.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: 'PLAYER', text: '누구요?', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '문이제. 우리 반 학생이야.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '전과목 만점. 전교 1등. 수학 올림피아드 대상.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '늘 우리 반에 와서 수학 문제를 풀면서 웃고 있어.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '내가 보여주겠어. 현실 세계의 변수를... 수치로 지배하는 게 진짜 재능이라는 걸.', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '나레이션', text: `현정욱의 눈이 광적으로 빛났다. 하지만 모니터 화면에는 계속해서 "FAILURE"라는 빨간 글자가 떠 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...또 실패했어.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '현정욱', text: '왜 계속 실패하는 거지? 내 계산은 완벽한데...', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: 'PLAYER', text: '선배, 혹시...', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '뭐?', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: 'PLAYER', text: '결정론적 계산만으로는 한계가 있어요. 드론의 움직임은 완벽한 패턴이 아니니까요.', bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '차라리... 각 자탄에 확률적 목표 예측 알고리즘을 적용해서, 실시간으로 궤도를 수정하게 하는 건 어때요?', bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `현정욱의 얼굴이 굳었다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...뭐라고?', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '어디서, 열등한 121기가. 내 완벽한 방정식의 세계에 "확률" 따위의 불순물을 섞으려 들어?', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '내 계산은 틀리지 않아. 변수가 내 계산을 따라오지 못할 뿐이야!', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '나레이션', text: `현정욱이 화를 내며 키보드를 두드렸다. 하지만 여전히 실패 메시지만 떠 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '선배...', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '닥쳐!', bg: 'bg-server-room', character: 'hyun', expression: 'angry' },
                { speaker: '나레이션', text: `당신은 더 이상 말할 수 없었다. 현정욱은 계속해서 코드를 수정하고 있었지만, 결과는 변하지 않았다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `시간이 흘렀다. 새벽 3시가 되었지만, 현정욱은 여전히 작업하고 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '선배, 좀 쉬시는 게...', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...꺼져.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `당신은 할 수 없이 서버실을 나섰다. 하지만 문을 닫기 전, 등 뒤에서 들려오는 키보드 소리의 리듬이 바뀐 것을 느꼈다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `당신이 제안했던 확률 보정 알고리즘의 기초 코드를, 그는 서툴게나마 짜고 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `다음 날 아침.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '121기.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: 'PLAYER', text: '네, 선배?', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...이거.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `현정욱이 문제집 한 권을 던졌다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '내일 아침까지 다 풀어 와.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '현정욱', text: '내 방정식의 아름다움을 이해하지도 못하면서, 참견하지 마.', bg: 'bg-server-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `문제집 제목은 [2026학년도 수능특강 수학영역 확률과 통계]였다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그의 자존심이 허락한, 최선의 "도와달라"는 요청이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `며칠 후. 당신은 문제집을 풀며 현정욱과 함께 작업했다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...이 부분, 설명해줘.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: 'PLAYER', text: '네, 선배. 이건 베이즈 정리인데요...', bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `당신이 설명하는 동안, 현정욱은 진지하게 듣고 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '...아, 그렇구나.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '현정욱', text: '121기, 넌 생각보다... 괜찮네.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: 'PLAYER', text: '선배?', bg: 'bg-server-room', character: null },
                { speaker: '현정욱', text: '아무것도 아냐. 계속해.', bg: 'bg-server-room', character: 'hyun', expression: 'default' },
                { speaker: '나레이션', text: `그렇게 며칠이 더 흘렀다. 시연회가 다가오고 있었다.`, bg: 'bg-server-room', character: null }
            ],
            chapter3: [
                { speaker: '나레이션', text: `기술 시연회 D-Day.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연회장 백스테이지 통제실. 현정욱은 초조하게 모니터만 노려보고 있었다.`, bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '...저 녀석은 틀렸어.', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: 'PLAYER', text: '선배?', bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '문이제. 저 녀석은 틀렸어.', bg: 'bg-control-room', character: 'hyun', expression: 'angry' },
                { speaker: '현정욱', text: '현실의 문제에는 완벽한 답 같은 건 없어. 최적의 해가 있을 뿐이지...', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: '현정욱', text: '만약, 만약 내 계산이 틀리면...', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `대형 스크린에는 조금 전 '수학 올림피아드 대상'을 수상하며 환하게 웃는 문이제의 인터뷰 영상이 흐르고 있었다.`, bg: 'bg-control-room', character: null },
                { speaker: '문이제', text: '(인터뷰 영상) "수학은 즐거워요. 문제를 풀 때마다 새로운 세계가 열리는 것 같거든요."', bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '...거짓말이야.', bg: 'bg-control-room', character: 'hyun', expression: 'angry' },
                { speaker: 'PLAYER', text: '선배, 괜찮아요. 우리가 준비한 건 완벽해요.', bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '...고마워. 하지만 걱정돼.', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `그때, 통제실 문이 열렸다.`, bg: 'bg-control-room', character: null },
                { speaker: '문이제', text: '현정욱, 아직도 그런 장난감 만들고 있었어?', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `문이제가 친구 몇 명을 데리고 통제실로 들어왔다.`, bg: 'bg-control-room', character: null },
                { speaker: '문이제', text: '시뮬레이션 속 숫자가, 실제 시험지 점수보다 중요하진 않을 텐데.', bg: 'bg-control-room', character: null },
                { speaker: '문이제', text: '뭐, 결과는 기대할게.', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `문이제가 당신을 슥 훑어보고는 어깨를 으쓱하며 떠났다.`, bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '...', bg: 'bg-control-room', character: 'hyun', expression: 'angry' },
                { speaker: '나레이션', text: `현정욱의 주먹이 하얗게 떨리고 있었다.`, bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배...', bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '괜찮아. 시작하자.', bg: 'bg-control-room', character: 'hyun', expression: 'default' },
                { speaker: '나레이션', text: `시연이 시작되었다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `발사체가 성공적으로 사출되고, 5개의 자탄이 드론을 향해 날아갔다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `하지만 그 순간...`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `'카오스'의 소행으로 추정되는 전파 교란으로 2대의 드론이 예상 경로를 완전히 이탈했다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `자동 추적 시스템은 먹통이 되었고, 모니터에 [ERROR: TARGET LOST] 경고가 번쩍였다.`, bg: 'bg-control-room', character: null },
                { speaker: '관객', text: '(술렁이는 소리)', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `관객석이 술렁였고, 문이제의 입가에 옅은 비웃음이 걸렸다.`, bg: 'bg-control-room', character: null },
                { speaker: '현정욱', text: '...안 돼.', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: '현정욱', text: '이건... 실패야.', bg: 'bg-control-room', character: 'hyun', expression: 'sad' },
                { speaker: '나레이션', text: `현정욱의 얼굴이 새하얗게 질렸다. 모든 것이 끝났다고 생각한 순간...`, bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배! 지금이에요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '제가 만든 확률 보정 알고리즘, 수동으로 전환해요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배의 초기 계산값을 믿고, 제가 오차만 보정할게요!', bg: 'bg-control-room', character: null }
            ]
        },
        lee: {
            chapter2: [
                { speaker: '나레이션', text: `당신은 이윤서의 제안을 선택했다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '오! 후배님, 좋은 선택이에요!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '이윤서', text: '우리 함께 아름다운 작품을 만들어봐요!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '나레이션', text: `며칠 후. 저녁 시간.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `351 서버실에는 당신과 이윤서만이 남아 있었다. 배달 음식 냄새와 커피 향이 진동했다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '후배님, 이거 먹어봐요. 맛있을 거예요.', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '나레이션', text: `이윤서가 디저트 상자를 건넨다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '자, 그럼 시작할게요. 우리가 만들 건... 예술이에요.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: '이윤서', text: '공격은 단순해야 해. 잡다한 버튼이나 경고창은 잡스의 무덤에 흙을 뿌리는 짓이야.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: '이윤서', text: '우리가 하려는 건 "경험"이라고, 경험!', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: 'PLAYER', text: '선배, 그럼 공격 과정을 시각화하는 건 어때요?', bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '데이터 패킷 하나하나를 별똥별처럼 만들어서, 밤하늘의 유성우가 한 점으로 쏟아져 내리는 것처럼 표현하는 거죠.', bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '마지막 임팩트 순간엔 "시에라 블루" 색상의 섬광이 터지고...', bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `이윤서의 눈이 반짝 빛났다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '유성우... 시에라 블루...', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '이윤서', text: '121기, 너 천재야? 어떻게 그런 생각을 했어?', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '이윤서', text: '2년이나 어린 후배가 이런 감각이 있다니!', bg: 'bg-server-room', character: 'lee', expression: 'happy' },
                { speaker: '나레이션', text: `이윤서가 흥분해서 당신의 손을 덥석 잡았다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '너, 재능이 너무 아까워.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: '이윤서', text: '일단 이거라도 써. 그 녹색 메시지 창은... 정말이지 끔찍하거든.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: '나레이션', text: `이윤서가 가방에서 낡은 아이폰을 하나 꺼냈다.`, bg: 'bg-server-room', character: null },
                { speaker: '이윤서', text: '"디자인 정의"를 구현하려는 동료에 대한 최소한의 예의라고 생각해 줘.', bg: 'bg-server-room', character: 'lee', expression: 'default' },
                { speaker: '나레이션', text: `그녀가 건넨 것은 [액정이 깨진 아이폰 8]이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그녀의 자존심이 허락한, 최선의 "너를 내 세계에 초대할게"라는 표현이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그렇게 며칠이 더 흘렀다. 당신과 이윤서는 함께 작업하며 아름다운 인터페이스를 만들고 있었다.`, bg: 'bg-server-room', character: null }
            ],
            chapter3: [
                { speaker: '나레이션', text: `기술 시연회 D-Day.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연회장 백스테이지 통제실. 통제실은 이윤서가 세팅한 애플 기기들로 가득 차 '미니 지니어스 바'처럼 보였다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `대형 스크린에는 당신과 이윤서가 함께 만든, 밤하늘의 유성우를 형상화한 아름다운 대기 화면이 떠 있었다.`, bg: 'bg-control-room', character: null },
                { speaker: '이윤서', text: '완벽해... 이 인터페이스라면 잡스도 눈물을 흘릴 거야.', bg: 'bg-control-room', character: 'lee', expression: 'happy' },
                { speaker: '이윤서', text: '이제 저 스와이프 한 번이면...', bg: 'bg-control-room', character: 'lee', expression: 'happy' },
                { speaker: '나레이션', text: `그때, 학생회 부회장 윤서현이 통제실로 들어온다.`, bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '이게... 당신들 프로젝트의 실체였군요.', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `윤서현이 대형 스크린에 띄워진 '공격 대상: 삼성전자 서초사옥'이라는 문구를 보고 경악한다.`, bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '기업 서버에 대한 테러 행위라니. 이건 범죄예요!', bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '이윤서 선배, 당신의 "디자인 정의"는 대체 어떤 종류의 정의입니까?', bg: 'bg-control-room', character: null },
                { speaker: '이윤서', text: '정의? 넌 아무것도 몰라, 윤서현.', bg: 'bg-control-room', character: 'lee', expression: 'angry' },
                { speaker: '이윤서', text: '이건 예술이야. 모방꾼들에게 보내는 가장 아름다운 경고장이라고.', bg: 'bg-control-room', character: 'lee', expression: 'angry' },
                { speaker: '이윤서', text: '네가 말하는 딱딱한 규정 따위랑은 차원이 달라.', bg: 'bg-control-room', character: 'lee', expression: 'angry' },
                { speaker: '윤서현', text: `121기 ${gameState.playerName} 학생. 이런 범죄 행위에 가담하고 있다니 실망이 크군요.`, bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '지금이라도 늦지 않았어요. 모든 걸 멈추고 제게 협조하세요.', bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '그게 학생으로서 당신이 선택할 수 있는 유일한 "정의"입니다.', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연이 시작되었다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `하지만 윤서현의 학생회 권한으로 학교 네트워크 보안팀에 신고하면서, 당신들의 공격 트래픽이 시스템 레벨에서 차단당하기 시작한다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `아름답던 유성우 그래픽이 깨지고, 화면에 붉은색의 [ACCESS DENIED] 경고창이 무수히 떠오른다.`, bg: 'bg-control-room', character: null },
                { speaker: '이윤서', text: '말도 안 돼… 내 완벽한 디자인에… 저런 촌스러운 경고창이라니!', bg: 'bg-control-room', character: 'lee', expression: 'angry' },
                { speaker: '나레이션', text: `이윤서가 패닉에 빠지려는 순간, 당신이 그녀의 어깨를 잡는다.`, bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배! 괜찮아요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '이건 버그가 아니라 "피처"예요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '저 경고창들을 역으로 이용해서, 억압을 뚫고 정의를 구현하는 "저항의 미학"으로 포장하는 거예요!', bg: 'bg-control-room', character: null }
            ]
        },
        seok: {
            chapter2: [
                { speaker: '나레이션', text: `당신은 석성택의 제안을 선택했다.`, bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '...좋아. 121기, 넌 용기가 있네.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: '나레이션', text: `며칠 후. 어두운 서버실 한쪽.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `석성택이 당신을 조용한 곳으로 불렀다.`, bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '121기, 넌 내가 시험해봐야겠어.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: 'PLAYER', text: '시험요?', bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '응. 내 동지가 될 자격이 있는지.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: '나레이션', text: `석성택이 모니터를 가리켰다. 화면에는 복잡한 코드가 가득했다.`, bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '이 코드를 해석해봐. 10분 안에.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: '나레이션', text: `당신은 코드를 보았다. 매우 복잡했지만, 패턴을 읽을 수 있었다.`, bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '이건... 다중 우회 경로를 만드는 코드네요.', bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '...계속해.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: 'PLAYER', text: '각 경로는 다른 서버를 경유하도록 설계되어 있고...', bg: 'bg-server-room', character: null },
                { speaker: 'PLAYER', text: '마지막 목적지는... 야스쿠니 신사 서버?', bg: 'bg-server-room', character: null },
                { speaker: '석성택', text: '...좋아.', bg: 'bg-server-room', character: 'seok', expression: 'happy' },
                { speaker: '석성택', text: '121기, 넌 내 동지야.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: '석성택', text: '우리가 함께 할 일은... 역사를 바꿀 거야.', bg: 'bg-server-room', character: 'seok', expression: 'default' },
                { speaker: '나레이션', text: `석성택의 눈이 빛났다. 당신은 그의 위험한 시험을 통과하여 그의 "동지"로 인정받았다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그렇게 며칠이 더 흘렀다. 당신과 석성택은 둘만의 비밀스러운 유대감을 형성하고 있었다.`, bg: 'bg-server-room', character: null }
            ],
            chapter3: [
                { speaker: '나레이션', text: `기술 시연회 D-Day.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연회장 백스테이지 통제실. 통제실은 극도로 조용하다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `당신은 석성택의 옆에서 보조 모니터로 트래픽을 감시하고 있다. 당신은 그의 '동지'로서, 그의 가장 깊은 영역에 함께 있다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `대형 스크린에는 평화로운 시연회장 모습이 비치고 있다. 하지만 보이지 않는 곳에서는 이미 전쟁이 시작되었다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `그때, 학생회 부회장이자 '참된 학생 자치'를 부르짖는 윤서현이 통제실로 들어온다.`, bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: `121기 ${gameState.playerName} 학생, 맞죠?`, bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '이런 위험한 프로젝트에 참여하고 있다니 안타깝군요.', bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '당신의 눈은... 저 선배들과는 달라 보이는데.', bg: 'bg-control-room', character: null },
                { speaker: '윤서현', text: '혹시 이 프로젝트의 비윤리성에 대해 문제의식을 느끼고 있다면, 언제든 학생회로 찾아오세요.', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `그녀가 당신에게 학생회 명함을 건네주며 손을 잡으려는 순간.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `[띠링-]`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `윤서현의 스마트폰 화면에 갑자기 수십 개의 알림 창이 동시에 뜨며 시스템이 완전히 마비되어 버린다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `당황한 그녀가 폰을 흔들어보는 사이, 석성택이 소리 없이 다가와 당신과 윤서현 사이를 막아선다.`, bg: 'bg-control-room', character: null },
                { speaker: '석성택', text: '(나지막이) 내 사람한테 함부로 손대는 거 아니야.', bg: 'bg-control-room', character: 'seok', expression: 'angry' },
                { speaker: '윤서현', text: '이게 무슨...!', bg: 'bg-control-room', character: null },
                { speaker: '석성택', text: '네 폰, 그냥 작은 "오류"가 생긴 것뿐이야.', bg: 'bg-control-room', character: 'seok', expression: 'default' },
                { speaker: '석성택', text: '학생회 시스템도... 언제든 그런 "오류"가 생길 수 있지.', bg: 'bg-control-room', character: 'seok', expression: 'default' },
                { speaker: '석성택', text: '우리 일에 더 이상 관심 갖지 않는 게 좋을 거야.', bg: 'bg-control-room', character: 'seok', expression: 'angry' },
                { speaker: '석성택', text: '역사는... 승자의 편을 기록하거든.', bg: 'bg-control-room', character: 'seok', expression: 'default' },
                { speaker: '나레이션', text: `'내 사람'. 그 한마디와 섬뜩한 경고에 윤서현은 얼굴을 굳히며 물러난다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연이 시작되었다. 공격은 순조롭게 진행된다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `하지만 윤서현의 경고처럼, 학교 보안팀이 비정상적인 트래픽을 감지하고 방화벽을 강화하기 시작한다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `외부의 적이 아닌, '내부의 적'이 등장한 것이다.`, bg: 'bg-control-room', character: null },
                { speaker: '석성택', text: '하, 귀찮게 됐군. 학생회가 방해할 줄이야.', bg: 'bg-control-room', character: 'seok', expression: 'angry' },
                { speaker: '나레이션', text: `그가 방화벽을 우회하기 위해 더 복잡한 코드를 짜려 할 때, 당신이 그의 팔을 막는다.`, bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배, 정면 돌파는 위험해요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '저건 미끼예요! 진짜 감시는 다른 곳으로 들어오고 있어요.', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '제가 막을게요, 선배는 원래 계획대로 진행하세요!', bg: 'bg-control-room', character: null }
            ]
        },
        ryu: {
            chapter2: [
                { speaker: '나레이션', text: `당신은 류한석의 제안을 선택했다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '...좋아. 121기, 넌 괜찮은 것 같아.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
                { speaker: '나레이션', text: `며칠 후. 351 서버실, 류한석의 작업 공간.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `온갖 공구와 부품, 건프라 박스로 가득한 공간. 당신은 류한석과 함께 그의 원대한 꿈, "인공위성 RX-78-2 선린" 발사 프로젝트를 시작한다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그에게 당신은 그저 프로젝트를 구성하는 수많은 부품 중 하나, '제121번 조립 보조 유닛'에 불과했다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '121기. 이 마이크로컨트롤러 기판에 옵티컬 센서를 납땜해.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
                { speaker: '류한석', text: '오차는 0.01mm 이내. 못하면 넌 불량 부품이야. 폐기 처분한다.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
                { speaker: '나레이션', text: `류한석은 오직 기계와만 대화했다. 당신이 말을 걸어도, 그는 부품을 들여다보며 대답했다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그때, 활기찬 목소리와 함께 누군가 그의 어깨에 팔을 둘렀다.`, bg: 'bg-server-room', character: null },
                { speaker: '김해찬', text: '야, 류한석! 또 너만의 세상에 빠져있냐?', bg: 'bg-server-room', character: null },
                { speaker: '김해찬', text: '어라, 이 꼬마는 누구? 네 새 장난감 조립 알바?', bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `류한석이 유일하게 접근을 허락하는 그의 절친, 김해찬이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `해찬은 류한석의 책상에서 가장 비싼 한정판 건담 파츠를 아무렇지 않게 집어 들며 장난을 쳤다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `다른 사람이었으면 손목이 날아갔을 행동이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '만지지 마, 이 파괴자야.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
                { speaker: '류한석', text: '그건 "GN 소드 V"의 코어 파츠라고.', bg: 'bg-server-room', character: 'ryu', expression: 'angry' },
                { speaker: '류한석', text: '...그리고 걘 알바가 아니다. 121기 후배다.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
                { speaker: '김해찬', text: '(당신을 보며) "오, 후배님! 미안, 미안. 우리 한석이가 원래 사람이랑 눈을 잘 못 마주쳐서.', bg: 'bg-server-room', character: null },
                { speaker: '김해찬', text: '내가 대신 사과할게."', bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `해찬이 넉살 좋게 웃는 사이, 당신은 류한석이 지시한 납땜 작업을 끝마쳤다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `당신의 완벽한 작업물을 본 류한석의 눈이 처음으로 커졌다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '...이건.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
                { speaker: '나레이션', text: `현미경으로 결과를 확인한 그는, 경탄을 금치 못한다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '…말도 안 돼. 오차율 0.003mm...', bg: 'bg-server-room', character: 'ryu', expression: 'happy' },
                { speaker: '류한석', text: '이건... 기계의 영역이야.', bg: 'bg-server-room', character: 'ryu', expression: 'happy' },
                { speaker: '나레이션', text: `그는 처음으로 부품이 아닌, 당신의 손을 뚫어져라 쳐다본다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그 시선을 느낀 해찬의 얼굴에서 장난기가 사라진다.`, bg: 'bg-server-room', character: null },
                { speaker: '류한석', text: '…이건 내가 가장 아끼는 "PG 유니콘 건담"의 LED 유닛이다.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
                { speaker: '류한석', text: '…이 섬세한 부품을 다룰 자격, 너에게만 허락하지.', bg: 'bg-server-room', character: 'ryu', expression: 'default' },
                { speaker: '나레이션', text: `그가 주머니에서 소중하게 보관하고 있던 작은 부품 상자를 꺼내 당신에게 건넨다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그것은 그가 자신의 성역에 당신을 들이는, 그만의 의식이었다.`, bg: 'bg-server-room', character: null },
                { speaker: '나레이션', text: `그렇게 며칠이 더 흘렀다. 당신은 그의 가장 믿음직한 '오른팔'이 되어 있었다.`, bg: 'bg-server-room', character: null }
            ],
            chapter3: [
                { speaker: '나레이션', text: `기술 시연회 D-Day.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `시연회장 백스테이지 통제실. 통제실에는 거대한 위성 관제 모니터와 발사 시퀀서가 준비되어 있다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `류한석은 마지막까지 시스템을 점검하고 있고, 당신은 그의 옆에서 보조 역할을 하고 있다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `어느새 당신은 그의 가장 믿음직한 '오른팔'이 되어 있었다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `그때, 김해찬이 걱정스러운 얼굴로 통제실에 들어온다.`, bg: 'bg-control-room', character: null },
                { speaker: '김해찬', text: '한석아. 학생회에서 너희 프로젝트가 너무 위험하다고 태클 걸고 있어.', bg: 'bg-control-room', character: null },
                { speaker: '김해찬', text: '저번에 네가 로켓 엔진 테스트하다가 운동장 잔디 다 태워 먹은 것 때문에 예민하다고.', bg: 'bg-control-room', character: null },
                { speaker: '김해찬', text: '너, 정말 괜찮겠어?', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `그는 당신과 나란히 앉아있는 류한석을 보고, 잠시 표정이 굳는다.`, bg: 'bg-control-room', character: null },
                { speaker: '류한석', text: '계산은 완벽해. 변수는 없어.', bg: 'bg-control-room', character: 'ryu', expression: 'default' },
                { speaker: '김해찬', text: '(당신을 보며) "변수가 왜 없어. 여기 있잖아."', bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `해찬의 의미심장한 말에 류한석의 미간이 좁혀진다.`, bg: 'bg-control-room', character: null },
                { speaker: '류한석', text: '...해찬, 닥쳐.', bg: 'bg-control-room', character: 'ryu', expression: 'angry' },
                { speaker: '나레이션', text: `시연이 시작되었다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `"궤도 청소"를 위한 '톈궁 1호' 잔해 요격 미사일이 발사된다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `하지만 그 순간, 김해찬의 우려대로 학생회가 학교 중앙 서버에서 비상 잠금 코드를 발동시킨다.`, bg: 'bg-control-room', character: null },
                { speaker: '나레이션', text: `당신들의 발사 시스템에 [OVERRIDE: LAUNCH CANCELED] 경고가 번쩍이며 모든 제어권이 상실된다.`, bg: 'bg-control-room', character: null },
                { speaker: '류한석', text: '이런… 제어권을 빼앗겼어!', bg: 'bg-control-room', character: 'ryu', expression: 'angry' },
                { speaker: '류한석', text: '이대로라면 미사일은 엉뚱한 곳에 추락하고 말 거야!', bg: 'bg-control-room', character: 'ryu', expression: 'angry' },
                { speaker: '나레이션', text: `그가 패닉에 빠진 순간, 당신이 그의 시스템에 없던 새로운 해법을 제시한다.`, bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '선배! 중앙 서버를 해킹할 시간은 없어요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '대신 발사체에 내장된 예비 동력 시스템을 직접 활성화시키는 거예요!', bg: 'bg-control-room', character: null },
                { speaker: 'PLAYER', text: '제가 물리적으로 회로를 연결할게요. 선배는 제어권을 되찾을 준비만 하세요!', bg: 'bg-control-room', character: null }
            ]
        }
    },
    endings: {
        hyun: {
            good: {
                title: '현정욱 - GOOD END',
                text: `결과: 경로를 이탈했던 2개의 자탄이 불가능에 가까운 급격한 기동으로 새로운 목표를 포착, 총 5개의 드론이 밤하늘에서 동시에 불꽃처럼 터져 나간다.\n\n관객석에서는 경악과 환호가 터져 나오고, 문이제의 얼굴에서 처음으로 미소가 사라진다. 현정욱은 숨을 몰아쉬며, 자신도 모르게 꽉 잡고 있던 당신의 손을 내려다본다.\n\n현정욱: "…내 방정식은 완벽하지 않았어. 하지만 너라는 오차가 더해지니… 완벽을 넘어섰군. 책임져. 내 세계를 뒤흔들었으니. …이제 내 모든 계산의 제1 변수는, 너야."`
            },
            bad: {
                title: '현정욱 - BAD END',
                text: `당신은 현정욱의 자존심에 마지막 비수를 꽂는다. 그는 충격으로 굳어버리고, 당신이 혼자 시스템을 제어하려 하지만 이미 늦었다. 자탄들은 목표를 잃고 허공으로 사라진다.\n\n시연은 최악의 실패로 끝나고, 문이제가 경멸의 웃음을 터뜨린다. 모든 것이 끝난 후, 텅 빈 통제실에서 현정욱이 차갑게 말한다.\n\n현정욱: "…꺼져. 내 계산이 틀린 게 아니었어. 내 세계에 너 같은 최악의 변수를 끌어들인… 내가 틀렸던 거야."\n\n그는 두 번 다시 당신을 돌아보지 않는다.`
            }
        },
        lee: {
            good: {
                title: '이윤서 - GOOD END',
                text: `결과: 당신이 미리 심어둔 '플랜 B' 코드가 작동한다. 붉은 경고창들이 마치 연출인 것처럼 더욱 격렬하게 화면을 뒤덮다가, 한순간에 '시에라 블루' 색상의 거대한 섬광으로 폭발하며 삼성 서버의 응답불능 메시지를 띄운다.\n\n윤서현의 얼굴이 경악으로 물들고, 관객석에서는 환호가 터져 나온다. 모든 것이 끝난 후, 이윤서는 당신을 꼭 껴안는다.\n\n이윤서: "내 디자인을 구해준 건 너야… 아니, 내 디자인을 완성시켜 준 건 너야. 너랑 있으면… 망하는 순간조차 애플 키노트 같아. 너무 두근거려서 미칠 것 같아. 내 맛집 리스트, 전부 너랑 같이 갈래. 내 인생의 다음 '피처'는, 너야."`
            },
            bad: {
                title: '이윤서 - BAD END',
                text: `당신은 아름다움을 포기하고 효율을 택한다. 그 순간, 이윤서의 세상이 무너진다. 그녀에게 '디자인을 포기한 승리'는 패배보다 더 끔찍한 모욕이다.\n\n공격은 성공하지만, 화면에는 삭막한 성공 메시지만 떠 있을 뿐이다. 윤서현은 "결국 당신들도 그냥 범죄자일 뿐이군요"라며 혀를 차고 떠난다.\n\n이윤서: "…최악이야. 넌 아무것도 모르는구나. 아름답지 않은 승리는… 그냥 또 하나의 흉물일 뿐이야."\n\n그녀는 당신이 건넸던 아이폰 8을 차갑게 빼앗아 바닥에 던져 버린다. 액정은 산산조각 난다.`
            }
        },
        seok: {
            good: {
                title: '석성택 - GOOD END',
                text: `당신의 말에 석성택의 눈이 빛난다. 그는 당신을 믿고 원래 계획대로 공격을 진행한다. 당신은 뒤에서 감시 시스템을 교란하고, 석성택은 성공적으로 목표를 달성한다.\n\n모든 것이 끝난 후, 석성택이 당신에게 다가온다.\n\n석성택: "내 사람... 정말 믿을 만하네. 이제부터 넌 내 가장 가까운 동지야. 우리가 함께 할 일은... 아직 많이 남았어."`
            },
            bad: {
                title: '석성택 - BAD END',
                text: `당신은 위험 앞에서 후퇴를 제안한다. 석성택의 눈에서 빛이 사라진다. 그는 당신을 차갑게 바라본다.\n\n석성택: "동지라고 생각했는데... 넌 그냥 겁쟁이였어. 내 사람이 될 자격이 없었어."\n\n그는 당신을 남겨두고 떠난다.`
            }
        },
        ryu: {
            good: {
                title: '류한석 - GOOD END',
                text: `당신은 스파크가 튀는 패널을 열고, 떨리는 손으로 회로를 연결하는 데 성공한다. 일시적으로 제어권을 되찾은 류한석은 완벽한 계산으로 미사일 궤도를 수정하여 '톈궁 1호' 잔해를 명중시킨다.\n\n시연은 성공적으로 끝나지만, 당신은 과전류로 인해 손에 화상을 입는다. 모든 것이 끝난 후, 류한석은 처음으로 기계가 아닌 당신의 상처를 치료해준다.\n\n류한석: "분석 완료. 내 시스템의 이상 현상은 버그가 아니었어. 네가 내 반경 5미터 안에 들어오면 CPU 온도가 10도씩 올라가는 현상… 그건 '너'라는 이름의 새로운 운영체제가 설치된 거였어. …이제 내 루트 권한은 너에게 이양한다. 포맷은... 불가능해."`
            },
            bad: {
                title: '류한석 - BAD END',
                text: `당신은 위험 앞에서 그를 말린다. 프로젝트를 포기한 류한석의 눈에서 모든 빛이 사라진다. 시연은 실패하고, 그의 꿈은 한 줌의 재가 된다.\n\n류한석: "…내 판단 착오였어. 너는 내 시스템의 변수가 될 자격이 없었어. 넌 그저… 안전을 우선하는 불량 부품일 뿐이야. 폐기한다."\n\n그는 당신을 남겨두고 떠난다. 당신은 그의 시스템에서 완전히 제거된, 버려진 부품이 되었다.`
            }
        }
    }
});

const choices = {
    chapter1: [
        { text: '(현정욱) "선배의 완벽한 계산을 제 눈으로 보고 싶어요."', route: 'hyun', affection: { hyun: 50 } },
        { text: '(이윤서) "저도 \'카피캣\'은 용납할 수 없어요! 디자인 정의구현, 가죠!"', route: 'lee', affection: { lee: 50 } },
        { text: '(석성택) "이왕 할거면, 누구도 상상 못 할 일을 해야죠."', route: 'seok', affection: { seok: 50 } },
        { text: '(류한석) "새로운 건담 위성인 \'RX-78-2 선린(SUNRIN)\'이라니, 너무 멋져요!"', route: 'ryu', affection: { ryu: 50 } }
    ],
    ending: {
        hyun: [
            { text: '"할 수 있어요, 선배. 내가 선배의 \'가장 완벽한 오차\'가 되어 드릴게요."', ending: 'good', affection: { hyun: 50 } },
            { text: '"…선배의 계산이 틀렸어요. 제가 처리할게요."', ending: 'bad', affection: { hyun: -50 } }
        ],
        lee: [
            { text: '"선배의 디자인을 망치게 둘 순 없어요. 저를 믿으세요!"', ending: 'good', affection: { lee: 50 } },
            { text: '"…어쩔 수 없네요. 그냥 공격 스크립트라도 실행해요."', ending: 'bad', affection: { lee: -50 } }
        ],
        seok: [
            { text: '"선배의 뒤는 제가 지킬게요. 선배는... 저를 믿으세요."', ending: 'good', affection: { seok: 50 } },
            { text: '"…위험해요. 일단 후퇴해요!"', ending: 'bad', affection: { seok: -50 } }
        ],
        ryu: [
            { text: '"선배의 시스템은 제가 지킬게요! 저를 믿으세요!"', ending: 'good', affection: { ryu: 50 } },
            { text: '"…어쩔 수 없어요. 프로젝트를 포기해요."', ending: 'bad', affection: { ryu: -50 } }
        ]
    }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (elements.landing.enterBtn) elements.landing.enterBtn.addEventListener('click', () => switchScreen('login'));
    if (elements.login.btn) elements.login.btn.addEventListener('click', handleLogin);
    if (elements.game.nextBtn) elements.game.nextBtn.addEventListener('click', nextScene);
    if (elements.ending.replayBtn) elements.ending.replayBtn.addEventListener('click', startGame);
    if (elements.ending.restartBtn) elements.ending.restartBtn.addEventListener('click', () => location.reload());
});

// Logic
function handleLogin() {
    const name = elements.login.username.value.trim();
    if (!name) {
        elements.login.message.textContent = '아이디를 입력해주세요.';
        return;
    }
    gameState.playerName = name;
    startGame();
}

function switchScreen(screenName) {
    Object.values(elements.screens).forEach(el => {
        if (el) el.classList.add('hidden');
    });
    if (elements.screens[screenName]) elements.screens[screenName].classList.remove('hidden');
}

function startGame() {
    gameState.currentChapter = 'prologue';
    gameState.storyIndex = 0;
    gameState.currentRoute = null;
    gameState.affection = { hyun: 0, lee: 0, seok: 0, ryu: 0 };
    
    updateAffectionDisplay();
    loadScene();
    switchScreen('game');
}

function getCurrentStoryArray() {
    const story = getStory(gameState.playerName);
    if (gameState.currentChapter === 'prologue') return story.prologue;
    if (gameState.currentChapter === 'chapter1') return story.chapter1;
    if (gameState.currentChapter.startsWith('chapter')) {
        return story.routes[gameState.currentRoute][gameState.currentChapter];
    }
    return [];
}

function loadScene() {
    const currentStory = getCurrentStoryArray();
    
    if (gameState.storyIndex >= currentStory.length) {
        handleSequenceEnd();
        return;
    }

    const scene = currentStory[gameState.storyIndex];
    
    // Background
    if (scene.bg && elements.game.background) {
        elements.game.background.className = 'background ' + scene.bg;
    }

    // Character
    if (elements.game.characterImage) {
        if (scene.character) {
            const charData = characters[scene.character];
            const expression = scene.expression || 'default';
            if (charData && charData.images[expression]) {
                elements.game.characterImage.src = charData.images[expression];
                elements.game.characterImage.style.opacity = 1;
            }
        } else {
            elements.game.characterImage.style.opacity = 0;
        }
    }

    // Dialogue
    if (elements.game.speakerName) elements.game.speakerName.textContent = scene.speaker === 'PLAYER' ? gameState.playerName : scene.speaker;
    if (elements.game.dialogueText) elements.game.dialogueText.textContent = scene.text;

    // UI State
    if (elements.game.choicesContainer) elements.game.choicesContainer.classList.add('hidden');
    if (elements.game.nextBtn) elements.game.nextBtn.classList.remove('hidden');
}

function nextScene() {
    gameState.storyIndex++;
    loadScene();
}

function handleSequenceEnd() {
    if (gameState.currentChapter === 'prologue') {
        gameState.currentChapter = 'chapter1';
        gameState.storyIndex = 0;
        loadScene();
    } else if (gameState.currentChapter === 'chapter1') {
        showChoices(choices.chapter1);
    } else if (gameState.currentChapter === 'chapter2') {
        gameState.currentChapter = 'chapter3';
        gameState.storyIndex = 0;
        loadScene();
    } else if (gameState.currentChapter === 'chapter3') {
        showChoices(choices.ending[gameState.currentRoute]);
    }
}

function showChoices(choiceList) {
    if (elements.game.nextBtn) elements.game.nextBtn.classList.add('hidden');
    if (elements.game.choicesContainer) {
        elements.game.choicesContainer.classList.remove('hidden');
        elements.game.choicesContainer.innerHTML = '<div class="choices-title">선택하세요</div>';

        if (choiceList) {
            choiceList.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.onclick = () => handleChoice(choice);
                elements.game.choicesContainer.appendChild(btn);
            });
        }
    }
}

function handleChoice(choice) {
    // Prevent double submission by blurring and disabling
    if (document.activeElement) document.activeElement.blur();
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (choice.affection) {
        for (const [key, val] of Object.entries(choice.affection)) {
            gameState.affection[key] += val;
        }
        updateAffectionDisplay();
    }

    if (choice.route) {
        gameState.currentRoute = choice.route;
        gameState.currentChapter = 'chapter2';
        gameState.storyIndex = 0;
        loadScene();
        return;
    }

    if (choice.ending) {
        showEnding(choice.ending);
        return;
    }
}

function updateAffectionDisplay() {
    for (const [key, val] of Object.entries(gameState.affection)) {
        if (elements.game.affectionBars[key]) {
            const percentage = Math.min(100, Math.max(0, val));
            elements.game.affectionBars[key].bar.style.width = `${percentage}%`;
            elements.game.affectionBars[key].val.textContent = val;
        }
    }
}

function showEnding(type) {
    const story = getStory(gameState.playerName);
    const ending = story.endings[gameState.currentRoute][type];
    
    if (elements.ending.title) elements.ending.title.textContent = ending.title;
    if (elements.ending.text) elements.ending.text.textContent = ending.text;
    switchScreen('ending');
}
