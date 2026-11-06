import { Minus, Plus } from 'lucide-react'

export type View = 'lembar' | 'ringkas'
export const ZOOMS = [1, 1.5, 2, 3, 4]

interface Props { view: View; onView: (v: View) => void; zoom: number; onZoom: (z: number) => void }

/** Kontrol khusus HP: pilih tampilan lembar peta (mirip desktop) atau ringkas, dan atur zoom lembar. */
export default function ViewControls({ view, onView, zoom, onZoom }: Props) {
  const seg = (active: boolean) => `border-2 border-black px-3 py-1.5 ${active ? 'bg-black text-white' : 'bg-white'}`
  const i = ZOOMS.indexOf(zoom)
  const btn = 'grid size-9 place-items-center border-2 border-black bg-white disabled:opacity-40'
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-black bg-white p-2 text-sm">
      <div className="flex" role="group" aria-label="Pilih tampilan">
        <button type="button" className={`${seg(view === 'lembar')} rounded-l-full`} onClick={() => onView('lembar')}>Lembar peta</button>
        <button type="button" className={`${seg(view === 'ringkas')} -ml-0.5 rounded-r-full`} onClick={() => onView('ringkas')}>Ringkas</button>
      </div>
      {view === 'lembar' && (
        <div className="ml-auto flex items-center gap-1.5" role="group" aria-label="Zoom lembar">
          <button type="button" className={btn} aria-label="Perkecil lembar" disabled={i <= 0} onClick={() => onZoom(ZOOMS[i - 1])}><Minus className="size-4" /></button>
          <span className="w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button type="button" className={btn} aria-label="Perbesar lembar" disabled={i >= ZOOMS.length - 1} onClick={() => onZoom(ZOOMS[i + 1])}><Plus className="size-4" /></button>
        </div>
      )}
      {view === 'lembar' && <p className="m-0 w-full text-xs text-neutral-600">Perbesar lembar dengan tombol +, lalu geser ke samping. Menggeser di atas peta menggeser isi peta; geser di kartu atau panel untuk menggulir lembar.</p>}
    </div>
  )
}
