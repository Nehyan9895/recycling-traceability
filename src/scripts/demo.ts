// Drives the auto-playing walkthrough of one batch through the plant.

const TICK_MS = 100;
const STAGE_TICKS = 70; // 7 seconds per stage
const STAGES = 6;
const NET_KG = 1000;
const SOLD_KG = 975; // everything except residue sent to TSDF

const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function initDemo() {
  const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
  const $$ = <T extends HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

  const steps = $$<HTMLButtonElement>('.step');
  const panels = $$<HTMLElement>('.stage');
  const toggleBtn = $<HTMLButtonElement>('#toggle');
  const mode = $('#mode');
  const modeLabel = $('#mode-label');
  const progress = $('#progress');
  const fracs = $$<HTMLElement>('.frac');
  const driveStatus = $$<HTMLElement>('.drive-status');
  const saleStatus = $$<HTMLElement>('.sale-status');
  const exportBtn = $<HTMLButtonElement>('#export');

  let step = 0;
  let t = 0;
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showStage(i: number) {
    panels.forEach((p) => {
      const on = Number(p.dataset.stage) === i;
      p.hidden = !on;
      p.classList.remove('play');
      if (on) {
        void p.offsetWidth; // restart entry animations
        p.classList.add('play');
      }
    });
    steps.forEach((s, j) => {
      s.classList.toggle('is-active', j === i);
      s.classList.toggle('is-done', j < i);
      s.setAttribute('aria-current', j === i ? 'step' : 'false');
      const dot = s.querySelector<HTMLElement>('.dot')!;
      dot.textContent = j < i ? '✓' : dot.dataset.mark!;
    });
  }

  function go(i: number) {
    step = Math.max(0, Math.min(STAGES - 1, i));
    t = 0;
    showStage(step);
    render();
  }

  function setPlaying(p: boolean) {
    playing = p;
    toggleBtn.textContent = p ? 'Pause' : 'Play';
    modeLabel.textContent = p ? 'Live demo running' : 'Demo paused';
    mode.toggleAttribute('data-paused', !p);
  }

  function render() {
    const p = clamp(t / 25);
    const net = step === 0 ? NET_KG * p : NET_KG;

    // 01 weigh-in
    $('#net').textContent = fmt(net);
    $('#gross').textContent = fmt(2410 + net);
    $('#slip').textContent = step === 0 && p < 1 ? 'Reading…' : 'WS-88214 saved';

    // 03 dismantling
    const fp = step < 2 ? 0 : step === 2 ? clamp(t / 40) : 1;
    let sep = 0;
    fracs.forEach((row, i) => {
      const kg = Number(row.dataset.kg);
      const local = clamp(fp * fracs.length - i);
      const bar = row.querySelector<HTMLElement>('.frac-bar')!;
      bar.style.width = `${(kg / Number(bar.dataset.max)) * 100 * local}%`;
      row.querySelector('.frac-kg')!.textContent = fmt(kg * local);
      sep += kg * local;
    });
    $('#sep').textContent = fmt(sep);
    const counting = step === 2 && fp < 1;
    const bt = $('#balance-text');
    bt.textContent = counting ? 'Counting…' : 'Balanced: 0 kg gap';
    bt.classList.toggle('ok', !counting);

    // 04 data destruction
    const shredded = step < 3 ? 0 : step === 3 ? Math.floor(t / 10) : driveStatus.length;
    driveStatus.forEach((el, i) => {
      const done = i < shredded;
      el.textContent = done ? 'Shredded' : 'Queued';
      el.classList.toggle('done', done);
    });
    $('#cert').textContent = shredded >= driveStatus.length ? 'Issued to client' : 'In progress';

    // 05 sales
    const invoiced = step < 4 ? 0 : step === 4 ? Math.floor(t / 10) : saleStatus.length;
    saleStatus.forEach((el, i) => {
      const done = i < invoiced;
      el.textContent = done ? el.dataset.irn! : 'Pending';
      el.classList.toggle('done', done);
    });

    // mass balance
    const sold = step < 4 ? 0 : step === 4 ? SOLD_KG * clamp(t / 40) : NET_KG;
    const sepTotal = step < 2 ? 0 : sep;
    $('#bal-in').style.width = `${net / 10}%`;
    $('#bal-in-kg').textContent = fmt(net);
    $('#bal-sep').style.width = `${sepTotal / 10}%`;
    $('#bal-sep-kg').textContent = fmt(sepTotal);
    $('#bal-out').style.width = `${sold / 10}%`;
    $('#bal-out-kg').textContent = fmt(sold);

    progress.style.width = `${(t / STAGE_TICKS) * 100}%`;
  }

  steps.forEach((s, i) => s.addEventListener('click', () => go(i)));
  $('#prev').addEventListener('click', () => go(step - 1));
  $('#next').addEventListener('click', () => go(step + 1));
  toggleBtn.addEventListener('click', () => {
    if (!playing && step === STAGES - 1 && t >= STAGE_TICKS) go(0);
    setPlaying(!playing);
  });
  exportBtn.addEventListener('click', () => {
    exportBtn.textContent = 'Filing pack exported ✓';
  });

  setInterval(() => {
    if (!playing) return;
    if (t + 1 >= STAGE_TICKS) {
      if (step >= STAGES - 1) {
        t = STAGE_TICKS;
        render();
        setPlaying(false);
        return;
      }
      go(step + 1);
      return;
    }
    t += 1;
    render();
  }, TICK_MS);

  setPlaying(playing);
  go(0);
}
