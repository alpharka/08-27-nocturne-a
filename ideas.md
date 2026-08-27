# Arah Desain Undangan Digital

## Tiga Pendekatan Awal

### Theme Name: Nocturne Botanica
**Very Brief Intro:** Romansa malam yang intim dengan botanical silhouettes, tinta biru-hitam, dan kilau tembaga seperti cahaya lilin. Nuansanya editorial, dewasa, dan personal.

**Probability:** 0.07

### Theme Name: Linen & Sunlit Vows
**Very Brief Intro:** Editorial coastal yang hangat dengan linen, pasir pucat, biru laut kusam, dan komposisi lapang seperti halaman majalah perjalanan. Terasa ringan, jujur, dan kontemporer.

**Probability:** 0.03

### Theme Name: Vermilion Ceremony
**Very Brief Intro:** Japanese modern dengan kertas hangat, vermilion, cap geometris, dan ritme whitespace yang presisi. Terasa tenang namun berkarakter, seperti kartu undangan yang dikurasi.

**Probability:** 0.08

## Pilihan Utama: Nocturne Botanica

### Design Movement
Editorial dark romanticism dengan pengaruh botanical engraving dan still-life fotografi malam. Arah ini mengubah undangan dari template menjadi artefak visual yang terasa seperti halaman pembuka sebuah buku cinta.

### Core Principles
1. **Intim, bukan ornamental berlebihan:** setiap ornamen harus terasa seperti jejak personal, bukan dekorasi generik.
2. **Kontras taktil:** permukaan tinta gelap, kertas hangat, dan highlight tembaga menciptakan kedalaman tanpa gradient ungu atau kartu seragam.
3. **Editorial asymmetry:** kolom miring, margin lebar, garis tipis, dan alignment yang sengaja tidak simetris membangun ritme visual.
4. **Motion yang hening:** transisi lambat dan ringan, lebih dekat ke membuka halaman daripada efek aplikasi.

### Color Philosophy
Warna dasar adalah **ink navy** (#101C24), bukan hitam pekat, supaya malam terasa dalam tetapi tetap bernapas. **Bone paper** (#F3EBDD) memberi rasa arsip dan kehangatan pada section konten. **Copper leaf** (#B77B5D) dipakai hemat sebagai tanda perhatian untuk tanggal, divider, dan aksi penting. **Moss shadow** (#46534A) menjadi aksen alami yang menahan komposisi agar tidak terasa terlalu dramatis.

### Layout Paradigm
Halaman memakai alur editorial vertikal dengan hero full-bleed, detail acara berbentuk dua kolom, timeline cerita yang menggeser sumbu, dan masonry gallery. Konten tidak dipaksa ke dalam kumpulan kartu; garis dan whitespace menjadi pemisah utama.

### Signature Elements
1. Emblem berbentuk dua lengkung daun yang mengapit bintang kecil.
2. Garis tembaga setipis ukiran dengan nomor section bergaya margin editorial.
3. Tekstur grain halus dan siluet botanical yang muncul sebagai watermark.

### Interaction Philosophy
Setiap interaksi terasa seperti menyentuh benda fisik: tombol memiliki respons tekan singkat, reveal muncul seperti halaman yang dibalik, dan lightbox menjaga fokus seperti melihat satu foto di meja. Feedback harus jelas tetapi tidak memecah suasana.

### Animation
Cover bergerak slide-up selama 700ms dengan easing cubic-bezier(0.77, 0, 0.175, 1). Setelah cover terbuka, navigasi dan hero melakukan fade-in bertahap 60ms antar elemen. Section reveal menggunakan opacity + translateY 18px dan scale 0.985. Gallery hanya memakai zoom kecil 1.035 saat hover. Lightbox memakai fade-in 220ms dan tidak menggunakan animasi layout. Semua motion non-esensial dimatikan pada prefers-reduced-motion.

### Typography System
Display memakai **Cormorant Garamond** dengan weight 500–600, memberi rasa klasik tanpa terlihat kuno. Body memakai **DM Sans** pada weight 400–500 agar tetap bersih dan mudah dibaca. Label metadata menggunakan DM Sans uppercase dengan tracking 0.18em. Nama pasangan boleh memakai italic Cormorant sebagai aksen intim, bukan untuk seluruh teks.

### Brand Essence
**Sebuah undangan malam yang dikurasi untuk pasangan yang ingin pernikahannya dikenang sebagai suasana, bukan sekadar jadwal.**

Personality adjectives: **intimate, cinematic, considered**.

### Brand Voice
Headline terdengar dekat, spesifik, dan puitis secukupnya. CTA terdengar seperti ajakan personal, bukan jargon produk.

Contoh headline: “Malam ini, kami memilih pulang ke satu sama lain.”

Contoh CTA: “Buka halaman cerita kami” dan “Tandai tanggal ini di kalender”.

### Wordmark & Logo
Emblem grafis tanpa teks berupa dua daun asimetris yang membentuk lengkung oval terbuka, dengan satu titik bintang di ruang tengah. Mark ini dipakai pada cover, header, footer, dan favicon; wordmark nama pasangan tetap dibentuk dengan Cormorant Garamond italic dan tidak dijadikan logo utama.

### Signature Brand Color
**Copper Leaf — #B77B5D**, warna tembaga kusam seperti foil yang terkena cahaya lilin; cukup khas untuk menjadi penanda brand, tetapi tetap menyatu dengan palet malam dan kertas.

## Style Decisions
- Gunakan dark romantic editorial sebagai arah visual tunggal; jangan mencampur coastal, tropical, atau Japanese minimal pada implementasi.
- Hero visual harus low-key agar teks bone paper memiliki kontras kuat.
- Hindari Inter, purple gradient, excessive rounded cards, dan centered-everything.
- Gunakan placeholder data terpusat yang mudah diganti dan tandai data pembayaran contoh dengan jelas.
