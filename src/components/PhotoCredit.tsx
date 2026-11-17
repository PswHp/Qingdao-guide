import type { Credit } from '../data/content'

/** 사진 위 오른쪽 아래에 작게 표시하는 저작자 표기 */
export default function PhotoCredit({ credit }: { credit: Credit }) {
  return (
    <a
      href={credit.source}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 hover:bg-black/70"
    >
      © {credit.author} · {credit.license}
    </a>
  )
}
