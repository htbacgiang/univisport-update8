# SPRINT 6.2.2-A – CLAUDE REVIEW: `/gioi-thieu` & `/xuong-may-dong-phuc-univi`

- **Ngày review:** 08/11/2026
- **Người thực hiện:** Claude (review + lập kế hoạch; **không sửa code, không ghi DB, không deploy**)
- **Phạm vi:** `/gioi-thieu`, `/xuong-may-dong-phuc-univi`, component dùng chung ảnh hưởng trực tiếp tới hai URL này
- **Nguồn chuẩn:** `brand-fact-sheet.md` v1.0, `brand-facts.json` v1.0, `brand-claims.md` v1.0, `brand-conflicts.md` v1.0, `SPRINT-6.2.2-BEFORE-AFTER.md`, `SPRINT-6.1-AI-VISIBILITY-BASELINE.md`

> **Lưu ý về tài liệu đầu vào:** 4 file brand và `SPRINT-6.2.2-BEFORE-AFTER.md` **không nằm trong repository**. Chúng được tìm thấy tại `C:\Users\A\Downloads\` (Before/After và Website Audit ở dạng `.zip`). `SPRINT-6.1-AI-VISIBILITY-BASELINE.md` nằm trong repo tại `reports/sprint-6/`. Khuyến nghị đưa 5 file này vào `reports/sprint-6/` để có một nguồn chuẩn duy nhất được version cùng code.

### Phương pháp & bằng chứng

| Loại kiểm tra | Cách làm | Bằng chứng |
|---|---|---|
| Mã nguồn | Đọc toàn bộ file route + component dùng chung | Trích dẫn `file:line` trong báo cáo |
| HTML server-rendered | `curl` GET 2 URL live ngày 08/11/2026 (HTTP 200), trích title/meta/canonical/H1–H6/alt/JSON-LD/text bằng script, **loại trừ** `__NEXT_DATA__` | `reports/sprint-6/sprint-6.2.2-a/extract-seo-elements.js` |
| Nội dung DB của trang xưởng | Đọc bản ghi Post từ `__NEXT_DATA__` của trang live (chỉ đọc, **không kết nối MongoDB**) | `reports/sprint-6/sprint-6.2.2-a/xuong-post-snapshot-2026-11-08.json` + `xuong-post-content-2026-11-08.html` (dùng làm bản sao lưu trước khi sửa) |
| Repo-wide keyword sweep | ripgrep trên toàn repo (trừ `node_modules`, `.next`, `reports`) | Phụ lục A |

**Không kiểm tra** (không tuyên bố đạt/không đạt): Rich Results Test/Schema validator của Google, GSC, render JS bằng trình duyệt headless, các bài viết khác trong MongoDB ngoài bản ghi của trang xưởng, bản build hiện tại có khớp 100% với commit đang chạy production hay không (đối chiếu thủ công cho `/gioi-thieu`: nội dung live trùng khớp mã nguồn).

---

## 1. Executive Summary

**Cả hai trang đang công bố dữ liệu trái Fact Sheet v1.0 ở những vị trí AI và Google đọc trực tiếp nhất:** title, meta description, H1, H2, Open Graph, JSON-LD, FAQ và alt ảnh.

| # | Phát hiện | Trang | Mức |
|---|---|---|---|
| 1 | "9 năm kinh nghiệm" xuất hiện **10 lần** (title, desc, keywords, H1, H2, body, OG title/desc, Twitter title/desc, JSON-LD AboutPage). Con số được **tự tính** `new Date().getFullYear() - 2017` → sang 01/01/2027 sẽ tự thành **"10 năm"** mà không ai sửa code. | `/gioi-thieu` | P0 |
| 2 | "Hơn 9 năm" viết cứng **2 lần** trong nội dung DB (H2 mục 4 + đoạn kết). | `/xuong-may…` | P0 |
| 3 | Alt ảnh xưởng ghi **"tại Đan Phượng, Hà Nội"** trong khi thân bài ghi Chương Mỹ – mâu thuẫn trong cùng URL. | `/xuong-may…` | P0 |
| 4 | Thời gian **"2–3 ngày | 10–12 ngày"** ở thông số xưởng **và** FAQ #1, kèm câu "cam kết… giao hàng đúng hẹn **cho mọi đơn hàng**" (trái `brand-claims.md` mục C). | `/xuong-may…` | P0 |
| 5 | Timeline 2017 ghi **"xưởng sản xuất đầu tiên đặt tại Sóc Sơn"** – nằm trong HTML server. Mục 2021–2022 có thêm **"xưởng mới tại Hải Dương"** (không có trong Fact Sheet). | `/gioi-thieu` | P0 (cần BĐH xác nhận) |
| 6 | Quy trình lên mẫu ghi **"giao trong vòng 3 ngày"** và **"gia công mẫu 2 ngày"** – lệch mốc chuẩn 3–7 ngày làm việc. | `/gioi-thieu` | P0 |
| 7 | **"Tất cả sản phẩm… giá hấp dẫn chỉ từ 99.000 đ"** – đúng mẫu câu bị cấm ("giá chung"). | `/gioi-thieu` | P0 |
| 8 | MOQ "từ 10 chiếc" + "Gym mẫu riêng tối thiểu 80 chiếc" **đúng quyết định BĐH** nhưng chưa nêu điều kiện/“các dòng khác theo báo giá”. | `/xuong-may…` | P1 |
| 9 | Claim cần bằng chứng: "Vải UNI DRY **kiểm định QCVN**" (meta/OG/keywords), "**1000+ khách hàng**", "UNI DRY **độc quyền**", "**200–300 lần giặt**", "giữ form **2–3 năm**", "**bảo hành 60 ngày** hình in" (trang chính sách bảo hành ghi **30 ngày**), "**gần 100 công nhân**", tên khách hàng Sun Group/Vingroup/TKV… | cả hai | P1 |
| 10 | Câu định vị chính thức chưa có trên cả hai trang (`/gioi-thieu` có phiên bản rút gọn, thiếu danh sách bộ môn). | cả hai | P1 |

**Điểm đã đạt:** "Thành lập: 2017" (`/gioi-thieu`), tên pháp nhân đúng, canonical tự tham chiếu đúng, `index, follow`, BreadcrumbList hợp lệ, toàn bộ body + câu trả lời FAQ của trang xưởng **có trong HTML server** (thẻ `<details>`), Organization schema **không** chứa dữ liệu chưa xác minh.

**Phát hiện kiến trúc quan trọng:** `/xuong-may-dong-phuc-univi` **không có file nội dung trong repo** – toàn bộ title, meta, body, alt, FAQ nằm trong MongoDB (collection `posts`, `_id 6a002351ed66e0ea91519cbf`). Sửa trang này = **ghi DB**, cần phê duyệt riêng (xem mục 7, 9).

**Kết luận:** **NOT READY FOR IMPLEMENTATION** ở trạng thái hiện tại – sẵn sàng cho phần code `/gioi-thieu` ngay khi BĐH trả lời 4 câu hỏi chặn (Q1–Q4, mục 9). Chi tiết mục 10.

---

## 2. Repository Architecture

| Hạng mục | Thực tế |
|---|---|
| Framework | Next.js (Pages Router, `pages/`), React; script `next build` / `next dev --webpack` |
| Rendering | **SSR** qua `getServerSideProps` cho cả hai trang; response `Cache-Control: private, no-cache, no-store` (không cache tầng CDN) |
| CMS | Không có headless CMS. Hai mô hình song song: **(a)** trang hard-code trong JSX (`pages/gioi-thieu`, các pillar `components/univisport/bai-viet/*`); **(b)** bài viết/“Direct Post” lưu MongoDB (model `models/Post`), sửa qua dashboard admin, render bằng `components/layout/DirectPostView.tsx` |
| Nhúng component trong nội dung DB | HTML trong DB có thể chứa `<div data-component="X" data-props="{…}">` → `DirectPostView` map sang React component (`COMPONENT_MAP`, `DirectPostView.tsx:31-46`) |
| SEO head | Tập trung ở `pages/_app.js`: mỗi trang trả `meta` từ `getServerSideProps` → `_app` render `<title>`, description, keywords, canonical, OG, Twitter, và JSON-LD (`meta.schema`) |
| Entity toàn site | `pages/_app.js:54-89` – Organization (stub: name, url, logo) + WebSite, inject mọi trang |
| NAP dùng chung | `lib/companyInfo.ts` → Footer, `_app`, `components/univi/ContactPage.jsx` |
| Nguồn facts cho AI viết bài | `lib/knowledgeBase.ts` → `pages/api/ai/generate.ts` (công cụ tạo nội dung trong dashboard) |
| File cho AI crawler | `public/llms.txt`, `public/llms-full.txt` (tĩnh) |

---

## 3. File Mapping theo URL

### 3.1 `/gioi-thieu`

| Thành phần trên trang | File | Ghi chú |
|---|---|---|
| Route, H1 (sr-only), mục I–II, khối năng lực, ảnh xưởng | `pages/gioi-thieu/index.jsx:11-302` | `yearsExperience` tính ở dòng 14 |
| Title, description, keywords, canonical, OG, Twitter, JSON-LD (Breadcrumb + AboutPage) | `pages/gioi-thieu/index.jsx:305-377` (`getServerSideProps`) | `yearsExperience` tính lại ở dòng 306 |
| Timeline 2017→2026 | `components/univisport/AboutNavigation.jsx` | **Chỉ dùng ở `/gioi-thieu`** |
| Mục II (lặp)–VIII: định hướng, tầm nhìn, năng lực, quy trình lên mẫu, lĩnh vực, cam kết, cộng đồng | `components/univisport/AboutUniviPage.jsx` | **Chỉ dùng ở `/gioi-thieu`** |
| Lưới danh mục | `components/univisport/CategoryGrid.tsx` | Dùng chung (home, bài viết, DirectPost) – không có fact sai |
| Logo đối tác | `components/univisport/PartnersSection.jsx` | Dùng chung ≥12 nơi – alt chung chung "Partner N logo" |
| Navbar, Footer, nút chat | `components/layout/DefaultLayout.tsx` → `components/header/Navbar.jsx`, `components/common/Footer.tsx` | Footer đọc `COMPANY_INFO.office` + 1 hotline – không có fact sai |
| Organization + WebSite JSON-LD | `pages/_app.js:54-89` | Toàn site |
| Video hero | `public/gioi-thieu-univi.mp4` (16,6 MB, `preload="auto"`) | Rủi ro hiệu năng, ngoài phạm vi brand |

### 3.2 `/xuong-may-dong-phuc-univi`

| Thành phần trên trang | Nguồn | Ghi chú |
|---|---|---|
| Route | `pages/[slug].tsx` | Tìm `Post.findOne({ slug, isDirectPost: true })` |
| `<title>`, H1, OG title, breadcrumb name, og:image:alt | DB `posts.title` | Cùng 1 trường → đổi title = đổi cả H1 + breadcrumb |
| Meta description, OG/Twitter description | DB `posts.meta` | |
| `<meta name="keywords">` | DB `posts.tags` (`[""]`) | Đang render thẻ keywords rỗng |
| Toàn bộ body, H2–H3, ảnh + alt, khối liên hệ | DB `posts.content` (HTML, 8.839 ký tự) | Snapshot: `reports/sprint-6/sprint-6.2.2-a/xuong-post-content-2026-11-08.html` |
| FAQ (4 câu) | DB `posts.faqs[]` | Render SSR trong `DirectPostView.tsx:267-293` |
| Tác giả "Trần Hiền – Founder Univi Sport" | DB `authors` (populate `postAuthor`) | |
| Catalog 5 dòng vải (H2 "CHẤT LIỆU UNI AIR - UNIA12") | `components/univisport/chat-lieu-vai/FabricCatalogView.jsx` + `data/fabricMaterials` | Nhúng qua `data-component="FabricCatalogView" data-props='{"defaultTab":"uniair"}'` |
| Style khối liên hệ cuối bài | `components/layout/DirectPostView.tsx:108-120` | **Phụ thuộc chuỗi "UNIVI SPORTS UNIFORM"** (xem mục 6) |
| JSON-LD | `pages/[slug].tsx:115-124` (chỉ BreadcrumbList) + `_app.js` (Organization, WebSite) | Không có FAQPage/WebPage |

---

## 4. Brand Conflict Audit

Phân loại: **(1)** Chính xác, giữ · **(2)** Sai, cần sửa · **(3)** Có điều kiện áp dụng · **(4)** Chưa đủ bằng chứng, cần xác minh.

### 4.1 Bảng từ khóa bắt buộc (phạm vi 2 URL)

| Từ khóa | Kết quả trong phạm vi | Phân loại |
|---|---|---|
| 8 năm kinh nghiệm | Không xuất hiện | — |
| 9 năm kinh nghiệm | `/gioi-thieu`: 10 vị trí (tự tính); `/xuong-may…`: 2 vị trí (DB) | **(2)** |
| Đan Phượng | `/xuong-may…`: alt ảnh xưởng (DB). Gốc rễ: `lib/knowledgeBase.ts:178` (“xưởng Đan Phượng”) | **(2)** |
| Thọ An | Không xuất hiện trong 2 URL, không có trong repo | — |
| Sóc Sơn | `AboutNavigation.jsx:11` – "xưởng sản xuất đầu tiên đặt tại Sóc Sơn" (bối cảnh lịch sử 2017) | **(4)** |
| Chương Mỹ | `/gioi-thieu`: alt + OG alt + JSON-LD ("phường Chương Mỹ"); `/xuong-may…`: 2 vị trí body ("Chương Mỹ", "phường Chương Mỹ") | Cấp khu vực **(1)**; tiền tố "phường" **(4)** |
| MOQ 10 | `/xuong-may…`: "Số lượng tối thiểu nhận chính sách đối tác: từ 10 chiếc" | **(3)** |
| MOQ 80 | `/xuong-may…`: "Đồng phục Gym theo mẫu riêng: tối thiểu 80 chiếc" | **(1)** – giữ nguyên theo BĐH |
| 2–3 ngày | `/xuong-may…`: thông số xưởng + FAQ #1 | **(2)** |
| 3–7 ngày | Không xuất hiện trong 2 URL | Cần bổ sung |
| 7–10 ngày | Không xuất hiện trong 2 URL | — |
| 10–12 ngày | `/xuong-may…`: thông số xưởng + FAQ #1 | **(2)** |
| 99.000đ | `AboutUniviPage.jsx:370` – "Tất cả sản phẩm… chỉ từ 99.000 đ" | **(2)** |
| 360.000đ | Không xuất hiện trong 2 URL | — |
| *Bổ sung:* "3 ngày", "2 ngày" | `AboutUniviPage.jsx:232-233` | **(2)** / **(4)** |
| *Bổ sung:* "2–3 năm" | `/xuong-may…` "giữ form 2–3 năm" (độ bền, không phải lead time) | **(4)** |
| *Bổ sung:* Hải Dương | `AboutNavigation.jsx:26` – "xưởng mới tại Hải Dương" (chỉ hiện khi click, không có trong HTML server) | **(4)** |

### 4.2 Chi tiết từng vị trí – `/gioi-thieu`

| ID | Vị trí | Nội dung hiện tại (live = repo) | Phân loại | Xử lý |
|---|---|---|---|---|
| G01 | `index.jsx:14`, `:306` | `const yearsExperience = new Date().getFullYear() - 2017;` | **(2)** | **Xóa biến** ở cả hai nơi; mọi chỗ dùng chuyển sang năm thành lập cố định |
| G02 | `index.jsx:44` H1 (sr-only) | "…Xưởng may đồng phục thể thao **9 năm kinh nghiệm** tại Hà Nội" | **(2)** | Mục 5, G-H1 |
| G03 | `index.jsx:81` H2 | "I. Hành trình **9 năm** phát triển" | **(2)** | Mục 5, G-H2 |
| G04 | `index.jsx:89` | "Đồng Phục Univi là đơn vị  tiên phong… cho các chuỗi phòng tập và đội nhóm thể thao tại Việt Nam" (thiếu danh sách bộ môn, có 2 dấu cách) | **(3)** | Thay bằng câu định vị chính thức (chờ Q4) |
| G05 | `index.jsx:92` | "Với hơn **9 năm kinh nghiệm**… cái tên quen thuộc trong ngành thời trang đồng phục" | **(2)** | Mục 5, G-B2 |
| G06 | `index.jsx:127` | CÔNG TY CỔ PHẦN TẬP ĐOÀN UNICORE HOLDINGS | **(1)** | Giữ |
| G07 | `index.jsx:129` | "MST: 0111401705" | **(4)** | Fact Sheet để `tax_id: null`. **Giữ hiển thị** (đang đúng với `lib/companyInfo.ts`) nhưng **không** đưa vào Schema tới khi BĐH xác nhận (Q8) |
| G08 | `index.jsx:143` | "Thành lập: 2017" | **(1)** | Giữ |
| G09 | `index.jsx:147`, `:151` | "Xưởng sản xuất: 2.000m²", "Công suất: 100.000 sản phẩm/tháng" | **(3)** | Fact Sheet ghi "khoảng"; `brand-claims` B yêu cầu bằng chứng → thêm "khoảng", gắn địa điểm Chương Mỹ |
| G10 | `index.jsx:159` | "Khách hàng: **1000+** doanh nghiệp, phòng tập và câu lạc bộ" | **(4)** | `brand-claims` B: cần bằng chứng (Q6). Nếu chưa có → bỏ con số |
| G11 | `index.jsx:168`, `:363` (og:image:alt) | "…tại **phường** Chương Mỹ, Hà Nội — diện tích 2.000m²" | **(4)** | Bỏ "phường" tới khi xác nhận đơn vị hành chính (Q3); xác nhận ảnh chụp tại Chương Mỹ (Q5) |
| G12 | `index.jsx:203` | "…đặc biệt là **vị trí số 1** trong mảng Đồng Phục Thể Thao chuyên sâu" | **(3)** | Là "định hướng" nhưng chính quy chuẩn nội bộ `lib/knowledgeBase.ts:176` **cấm** "số 1", "hàng đầu" → viết lại |
| G13 | `index.jsx:326` JSON-LD AboutPage.description | "…xưởng 2.000m² tại phường Chương Mỹ… **Hơn 9 năm kinh nghiệm, 1000+ khách hàng**…" | **(2)** | Mục 5, G-LD |
| G14 | `index.jsx:338-340` | `primaryImageOfPage` khai báo 1200×630; ảnh thật **2253×1230** | **(2)** kỹ thuật | Sửa kích thước thật hoặc bỏ `width/height` |
| G15 | `index.jsx:350` title | "Đồng Phục Univi: Xưởng May **9 Năm Kinh Nghiệm** Tại Hà Nội" | **(2)** | Mục 5, G-T |
| G16 | `index.jsx:351` description | "…**9+ năm kinh nghiệm**… Vải UNI DRY **kiểm định QCVN**…" | **(2)** + **(4)** | Mục 5, G-D. QCVN: knowledgeBase nội bộ cấm nhắc QCVN; chưa có phiếu kiểm nghiệm trong hồ sơ |
| G17 | `index.jsx:352` keywords | "…kiểm định QCVN, **9 năm kinh nghiệm**" | **(2)** | Bỏ 2 cụm này |
| G18 | `index.jsx:357-358`, `:369-370` OG/Twitter | "Xưởng May 9 Năm Kinh Nghiệm"; "9+ năm… Vải UNI DRY **nhập khẩu**, kiểm định QCVN ." | **(2)** + **(4)** | Mục 5, G-OG |
| G19 | `AboutNavigation.jsx:11` (2017) | "thành lập tại Hà Đông… xưởng sản xuất đầu tiên đặt tại **Sóc Sơn**… Công ty TNHH **Bảo Phong Evenes** – tiền thân… tháng **7/2017**" | **(4)** | Mô tả lịch sử, không phải xưởng hiện tại. `brand-claims` C cấm Sóc Sơn "khi chưa có xác nhận mới" → chờ Q2 |
| G20 | `AboutNavigation.jsx:26` (2021–2022) | "mở rộng… với xưởng mới tại **Hải Dương**" | **(4)** | Chờ Q2 |
| G21 | `AboutNavigation.jsx:36` (2026) | "Từ tháng 3 năm 2026… chuyển đổi thành CÔNG TY CỔ PHẦN TẬP ĐOÀN UNICORE HOLDINGS" | **(1)** tên / **(4)** mốc tháng | Giữ; không dùng tháng 3/2026 cho Schema khi chưa xác nhận |
| G22 | `AboutUniviPage.jsx:116` | "…trở thành **lựa chọn hàng đầu** trong mảng Đồng Phục Thể Thao" | **(3)** | Văn phong chiến lược; xem G12 |
| G23 | `AboutUniviPage.jsx:129` H4 thẻ tầm nhìn | "**Số 1 Đồng Phục Thể Thao** / tại Việt Nam" (đứng một mình, đọc như claim hiện tại) | **(2)** | Viết lại (mục 5) |
| G24 | `AboutUniviPage.jsx:172`, `:180` | alt "Phân xưởng sản xuất **số 03** tại Hà Nội"; figcaption "phân xưởng **sản** tại Hà Nội" (lỗi chính tả) | **(4)** + lỗi | Ngụ ý ≥3 xưởng – chưa có bằng chứng |
| G25 | `AboutUniviPage.jsx:227`, `:364` | "cam kết tất cả vải… đều có **kiểm định an toàn với da**" | **(4)** | `brand-claims` C: không dùng số liệu kiểm nghiệm không có tài liệu |
| G26 | `AboutUniviPage.jsx:232` | "mẫu có sẵn… giao hàng trong vòng **3 ngày** (bao gồm in Logo)" | **(2)** | Thay mốc chuẩn |
| G27 | `AboutUniviPage.jsx:233` | "đơn thiết kế, thời gian gia công mẫu trong vòng **2 ngày** từ ngày chốt mẫu rập" | **(4)** | Mốc **công đoạn làm mẫu**, khác loại với thời gian sản xuất. Theo ghi chú `BEFORE-AFTER` §1: cần chủ quy trình xác nhận (Q1) |
| G28 | `AboutUniviPage.jsx:346` | "cam kết **không tính phí** nếu sản phẩm không đạt chuẩn" | **(4)** | Đối chiếu `/chinh-sach-bao-hanh` (30 ngày, bảo hành 100% chi phí sửa chữa) |
| G29 | `AboutUniviPage.jsx:368-370` | H4 "Giá Cả Hợp Lí **Nhất**" + "**Tất cả** sản phẩm… giá hấp dẫn **chỉ từ 99.000 đ** cho các sản phẩm trung cao cấp" | **(2)** | Đúng mẫu câu cấm ở `brand-claims` C |

### 4.3 Chi tiết từng vị trí – `/xuong-may-dong-phuc-univi` (DB)

| ID | Trường DB | Nội dung hiện tại | Phân loại | Xử lý |
|---|---|---|---|---|
| X01 | `content` – đoạn 2 | "hệ thống xưởng sản xuất khép kín **hơn** 2.000m² tại Chương Mỹ, Hà Nội và công nghệ vải UNI DRY **độc quyền**" | Chương Mỹ **(1)**; "hơn" **(3)**; "độc quyền" **(4)** | Mục 5, X-B1 |
| X02 | `content` – `<img alt>` ảnh flickr `55260553380` | "Xưởng may Đồng phục Univi quy mô 2.000m² tại **Đan Phượng**, Hà Nội" | **(2)** | Mục 5, X-ALT (chờ Q5 về ảnh) |
| X03 | `content` – Thông số: Diện tích | "Hơn 2.000m² tại **phường** Chương Mỹ, Hà Nội" | **(3)/(4)** | "Khoảng 2.000 m² tại Chương Mỹ, Hà Nội" |
| X04 | `content` – Thông số: Nhân lực | "Gần **100 công nhân** chuyên nghiệp" | **(4)** | Không có trong Fact Sheet → chờ Q6 |
| X05 | `content` – Thông số: Năng lực | "Gần 100.000 sản phẩm/tháng" | **(3)** | "Khoảng 100.000 sản phẩm/tháng" |
| X06 | `content` – Thông số: Giao hàng | "Mẫu có sẵn **2–3 ngày** \| Đơn thiết kế riêng **10–12 ngày**" | **(2)** | Mục 5, X-LT |
| X07 | `content` – Bước 1 + FAQ #4 | "mockup trong vòng **1 giờ**" | **(4)** | Cam kết SLA dịch vụ – BĐH xác nhận hoặc đổi "trong ngày làm việc" |
| X08 | `content` – Bước 3 + FAQ #3 + mục 4 | "bền màu qua **200–300 lần giặt**", "giữ form **2–3 năm**" | **(4)** | `brand-claims` B/C – cần phiếu test |
| X09 | `content` – Bước 4 | "100% sản phẩm qua QC… **chính sách bảo hành 60 ngày hình in**" | **(4)** – **mâu thuẫn** | `/chinh-sach-bao-hanh` ghi **30 ngày** (`pages/chinh-sach-bao-hanh.jsx:121`). Chờ Q7 |
| X10 | `content` – mục 4, đoạn 1 | "**Hơn 9 năm hoạt động**… đối tác tin cậy của **hàng trăm** doanh nghiệp và chuỗi phòng tập" | **(2)** + **(4)** | Mục 5, X-B4 |
| X11 | `content` – mục 4, đoạn 2 | Danh sách đối tác: KickFit Sports, FitCaree, ZENFIT… **Sun Group, Premier Village, Vingroup, Tập đoàn Than Khoáng sản Việt Nam** | **(4)** | `brand-claims` B: tên khách hàng cần bằng chứng/đồng ý công bố (Q6). **Không tự xóa** |
| X12 | `content` – mục 4, bullet 4 | "năng lực 100.000 sản phẩm/tháng, nhận đơn hàng lớn **mà không lo trễ hạn**" | **(2)** | Cam kết tiến độ phổ quát |
| X13 | `content` – mục 5 | "Số lượng tối thiểu nhận chính sách đối tác: **từ 10 chiếc**. Đồng phục Gym theo mẫu riêng: **tối thiểu 80 chiếc**." | 10 → **(3)**; 80 → **(1)** | Mục 5, X-MOQ. **Giữ 80** |
| X14 | `content` – đoạn kết | "**hơn 9 năm kinh nghiệm**, xưởng sản xuất 2.000m² tại Hà Nội, công nghệ vải UNI DRY **độc quyền** và cam kết chất lượng **được kiểm định** rõ ràng" | **(2)** + **(4)** | Mục 5, X-B5 |
| X15 | `content` – khối liên hệ | "**UNIVI SPORTS UNIFORM** — YOUR UNIFORM, YOUR BRAND!"; văn phòng Hà Đông; 2 hotline | Tên **(4)**; địa chỉ/hotline **(4)** | Đổi tên hiển thị → "ĐỒNG PHỤC UNIVI" **chỉ sau khi** sửa matcher ở `DirectPostView.tsx:113` (mục 6). Địa chỉ/hotline giữ nguyên chờ Q9 |
| X16 | `faqs[0]` | "…mẫu có sẵn trong **2–3 ngày** và đơn thiết kế riêng từ **10–12 ngày**. Chúng tôi **cam kết**… giao hàng đúng hẹn **cho mọi đơn hàng**." | **(2)** | Mục 5, X-FAQ1 |
| X17 | `faqs[1]` | UNI DRY "cơ chế van một chiều… ngăn thấm ngược" | **(4)** | Thuộc A12/A13 (Sprint chất liệu); giữ, gắn cờ |
| X18 | `meta` | "…UNI DRY **vượt trội**, mồ hôi **không thấm ngược**… với **giá gốc tại xưởng**." | **(4)** | Mục 5, X-D |
| X19 | `postAuthor` | "Trần Hiền – **Founder Univi Sport**" | **(4)** | Fact Sheet: founder chưa được phép công bố, "Univi Sport" là tên thay thế chưa xác minh (Q10). Không thuộc 2 URL nhưng hiển thị trên trang |
| X20 | `FabricCatalogView` (UNI AIR) | "90% Polyester 10% Elastane, 150 GSM" | **(4)** | `brand-fact-sheet` §8: không tự thêm GSM/thành phần khi chưa có hồ sơ. Dữ liệu dùng chung với `/chat-lieu-vai` → xử lý ở sprint A12/A13, **không sửa trong 6.2.2-A** |
| X21 | `content` – "Năm Dòng Vải Chuyên Dụng" | Site: UNI AIR, QUICKDRY, SUPERCOOL, COOL PIQUÉ, ELITE. Fact Sheet §8: UNI DRY, QUICK DRY, UNI SUPER COOL, **UNI BLENDED** | **(4)** | Danh mục dòng vải trên site và Fact Sheet không khớp (Q11) |

---

## 5. Before / After đề xuất

Nguyên tắc: giữ search intent ("giới thiệu Univi" – điều hướng thương hiệu; "xưởng may đồng phục thể thao" – năng lực sản xuất), giữ CTA và cấu trúc H2, không thêm số liệu mới. Các câu **[CHỜ Qn]** chỉ phát hành sau khi BĐH trả lời.

### 5.1 `/gioi-thieu` (code – `pages/gioi-thieu/index.jsx`, `AboutNavigation.jsx`, `AboutUniviPage.jsx`)

**G-T – Title (`index.jsx:350`)**
- Before: `Đồng Phục Univi: Xưởng May 9 Năm Kinh Nghiệm Tại Hà Nội` (55 ký tự)
- After (khuyến nghị): `Giới Thiệu Đồng Phục Univi – Đồng Phục Thể Thao B2B Từ 2017` (59 ký tự)
- Lý do: giữ "giới thiệu" + tên thương hiệu (intent điều hướng), thêm năm thành lập thay số năm. Bỏ "Xưởng May… Tại Hà Nội" để không cạnh tranh từ khóa với `/xuong-may-dong-phuc-univi` – trang có đúng intent đó. Phương án trong `BEFORE-AFTER` A01 (`Đồng Phục Univi – Giải Pháp Đồng Phục Thể Thao B2B`, 50 ký tự) cũng hợp lệ nhưng mất từ "giới thiệu".

**G-D – Meta description (`index.jsx:351`)**
- Before: `Đồng Phục Univi thành lập 2017 tại Hà Nội — xưởng 2.000m², công suất 100.000 sp/tháng, 9+ năm kinh nghiệm. Chuyên đồng phục Gym, Yoga, Pickleball cho phòng tập & doanh nghiệp. Vải UNI DRY kiểm định QCVN. Thiết kế miễn phí.` (222 ký tự – bị cắt)
- After: `Đồng Phục Univi thành lập năm 2017, cung cấp giải pháp đồng phục thể thao B2B cho chuỗi phòng tập và đội nhóm Gym, Yoga, Pilates, Pickleball. Nhà máy tại Chương Mỹ, Hà Nội.` (≈172 ký tự; có thể bỏ "Pickleball" nếu muốn ≤160)

**G-K – Keywords (`index.jsx:352`)**: bỏ `kiểm định QCVN` và `${yearsExperience} năm kinh nghiệm`; thêm `thành lập 2017`.

**G-OG – OG/Twitter (`index.jsx:357-358`, `:369-370`)**
- og:title / twitter:title: `Giới Thiệu Đồng Phục Univi – Thành Lập Năm 2017`
- og:description / twitter:description: `Giải pháp đồng phục thể thao B2B cho chuỗi phòng tập và đội nhóm. Thành lập năm 2017, nhà máy tại Chương Mỹ, Hà Nội.`
- og:imageAlt (`:363`): như G-ALT bên dưới.

**G-H1 (`index.jsx:43-45`)**
- Before: `Giới thiệu Đồng Phục Univi – Xưởng may đồng phục thể thao {yearsExperience} năm kinh nghiệm tại Hà Nội`
- After: `Giới thiệu Đồng Phục Univi – Giải pháp đồng phục thể thao chuyên nghiệp, thành lập năm 2017`

**G-H2 (`index.jsx:81`)**
- Before: `I. Hành trình <span>{yearsExperience} năm</span> phát triển`
- After: `I. Hành trình phát triển <span>từ năm 2017</span>`

**G-B1 – Đoạn định vị (`index.jsx:89`)** **[CHỜ Q4]**
- Before: `Đồng Phục Univi là đơn vị  tiên phong cung cấp giải pháp đồng phục thể thao chuyên nghiệp cho các chuỗi phòng tập và đội nhóm thể thao tại Việt Nam`
- After (nguyên văn Fact Sheet): `Đồng Phục Univi is TIÊN PHONG cung cấp giải pháp đồng phục thể thao chuyên nghiệp cho các chuỗi phòng tập và các đội nhóm tập Gym, Fitness, Pickleball, Yoga, Running, Pilates, MMA... tại Việt Nam.`
- Biến thể nếu BĐH xác nhận "is" là lỗi đánh máy (khớp `lib/knowledgeBase.ts:175`): `Đồng Phục Univi là đơn vị TIÊN PHONG cung cấp giải pháp…`

**G-B2 – Đoạn kinh nghiệm (`index.jsx:92`)**
- Before: `Với hơn {yearsExperience} năm kinh nghiệm trong lĩnh vực thiết kế đồng phục, chúng tôi đã trở thành một cái tên quen thuộc trong ngành thời trang đồng phục.`
- After: `Thành lập năm 2017, Univi khởi đầu với đồng phục doanh nghiệp và từ năm 2023 tập trung vào đồng phục thể thao chuyên sâu – từ thiết kế, lựa chọn chất liệu đến sản xuất và kiểm soát chất lượng.`
- Căn cứ: lấy từ chính timeline trên trang (`AboutNavigation.jsx:11`, `:31`), không thêm dữ liệu mới.

**G-CAP – Khối năng lực (`index.jsx:147`, `:151`, `:159`)**
- `Xưởng sản xuất: 2.000m²` → `Nhà máy: khoảng 2.000 m² tại Chương Mỹ, Hà Nội`
- `Công suất: 100.000 sản phẩm/tháng` → `Công suất: khoảng 100.000 sản phẩm/tháng`
- `Khách hàng: 1000+ doanh nghiệp…` → **[CHỜ Q6]** giữ nếu có bằng chứng; nếu không: `Khách hàng: doanh nghiệp, phòng tập và câu lạc bộ thể thao trên toàn quốc.`

**G-ALT – Ảnh xưởng (`index.jsx:168`, `:363`)** **[CHỜ Q3, Q5]**
- Before: `Xưởng sản xuất đồng phục thể thao Đồng Phục Univi tại phường Chương Mỹ, Hà Nội — diện tích 2.000m²`
- After: `Nhà máy sản xuất đồng phục thể thao của Đồng Phục Univi tại Chương Mỹ, Hà Nội`

**G-V – Tầm nhìn (`index.jsx:203`, `AboutUniviPage.jsx:129`)**
- `…đặc biệt là vị trí số 1 trong mảng Đồng Phục Thể Thao chuyên sâu.` → `…đặc biệt trong mảng Đồng Phục Thể Thao chuyên sâu.`
- Thẻ H4 `Số 1 Đồng Phục Thể Thao / tại Việt Nam` → `Chuyên sâu Đồng Phục Thể Thao / tại Việt Nam`
- `AboutUniviPage.jsx:116` "lựa chọn hàng đầu" và `:128` "Biểu tượng sáng tạo hàng đầu": giữ hoặc bỏ theo Q12 (văn phong chiến lược).

**G-LD – JSON-LD AboutPage (`index.jsx:326`, `:338-340`)**
- description After: `Đồng Phục Univi thành lập năm 2017, cung cấp giải pháp đồng phục thể thao chuyên nghiệp cho chuỗi phòng tập, câu lạc bộ và đội nhóm tại Việt Nam. Nhà máy đặt tại Chương Mỹ, Hà Nội.`
- `primaryImageOfPage.width/height`: `2253` / `1230` (kích thước file thật), hoặc bỏ hai trường.
- **Không** thêm `foundingDate`, `founder`, `address`, `taxID` vào bất kỳ schema nào trong sprint này.

**G-TL – Timeline (`AboutNavigation.jsx:11`, `:26`)** **[CHỜ Q2]**
- Nếu BĐH xác nhận đây là lịch sử đúng: giữ, thêm câu làm rõ hiện trạng ở mục 2017: `…xưởng sản xuất đầu tiên đặt tại Sóc Sơn. Hiện nay, nhà máy sản xuất của Univi đặt tại Chương Mỹ, Hà Nội.`
- Nếu không xác nhận được: `Đồng Phục Univi chính thức được thành lập năm 2017 tại Hà Nội. Giai đoạn đầu, Univi tập trung…` (bỏ Sóc Sơn); mục 2021–2022: `…công ty mở rộng quy mô sản xuất, bổ sung nguồn lực…` (bỏ Hải Dương).
- "Công ty TNHH Bảo Phong Evenes… tháng 7/2017": giữ nếu xác nhận; tuyệt đối không dùng làm `foundingDate`.

**G-LT – Quy trình lên mẫu, bước 4 (`AboutUniviPage.jsx:230-235`)**
- Before:
  - `Đối với mẫu có sẵn, Univi có thể giao hàng trong vòng 3 ngày (bao gồm thời gian in Logo).`
  - `Đối với đơn hàng thiết kế, thời gian gia công mẫu trong vòng 2 ngày từ ngày chốt mẫu rập.`
- After:
  - `Thời gian sản xuất tham khảo từ 3–7 ngày làm việc, tùy đơn hàng.`
  - `Tiến độ cụ thể được xác nhận theo số lượng, mẫu thiết kế, chất liệu, kỹ thuật hoàn thiện, thời điểm duyệt mẫu và lịch sản xuất.`
  - **[CHỜ Q1]** Chỉ giữ mốc "gia công mẫu 2 ngày" nếu chủ quy trình xác nhận, và ghi rõ là **thời gian làm mẫu**, không phải thời gian sản xuất.

**G-P – Giá (`AboutUniviPage.jsx:368-371`)**
- H4 Before: `Giá Cả Hợp Lí Nhất` → After: `Giá Cả Hợp Lý, Báo Giá Rõ Ràng`
- Before: `Tất cả sản phẩm của Univi đều có mức giá hợp lý. Cam kết chất lượng đi kèm mức giá hấp dẫn chỉ từ 99.000 đ cho các sản phẩm trung cao cấp.`
- After: `Giá được tư vấn theo sản phẩm, chất liệu, số lượng và yêu cầu hoàn thiện. Một số sản phẩm có giá tham khảo từ 99.000đ; báo giá chính thức được xác nhận theo từng đơn hàng.`

**G-S – An toàn da (`AboutUniviPage.jsx:227`, `:364`)** **[CHỜ Q6]**
- Nếu chưa có phiếu kiểm nghiệm: `Univi tư vấn chất liệu phù hợp với nhu cầu sử dụng và cung cấp thông tin chất liệu theo từng mã vải.` / `Chất liệu được lựa chọn theo nhu cầu vận động và tư vấn theo từng mã vải.`

**G-IMG – Ảnh năng lực (`AboutUniviPage.jsx:172`, `:180`)**
- alt: `Phân xưởng sản xuất số 03 tại Hà Nội` → `Khu vực sản xuất tại nhà máy Đồng Phục Univi`
- figcaption: `Hình ảnh tại phân xưởng sản tại Hà Nội` → `Hình ảnh tại nhà máy sản xuất của Đồng Phục Univi`

### 5.2 `/xuong-may-dong-phuc-univi` (dữ liệu DB – `posts._id 6a002351ed66e0ea91519cbf`)

**X-B1 – Đoạn mở (content, đoạn 2)**
- Before: `Với hệ thống xưởng sản xuất khép kín hơn 2.000m² tại Chương Mỹ, Hà Nội và công nghệ vải UNI DRY độc quyền, chúng tôi không chỉ may đồng phục…`
- After: `Với nhà máy sản xuất khép kín khoảng 2.000 m² tại Chương Mỹ, Hà Nội và công nghệ xử lý vải UNI DRY, chúng tôi không chỉ may đồng phục…`
- Tùy chọn (P1): chèn câu định vị chính thức làm câu đầu đoạn này (cùng phương án Q4).

**X-ALT – Ảnh xưởng** **[CHỜ Q5]**
- Before: `Xưởng may Đồng phục Univi quy mô 2.000m² tại Đan Phượng, Hà Nội`
- After (ảnh chụp tại Chương Mỹ): `Nhà máy sản xuất của Đồng Phục Univi tại Chương Mỹ, Hà Nội`
- After (không xác định địa điểm): `Khu vực may trong nhà máy Đồng Phục Univi`

**X-SPEC – Thông số xưởng**
| Dòng | Before | After |
|---|---|---|
| Diện tích | `Hơn 2.000m² tại phường Chương Mỹ, Hà Nội` | `Khoảng 2.000 m² tại Chương Mỹ, Hà Nội` |
| Nhân lực | `Gần 100 công nhân chuyên nghiệp…` | **[CHỜ Q6]** giữ nếu có hồ sơ; nếu không: bỏ dòng |
| Năng lực | `Gần 100.000 sản phẩm/tháng` | `Khoảng 100.000 sản phẩm/tháng` |
| Giao hàng (X-LT) | `Mẫu có sẵn 2–3 ngày \| Đơn thiết kế riêng 10–12 ngày` | `Thời gian sản xuất: tham khảo 3–7 ngày làm việc, tùy đơn hàng – xác nhận theo số lượng, mẫu thiết kế, chất liệu và lịch sản xuất` |

**X-B4 – Mục 4, đoạn 1**
- Before: `Hơn 9 năm hoạt động, Đồng phục Univi đã trở thành đối tác tin cậy của hàng trăm doanh nghiệp và chuỗi phòng tập trên toàn quốc.`
- After: `Thành lập năm 2017, Đồng Phục Univi đồng hành cùng nhiều doanh nghiệp và chuỗi phòng tập trên toàn quốc.`
- Danh sách đối tác: **giữ nguyên** tới khi có Q6.

**X-B4b – Bullet tiến độ**
- Before: `Giao hàng đúng tiến độ - năng lực 100.000 sản phẩm/tháng, nhận đơn hàng lớn mà không lo trễ hạn`
- After: `Tiến độ rõ ràng - công suất khoảng 100.000 sản phẩm/tháng; tiến độ của từng đơn được xác nhận khi báo giá`

**X-MOQ – Mục 5** (theo `BEFORE-AFTER` A03, quyết định BĐH 08/11/2026)
- Before: `Số lượng tối thiểu nhận chính sách đối tác: từ 10 chiếc. Đồng phục Gym theo mẫu riêng: tối thiểu 80 chiếc.`
- After: `Số lượng đặt hàng tối thiểu (MOQ): một số dòng sản phẩm hoặc mẫu có sẵn đủ điều kiện có thể đặt từ 10 sản phẩm. Riêng đồng phục Gym phát triển theo mẫu thiết kế riêng áp dụng MOQ tối thiểu 80 sản phẩm. Với các dòng sản phẩm và cấu hình khác, MOQ được xác định theo chất liệu, kiểu thiết kế, kỹ thuật sản xuất và báo giá cụ thể.`
- **Không** đổi 80 → 10; **không** áp 80 cho mọi dòng.

**X-B5 – Đoạn kết**
- Before: `Đồng phục Univi - hơn 9 năm kinh nghiệm, xưởng sản xuất 2.000m² tại Hà Nội, công nghệ vải UNI DRY độc quyền và cam kết chất lượng được kiểm định rõ ràng - là lựa chọn của…`
- After: `Đồng Phục Univi – thành lập năm 2017, nhà máy khoảng 2.000 m² tại Chương Mỹ, Hà Nội, công nghệ xử lý vải UNI DRY và quy trình kiểm tra chất lượng trước bàn giao – là lựa chọn của…`

**X-FAQ1 – `faqs[0].answer`**
- Before: `Với xưởng sản xuất khép kín quy mô 2.000m² và năng lực đạt 100.000 sản phẩm/tháng, Univi hoàn thành các mẫu có sẵn trong 2–3 ngày và đơn thiết kế riêng từ 10–12 ngày. Chúng tôi cam kết làm chủ tiến độ và giao hàng đúng hẹn cho mọi đơn hàng.`
- After: `Thời gian sản xuất tham khảo từ 3–7 ngày làm việc, tùy đơn hàng. Tiến độ cụ thể được xác nhận theo số lượng, mẫu thiết kế, chất liệu, kỹ thuật hoàn thiện, thời điểm duyệt mẫu và lịch sản xuất. Với nhà máy khoảng 2.000 m² tại Chương Mỹ, Hà Nội, Univi chủ động sắp xếp lịch sản xuất và thông báo tiến độ ngay khi báo giá.`

**X-WARR – Bước 4** **[CHỜ Q7]**: thống nhất "60 ngày hình in" với chính sách 30 ngày ở `/chinh-sach-bao-hanh`. Nếu không có chính sách riêng cho hình in → `…Đây là nền tảng của chính sách bảo hành mà Univi áp dụng (xem Chính sách bảo hành).` kèm link nội bộ `/chinh-sach-bao-hanh`.

**X-D – Meta description (`posts.meta`)**
- Before: `Xưởng may đồng phục thể thao chuyên dụng Univi ứng dụng công nghệ vải UNI DRY vượt trội, mồ hôi không thấm ngược, in thêu logo sắc nét bền đẹp với giá gốc tại xưởng.`
- After: `Xưởng may đồng phục thể thao của Đồng Phục Univi tại Chương Mỹ, Hà Nội: sản xuất khép kín, in thêu logo, kiểm tra chất lượng trước bàn giao. Tư vấn MOQ, tiến độ theo đơn.` (≈170 ký tự)

**X-H – Heading của catalog vải (content, thẻ nhúng)**
- Before: `<div data-component="FabricCatalogView" data-props="{&quot;defaultTab&quot;:&quot;uniair&quot;}">`
- After: `<div data-component="FabricCatalogView" data-props="{&quot;defaultTab&quot;:&quot;uniair&quot;,&quot;titleAs&quot;:&quot;h3&quot;}">`
- Tác dụng: H2 "CHẤT LIỆU UNI AIR - UNIA12" (đang nằm giữa H3 của mục 2) thành H3. Prop `titleAs` đã có sẵn (`FabricCatalogView.jsx:60-62`), không cần sửa code.

**X-NAME – Khối liên hệ**: `UNIVI SPORTS UNIFORM — YOUR UNIFORM, YOUR BRAND!` → `ĐỒNG PHỤC UNIVI — YOUR UNIFORM, YOUR BRAND!` – **chỉ thực hiện sau** thay đổi code ở `DirectPostView.tsx:113` (mục 6, R5).

**X-T – Title (tùy chọn, P2)**: `Xưởng May Đồng Phục Thể Thao Chuyên Dụng` → `Xưởng May Đồng Phục Thể Thao Univi Tại Chương Mỹ, Hà Nội` (56 ký tự). Cảnh báo: trường `title` đồng thời là H1, breadcrumb và og:title. Không bắt buộc cho chuẩn hóa brand.

---

## 6. Technical SEO Risks

| ID | Hạng mục | Trang | Hiện trạng (có bằng chứng) | Rủi ro | Đề xuất |
|---|---|---|---|---|---|
| R1 | Claim tự cập nhật | `/gioi-thieu` | `yearsExperience` tính theo năm hiện tại (`index.jsx:14`, `:306`) | Ngày 01/01/2027 tự thành "10 năm" ở 10 vị trí, kể cả JSON-LD | Xóa biến (G01) |
| R2 | Title / meta description | `/gioi-thieu` | Title 55 ký tự; desc 222 ký tự (bị cắt trên SERP) | Claim cấm nằm ở vị trí AI/Google trích dẫn nhiều nhất | G-T, G-D |
| R3 | H1 ẩn | `/gioi-thieu` | H1 duy nhất có `className="sr-only"` (`index.jsx:43`) | Nội dung H1 không hiển thị cho người dùng; mức rủi ro thấp nhưng H1 phải khớp facts | Sửa text (G-H1). Làm H1 hiển thị = thay đổi UI → backlog |
| R4 | Heading hierarchy | `/gioi-thieu` | Hai H2 cùng đánh số "II." (`index.jsx:184` và `AboutUniviPage.jsx:41`); "Tầm nhìn / Giá trị cốt lõi" lặp ở hai component; 6 H3 timeline nằm **trong `<button>`** (`AboutNavigation.jsx:85`, HTML không hợp lệ); "Dòng sản phẩm chủ lực" là H3 không có H2 cha | Cấu trúc outline rối, nội dung trùng lặp | P2: đánh số lại II→VIII; đổi H3 trong button thành `<span>`; gộp phần lặp – **cần duyệt riêng** vì đổi cấu trúc |
| R5 | Phụ thuộc chuỗi brand | `/xuong-may…` + mọi DirectPost | `DirectPostView.tsx:113` chỉ style khối liên hệ khi đoạn văn chứa đúng `"UNIVI SPORTS UNIFORM"` | Chuẩn hóa tên trong DB sẽ làm mất style khối liên hệ | Mở rộng điều kiện: chấp nhận cả `"UNIVI SPORTS UNIFORM"` và `"ĐỒNG PHỤC UNIVI —"` (tương thích ngược). Đây là file dùng chung cho mọi DirectPost |
| R6 | Nội dung không có trong HTML server | `/gioi-thieu` | Timeline: mục không active chỉ render `description.substring(0, 120)` (`AboutNavigation.jsx:95-98`) → 5/6 mục bị cắt trong HTML server; mục active (2017, có "Sóc Sơn") render đầy đủ | AI crawler không chạy JS chỉ thấy câu Sóc Sơn, không thấy diễn biến 2020–2026 | P2: render đủ text, thu gọn bằng CSS `line-clamp` |
| R7 | Heading do component nhúng | `/xuong-may…` | H2 "CHẤT LIỆU UNI AIR - UNIA12" nằm dưới H3 | Outline sai | X-H (sửa `data-props`, không cần code) |
| R8 | FAQ schema | `/xuong-may…` | 4 FAQ **có câu trả lời trong HTML server** (`<details>`) ✓; **không có** FAQPage JSON-LD. Comment `_app.js:294` nói `[slug].tsx` "tự inject FAQPage" – **không đúng** với code `pages/[slug].tsx:115-124` | Tài liệu nội bộ sai; mất tín hiệu có cấu trúc | P2 sau khi nội dung FAQ đã sửa: sinh FAQPage từ `post.faqs` (dữ liệu hiển thị thật, không suy đoán). Google chỉ hiện rich result FAQ cho site chính phủ/y tế, nên giá trị chủ yếu cho AI parser. Sửa comment `_app.js:294` |
| R9 | Organization schema | Toàn site | Stub (`_app.js:54-66`): name/url/logo | Thiếu định danh (legalName, foundingDate…) | **Không sửa trong 6.2.2-A.** Chờ A13 sau khi pháp lý được xác minh. Sau khi BĐH duyệt, chỉ thêm `legalName` + `foundingDate: "2017"` |
| R10 | Breadcrumb | cả hai | BreadcrumbList 2 cấp, khớp UI (`/xuong-may…`); `/gioi-thieu` có schema nhưng không có breadcrumb hiển thị | Thấp | Giữ |
| R11 | Canonical / robots | cả hai | Tự tham chiếu đúng URL, `index, follow` ✓ | — | Giữ. Đổi `title` trong DB không đổi slug/canonical |
| R12 | Image alt | cả hai | Alt có fact sai (Đan Phượng, "phường", "số 03"); `PartnersSection` alt "Partner N logo"; 5 thumbnail catalog vải `alt=""` (trang trí – chấp nhận được) | Tín hiệu mâu thuẫn trong cùng URL | G-ALT, G-IMG, X-ALT. Alt đối tác: backlog (component dùng ≥12 nơi) |
| R13 | Kích thước ảnh trong schema/OG | `/gioi-thieu` | Khai báo 1200×630, thực tế 2253×1230 | Sai lệch metadata | G-LD |
| R14 | Meta keywords rỗng | `/xuong-may…` | `tags: [""]` → `<meta name="keywords" content="">` | Không ảnh hưởng xếp hạng | Bỏ qua |
| R15 | Internal links | cả hai | `/gioi-thieu` **không link** tới `/xuong-may-dong-phuc-univi` (chỉ link `/ho-so-nang-luc`, `/lien-he`); `/xuong-may…` có link `/gioi-thieu`, `/giai-phap-2s` (URL tuyệt đối), `/chat-lieu-vai`, `/dong-phuc-gym` | Trang About không đẩy giá trị sang trang năng lực sản xuất | Thêm 1 link ngữ cảnh ở khối "Năng lực & Quy mô" (`index.jsx:135-162`), ví dụ "Xem chi tiết nhà máy sản xuất" → `/xuong-may-dong-phuc-univi`. Thêm link `/chinh-sach-bao-hanh` ở X-WARR |
| R16 | Hiệu năng (ngoài phạm vi brand) | `/gioi-thieu` | Video hero 16,6 MB, `autoPlay` + `preload="auto"` (`index.jsx:49-59`); SSR không cache, TTFB đo được 1,8 s (`/gioi-thieu`) và 3,0 s (`/xuong-may…`) trong lần fetch này | LCP/băng thông mobile | Backlog kỹ thuật: `preload="metadata"`, poster ảnh, nén video |
| R17 | Nguồn gốc lỗi tái phát | Công cụ AI dashboard | `lib/knowledgeBase.ts:178` vẫn ghi "xưởng Đan Phượng"; `:193` "Nhận đơn từ 10 sản phẩm" (không có MOQ Gym 80) | Bài mới do AI viết sẽ tái tạo fact sai (khả năng cao là nguồn gốc alt "Đan Phượng" của trang xưởng) | **Ngoài phạm vi 6.2.2-A**, đề xuất ticket riêng P1 ngay sau sprint này |
| R18 | Đồng bộ llms | — | `public/llms-full.txt:24-35` chép lại `/gioi-thieu`: MST, "1000+", "kiểm định theo QCVN" | Sau khi sửa trang, llms-full sẽ mâu thuẫn với chính trang nguồn | Cập nhật cùng đợt với A14 |

---

## 7. Danh sách file / bản ghi cần sửa

### 7.1 Code trong repo (Sprint 6.2.2-A)

| # | File | Dòng | Thay đổi | Phụ thuộc |
|---|---|---|---|---|
| 1 | `pages/gioi-thieu/index.jsx` | 14, 43-45, 81, 89, 92, 147, 151, 159, 168, 203 | G01, G-H1, G-H2, G-B1, G-B2, G-CAP, G-ALT, G-V | Q3, Q4, Q5, Q6 |
| 2 | `pages/gioi-thieu/index.jsx` | 306, 326, 338-340, 350-352, 357-358, 363, 369-370 | G01, G-LD, G-T, G-D, G-K, G-OG | — |
| 3 | `pages/gioi-thieu/index.jsx` | 135-162 | Thêm link nội bộ → `/xuong-may-dong-phuc-univi` (R15) | — |
| 4 | `components/univisport/AboutNavigation.jsx` | 11, 26 | G-TL | **Q2** |
| 5 | `components/univisport/AboutUniviPage.jsx` | 129, 172, 180, 227, 230-235, 364, 368-371 | G-V, G-IMG, G-S, G-LT, G-P | Q1, Q6 |
| 6 | `components/layout/DirectPostView.tsx` | 113 | Matcher chấp nhận cả tên cũ và "ĐỒNG PHỤC UNIVI —" (R5). **File dùng chung cho mọi DirectPost** | Phải merge **trước** khi sửa DB (X-NAME) |
| 7 | `pages/_app.js` | 294 | Sửa comment sai về FAQPage (R8) | — |

Hai component `AboutNavigation` và `AboutUniviPage` chỉ được dùng ở `/gioi-thieu` → sửa không ảnh hưởng trang khác. `DirectPostView.tsx` dùng chung → thay đổi phải tương thích ngược.

### 7.2 Dữ liệu MongoDB (cần phê duyệt ghi DB riêng)

| Collection | Bản ghi | Trường | Thay đổi |
|---|---|---|---|
| `posts` | `_id 6a002351ed66e0ea91519cbf` (slug `xuong-may-dong-phuc-univi`) | `content` | X-B1, X-ALT, X-SPEC, X-B4, X-B4b, X-MOQ, X-WARR, X-B5, X-H, X-NAME |
| | | `faqs[0].answer` | X-FAQ1 (FAQ #3, #4: chờ Q6) |
| | | `meta` | X-D |
| | | `title` | X-T (tùy chọn) |

**Cách thực hiện khuyến nghị:** người có quyền nội dung sửa qua **dashboard admin** (cùng luồng biên tập hiện tại), **không** viết script migration. Bản sao lưu trước khi sửa: `reports/sprint-6/sprint-6.2.2-a/xuong-post-content-2026-11-08.html` + `xuong-post-snapshot-2026-11-08.json` (`updatedAt` hiện tại `2026-11-07T11:15:13.291Z` – nếu DB có `updatedAt` mới hơn khi sửa, phải chụp lại snapshot).

### 7.3 Không sửa trong sprint này (đã kiểm tra, ghi nhận)

- `pages/_app.js:54-89` Organization/WebSite – chờ A13.
- `lib/companyInfo.ts` (factory "Phường Chương Mỹ", founder, brandName "Univi Uniform") – không render trên 2 URL ngoại trừ Footer (chỉ dùng `office` + hotline – không có fact sai).
- `components/common/Footer.tsx`, `Navbar.jsx`, `CategoryGrid.tsx`, `PartnersSection.jsx` – không có claim bị cấm.
- `FabricCatalogView` / `data/fabricMaterials` (GSM, thành phần) – thuộc A12/A13.
- `lib/knowledgeBase.ts`, `public/llms*.txt` – ticket riêng (R17, R18).

---

## 8. Test Plan

### 8.1 Trước khi sửa
1. Đưa 5 file brand vào `reports/sprint-6/` (nguồn chuẩn).
2. Lưu baseline: `node reports/sprint-6/sprint-6.2.2-a/extract-seo-elements.js <file.html>` cho cả 2 URL (production) → lưu output.

### 8.2 Kiểm tra tĩnh (local)
3. `npm run lint` và `npm run typecheck` – không có lỗi mới.
4. Grep trong các file đã sửa – kỳ vọng **0 kết quả**: `yearsExperience`, `năm kinh nghiệm`, `QCVN`, `Sóc Sơn` / `Hải Dương` (tùy Q2), `số 1`, `chỉ từ 99.000`, `3 ngày</strong>`.

### 8.3 Kiểm tra HTML server (local `next build && next start`, sau đó staging)
5. `curl -s http://localhost:3000/gioi-thieu > gt.html` → chạy script extract. Kỳ vọng:
   - title / description / keywords / og:* / twitter:* / H1 / H2 / JSON-LD **không** chứa "9 năm", "9+ năm", "QCVN", "1000+" (tùy Q6).
   - Có "2017" trong title, H1, H2, description.
   - Có câu định vị (theo phương án Q4) trong HTML server, ngoài `__NEXT_DATA__`.
   - Có `href="/xuong-may-dong-phuc-univi"` trong body.
   - Có "3–7 ngày làm việc, tùy đơn hàng"; "99.000đ" chỉ xuất hiện kèm "một số sản phẩm".
   - `primaryImageOfPage` = 2253×1230 (hoặc không khai báo).
6. **Hồi quy theo thời gian:** giả lập năm 2027 (ví dụ `faketime '2027-01-02'` hoặc sửa tạm `Date` trong môi trường test) → title/H1 không đổi.
7. JSON-LD: `JSON.parse` từng khối thành công; dán vào validator.schema.org – 0 lỗi; Organization **không** có trường mới.
8. Heading outline: còn đúng 1 H1.

### 8.4 Trang xưởng (sau khi sửa DB trên staging/production theo phê duyệt)
9. `curl` trang → extract. Kỳ vọng:
   - 0 kết quả: "Đan Phượng", "9 năm", "2–3 ngày", "10–12 ngày", "mọi đơn hàng", "không lo trễ hạn", "độc quyền" (tùy Q6).
   - Có "80 sản phẩm" **và** "10 sản phẩm" kèm "đủ điều kiện" + "báo giá".
   - Có "3–7 ngày làm việc" ở body **và** trong `<details>` của FAQ #1 (HTML server).
   - H2 "CHẤT LIỆU UNI AIR" giờ là H3 (X-H).
   - Khối liên hệ cuối bài vẫn có `class="cta-contact-info"` (kiểm tra R5).
10. Kiểm tra 1–2 DirectPost khác còn chứa "UNIVI SPORTS UNIFORM" → style khối liên hệ không đổi (tương thích ngược R5).

### 8.5 Sau deploy (khi được duyệt)
11. Lặp lại bước 5, 9 trên production; GSC URL Inspection → "Test live URL" cho 2 URL; yêu cầu index lại.
12. Cập nhật tracker Before/After: URL, đoạn cũ, đoạn mới, người duyệt, ngày deploy (`brand-conflicts.md` – Quy tắc 3).
13. Lên lịch kiểm tra lại các prompt brand trong bộ 43 prompt Sprint 6.1 sau 2–4 tuần.

---

## 9. Các vấn đề cần Ban điều hành xác nhận

**Chặn triển khai (trả lời trước khi code):**

| # | Câu hỏi | Ảnh hưởng |
|---|---|---|
| **Q1** | Mốc 3–7 ngày làm việc tính từ thời điểm nào (sau duyệt mẫu? sau đặt cọc?) và kết thúc ở bước nào? Mốc "gia công mẫu 2 ngày từ khi chốt rập" và "mẫu có sẵn giao trong 3 ngày" có còn đúng như **mốc công đoạn riêng** không? | G-LT, X-LT, X-FAQ1 |
| **Q2** | Timeline lịch sử: xưởng đầu tiên tại **Sóc Sơn** (2017) và xưởng **Hải Dương** (2021–2022) có đúng không? Được phép công bố như dữ kiện lịch sử không? "Công ty TNHH Bảo Phong Evenes, tháng 7/2017" có đúng không? | G-TL |
| **Q3** | Cách ghi địa điểm nhà máy: chỉ "**Chương Mỹ, Hà Nội**" hay "**phường Chương Mỹ**, Hà Nội" (theo đơn vị hành chính hiện hành)? Repo đang dùng "phường" ở `lib/companyInfo.ts` và nhiều trang khác. | G-ALT, X-SPEC, alt/OG |
| **Q4** | Câu định vị có chữ "**is**" ("Đồng Phục Univi **is** TIÊN PHONG…") – giữ nguyên văn hay dùng "**là đơn vị** TIÊN PHONG" như `lib/knowledgeBase.ts:175`? Trên trang tiếng Việt, "is" dễ bị người đọc và AI hiểu là lỗi. | G-B1, X-B1 |

**Không chặn – xử lý theo phương án an toàn nếu chưa có câu trả lời:**

| # | Câu hỏi | Phương án mặc định nếu chưa có câu trả lời |
|---|---|---|
| Q5 | Ảnh xưởng (`/images/gioi-thieu/xuong-san-xuat.jpg`; flickr `55260553380`) có chụp tại nhà máy Chương Mỹ không? | Dùng alt trung tính, không ghi địa danh |
| Q6 | Bằng chứng cho: "1000+ khách hàng", "gần 100 công nhân", "UNI DRY độc quyền", "200–300 lần giặt", "giữ form 2–3 năm", "kiểm định an toàn với da", "kiểm định QCVN", "mockup trong 1 giờ"; quyền công bố tên/logo khách hàng (Sun Group, Vingroup, TKV, Premier Village…). | Bỏ con số/claim chưa có bằng chứng; **giữ** danh sách khách hàng tới khi có quyết định |
| Q7 | Bảo hành hình in **60 ngày** (trang xưởng) hay **30 ngày** (trang chính sách)? | Dẫn link sang `/chinh-sach-bao-hanh`, bỏ con số 60 |
| Q8 | MST 0111401705 có được dùng chính thức (Fact Sheet đang để trống)? | Giữ hiển thị, không đưa vào Schema |
| Q9 | Hotline chính/phụ; địa chỉ văn phòng theo đơn vị hành chính hiện hành. | Giữ nguyên trên trang, không đưa vào Schema |
| Q10 | Được công bố "Trần Hiền – Founder" và tên "Univi Sport" không? | Giữ hồ sơ tác giả hiện tại (ngoài phạm vi sửa) |
| Q11 | Danh mục dòng vải chính thức: Fact Sheet (UNI DRY, QUICK DRY, UNI SUPER COOL, UNI BLENDED) hay website (UNI AIR, QUICKDRY, SUPERCOOL, COOL PIQUÉ, ELITE)? | Chuyển sang sprint A12/A13 |
| Q12 | Giữ hay bỏ các cụm tầm nhìn "lựa chọn hàng đầu", "biểu tượng sáng tạo hàng đầu" (quy chuẩn nội bộ cấm "hàng đầu", "số 1")? | Bỏ "số 1" (G-V); giữ "hàng đầu" dạng mục tiêu tới khi có quyết định |
| Q13 | Phê duyệt **ghi DB** cho bản ghi trang xưởng, và ai thực hiện qua dashboard. | Không sửa trang xưởng |

---

## 10. Kết luận

### **NOT READY FOR IMPLEMENTATION**

**Lý do (có bằng chứng):**
1. Bốn câu hỏi chặn (Q1–Q4) quyết định câu chữ ở H1/H2/body/timeline/thông số; nếu triển khai ngay sẽ phải sửa hai lần hoặc phát hành dữ kiện chưa duyệt.
2. Toàn bộ nội dung `/xuong-may-dong-phuc-univi` nằm trong MongoDB; nhiệm vụ này **không có quyền ghi DB** (Q13).
3. Thay đổi tên trong khối liên hệ phụ thuộc thay đổi code dùng chung (`DirectPostView.tsx:113`), phải merge trước.

**Sẵn sàng ngay khi có Q1–Q4** (không cần chờ Q5–Q12 nhờ phương án mặc định an toàn):
- **Đợt 1 – Code `/gioi-thieu`** (mục 7.1, #1–#7): ước tính 1 PR, 4 file, kiểm thử theo mục 8.2–8.3.
- **Đợt 2 – DB trang xưởng** (mục 7.2): sau khi có Q13, merge #6 trước, sửa qua dashboard, kiểm thử theo mục 8.4.
- **Phần việc có thể làm ngay, không phụ thuộc câu hỏi nào:** G01 (xóa `yearsExperience`), G-T, G-D, G-K, G-OG, G-H2, G-LD, G-P, R5, R8 comment, R15.

---

## Phụ lục A – Kết quả ngoài phạm vi (repo-wide, chưa sửa, cho sprint 6.2.2-B)

| Từ khóa | File:dòng |
|---|---|
| 8 năm | `bai-viet/EventUniformsUniviPage.jsx:44`, `MMAUniviPage.jsx:86`, `OfficeUniviPage.jsx:93,284`, `RunningUniviPage.jsx:91`, `TShirtUniformsUniviPage.jsx:43,182` |
| 9 năm / 9+ năm | `bai-viet/AoGioUniviPage.jsx:419`, `DoanhNghiepPillarPage.jsx:688,1239`, `PoloUniformsUniviPage.jsx:450`, `ShirtUniviPage.jsx:100`, `TheThaoPillarPage.jsx:627`, `pages/dang-ky-dai-ly.jsx:256`, `pages/chinh-sach-dai-ly.jsx:65` |
| 5 năm | `components/univisport/SeoArticleSection.jsx:19` (render ở `/san-pham`) |
| Đan Phượng | `lib/knowledgeBase.ts:178` (prompt cho công cụ AI viết bài) |
| 2–3 / 10–12 ngày | `bai-viet/AoGioUniviPage.jsx:32`, `PickleballUniviPage.jsx:186`, `pages/dang-ky-dai-ly.jsx:257`, `pages/chinh-sach-dai-ly.jsx:505` |
| 7–10 ngày | `components/univisport/EnterprisePillarPage.jsx:37` |
| 99.000 | `bai-viet/AoGioUniviPage.jsx:448-450`, `MMAUniviPage.jsx:329`, `RunningUniviPage.jsx:379` |
| 360.000 | `bai-viet/PickleballUniviPage.jsx:189` |
| MOQ "từ 10 sản phẩm" không điều kiện | `lib/knowledgeBase.ts:193,270,326,369,435`, `pages/api/ai/generate.ts:270` |
| Facts trùng `/gioi-thieu` | `public/llms-full.txt:24-35` |

Chưa kiểm tra: các bài viết khác lưu trong MongoDB (`/bai-viet/*`, các DirectPost khác).
