/* Nocturne Botanica: editorial dark romantic, ink navy + bone paper + Copper Leaf, asymmetric rhythm. */
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clipboard, ExternalLink, Heart, Image as ImageIcon, MapPin, Music2, Pause, Play, Send, X } from "lucide-react";

const CONFIG = {
  couple: "Alya & Raka",
  shortNames: "Alya & Raka",
  parents: "Putri pertama dari Bapak Surya & Ibu Maya · Putra kedua dari Bapak Arman & Ibu Dini",
  dateLabel: "Sabtu, 24 Oktober 2026",
  eventDate: "2026-10-24T16:00:00+07:00",
  akadTime: "16.00 WIB",
  receptionTime: "19.00 WIB",
  venue: "Taman Langit Senja",
  address: "Jl. Bunga Kemuning No. 18, Bandung",
  mapsUrl: "https://maps.google.com/?q=Taman+Langit+Senja+Bandung",
  walletProvider: "DANA",
  walletNumber: "08XX-XXXX-2026",
  accountBank: "Bank BCA",
  accountNumber: "1234 5678 90",
  accountName: "Alya Prameswari",
  paymentLink: "https://link.dana.id/placeholder",
};

const images = [
  { src: "/manus-storage/nocturne-hero_e5c2e3dd.jpg", alt: "Pasangan berjalan di taman saat senja", caption: "Di antara teduh dan cahaya" },
  { src: "/manus-storage/nocturne-still-life_6e127660.jpg", alt: "Bunga dan lilin di atas meja kayu", caption: "Hal-hal kecil yang kami simpan" },
  { src: "/manus-storage/nocturne-hands_4fdbae0f.jpg", alt: "Dua tangan saling menggenggam", caption: "Satu genggam, satu arah" },
  { src: "/manus-storage/nocturne-garden_881642d3.jpg", alt: "Pasangan di jembatan taman dengan cahaya hangat", caption: "Sore yang tidak ingin selesai" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan pengantin dalam cahaya lembut", caption: "Kita, dalam versi paling jujur" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85", alt: "Detail bunga putih dan dekorasi pernikahan", caption: "Sebuah rumah yang sedang kami bangun" },
];

function getGuestName() {
  const value = new URLSearchParams(window.location.search).get("to")?.trim().replace(/\s+/g, " ");
  return value ? value.slice(0, 72) : "Tamu undangan";
}

function calendarUrl() {
  const start = "20261024T090000Z";
  const end = "20261024T140000Z";
  const details = encodeURIComponent(`Akad dan resepsi pernikahan ${CONFIG.couple}. Mohon hadir dengan penuh sukacita.`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${CONFIG.couple}`)}&dates=${start}/${end}&details=${details}&location=${encodeURIComponent(CONFIG.address)}&ctz=Asia%2FJakarta`;
}

function useCountdown(target: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const distance = Math.max(0, new Date(target).getTime() - now);
  return { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
}

function playAmbient(setPlaying: (v: boolean) => void, audioRef: React.MutableRefObject<AudioContext | null>) {
  try {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = audioRef.current ?? new AudioCtx(); audioRef.current = ctx;
    const gain = ctx.createGain(); gain.gain.value = 0.035; gain.connect(ctx.destination);
    [261.63, 329.63, 392].forEach((frequency, i) => { const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = frequency; osc.connect(gain); osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + 3.2); });
    setPlaying(true); window.setTimeout(() => setPlaying(false), 3200);
  } catch { setPlaying(false); }
}

export default function Home() {
  const guestName = useMemo(getGuestName, []);
  const countdown = useCountdown(CONFIG.eventDate);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [rsvp, setRsvp] = useState({ name: "", status: "Hadir", message: "" });
  const [guestbook, setGuestbook] = useState<{ name: string; status: string; message: string; time?: string }[]>(() => { try { return JSON.parse(localStorage.getItem("nocturne-guestbook") || "[]"); } catch { return []; } });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState("");
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(100); setLoading(false); return; } const start = performance.now(); let frame = 0; const tick = (now: number) => { const value = Math.min(100, Math.round(((now - start) / 850) * 100)); setProgress(value); if (value < 100) frame = window.requestAnimationFrame(tick); else window.setTimeout(() => setLoading(false), 180); }; frame = window.requestAnimationFrame(tick); return () => window.cancelAnimationFrame(frame); }, []);
  useEffect(() => { document.body.classList.toggle("is-locked", lightbox !== null); return () => document.body.classList.remove("is-locked"); }, [lightbox]);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowLeft") setLightbox((lightbox + images.length - 1) % images.length); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % images.length); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [lightbox]);
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); document.querySelectorAll(".reveal").forEach((el) => observer.observe(el)); return () => observer.disconnect(); }, [opened]);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; let frame = 0; const updateParallax = () => { frame = 0; document.querySelectorAll<HTMLElement>(".parallax-media").forEach((media) => { const rect = media.parentElement?.getBoundingClientRect(); if (!rect) return; const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / Math.max(window.innerHeight, rect.height); media.style.setProperty("--parallax-y", `${Math.max(-18, Math.min(18, progress * 18))}px`); }); }; const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateParallax); }; updateParallax(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); }; }, [opened]);

  const copyValue = async (value: string, label: string) => { try { await navigator.clipboard.writeText(value); } catch { const input = document.createElement("textarea"); input.value = value; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove(); } setCopied(label); window.setTimeout(() => setCopied(""), 2000); };
  const submitRsvp = (e: React.FormEvent) => { e.preventDefault(); if (!rsvp.name.trim() || !rsvp.message.trim()) return; const next = [...guestbook, { ...rsvp, name: rsvp.name.trim(), message: rsvp.message.trim(), time: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) }]; setGuestbook(next); localStorage.setItem("nocturne-guestbook", JSON.stringify(next)); setSent(true); setRsvp({ name: "", status: "Hadir", message: "" }); };

  return <div className={`site-shell ${opened ? "invitation-open" : ""}`}>
    <div className={`preloader ${loading ? "" : "preloader-away"}`} aria-hidden={!loading}><div className="preloader-mark">✦</div><p>Menyiapkan cerita kalian</p><div className="preloader-track"><span style={{ width: `${progress}%` }} /></div><span className="preloader-progress">{String(progress).padStart(2, "0")} · 100</span></div>
    <div className="grain" aria-hidden="true" />
    <div className={`cover ${opened ? "cover-away" : ""}`} aria-hidden={opened}>
      <div className="cover-image" />
      <div className="cover-shade" />
      <div className="cover-copy">
        <div className="eyebrow">Sebuah undangan · 24.10.2026</div>
        <div className="emblem" aria-label="Emblem Alya dan Raka"><span>✦</span></div>
        <p className="cover-kicker">Kepada Yth.</p><p className="guest-name">{guestName}</p>
        <h1>{CONFIG.couple.split(" & ")[0]} <i>&amp;</i><br />{CONFIG.couple.split(" & ")[1]}</h1>
        <p className="cover-date">Sabtu, dua puluh empat Oktober<br />dua ribu dua puluh enam</p>
        <button className="open-button" onClick={() => { setOpened(true); playAmbient(setPlaying, audioRef); }}><span>Buka undangan</span><Heart size={15} /></button>
      </div>
      <div className="cover-footer"><span>Bandung · Jawa Barat</span><span>Scroll to wander</span></div>
    </div>

    <header className="desktop-header"><a href="#top" className="brand"><span className="mini-emblem">✦</span><span>{CONFIG.shortNames}</span></a><nav>{[["Cerita", "story"], ["Acara", "event"], ["Galeri", "gallery"], ["RSVP", "rsvp"], ["Tanda kasih", "gift"]].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><span className="header-date">24 · 10 · 26</span></header>

    <main id="top">
      <section className="hero section-dark swipe-down reveal"><div className="hero-image parallax-media" /><div className="hero-overlay" /><div className="hero-inner reveal swipe-up"><p className="eyebrow copper">The beginning of always</p><h2>Yang kami cari,<br /><em>ternyata rumah.</em></h2><div className="hero-meta"><span>{CONFIG.dateLabel}</span><span className="line" /><span>{CONFIG.venue}</span></div><a className="text-link" href="#story">Baca cerita kami <ChevronRight size={16} /></a></div><div className="side-note">01 / 06<br /><span>OUR STORY</span></div></section>

      <section id="story" className="story section-paper swipe-down reveal"><div className="section-index">02 <span>cerita</span></div><div className="story-intro reveal swipe-up"><p className="eyebrow copper">A little constellation</p><h2>Semesta punya<br /><em>cara yang lembut.</em></h2></div><div className="story-body"><div className="story-copy reveal swipe-up"><p>Awalnya hanya dua orang yang sama-sama terlambat di sebuah sore bulan April. Percakapan kecil tentang buku, kopi, dan jalan pulang tumbuh menjadi kebiasaan yang ingin kami ulang setiap hari.</p><p>Setelah banyak perjalanan, tawa, dan doa yang diam-diam kami titipkan, kami memilih untuk melanjutkan cerita ini dalam satu rumah bernama pernikahan.</p><span className="signature">Alya <i>&amp;</i> Raka</span></div><figure className="story-image reveal swipe-up"><img src={images[1].src} alt={images[1].alt} /><figcaption>Bandung, musim hujan 2024</figcaption></figure></div></section>

      <section id="event" className="event section-ink swipe-down reveal"><div className="section-index">03 <span>perayaan</span></div><div className="event-heading reveal swipe-up"><p className="eyebrow copper">Mark the evening</p><h2>Datang, duduk,<br /><em>dan rayakan kami.</em></h2></div><div className="event-grid"><div className="event-card reveal"><span className="event-number">01</span><h3>Akad nikah</h3><p className="event-time">16.00 <small>WIB</small></p><p>{CONFIG.dateLabel}<br />{CONFIG.venue}<br />{CONFIG.address}</p><a href={CONFIG.mapsUrl} target="_blank" rel="noreferrer" className="outline-link">Lihat lokasi <ExternalLink size={14} /></a></div><div className="event-card reveal"><span className="event-number">02</span><h3>Resepsi</h3><p className="event-time">19.00 <small>WIB</small></p><p>{CONFIG.dateLabel}<br />{CONFIG.venue}<br />{CONFIG.address}</p><a href={calendarUrl()} target="_blank" rel="noreferrer" className="outline-link">Simpan ke kalender <CalendarDays size={14} /></a></div></div><div className="countdown reveal"><p className="eyebrow copper">Menuju hari yang kami tunggu</p><div className="countdown-row">{[[countdown.days, "hari"], [countdown.hours, "jam"], [countdown.minutes, "menit"], [countdown.seconds, "detik"]].map(([num, label]) => <div key={label}><strong>{String(num).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></div></section>

      <section id="gallery" className="gallery section-paper swipe-down reveal"><div className="section-index">04 <span>fragmen</span></div><div className="gallery-heading reveal swipe-up"><p className="eyebrow copper">A collection of small moments</p><h2>Potongan yang<br /><em>ingin kami simpan.</em></h2></div><div className="masonry">{images.map((image, index) => <button key={image.src} className={`gallery-item item-${index + 1} reveal`} onClick={() => setLightbox(index)} aria-label={`Lihat foto ${index + 1}: ${image.alt}`}><img className="parallax-media" src={image.src} alt={image.alt} /><span><ImageIcon size={15} /> Lihat foto</span></button>)}</div></section>

      <section id="rsvp" className="rsvp section-dark swipe-down reveal"><div className="section-index">05 <span>hadir</span></div><div className="rsvp-layout"><div className="rsvp-heading reveal swipe-up"><p className="eyebrow copper">Your note matters</p><h2>Jika berkenan,<br /><em>tinggalkan kabar.</em></h2><p>Kehadiran dan doa baikmu adalah hadiah yang paling kami nantikan.</p></div><form className="rsvp-form reveal swipe-up" onSubmit={submitRsvp}><label htmlFor="name">Nama lengkap</label><input id="name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Tuliskan namamu" required /><fieldset><legend>Konfirmasi kehadiran</legend>{["Hadir", "Belum bisa memastikan", "Tidak dapat hadir"].map((status) => <label className="radio" key={status}><input type="radio" name="status" checked={rsvp.status === status} onChange={() => setRsvp({ ...rsvp, status })} /><span>{status}</span></label>)}</fieldset><label htmlFor="message">Pesan untuk kami</label><textarea id="message" value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Tulis doa atau pesan singkatmu" rows={4} required /><button className="submit-button" type="submit">Kirim konfirmasi <Send size={15} /></button>{sent && <p className="form-success" role="status">Terima kasih, kabarmu sudah kami terima.</p>}</form></div><div className="guestbook reveal"><div><p className="eyebrow copper">Buku tamu</p><h3>Pesan yang ditinggalkan <span className="guest-count">{guestbook.length ? `· ${guestbook.length}` : ""}</span></h3></div>{guestbook.length === 0 ? <p className="empty-state">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : <div className="guest-messages">{guestbook.map((entry, index) => <article key={`${entry.name}-${index}`}><strong>{entry.name}</strong><span>{entry.status}</span><p>{entry.message}</p>{entry.time && <time dateTime={entry.time}>{entry.time}</time>}</article>)}</div>}</div></section>

      <section id="gift" className="gift section-paper swipe-down reveal"><div className="section-index">06 <span>tanda kasih</span></div><div className="gift-layout"><div className="gift-copy reveal swipe-up"><p className="eyebrow copper">A quiet gesture</p><h2>Doa baikmu<br /><em>sudah cukup.</em></h2><p>Jika ingin mengirimkan tanda kasih, berikut detail yang dapat digunakan. Data di bawah adalah placeholder dan dapat diganti pada konfigurasi.</p></div><div className="gift-box reveal swipe-up"><img className="qr" src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(CONFIG.paymentLink)}`} alt="QR code link pembayaran" /><div className="payment-row"><span>{CONFIG.walletProvider}</span><strong>{CONFIG.walletNumber}</strong><button onClick={() => copyValue(CONFIG.walletNumber, "wallet")} aria-label="Salin nomor e-wallet"><Clipboard size={15} />{copied === "wallet" ? "Tersalin" : "Salin"}</button></div><div className="payment-row"><span>{CONFIG.accountBank}</span><strong>{CONFIG.accountNumber}</strong><button onClick={() => copyValue(CONFIG.accountNumber, "bank")} aria-label="Salin nomor rekening"><Clipboard size={15} />{copied === "bank" ? "Tersalin" : "Salin"}</button></div><p className="recipient">a.n. {CONFIG.accountName}</p></div></div></section>
    </main>

    <footer className="footer"><div className="emblem small"><span>✦</span></div><h2>{CONFIG.couple}</h2><p>Dengan penuh syukur, kami menantikan perjumpaan di hari yang istimewa.</p><span className="footer-date">24 · 10 · 2026</span></footer>
    <button className="music-toggle" onClick={() => { if (playing) setPlaying(false); else playAmbient(setPlaying, audioRef); }} aria-label={playing ? "Jeda musik" : "Putar musik"}>{playing ? <Pause size={16} /> : <Music2 size={16} />}<span>{playing ? "Jeda musik" : "Putar musik"}</span></button>
    <nav className="mobile-nav">{[["story", "Cerita"], ["event", "Acara"], ["gallery", "Galeri"], ["rsvp", "RSVP"], ["gift", "Kasih"]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + images.length - 1) % images.length); }} aria-label="Foto sebelumnya"><ChevronLeft /></button><figure onClick={(e) => e.stopPropagation()}><img src={images[lightbox].src} alt={images[lightbox].alt} /><figcaption>{String(lightbox + 1).padStart(2, "0")} — {images[lightbox].caption}</figcaption></figure><button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }} aria-label="Foto berikutnya"><ChevronRight /></button></div>}
  </div>;
}
