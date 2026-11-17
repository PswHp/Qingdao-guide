import { festivalPhoto } from '../data/content'
import PhotoCredit from './PhotoCredit'

export default function Festival() {
  return (
    <section id="festival" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="ph-beer grid overflow-hidden rounded-3xl md:grid-cols-2">
          <div className="p-8 text-slate-900 sm:p-12">
            <p className="text-sm font-bold tracking-widest text-roof-600">FESTIVAL</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">칭다오 국제 맥주 축제</h2>
            <p className="mt-4 text-slate-800">
              매년 여름(주로 7~8월) 열리는 아시아 최대 규모의 맥주 축제. 세계 각국의 맥주와 공연, 불꽃놀이가 도시
              전체를 축제 분위기로 물들입니다.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-medium">
              <li>📅 기간: 매년 여름 (일정은 공식 발표 확인)</li>
              <li>📍 장소: 시북구·서해안 신구 맥주성 일대</li>
              <li>🎟️ 입장: 행사별 상이</li>
            </ul>
          </div>
          <div className="relative min-h-[280px] bg-slate-900">
            <img
              src={festivalPhoto.src}
              alt={festivalPhoto.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            />
            <PhotoCredit credit={festivalPhoto.credit} />
          </div>
        </div>
      </div>
    </section>
  )
}
