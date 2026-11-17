export const navItems = [
  { href: '#spots', label: '명소' },
  { href: '#food', label: '음식' },
  { href: '#festival', label: '축제' },
  { href: '#tips', label: '여행 팁' },
]

/** 사진 저작자 표시 (Wikimedia Commons 의 CC 라이선스 사진은 출처 표기가 필수) */
export type Credit = { author: string; license: string; source: string }

export type Photo = { src: string; alt: string; credit: Credit }

export type Spot = {
  name: string
  local: string
  tag: string
  /** 사진을 불러오는 동안 보여줄 그라데이션 클래스 (index.css 의 .ph-*) */
  bg: string
  desc: string
  photo: Photo
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`

export const spots: Spot[] = [
  {
    name: '잔교', local: '栈桥', tag: '해안', bg: 'ph-sea',
    desc: '1890년대에 지어진 칭다오의 상징. 바다 위로 뻗은 다리 끝 회란각에서 바라보는 노을이 일품입니다.',
    photo: {
      src: '/images/spots/zhanqiao.jpg', alt: '바다 위로 뻗은 잔교와 끝에 있는 회란각',
      credit: { author: 'Windmemories', license: 'CC BY-SA 4.0', source: commons('20240729 Zhanqiao 01.jpg') },
    },
  },
  {
    name: '팔대관', local: '八大关', tag: '거리', bg: 'ph-roof',
    desc: '각국 양식의 별장이 모인 가로수길. 붉은 지붕과 녹음이 어우러진 산책 명소입니다.',
    photo: {
      src: '/images/spots/badaguan.jpg', alt: '팔대관의 화석루(花石楼)',
      credit: { author: 'Gisling', license: 'CC BY-SA 3.0', source: commons('青岛八大关花石楼.jpg') },
    },
  },
  {
    name: '라오산', local: '崂山', tag: '자연', bg: 'ph-forest',
    desc: '바다와 맞닿은 도교의 명산. 기암괴석과 사찰, 라오산 광천수로 유명합니다.',
    photo: {
      src: '/images/spots/laoshan.jpg', alt: '화강암 봉우리가 솟은 라오산',
      credit: { author: 'Windmemories', license: 'CC BY-SA 4.0', source: commons('20240730 Dabiao Mountain of Mount Lao 01.jpg') },
    },
  },
  {
    name: '칭다오 맥주 박물관', local: '啤酒博物馆', tag: '체험', bg: 'ph-beer',
    desc: '1903년 문을 연 양조장을 개조한 박물관. 견학 후 갓 뽑은 원액 맥주를 시음할 수 있습니다.',
    photo: {
      src: '/images/spots/beer-museum.jpg', alt: '칭다오 맥주 양조장 건물과 시계탑',
      credit: { author: 'Lennartbj', license: 'CC BY-SA 4.0', source: commons('Tsingtao Brewery in Qingdao.jpg') },
    },
  },
  {
    name: '5·4 광장', local: '五四广场', tag: '야경', bg: 'ph-night',
    desc: "붉은 '오월의 바람' 조형물이 서 있는 신시가지 광장. 밤마다 펼쳐지는 빌딩 조명쇼가 볼거리입니다.",
    photo: {
      src: '/images/spots/may-fourth-square.jpg', alt: "5·4 광장의 붉은 '오월의 바람' 조형물",
      credit: { author: 'xiquinhosilva', license: 'CC BY 2.0', source: commons('51367-Qingdao (xiquinhosilva) - Flickr.jpg') },
    },
  },
  {
    name: '소어산 공원', local: '小鱼山', tag: '전망', bg: 'ph-sky',
    desc: '구시가지의 붉은 지붕과 바다를 한눈에 내려다볼 수 있는 전망 포인트입니다.',
    photo: {
      src: '/images/spots/xiaoyushan.jpg', alt: '바다에서 바라본 소어산과 구시가지의 붉은 지붕',
      credit: { author: 'Windmemories', license: 'CC BY-SA 4.0', source: commons('20240729 View around Xiaoyushan, Qingdao.jpg') },
    },
  },
]

export const festivalPhoto: Photo = {
  src: '/images/festival.jpg',
  alt: '밤에 불을 밝힌 칭다오 국제 맥주 축제 행사장',
  credit: { author: 'Sprt98', license: 'CC BY-SA 4.0', source: commons('第33届青岛国际啤酒节——中心舞台.jpg') },
}

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
