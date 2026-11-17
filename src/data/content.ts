export const navItems = [
  { href: '#spots', label: '명소' },
  { href: '#food', label: '음식' },
  { href: '#festival', label: '축제' },
  { href: '#tips', label: '여행 팁' },
]

export type Spot = {
  name: string
  local: string
  tag: string
  /** 사진이 없을 때 보여줄 그라데이션 클래스 (index.css 의 .ph-*) */
  bg: string
  desc: string
  /** public/ 아래 사진 경로. 넣으면 그라데이션 대신 사진이 표시됩니다. */
  image?: string
}

export const spots: Spot[] = [
  { name: '잔교', local: '栈桥', tag: '해안', bg: 'ph-sea', desc: '1890년대에 지어진 칭다오의 상징. 바다 위로 뻗은 다리 끝 회란각에서 바라보는 노을이 일품입니다.' },
  { name: '팔대관', local: '八大关', tag: '거리', bg: 'ph-roof', desc: '각국 양식의 별장이 모인 가로수길. 붉은 지붕과 녹음이 어우러진 산책 명소입니다.' },
  { name: '라오산', local: '崂山', tag: '자연', bg: 'ph-forest', desc: '바다와 맞닿은 도교의 명산. 기암괴석과 사찰, 라오산 광천수로 유명합니다.' },
  { name: '칭다오 맥주 박물관', local: '啤酒博物馆', tag: '체험', bg: 'ph-beer', desc: '1903년 문을 연 양조장을 개조한 박물관. 견학 후 갓 뽑은 원액 맥주를 시음할 수 있습니다.' },
  { name: '5·4 광장', local: '五四广场', tag: '야경', bg: 'ph-night', desc: "붉은 '오월의 바람' 조형물이 서 있는 신시가지 광장. 밤마다 펼쳐지는 빌딩 조명쇼가 볼거리입니다." },
  { name: '소어산 공원', local: '小鱼山', tag: '전망', bg: 'ph-sky', desc: '구시가지의 붉은 지붕과 바다를 한눈에 내려다볼 수 있는 전망 포인트입니다.' },
]

export const foods = [
  { icon: '🍺', name: '칭다오 생맥주', desc: '비닐봉지에 담아 파는 현지 스타일' },
  { icon: '🐚', name: '라차 볶음', desc: '매콤한 바지락 볶음, 맥주 안주 1순위' },
  { icon: '🦐', name: '해산물 요리', desc: '시장에서 골라 바로 조리해 먹는 재미' },
  { icon: '🍢', name: '양꼬치 · 꼬치구이', desc: '야시장과 맥주 거리의 단골 메뉴' },
]

export const tips = [
  { icon: '🛂', title: '입국 · 비자', desc: '비자 정책은 자주 바뀌니 출국 전 대사관 공지를 꼭 확인하세요.' },
  { icon: '💳', title: '결제', desc: '알리페이·위챗페이가 기본입니다. 해외 카드를 미리 연동해 두세요.' },
  { icon: '🚇', title: '교통', desc: '공항에서 시내까지 지하철 8호선으로 연결됩니다. 택시 앱 디디(DiDi)도 편리합니다.' },
  { icon: '📶', title: '인터넷', desc: '일부 해외 서비스 접속이 제한되니 로밍이나 eSIM을 준비하세요.' },
]
