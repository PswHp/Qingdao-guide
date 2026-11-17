export default function Hero() {
  return (
    <section className="ph-sea relative flex min-h-[88vh] items-center overflow-hidden pt-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_120%,rgba(255,255,255,.18),transparent_60%)]" />
      <div className="absolute -right-[10%] -bottom-[20%] h-[60vw] w-[60vw] rounded-full bg-white/5" />
      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <p className="mb-4 text-sm font-semibold tracking-widest text-sea-100">青岛 · QINGDAO · CHINA</p>
        <h1 className="text-4xl leading-tight font-black sm:text-6xl">
          붉은 지붕과 푸른 바다,
          <br />
          <span className="text-amber-300">맥주의 도시</span> 칭다오
        </h1>
        <p className="mt-6 max-w-xl text-lg text-sea-100">
          인천에서 비행기로 약 1시간 30분. 유럽풍 거리와 해안 산책로, 신선한 해산물과 갓 뽑은 생맥주가 기다리는 가장
          가까운 바다 도시로 떠나보세요.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#spots" className="rounded-full bg-white px-6 py-3 font-bold text-sea-700 hover:bg-sea-50">
            명소 둘러보기
          </a>
          <a href="#tips" className="rounded-full border border-white/60 px-6 py-3 font-bold hover:bg-white/10">
            여행 준비하기
          </a>
        </div>
      </div>
    </section>
  )
}
