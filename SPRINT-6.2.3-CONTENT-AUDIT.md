# SPRINT 6.2.3.1 – CONTENT AUDIT & GAP ANALYSIS

- **Ngày audit:** 08/11/2026
- **Website:** https://dongphucunivi.com
- **Người thực hiện:** Claude (chỉ đọc và phân tích – không sửa code, không ghi MongoDB, không đăng bài, không deploy)
- **Nguồn chuẩn:** Brand Fact Sheet v1.0 + các quyết định BĐH đã duyệt (gồm phê duyệt số liệu nhà máy 08/11/2026)

### Phương pháp & giới hạn

| Hạng mục | Cách làm |
|---|---|
| Nội dung live | `curl` GET 8 URL production ngày 08/11/2026 (tất cả HTTP 200, không redirect). Phân tích HTML server-rendered bằng script, **loại trừ** `__NEXT_DATA__` khi đánh giá nội dung hiển thị |
| Trích xuất | Title, meta description, canonical, robots, H1–H3, số từ, JSON-LD, FAQ (JSON-LD và `<details>`), câu trả lời FAQ có trong HTML server hay không, link nội bộ + anchor, alt ảnh, các chuỗi dữ kiện thương mại |
| Link nội bộ | Tách link "chrome" (navbar/footer có mặt ở mọi trang: 58 cặp href+anchor) khỏi link ngữ cảnh |
| Đối chiếu mã nguồn | Xác định file sinh ra từng nội dung (trích dẫn `file:dòng`) |
| **Không có** | Dữ liệu Semrush, GSC, GA4, SERP. Search intent được đánh giá **định tính** từ nội dung trên trang, không có số liệu volume/thứ hạng. Không tạo số liệu Semrush |
| Lưu ý trạng thái | Các thay đổi Sprint 6.2.2-A1 cho `/gioi-thieu` **chưa deploy** (dự án chưa có Git) nên không ảnh hưởng 8 URL này. Riêng `DirectPostView.tsx` đã sửa local nhưng chưa live |

---

## 1. Executive Summary

**Kết luận chung:** cả 8 URL đều HTTP 200, có canonical đúng và `index, follow`. Cả 4 pillar đều có nhiều nội dung (4.600–5.500 từ). Rủi ro lớn nhất không nằm ở độ dài nội dung mà ở **dữ kiện thương mại không nhất quán** và **FAQ không có trong HTML server**.

| # | Phát hiện quan trọng nhất | URL | Mức |
|---|---|---|---|
| 1 | **FAQ trang chủ chỉ có trong JSON-LD, không có trong HTML server** (0/5 câu hỏi, 0/5 câu trả lời). JSON-LD này lại chứa claim bị cấm: "đồng phục thể thao **số 1** tại thị trường Việt Nam", "hai dòng vải **độc quyền**", "đặt từ **10 chiếc trở lên**" (MOQ phổ quát), "với **mức giá tốt nhất**", so sánh với "hàng Trung Quốc" | `/` | **P0** |
| 2 | **"9+ năm / Hơn 9 năm kinh nghiệm" + "1000+ doanh nghiệp"** hiển thị ở khối số liệu đầu trang và mục "Vì sao chọn Univi" | `/dong-phuc-doanh-nghiep` | **P0** |
| 3 | Trang xưởng còn **Đan Phượng** (alt ảnh), **"hơn 9 năm"** ×2, **2–3 / 10–12 ngày** (body + FAQ), cam kết "giao đúng hẹn **cho mọi đơn hàng**", bảo hành 60 ngày (mâu thuẫn chính sách 30 ngày) | `/xuong-may-dong-phuc-univi` | **P0** |
| 4 | **MOQ Gym thiết kế riêng 80 sản phẩm (đã duyệt) không xuất hiện ở bất kỳ trang pillar nào**, kể cả `/dong-phuc-gym`. Không pillar nào nêu MOQ 10 cho dòng/mẫu đủ điều kiện | 4 pillar | **P0** |
| 5 | **Thời gian sản xuất 3–7 ngày làm việc không xuất hiện ở 4 pillar.** Pilates có hẳn mục "9. Số lượng tối thiểu và thời gian sản xuất" nhưng không có con số nào | 4 pillar | **P1** |
| 6 | **Câu trả lời FAQ không có trong HTML server** ở Pilates (0/13) và Doanh nghiệp (0/12) do chỉ render khi click. Gym (8/8) và Yoga (12/12) đạt | `/dong-phuc-pilates`, `/dong-phuc-doanh-nghiep` | **P1** |
| 7 | `/huong-dan-dat-hang` **thiếu bước làm mẫu/duyệt mẫu**, thiếu MOQ, thiếu FAQ, không có link ngữ cảnh nào; có claim chưa xác minh "may gấp 24h–48h", "Tư vấn 24/7" | `/huong-dan-dat-hang` | **P1** |
| 8 | Câu định vị chính thức (**"is TIÊN PHONG"**) **không có nguyên văn ở trang nào**: trang chủ không có trong nội dung hiển thị; Yoga và Liên hệ hoàn toàn không có; Gym và Doanh nghiệp dùng bản rút gọn; Pilates gần đủ nhưng dùng "là đơn vị" | 6 URL | **P1** |
| 9 | `/lien-he` ghi "phản hồi 24/7" và "trong 15 phút" nhưng giờ làm việc là 08:00–18:00; title 70 ký tự, description 186 ký tự | `/lien-he` | **P1** |
| 10 | Trang xưởng và hướng dẫn đặt hàng **không nằm trong navbar/footer**. Trong 8 URL audit, `/huong-dan-dat-hang` chỉ nhận 1 link ngữ cảnh (từ Gym), trang xưởng nhận 2 (Gym, Yoga) | Liên kết nội bộ | **P1** |

**Điểm đạt:** số liệu nhà máy đã duyệt (2.000 m², 100.000 sp/tháng) đã có trên Gym, Yoga, Pilates, Doanh nghiệp (cần chuẩn hóa thêm "khoảng"). `/huong-dan-dat-hang` đã dùng mốc 3–7 ngày làm việc. Pilates có bảng giá B2B theo bậc số lượng (bắt đầu từ bậc 10–30). FAQ Gym/Yoga đầy đủ trong HTML server. Không trang nào trong 8 URL còn "Sóc Sơn", "Thọ An", "Hải Dương".

---

## 2. Danh sách URL được audit

| # | URL | Nhóm | File nguồn chính | HTTP | Số từ (thân trang) | Title (ký tự) | H1 | JSON-LD |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | B – Định vị | `pages/index.js`; FAQ: DB `HomepageFaqSettings` (key `homepage`), fallback `data/homepageFaqs.js` | 200 | 1.809 | 56 | 1 (**sr-only**) | Organization, WebSite, FAQPage, WebPage |
| 2 | `/dong-phuc-gym` | A – Pillar | `pages/dong-phuc-gym/index.js` → `components/univisport/bai-viet/GymUniviPage.jsx` | 200 | 4.681 | 41 (có dấu cách thừa cuối) | 1 | CollectionPage, Service, BreadcrumbList, ItemList, FAQPage |
| 3 | `/dong-phuc-yoga` | A + B | `pages/dong-phuc-yoga/index.js` → `YogaUniviPage.jsx` | 200 | 4.627 | 34 | 1 | CollectionPage, Service, BreadcrumbList, ItemList, FAQPage |
| 4 | `/dong-phuc-pilates` | A – Pillar | `pages/dong-phuc-pilates/index.js` → `PilatesUniviPage.jsx` | 200 | 5.471 | 46 (có dấu cách thừa cuối) | 1 | CollectionPage, Service, BreadcrumbList, ItemList, Article, FAQPage |
| 5 | `/dong-phuc-doanh-nghiep` | A – Pillar | `pages/dong-phuc-doanh-nghiep/index.js` → `DoanhNghiepPillarPage.jsx` | 200 | 5.175 | 56 | 1 | WebPage, BreadcrumbList, FAQPage |
| 6 | `/lien-he` | B – Định vị | `pages/lien-he/index.jsx` → `components/univi/ContactPage.jsx` | 200 | 461 | **70** | 1 | BreadcrumbList, ContactPage |
| 7 | `/xuong-may-dong-phuc-univi` | C – Chuyên sâu | MongoDB `posts._id 6a002351ed66e0ea91519cbf` → `pages/[slug].tsx` + `DirectPostView.tsx` | 200 | 2.256 | 40 | 1 | BreadcrumbList |
| 8 | `/huong-dan-dat-hang` | C – Chuyên sâu | `pages/huong-dan-dat-hang.jsx` | 200 | 1.020 | 62 | 1 | (chỉ Organization, WebSite) |

Số từ tính trên nội dung hiển thị trước footer, đã bao gồm navbar.

---

## 3. Content Gap theo từng URL

### 3.1 `/` – Trang chủ

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title | "Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Tại Hà Nội" | Định vị trang chủ là "xưởng may" → (a) **cạnh tranh từ khóa** với `/xuong-may-dong-phuc-univi`; (b) lệch nguyên tắc Fact Sheet "không biến Univi thành đơn vị chỉ nhận may gia công". Đề xuất title hướng **giải pháp đồng phục thể thao B2B** |
| Meta description | "Đồng Phục Univi – Tiên phong giải pháp đồng phục thể thao cho phòng Gym, Pilates, Pickleball và doanh nghiệp…" | Đạt về hướng; chưa có năm thành lập |
| H1 | "Đồng Phục Thể Thao Chuyên Nghiệp Cho Phòng Tập & Doanh Nghiệp" – **sr-only (ẩn)** | H1 không hiển thị cho người dùng. Đề xuất H1 hiển thị |
| H2 | 15 H2, gồm "CHẤT LIỆU UNI AIR - UNIA12" (do `FabricCatalogView` mặc định `h2`) | H2 là tên danh mục sản phẩm, không có H2 giới thiệu thương hiệu |
| Search intent | Điều hướng thương hiệu + thương mại (khám phá danh mục) | — |
| Câu định vị | **Không có trong nội dung hiển thị** (chỉ có trong meta description và FAQ JSON-LD) | Thêm câu định vị chính thức vào khối giới thiệu render SSR |
| Dữ kiện thương hiệu | Không có năm thành lập, địa điểm nhà máy, công suất trong nội dung hiển thị. `og:image:alt` ghi "phường Chương Mỹ… công suất 100.000 sản phẩm/tháng" | Thêm khối "Về Đồng Phục Univi" ngắn: 2017 · Chương Mỹ, Hà Nội · khoảng 2.000 m² · khoảng 100.000 sp/tháng |
| FAQ | 5 câu **chỉ trong JSON-LD**; `FAQComponent` được import `dynamic(…, { ssr: false })` (`pages/index.js:27-29`) | Vi phạm nguyên tắc structured data phải khớp nội dung hiển thị; nội dung FAQ chứa claim bị cấm (mục 4) |
| Internal link | Không có link ngữ cảnh đến trang xưởng, hướng dẫn đặt hàng, Doanh nghiệp, giới thiệu | Mục 6 |
| Khả năng AI trích dẫn | **Thấp** – không có đoạn văn tóm tắt thương hiệu trong HTML; FAQ ẩn; claim sai trong JSON-LD | |

### 3.2 `/dong-phuc-gym`

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title / Desc | "Đồng Phục Gym & Áo Tập Gym Cho Phòng Tập " (dấu cách thừa) / desc 147 ký tự, có "24 mẫu, 5 dòng vải" | Xóa dấu cách thừa; có thể thêm "Univi" vào title để tăng tín hiệu thực thể |
| H1/H2 | H1 rõ; 11 H2 đánh số + FAQ + CTA | Cấu trúc tốt |
| Search intent | Thương mại/giao dịch B2B (phòng tập, HLV, PT) | Phù hợp |
| **MOQ** | FAQ #8: "Số lượng tối thiểu được tư vấn theo mẫu và chất liệu cụ thể." | **Thiếu MOQ Gym thiết kế riêng 80 sản phẩm** (quyết định BĐH 08/11/2026) và MOQ 10 cho dòng/mẫu đủ điều kiện. Đây là trang đích quan trọng nhất của dữ kiện này |
| **Thời gian** | Không có mốc nào | Thêm "3–7 ngày làm việc, tùy đơn hàng" vào mục 10 (Quy trình đặt may) hoặc FAQ |
| Giá | Danh sách sản phẩm "Giá tham khảo: Liên hệ" | Đạt (không có giá chung) |
| Định vị | Bản rút gọn: "…cho các chuỗi phòng tập và các đội nhóm tập Gym, Fitness tại Việt Nam" (`GymUniviPage.jsx:211`) | Thiếu danh sách bộ môn đầy đủ; dùng "là đơn vị" thay vì "is" |
| Số liệu nhà máy | "xưởng 2.000m² và công suất 100.000 sản phẩm/tháng" (`GymUniviPage.jsx:783-784`) | Thêm "khoảng" và "tại Chương Mỹ, Hà Nội" theo câu đã duyệt |
| FAQ | 8/8 có trong HTML server (`<details>`) + JSON-LD | Đạt. Thiếu FAQ MOQ, thời gian (mục 5) |
| Internal link | Có link đến trang xưởng ("xưởng may đồng phục Gym"), hướng dẫn đặt hàng, hồ sơ năng lực, 2S, chất liệu | Tốt nhất trong nhóm |
| Khả năng AI trích dẫn | **Trung bình–Cao** (FAQ SSR, cấu trúc rõ) – giảm vì thiếu MOQ/thời gian, là các câu hỏi B2B phổ biến | |

### 3.3 `/dong-phuc-yoga`

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title | "Đồng Phục Yoga, Áo Tập Yoga Nữ Đẹp" (34 ký tự) | Cụm "Áo Tập Yoga Nữ Đẹp" nghiêng **B2C/bán lẻ**, có thể kéo truy vấn cá nhân không phù hợp mô hình B2B. Chưa có dữ liệu SERP để kết luận; đề xuất kiểm tra GSC trước khi đổi |
| Desc | 159 ký tự, "theo yêu cầu… cho Yoga Studio" | Đạt |
| H1/H2 | H1 + 12 H2. Có H2 "Liên Hệ Với Xưởng May Đồng Phục Univi Ngay Hôm Nay" | — |
| Search intent | Kết hợp thương mại B2B (studio) + thông tin (cách chọn đồ tập) | Có pha intent B2C ở title |
| **Định vị** | **Không có câu định vị** dưới bất kỳ dạng nào | URL này nằm trong nhóm B (Định vị) → thêm câu định vị chính thức |
| MOQ | FAQ #6: "phụ thuộc vào việc studio chọn mẫu và vải có sẵn hay thiết kế riêng…" | Thêm "Một số dòng/mẫu đủ điều kiện có thể đặt từ 10 sản phẩm; các dòng khác theo báo giá" |
| Thời gian | Không có | Thêm 3–7 ngày làm việc, tùy đơn hàng |
| Số liệu nhà máy | "Xưởng sản xuất 2.000m2 tại Hà Nội", "Công suất 100.000 sản phẩm/tháng" (`YogaUniviPage.jsx:13-14, 20-21`) | Chuẩn hóa "khoảng 2.000 m² tại Chương Mỹ, Hà Nội" (đang ghi "m2", thiếu Chương Mỹ) |
| FAQ | 12/12 SSR + JSON-LD | Đạt |
| Internal link | Có link trang xưởng, hồ sơ năng lực, giới thiệu (anchor "Đồng Phục Univi") | Thiếu link `/huong-dan-dat-hang`, `/chat-lieu-vai` ngữ cảnh |
| Khả năng AI trích dẫn | **Trung bình–Cao** | |

### 3.4 `/dong-phuc-pilates`

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title / Desc | "Đồng Phục Pilates & Áo Tập Pilates Cho Studio " (dấu cách thừa) / 156 ký tự | Xóa dấu cách thừa |
| H1/H2 | H1 + 15 H2, có mục 9 "Số lượng tối thiểu và thời gian sản xuất", mục 10 "Báo giá" | Cấu trúc tốt |
| Search intent | Thương mại B2B (studio, HLV) | Phù hợp |
| **MOQ & thời gian** | Mục 9: "Số lượng và lịch sản xuất được tư vấn theo từng mẫu cụ thể… phụ thuộc vào mẫu và dòng vải" – **H2 hứa thông tin nhưng không có con số**. FAQ #12 tương tự | Thêm MOQ 10 (đủ điều kiện) + "3–7 ngày làm việc, tùy đơn hàng". Lưu ý bảng giá đã bắt đầu từ bậc "10–30" → nội dung mục 9 nên khớp |
| Giá | Bảng giá phôi B2B theo bậc số lượng 10–30 → 501–1.000, từ 140.000đ đến 230.000đ; có ghi chú "Giá bán lẻ… không phải giá đồng phục B2B" | Cần BĐH xác nhận **bảng giá còn hiệu lực**, ngày áp dụng, đã gồm VAT/in ấn hay chưa (mục 10). Không mâu thuẫn quy tắc 99.000đ |
| Định vị | Gần đầy đủ: "Đồng Phục Univi là đơn vị TIÊN PHONG… Gym, Fitness, Pickleball, Yoga, Running, Pilates, MMA… tại Việt Nam" (`PilatesUniviPage.jsx:951`) | Thiếu "các" trước "đội nhóm"; "là đơn vị" thay "is" |
| Số liệu nhà máy | "xưởng chính rộng 2.000m²" (`:944`), "Xưởng sản xuất: phường Chương Mỹ" (`:1001`) | "xưởng chính" ngụ ý có xưởng phụ – cần xác nhận; chuẩn hóa "khoảng"; "phường" chờ xác nhận |
| **FAQ** | 13 câu trong JSON-LD; câu hỏi có trong HTML, **câu trả lời 0/13** – chỉ render khi mở (`PilatesUniviPage.jsx:911-923`, `{isOpen && …}`) | Render tất cả câu trả lời trong HTML (ẩn bằng CSS/`<details>`) |
| Kỹ thuật vải | "UNI SUPERCOOL (89% Polyamide – 11% Elastane, 180 GSM)" trong FAQ #3 | Thông số kỹ thuật cần hồ sơ (A12/A13) |
| Khả năng AI trích dẫn | **Trung bình** – nội dung tốt nhưng FAQ không có câu trả lời trong HTML | |

### 3.5 `/dong-phuc-doanh-nghiep`

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title / Desc | "Đồng Phục Doanh Nghiệp \| Giải Pháp Đồng Bộ Nhận Diện B2B" / 149 ký tự | Đạt |
| H1/H2 | H1 "Đồng Phục Doanh Nghiệp Cho Công Ty"; H2 đánh số **nhảy từ 5 sang 7** (thiếu mục 6), định dạng "1 . " có dấu cách | Sửa đánh số |
| Search intent | Thông tin + thương mại B2B (HR, admin, marketing doanh nghiệp) | Phù hợp |
| **Số năm kinh nghiệm** | Khối số liệu: "9+ năm – Kinh nghiệm" (`DoanhNghiepPillarPage.jsx:688`); mục 11: "Hơn 9 năm kinh nghiệm" (`:1239`) | **P0** – thay bằng "Thành lập năm 2017" |
| **1000+ doanh nghiệp** | `:687` và `:1239` | Claim cần bằng chứng (brand-claims B) |
| Số liệu nhà máy | "2.000m² tại phường Chương Mỹ… Công suất công bố 100.000 sản phẩm/tháng" (`:685-686`, `:1238`); FAQ #11 | Thêm "khoảng"; "phường" chờ xác nhận |
| MOQ / thời gian | Không có MOQ; không có mốc thời gian | Thêm "Các dòng khác: MOQ và tiến độ theo báo giá" + 3–7 ngày làm việc, tùy đơn hàng (nếu BĐH xác nhận áp dụng cho đồng phục doanh nghiệp) |
| Định vị | Bản rút gọn: "…cho các chuỗi phòng tập và đội nhóm thể thao tại Việt Nam" (`:1234`) | Thiếu danh sách bộ môn |
| "Chất liệu & kiểm định" | Tiêu đề khối có "kiểm định" | Cần bằng chứng hoặc đổi tên khối |
| **FAQ** | 12 câu JSON-LD; **câu trả lời 0/12** trong HTML – render có điều kiện `expandedFaq === index &&` (`:1351-1360`) | Render tất cả câu trả lời trong HTML |
| Internal link | Có link Gym, Yoga, giới thiệu, liên hệ, bảng màu | **Không có link** đến trang xưởng, hướng dẫn đặt hàng, `/chat-lieu-vai`, Pilates |
| Khả năng AI trích dẫn | **Trung bình–Thấp** – dữ kiện sai (9 năm) ở vị trí nổi bật + FAQ ẩn | |

### 3.6 `/lien-he`

| Hạng mục | Hiện trạng | Gap / Đề xuất |
|---|---|---|
| Title | "Liên hệ Đồng phục Univi - Tư vấn may đồng phục chất lượng cao miễn phí" (**70 ký tự**, bị cắt) | Rút gọn ≤ 60 ký tự |
| Desc | **186 ký tự**, có "Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7" | Rút gọn; bỏ "24/7" |
| H1/H2 | H1 + 1 H2 ("Gửi tin nhắn cho chúng tôi") | Mỏng (461 từ) |
| Search intent | Điều hướng (tìm liên hệ, địa chỉ) | Phù hợp |
| **Mâu thuẫn giờ làm việc** | "phản hồi nhanh chóng 24/7", "Hỗ trợ giải đáp thông tin 24/7" (`ContactPage.jsx:136, 152`) **vs** "Thứ 2 – Chủ Nhật: 08:00 – 18:00" | Thống nhất theo giờ làm việc thực tế |
| Cam kết phản hồi | "Phản hồi nhanh chóng trong 15 phút" (`:318`) | Cần xác nhận SLA |
| Hotline | Chỉ 0834.204.999 trên trang | Fact Sheet có 2 hotline; chờ xác nhận số chính/phụ |
| Dữ kiện thương hiệu | Không có tên pháp nhân, năm thành lập, địa điểm nhà máy, câu định vị | Thêm khối NAP chuẩn: tên thương hiệu + pháp nhân + văn phòng + nhà máy (Chương Mỹ, Hà Nội – cấp khu vực) + hotline + giờ làm việc |
| FAQ | Không có | Mục 5 |
| Internal link | Không có link ngữ cảnh | Link đến hướng dẫn đặt hàng, trang xưởng, chính sách bảo hành |
| Khả năng AI trích dẫn | **Thấp–Trung bình** – NAP có trong HTML nhưng mâu thuẫn 24/7 | |

### 3.7 `/xuong-may-dong-phuc-univi` (yêu cầu riêng mục 4 của brief)

| Nhóm nội dung | Hiện trạng | Đánh giá | Đề xuất (không tạo số liệu mới) |
|---|---|---|---|
| Tổng quan nhà máy | Đoạn mở + H2 "1. Quy Mô Và Năng Lực Thực Tế" | Có, nhưng có "hơn 9 năm" và không có năm thành lập, không có câu định vị | Thêm "Thành lập năm 2017" + câu định vị |
| Diện tích & công suất | "Hơn 2.000m² tại phường Chương Mỹ", "Gần 100.000 sản phẩm/tháng" | Lệch câu đã duyệt ("hơn", "gần", "phường") | "khoảng 2.000 m² tại Chương Mỹ, Hà Nội", "khoảng 100.000 sản phẩm/tháng" |
| Máy móc, thiết bị | "Máy thêu Tajima hiện đại, máy may 4 kim 6 chỉ" – **không có số lượng** | Có tên thiết bị, chưa có bằng chứng (ảnh, danh mục) | **Không tự thêm số lượng máy.** Đề xuất bổ sung ảnh thực tế có chú thích khi Univi cung cấp |
| Nhân sự | "Gần 100 công nhân" | Chưa có trong Fact Sheet | Cần xác nhận hoặc bỏ |
| Quy trình sản xuất | H2 "3. Quy Trình Sản Xuất 4 Bước" | Có | Bước 1 "mockup trong 1 giờ" cần xác nhận |
| Kiểm soát chất lượng | "100% sản phẩm qua khâu kiểm tra QC… form dáng, đường may, màu sắc và logo" | Có tiêu chí cơ bản; không có quy trình/tiêu chuẩn kiểm tra cụ thể | Cần Univi cung cấp quy trình QC thực tế (các điểm kiểm, tiêu chí đạt) trước khi mở rộng |
| Đáp ứng đơn B2B | Mục 4–5: lý do chọn, 2S Uniform, MOQ 10/80 | MOQ chưa nêu đủ điều kiện; "không lo trễ hạn" là cam kết phổ quát | Câu MOQ đã duyệt (10 đủ điều kiện · Gym thiết kế riêng 80 · khác theo báo giá) |
| Hình ảnh thực tế & bằng chứng | 2 ảnh (flickr) + 1 video YouTube; **alt ảnh xưởng ghi "Đan Phượng"**; không có chú thích, ngày chụp | Bằng chứng mỏng, alt sai địa điểm | Sửa alt; bổ sung bộ ảnh khu cắt/may/in thêu/QC có chú thích khi có ảnh xác thực |
| FAQ | 4 câu trong `<details>` (có trong HTML server); **không có FAQPage JSON-LD** | FAQ #1 sai mốc thời gian (2–3/10–12 ngày) và "cam kết… cho mọi đơn hàng"; FAQ #3 "200–300 lần giặt" | Sửa FAQ #1; bổ sung FAQ MOQ, địa điểm, kiểm tra chất lượng (mục 5) |
| Title / Desc | Title thiếu thương hiệu; desc có "vượt trội", "không thấm ngược", "giá gốc tại xưởng" | | Theo đề xuất Sprint 6.2.2-A (X-D, X-T) |
| Heading | H2 "CHẤT LIỆU UNI AIR - UNIA12" nằm dưới H3 | | `data-props` thêm `"titleAs":"h3"` |
| Internal link | Không có link ngữ cảnh đến pillar (ngoài catalog vải), hướng dẫn đặt hàng, liên hệ, giới thiệu, chính sách bảo hành | | Mục 6 |
| Khả năng AI trích dẫn | **Thấp** – đúng chủ đề "năng lực sản xuất" nhưng dữ kiện mâu thuẫn trong cùng URL | | |

### 3.8 `/huong-dan-dat-hang` (yêu cầu riêng mục 5 của brief)

| Nhóm nội dung | Hiện trạng | Đánh giá | Đề xuất |
|---|---|---|---|
| Các bước đặt hàng | 5 bước (H3) | Có | — |
| Tiếp nhận yêu cầu | Bước 1 | Đạt | — |
| Tư vấn & thiết kế | Bước 2 "Lên **market** thiết kế 2D" (`huong-dan-dat-hang.jsx:107`), bước 3 "maket" (`:125`) | Sai chính tả/thuật ngữ | "mockup/maket thiết kế" |
| Chọn chất liệu | Chỉ nêu tên vải chung "vải mè thể thao, thun lạnh 4 chiều, cá sấu Poly, Cotton 100%" | Không khớp hệ dòng vải của Univi; không link `/chat-lieu-vai` | Thêm bước/khối chọn chất liệu, dẫn tới `/chat-lieu-vai` |
| **Làm mẫu & duyệt mẫu** | **Không có bước riêng.** Bước 3 chỉ "Chốt mẫu thiết kế, ký hợp đồng & đặt cọc" | **Gap lớn**; mâu thuẫn với `/gioi-thieu` và trang xưởng (có bước nhận áo mẫu duyệt trước sản xuất) | Thêm bước "Làm mẫu & duyệt mẫu" **không ghi thời hạn** cho tới khi Univi xác nhận |
| Sản xuất | Bước 4 + mục "Thời gian sản xuất tiêu chuẩn: Từ 3 - 7 ngày làm việc…" (`:262`) | Đạt về mốc; định dạng "3 - 7" | Chuẩn hóa "3–7 ngày làm việc, tùy đơn hàng"; nêu rõ **mốc bắt đầu tính** (chờ xác nhận) |
| Kiểm tra chất lượng | Bước 4 "Kiểm định chất lượng (KCS)" | "Kiểm định" dễ hiểu là kiểm định bên thứ ba | "Kiểm tra chất lượng (KCS)" |
| Giao hàng | Bước 5 "giao **đúng hẹn**"; "Miễn phí vận chuyển nội thành Hà Nội" (`:274`) | Chính sách cần xác nhận | Giữ nếu BĐH xác nhận |
| **Phân biệt các loại thời gian** | Chỉ có thời gian sản xuất + "may gấp 24h–48h" (`:268`) | Không tách thời gian tư vấn/thiết kế, làm mẫu/duyệt mẫu, vận chuyển | Bảng tiến độ 4 cột: Tư vấn & thiết kế · Làm mẫu & duyệt mẫu · Sản xuất (3–7 ngày làm việc, tùy đơn hàng) · Vận chuyển. **Các cột chưa có mốc ghi "Xác nhận khi báo giá"**, không tự đặt thời hạn |
| **MOQ** | **Không có** | Gap | Câu MOQ đã duyệt |
| Thanh toán | Đặt cọc 30%–50% (`:235`); tiền mặt "tại xưởng" (`:247`) | Cần xác nhận; "tại xưởng" ngụ ý khách đến nhà máy khi địa chỉ chi tiết chưa công bố | Xác nhận chính sách; thay "tại văn phòng/xưởng" theo thực tế |
| Hotline | "096.156.7997" (`:305`) | Cùng số với "0961.567.997" ở chỗ khác – **khác cách viết** | Thống nhất 1 cách viết |
| FAQ / Schema | Không FAQ; không BreadcrumbList | Gap | Thêm FAQ (mục 5) + BreadcrumbList |
| Internal link | **0 link ngữ cảnh** | Gap | Mục 6 |
| Khả năng AI trích dẫn | **Trung bình** – có quy trình rõ, nhưng thiếu MOQ và bước mẫu | | |

---

## 4. Brand Fact Conflict

Phân loại: **Sai** = trái quyết định đã duyệt · **Lệch** = đúng ý nhưng sai câu chữ/thiếu điều kiện · **Thiếu** = dữ kiện đã duyệt chưa xuất hiện ở nơi cần có · **Xác minh** = cần BĐH xác nhận.

| # | Dữ kiện | URL | Vị trí / nguồn | Nội dung hiện tại | Chuẩn đã duyệt | Loại | Mức |
|---|---|---|---|---|---|---|---|
| F1 | Số năm kinh nghiệm | `/dong-phuc-doanh-nghiep` | `DoanhNghiepPillarPage.jsx:688`, `:1239` | "9+ năm Kinh nghiệm", "Hơn 9 năm kinh nghiệm" | Thành lập năm 2017; không dùng số năm | Sai | P0 |
| F2 | Số năm kinh nghiệm | `/xuong-may-dong-phuc-univi` | DB `content` (mục 4 + đoạn kết) | "Hơn 9 năm hoạt động", "hơn 9 năm kinh nghiệm" | Như trên | Sai | P0 |
| F3 | Định vị "số 1" | `/` | FAQPage JSON-LD; nguồn DB `HomepageFaqSettings`, fallback `data/homepageFaqs.js:23` | "đồng phục thể thao số 1 tại thị trường Việt Nam" | Câu định vị chính thức; không claim số 1 | Sai | P0 |
| F4 | MOQ phổ quát | `/` | FAQ JSON-LD; `data/homepageFaqs.js:32` | "đặt đồng phục thể thao từ 10 chiếc trở lên" | 10 chỉ cho dòng/mẫu đủ điều kiện; Gym thiết kế riêng 80; khác theo báo giá | Sai | P0 |
| F5 | Vải "độc quyền", "giá tốt nhất" | `/` | `data/homepageFaqs.js:14` | "hai dòng vải độc quyền", "với mức giá tốt nhất" | Không có bằng chứng; Fact Sheet §8 không có "độc quyền" | Sai | P0 |
| F6 | Địa điểm nhà máy | `/xuong-may-dong-phuc-univi` | DB `content`, alt ảnh | "…quy mô 2.000m² tại **Đan Phượng**, Hà Nội" | Chương Mỹ, Hà Nội | Sai | P0 |
| F7 | Thời gian sản xuất | `/xuong-may-dong-phuc-univi` | DB `content` + `faqs[0]` | "Mẫu có sẵn 2–3 ngày \| Đơn thiết kế riêng 10–12 ngày"; "cam kết… cho mọi đơn hàng" | 3–7 ngày làm việc, tùy đơn hàng | Sai | P0 |
| F8 | MOQ Gym 80 | `/dong-phuc-gym` | FAQ #8, mục 10 | Không có | Gym thiết kế riêng: MOQ 80 sản phẩm | Thiếu | P0 |
| F9 | MOQ 10 có điều kiện | Gym, Yoga, Pilates, Doanh nghiệp, `/huong-dan-dat-hang` | — | Không có con số; "tư vấn theo mẫu" | 10 cho dòng/mẫu đủ điều kiện; khác theo báo giá | Thiếu | P1 |
| F10 | MOQ trang xưởng | `/xuong-may-dong-phuc-univi` | DB `content` mục 5 | "chính sách đối tác: từ 10 chiếc. Gym theo mẫu riêng: tối thiểu 80 chiếc" | Đúng số, thiếu "đủ điều kiện" + "khác theo báo giá" | Lệch | P1 |
| F11 | Thời gian 3–7 ngày | Gym, Yoga, Pilates, Doanh nghiệp | — | Không có | 3–7 ngày làm việc, tùy đơn hàng | Thiếu | P1 |
| F12 | Định dạng thời gian | `/huong-dan-dat-hang` | `:262` | "Từ 3 - 7 ngày làm việc tùy thuộc vào số lượng và độ phức tạp" | "3–7 ngày làm việc, tùy đơn hàng" | Lệch (nhẹ) | P2 |
| F13 | Diện tích nhà máy | Gym, Yoga, Pilates, Doanh nghiệp, xưởng | `GymUniviPage.jsx:783`, `YogaUniviPage.jsx:13,20`, `PilatesUniviPage.jsx:944`, `DoanhNghiepPillarPage.jsx:685,1238`, DB | "2.000m²", "2.000m2", "Hơn 2.000m²", "xưởng chính rộng 2.000m²" | "khoảng 2.000 m² tại Chương Mỹ, Hà Nội" | Lệch | P1 |
| F14 | Công suất | Gym, Yoga, Doanh nghiệp, xưởng | như trên | "100.000 sản phẩm/tháng", "100.000 sp/tháng", "Gần 100.000" | "khoảng 100.000 sản phẩm/tháng" | Lệch | P1 |
| F15 | "phường Chương Mỹ" | `/`, Pilates, Doanh nghiệp, xưởng | `og:image:alt` trang chủ; `PilatesUniviPage.jsx:1001`; `DoanhNghiepPillarPage.jsx:1238`; DB | "phường Chương Mỹ" | Fact Sheet: "Chương Mỹ, Hà Nội" (cấp khu vực) | Xác minh | P2 |
| F16 | "1000+ doanh nghiệp" | `/dong-phuc-doanh-nghiep` | `:687`, `:1239` | "1000+" | Brand-claims B: cần bằng chứng | Xác minh | P1 |
| F17 | Câu định vị | `/`, Yoga, Liên hệ | — | Không có trong nội dung hiển thị | Câu định vị chính thức "is TIÊN PHONG" | Thiếu | P1 |
| F18 | Câu định vị | Gym, Pilates, Doanh nghiệp | `GymUniviPage.jsx:211`, `PilatesUniviPage.jsx:951`, `DoanhNghiepPillarPage.jsx:1234` | "là đơn vị TIÊN PHONG…" (Gym, DN rút gọn danh sách bộ môn) | Nguyên văn "is TIÊN PHONG…" | Lệch | P1 |
| F19 | Định vị "xưởng may" | `/` | Title, WebPage.name | "Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Tại Hà Nội" | Fact Sheet §2: không định vị là đơn vị chỉ may gia công | Lệch | P1 |
| F20 | Bảo hành | `/xuong-may-dong-phuc-univi` | DB `content` Bước 4 | "bảo hành 60 ngày hình in" | `/chinh-sach-bao-hanh`: 30 ngày | Xác minh | P1 |
| F21 | Giờ hỗ trợ | `/lien-he`, `/huong-dan-dat-hang` | `ContactPage.jsx:136,152`; `huong-dan-dat-hang.jsx:291` | "24/7" | Giờ làm việc 08:00–18:00, T2–CN | Sai (nội bộ) | P1 |
| F22 | Hotline | `/huong-dan-dat-hang` vs DirectPost/companyInfo | `:305` | "096.156.7997" vs "0961.567.997" | Cùng số; Fact Sheet viết "096.156.7997" | Lệch | P2 |
| F23 | Giá 99.000đ | 8 URL | — | Không xuất hiện | Chỉ dùng cho một số sản phẩm | Đạt | — |
| F24 | Bảng giá Pilates 140.000–230.000đ | `/dong-phuc-pilates` | Mục 10 | Bảng giá B2B theo bậc số lượng | Không mâu thuẫn quy tắc giá; cần xác nhận hiệu lực | Xác minh | P2 |

---

## 5. FAQ cần bổ sung / sửa

Nguyên tắc: câu trả lời chỉ dùng dữ kiện đã duyệt; câu có dữ kiện chưa duyệt được đánh dấu **[CHỜ XÁC NHẬN]**. Mọi FAQ phải có **câu hỏi và câu trả lời trong HTML server**, khớp FAQPage JSON-LD.

| # | URL | Hành động | Câu hỏi | Câu trả lời đề xuất (dữ kiện đã duyệt) |
|---|---|---|---|---|
| Q1 | `/` | **Sửa toàn bộ 5 FAQ** + render SSR | "Định vị của Univi trên thị trường là gì?" | Câu định vị chính thức nguyên văn. Bỏ "số 1", "sánh ngang thương hiệu lớn thế giới", so sánh "hàng Trung Quốc" |
| Q2 | `/` | Sửa | "Chất liệu vải của Univi có gì đặc biệt?" | Nêu các dòng vải/công nghệ theo Fact Sheet §8; bỏ "độc quyền", "giá tốt nhất" |
| Q3 | `/` | Sửa | "Khách hàng của Univi là ai?" | Bỏ "từ 10 chiếc trở lên"; thay bằng câu MOQ có điều kiện |
| Q4 | `/dong-phuc-gym` | Sửa FAQ #8 | "Phòng tập ít nhân sự có đặt đồng phục được không?" | "…Một số dòng/mẫu đủ điều kiện có thể đặt từ 10 sản phẩm. Đồng phục Gym phát triển theo mẫu thiết kế riêng áp dụng MOQ tối thiểu 80 sản phẩm. Các cấu hình khác theo báo giá." |
| Q5 | `/dong-phuc-gym` | Thêm | "Thời gian sản xuất đồng phục Gym là bao lâu?" | "Thời gian sản xuất tham khảo từ 3–7 ngày làm việc, tùy đơn hàng. Tiến độ cụ thể được xác nhận theo số lượng, mẫu thiết kế, chất liệu, kỹ thuật hoàn thiện, thời điểm duyệt mẫu và lịch sản xuất." |
| Q6 | `/dong-phuc-yoga` | Sửa FAQ #6 | "Số lượng tối thiểu khi đặt đồng phục Yoga là bao nhiêu?" | Thêm "một số dòng/mẫu đủ điều kiện có thể đặt từ 10 sản phẩm; các dòng khác theo báo giá" |
| Q7 | `/dong-phuc-yoga` | Thêm | "Thời gian sản xuất đồng phục Yoga là bao lâu?" | Câu 3–7 ngày đã duyệt |
| Q8 | `/dong-phuc-pilates` | Sửa FAQ #12 + mục 9 | "Số lượng tối thiểu là bao nhiêu?" | MOQ 10 có điều kiện + câu 3–7 ngày; khớp bậc "10–30" của bảng giá |
| Q9 | `/dong-phuc-doanh-nghiep` | Thêm | "Đặt đồng phục doanh nghiệp tối thiểu bao nhiêu sản phẩm?" | "MOQ phụ thuộc dòng sản phẩm và cấu hình; một số dòng/mẫu đủ điều kiện có thể đặt từ 10 sản phẩm, các dòng khác theo báo giá." |
| Q10 | `/dong-phuc-doanh-nghiep` | Thêm | "Thời gian sản xuất đồng phục doanh nghiệp là bao lâu?" | Câu 3–7 ngày đã duyệt **[CHỜ XÁC NHẬN áp dụng cho dòng doanh nghiệp]** |
| Q11 | `/dong-phuc-doanh-nghiep` | Sửa FAQ #11 | "Univi có nhận đơn hàng doanh nghiệp số lượng lớn không?" | "…nhà máy khoảng 2.000 m² tại Chương Mỹ, Hà Nội, công suất khoảng 100.000 sản phẩm/tháng…" |
| Q12 | `/xuong-may-dong-phuc-univi` | Sửa FAQ #1 | "Thời gian sản xuất… là bao lâu?" | Câu 3–7 ngày đã duyệt; bỏ "cam kết… mọi đơn hàng" |
| Q13 | `/xuong-may-dong-phuc-univi` | Thêm | "Nhà máy của Đồng Phục Univi đặt ở đâu và quy mô thế nào?" | "Nhà máy đặt tại Chương Mỹ, Hà Nội, diện tích khoảng 2.000 m², công suất khoảng 100.000 sản phẩm/tháng." |
| Q14 | `/xuong-may-dong-phuc-univi` | Thêm | "Số lượng đặt hàng tối thiểu là bao nhiêu?" | Câu MOQ đã duyệt (10 · 80 Gym thiết kế riêng · khác theo báo giá) |
| Q15 | `/xuong-may-dong-phuc-univi` | Thêm | "Univi kiểm tra chất lượng sản phẩm như thế nào?" | **[CHỜ XÁC NHẬN quy trình QC]** – tạm dùng nội dung đã có: kiểm tra form, đường may, màu, logo trước đóng gói |
| Q16 | `/xuong-may-dong-phuc-univi` | Thêm | "Khách hàng có thể tham quan nhà máy không?" | **[CHỜ XÁC NHẬN]** chính sách tham quan |
| Q17 | `/huong-dan-dat-hang` | Thêm | "Số lượng đặt hàng tối thiểu là bao nhiêu?" | Câu MOQ đã duyệt |
| Q18 | `/huong-dan-dat-hang` | Thêm | "Thời gian sản xuất tính từ khi nào?" | "3–7 ngày làm việc, tùy đơn hàng." **[CHỜ XÁC NHẬN mốc bắt đầu tính]** |
| Q19 | `/huong-dan-dat-hang` | Thêm | "Có được làm mẫu và duyệt mẫu trước khi sản xuất không?" | Có, theo quy trình công bố ở trang xưởng/giới thiệu; **không ghi thời hạn** |
| Q20 | `/huong-dan-dat-hang` | Thêm | "Có hỗ trợ đơn hàng gấp không?" | **[CHỜ XÁC NHẬN]** chính sách 24h–48h, điều kiện áp dụng |
| Q21 | `/huong-dan-dat-hang` | Thêm | "Chính sách đặt cọc và thanh toán?" | **[CHỜ XÁC NHẬN]** tỷ lệ 30%–50% |
| Q22 | `/lien-he` | Thêm (3–4 câu) | "Univi làm việc vào thời gian nào?"; "Văn phòng và nhà máy của Univi ở đâu?"; "Tôi cần chuẩn bị gì khi liên hệ báo giá?" | Giờ làm việc thực tế; văn phòng (chờ xác minh hành chính); nhà máy Chương Mỹ, Hà Nội; danh sách chuẩn bị đã có ở `/huong-dan-dat-hang` |

**Sửa kỹ thuật FAQ (bắt buộc đi kèm):**
- `/`: bỏ `ssr: false` cho phần FAQ, hoặc tách khối câu hỏi/câu trả lời render SSR khỏi phần media cần `window` (`pages/index.js:27-29`).
- `/dong-phuc-pilates` (`PilatesUniviPage.jsx:911-923`) và `/dong-phuc-doanh-nghiep` (`DoanhNghiepPillarPage.jsx:1351-1360`): render mọi câu trả lời trong HTML, đóng/mở bằng CSS hoặc `<details>` (như Gym/Yoga).
- `/xuong-may-dong-phuc-univi`: FAQ đã có trong HTML server; có thể thêm FAQPage JSON-LD từ `post.faqs` (dữ liệu hiển thị thật).

---

## 6. Internal Link đề xuất

**Hiện trạng** (link ngữ cảnh, đã loại navbar/footer): trang xưởng và `/huong-dan-dat-hang` **không có trong navbar/footer**. Navbar/footer đã có `/lien-he`, `/gioi-thieu`, `/chat-lieu-vai`, 4 pillar, `/ho-so-nang-luc`, `/bang-mau`, `/chinh-sach-bao-hanh`.

| Từ → Đến | `/xuong-may…` | `/huong-dan-dat-hang` |
|---|---|---|
| `/` | 0 | 0 |
| `/dong-phuc-gym` | 1 | 1 |
| `/dong-phuc-yoga` | 1 | 0 |
| `/dong-phuc-pilates` | 0 | 0 |
| `/dong-phuc-doanh-nghiep` | 0 | 0 |
| `/lien-he` | 0 | 0 |
| `/xuong-may…` | — | 0 |
| `/huong-dan-dat-hang` | 0 | — |

| # | Từ | Đến | Anchor đề xuất | Vị trí đặt | Mức |
|---|---|---|---|---|---|
| L1 | `/` | `/xuong-may-dong-phuc-univi` | nhà máy sản xuất Đồng Phục Univi | Khối giới thiệu thương hiệu mới (mục 3.1) | P1 |
| L2 | `/` | `/huong-dan-dat-hang` | quy trình đặt may đồng phục | Gần CTA báo giá | P1 |
| L3 | `/` | `/dong-phuc-doanh-nghiep` | đồng phục doanh nghiệp | Khối danh mục "Polo Doanh Nghiệp/Sơ Mi/Vest" | P2 |
| L4 | `/dong-phuc-pilates` | `/xuong-may-dong-phuc-univi` | xưởng sản xuất của Univi | Mục 13 (đoạn "xưởng chính rộng 2.000m²") | P1 |
| L5 | `/dong-phuc-pilates` | `/huong-dan-dat-hang` | hướng dẫn đặt hàng | Mục 8 "Quy trình đặt may" | P1 |
| L6 | `/dong-phuc-doanh-nghiep` | `/xuong-may-dong-phuc-univi` | năng lực nhà máy sản xuất | Mục 11 khối "Xưởng sản xuất" | P1 |
| L7 | `/dong-phuc-doanh-nghiep` | `/huong-dan-dat-hang` | quy trình đặt đồng phục doanh nghiệp | Khối "Từ yêu cầu đến sản phẩm 8 bước" | P1 |
| L8 | `/dong-phuc-doanh-nghiep` | `/chat-lieu-vai` | chất liệu vải đồng phục | Mục 8 | P2 |
| L9 | `/dong-phuc-yoga` | `/huong-dan-dat-hang` | quy trình đặt may đồng phục Yoga | Mục 10 | P2 |
| L10 | `/xuong-may-dong-phuc-univi` | `/huong-dan-dat-hang` | hướng dẫn đặt hàng | Mục 3 "Quy trình sản xuất" | P1 |
| L11 | `/xuong-may-dong-phuc-univi` | `/dong-phuc-gym`, `/dong-phuc-pilates`, `/dong-phuc-yoga` | đồng phục Gym / Pilates / Yoga | Mục 4 (danh sách đối tác phòng tập) | P1 |
| L12 | `/xuong-may-dong-phuc-univi` | `/chinh-sach-bao-hanh` | chính sách bảo hành | Bước 4 (thay "60 ngày") | P1 |
| L13 | `/xuong-may-dong-phuc-univi` | `/gioi-thieu` | về Đồng Phục Univi | Đoạn mở | P2 |
| L14 | `/huong-dan-dat-hang` | `/chat-lieu-vai` | các dòng vải của Univi | Bước chọn chất liệu | P1 |
| L15 | `/huong-dan-dat-hang` | `/xuong-may-dong-phuc-univi` | nhà máy sản xuất | Bước 4 | P1 |
| L16 | `/huong-dan-dat-hang` | `/chinh-sach-bao-hanh` | chính sách bảo hành | Bước 5 | P1 |
| L17 | `/huong-dan-dat-hang` | `/bang-mau` | bảng màu | Mục "Thông tin cần chuẩn bị" | P2 |
| L18 | `/lien-he` | `/huong-dan-dat-hang` | xem quy trình đặt hàng | Dưới form | P1 |
| L19 | Navbar hoặc footer (dùng chung) | `/xuong-may-dong-phuc-univi`, `/huong-dan-dat-hang` | Nhà máy sản xuất · Hướng dẫn đặt hàng | Nhóm "Giới thiệu" | P2 – ảnh hưởng toàn site, cần duyệt riêng |

Không lặp anchor khớp chính xác giữa các trang; tối đa 1 link ngữ cảnh mới cho mỗi cặp nguồn–đích.

---

## 7. Claim cần bằng chứng

| # | Claim | URL | Nguồn | Xử lý đề xuất |
|---|---|---|---|---|
| C1 | "đồng phục thể thao số 1 tại thị trường Việt Nam" | `/` | FAQ (DB/`data/homepageFaqs.js:23`) | **Bỏ** (không thể chứng minh; quy chuẩn nội bộ cấm "số 1") |
| C2 | "Chất liệu sánh ngang với các thương hiệu lớn trên thế giới"; "Local brand không thể làm tốt như hàng Trung Quốc" | `/` | như trên | Bỏ (so sánh không có căn cứ) |
| C3 | "hai dòng vải độc quyền"; "mức giá tốt nhất" | `/` | `data/homepageFaqs.js:14` | Bỏ hoặc cung cấp bằng chứng sở hữu/đăng ký |
| C4 | "UNI DRY độc quyền", "vượt trội", "mồ hôi không thấm ngược" | `/xuong-may…` | DB content, meta | Cần hồ sơ kỹ thuật (A12/A13) |
| C5 | "1000+ doanh nghiệp" | `/dong-phuc-doanh-nghiep` | `:687`, `:1239` | Cần số liệu khách hàng |
| C6 | "Gần 100 công nhân" | `/xuong-may…` | DB | Cần xác nhận |
| C7 | "Máy thêu Tajima", "máy may 4 kim 6 chỉ" | `/xuong-may…` | DB | Cần xác nhận (ảnh/danh mục thiết bị) – không thêm số lượng |
| C8 | "200–300 lần giặt", "giữ form 2–3 năm" | `/xuong-may…` | DB content + FAQ #3 | Cần phiếu test |
| C9 | "bảo hành 60 ngày hình in" | `/xuong-may…` | DB | Mâu thuẫn 30 ngày (`/chinh-sach-bao-hanh`) |
| C10 | "mockup trong vòng 1 giờ" | `/xuong-may…` | DB + FAQ #4 | Cần xác nhận SLA |
| C11 | "100% sản phẩm qua QC" | `/xuong-may…` | DB | Cần quy trình QC |
| C12 | Tên khách hàng (Sun Group, Vingroup, TKV, Premier Village…) | `/xuong-may…`; khối "Khách hàng" ở Doanh nghiệp | DB; `DoanhNghiepPillarPage.jsx` | Cần quyền công bố |
| C13 | "may gấp 24h–48h" | `/huong-dan-dat-hang` | `:268` | Cần xác nhận điều kiện áp dụng |
| C14 | "Tư vấn/phản hồi 24/7", "phản hồi trong 15 phút" | `/lien-he`, `/huong-dan-dat-hang` | `ContactPage.jsx:136,152,318` | Mâu thuẫn giờ làm việc; xác nhận SLA |
| C15 | "Miễn phí vận chuyển nội thành Hà Nội"; "đặt cọc 30%–50%" | `/huong-dan-dat-hang` | `:274`, `:235` | Xác nhận chính sách |
| C16 | "xưởng chính" (ngụ ý nhiều xưởng) | `/dong-phuc-pilates` | `:944` | Xác nhận số lượng cơ sở sản xuất |
| C17 | Thông số vải (89% Polyamide – 11% Elastane, 180 GSM; 150 GSM…) | Pilates, trang chủ, xưởng (catalog) | `PilatesUniviPage.jsx`, `data/fabricMaterials` | Hồ sơ kỹ thuật (A12/A13) |
| C18 | "Chất liệu & kiểm định" (tiêu đề khối) | `/dong-phuc-doanh-nghiep` | `DoanhNghiepPillarPage.jsx:1240` | Bằng chứng hoặc đổi tên khối |
| C19 | Bảng giá Pilates 140.000–230.000đ | `/dong-phuc-pilates` | Mục 10 | Xác nhận hiệu lực, VAT, phạm vi |

---

## 8. Mức độ ưu tiên P0/P1/P2

| Mức | Hạng mục | URL | Loại thay đổi |
|---|---|---|---|
| **P0** | FAQ trang chủ: bỏ "số 1", "độc quyền", "giá tốt nhất", MOQ phổ quát, so sánh đối thủ; render SSR | `/` | Nội dung (DB `HomepageFaqSettings` + fallback code) + kỹ thuật (`pages/index.js`) |
| **P0** | Thay "9+ năm / Hơn 9 năm" bằng "Thành lập năm 2017" | `/dong-phuc-doanh-nghiep` | Code |
| **P0** | Đan Phượng, 9 năm, 2–3/10–12 ngày, "mọi đơn hàng" (đợt A3 của Sprint 6.2.2) | `/xuong-may…` | DB (cần phê duyệt ghi DB) |
| **P0** | Thêm MOQ Gym thiết kế riêng 80 + MOQ 10 có điều kiện | `/dong-phuc-gym` | Code |
| **P1** | FAQ Pilates/Doanh nghiệp render câu trả lời trong HTML | Pilates, Doanh nghiệp | Code |
| **P1** | MOQ có điều kiện + 3–7 ngày làm việc trên Yoga, Pilates (mục 9), Doanh nghiệp | 3 pillar | Code |
| **P1** | Chuẩn hóa "khoảng 2.000 m² tại Chương Mỹ, Hà Nội" / "khoảng 100.000 sản phẩm/tháng" | Gym, Yoga, Pilates, Doanh nghiệp, xưởng | Code + DB |
| **P1** | Câu định vị nguyên văn: thêm vào `/`, Yoga, Liên hệ; đồng bộ Gym, Pilates, Doanh nghiệp | 6 URL | Code |
| **P1** | `/huong-dan-dat-hang`: bước làm mẫu/duyệt mẫu, MOQ, bảng tiến độ tách công đoạn, sửa "market/maket", FAQ, BreadcrumbList, link ngữ cảnh | `/huong-dan-dat-hang` | Code |
| **P1** | `/lien-he`: bỏ "24/7"/"15 phút" (hoặc xác nhận), rút title/desc, khối NAP + FAQ | `/lien-he` | Code |
| **P1** | Internal link L1–L2, L4–L7, L10–L12, L14–L16, L18 | nhiều URL | Code + DB |
| **P1** | Title trang chủ bỏ định vị "xưởng may" | `/` | Code |
| **P2** | H1 trang chủ hiển thị; dấu cách thừa title Gym/Pilates; đánh số H2 Doanh nghiệp; H2 "CHẤT LIỆU UNI AIR" trên trang chủ/xưởng; thống nhất cách viết hotline; "phường Chương Mỹ"; link navbar/footer (L19) | nhiều URL | Code |

---

## 9. Đề xuất thứ tự triển khai

| Đợt | Nội dung | Phụ thuộc | Lý do thứ tự |
|---|---|---|---|
| **0** | Đưa mã nguồn vào Git (điểm chặn đã nêu ở Sprint 6.2.2-A1) | — | Không có Git thì không review/rollback được các đợt sau |
| **1 (P0 code)** | `/dong-phuc-doanh-nghiep` bỏ 9 năm; `/dong-phuc-gym` thêm MOQ 80/10 + 3–7 ngày; FAQ trang chủ: sửa nội dung fallback trong code + render SSR | Đợt 0 | Sai dữ kiện ở vị trí nổi bật; FAQ trang chủ đang phát claim bị cấm qua structured data |
| **2 (P0 DB)** | Bản ghi FAQ trang chủ trong `HomepageFaqSettings`; trang xưởng (A3) | Phê duyệt ghi DB | Cần quyền ghi DB riêng; thực hiện qua dashboard |
| **3 (P1 pillar)** | Yoga, Pilates, Doanh nghiệp: MOQ/thời gian, FAQ SSR, chuẩn hóa số liệu nhà máy, câu định vị | Đợt 1 | Đồng bộ dữ kiện thương mại trên các trang đích chính |
| **4 (P1 chuyên sâu)** | `/huong-dan-dat-hang` tái cấu trúc quy trình 6 bước + FAQ; `/lien-he` | Câu trả lời mục 10 (Q-đặt cọc, mốc thời gian, may gấp, SLA) | Cần BĐH xác nhận chính sách trước khi viết |
| **5 (P1 link)** | Internal link L1–L18 | Đợt 3–4 (để anchor trỏ đến nội dung đã chuẩn) | Tránh dẫn traffic vào trang còn sai |
| **6 (P2)** | Heading, title nhỏ, navbar/footer (L19), "phường", hotline | — | Rủi ro thấp |
| **7** | Đồng bộ `llms.txt`, `llms-full.txt`, `lib/knowledgeBase.ts` (prompt AI viết bài) theo dữ kiện mới | Đợt 1–4 | Tránh AI nội bộ và AI bên ngoài tiếp tục dùng dữ kiện cũ |

---

## 10. Thông tin còn thiếu cần Univi xác nhận

| # | Câu hỏi | Ảnh hưởng |
|---|---|---|
| U1 | Mốc 3–7 ngày làm việc **bắt đầu tính từ khi nào** (sau duyệt mẫu? sau đặt cọc?) và **kết thúc ở bước nào** (xuất xưởng? giao hàng?) | `/huong-dan-dat-hang`, FAQ tất cả pillar |
| U2 | Thời gian **tư vấn/thiết kế**, **làm mẫu/duyệt mẫu**, **vận chuyển** – có mốc công bố được không? | Bảng tiến độ `/huong-dan-dat-hang` |
| U3 | Mốc 3–7 ngày áp dụng cho **đồng phục doanh nghiệp** (polo, sơ mi, vest) không? | `/dong-phuc-doanh-nghiep` |
| U4 | Danh sách **dòng/mẫu "đủ điều kiện"** áp dụng MOQ 10 (theo bộ môn/mẫu có sẵn/dòng vải) | Câu MOQ trên mọi pillar |
| U5 | Chính sách **may gấp 24h–48h**: còn áp dụng? điều kiện? | `/huong-dan-dat-hang` |
| U6 | Chính sách **đặt cọc 30%–50%**, **miễn phí vận chuyển nội thành Hà Nội**, **thanh toán tiền mặt tại xưởng** | `/huong-dan-dat-hang` |
| U7 | **Quy trình QC** thực tế (các điểm kiểm, tiêu chí đạt/không đạt) | Trang xưởng |
| U8 | **Thiết bị** (Tajima, máy 4 kim 6 chỉ) và **nhân sự** ("gần 100 công nhân") có được công bố không? | Trang xưởng |
| U9 | **Ảnh thực tế nhà máy** đã xác thực địa điểm Chương Mỹ (ảnh flickr `55260553380` và các ảnh khác) | Trang xưởng, alt ảnh |
| U10 | Khách hàng có được **tham quan nhà máy** không? | FAQ trang xưởng |
| U11 | **Bảo hành hình in**: 30 hay 60 ngày? | Trang xưởng, `/chinh-sach-bao-hanh` |
| U12 | SLA **phản hồi** ("15 phút") và **giờ hỗ trợ** (24/7 hay 08:00–18:00) | `/lien-he`, `/huong-dan-dat-hang` |
| U13 | **Hotline chính/phụ** và cách viết chuẩn | Toàn site |
| U14 | Ghi "**Chương Mỹ**" hay "**phường Chương Mỹ**" | Toàn site |
| U15 | Bằng chứng **"1000+ doanh nghiệp"**, quyền công bố **tên/logo khách hàng** | Doanh nghiệp, trang xưởng |
| U16 | **Bảng giá Pilates** còn hiệu lực? ngày áp dụng, gồm VAT/in ấn? | `/dong-phuc-pilates` |
| U17 | Pilates ghi "**xưởng chính**" – Univi có nhiều cơ sở sản xuất không? | `/dong-phuc-pilates` |
| U18 | Bản ghi FAQ trang chủ trong DB (`HomepageFaqSettings`) – ai có quyền sửa, có phê duyệt ghi DB không? | Đợt 2 |
| U19 | Câu định vị dùng **"is TIÊN PHONG"** nguyên văn trên mọi trang, hay chấp nhận "là đơn vị TIÊN PHONG" như các trang hiện tại? | 6 URL |

---

## Kế hoạch triển khai từng URL & tiêu chí nghiệm thu

| URL | Việc cần làm | Tiêu chí nghiệm thu (đo trên HTML server-rendered của bản build production) |
|---|---|---|
| `/` | Sửa 5 FAQ (DB + fallback); FAQ render SSR; title bỏ "Xưởng May…"; khối giới thiệu thương hiệu có câu định vị, 2017, nhà máy; H1 hiển thị; link L1–L3 | Câu hỏi **và** câu trả lời FAQ có trong HTML (5/5), khớp FAQPage JSON-LD; 0 kết quả "số 1", "độc quyền", "tốt nhất", "10 chiếc trở lên", "Trung Quốc"; câu định vị nguyên văn có trong body; 1 H1 hiển thị |
| `/dong-phuc-gym` | MOQ 10 + Gym thiết kế riêng 80 + "các dòng khác theo báo giá"; 3–7 ngày; chuẩn hóa số liệu nhà máy; câu định vị đầy đủ; xóa dấu cách title | Chuỗi "80 sản phẩm" và "10 sản phẩm" cùng điều kiện có trong body và FAQ JSON-LD; "3–7 ngày làm việc, tùy đơn hàng" có mặt; "khoảng 2.000 m² tại Chương Mỹ, Hà Nội"; FAQ vẫn 100% SSR |
| `/dong-phuc-yoga` | Thêm câu định vị; MOQ 10 có điều kiện; 3–7 ngày; chuẩn hóa "khoảng 2.000 m² tại Chương Mỹ, Hà Nội"; link L9 | Câu định vị có trong body; không còn "2.000m2"; FAQ 100% SSR |
| `/dong-phuc-pilates` | Render câu trả lời FAQ SSR; mục 9 có MOQ + thời gian; chuẩn hóa nhà máy; câu định vị nguyên văn; link L4–L5; xác nhận bảng giá | 13/13 câu trả lời FAQ trong HTML; mục 9 có "10 sản phẩm" + "3–7 ngày làm việc"; không còn "xưởng chính" nếu U17 = một cơ sở |
| `/dong-phuc-doanh-nghiep` | Bỏ 9 năm; xử lý 1000+; render câu trả lời FAQ SSR; MOQ/thời gian; chuẩn hóa nhà máy; sửa đánh số H2; link L6–L8 | 0 kết quả "9 năm", "9+ năm"; 12/12 câu trả lời FAQ trong HTML; "Thành lập năm 2017" có mặt; H2 đánh số liên tục |
| `/lien-he` | Bỏ/xác nhận "24/7", "15 phút"; title ≤ 60, desc ≤ 160; khối NAP + câu định vị + FAQ; link L18 | 0 kết quả "24/7" (trừ khi U12 xác nhận); title/desc trong giới hạn; FAQ trong HTML |
| `/xuong-may-dong-phuc-univi` | Đợt A3 (Sprint 6.2.2) + FAQ Q12–Q16 + link L10–L13 + chuẩn hóa số liệu + `titleAs: h3` | 0 kết quả "Đan Phượng", "9 năm", "2–3 ngày", "10–12 ngày", "mọi đơn hàng"; câu MOQ đủ điều kiện; FAQ trong HTML + JSON-LD khớp |
| `/huong-dan-dat-hang` | Quy trình 6 bước có "Làm mẫu & duyệt mẫu"; bảng tiến độ tách 4 công đoạn (chỉ sản xuất có mốc 3–7 ngày); MOQ; sửa "market/maket", "Kiểm định"; FAQ Q17–Q21; BreadcrumbList; link L14–L17 | Có bước làm mẫu; không có thời hạn chưa xác nhận cho tư vấn/mẫu/vận chuyển; câu MOQ có điều kiện; 0 kết quả "market thiết kế"; FAQ trong HTML + JSON-LD; ≥ 4 link ngữ cảnh |

**Tiêu chí nghiệm thu chung cho Sprint 6.2.3:**
1. 0 kết quả trên 8 URL (head + body + JSON-LD): "9 năm", "9+ năm", "Đan Phượng", "Sóc Sơn", "Thọ An", "2–3 ngày", "10–12 ngày", "số 1", "độc quyền" (trừ khi có bằng chứng), "từ 10 chiếc trở lên" không kèm điều kiện.
2. MOQ: mọi lần nhắc "10 sản phẩm" đi kèm "đủ điều kiện"; "80 sản phẩm" chỉ gắn với Gym thiết kế riêng.
3. Thời gian: mọi lần nhắc thời gian sản xuất dùng "3–7 ngày làm việc, tùy đơn hàng"; không có thời hạn cho công đoạn chưa xác nhận.
4. Số liệu nhà máy dùng đúng câu đã duyệt (có "khoảng", có "Chương Mỹ, Hà Nội").
5. Mọi FAQPage JSON-LD có câu hỏi **và** câu trả lời tương ứng trong HTML server.
6. Typecheck + production build đạt; mỗi trang đúng 1 H1; JSON-LD parse 100%.
7. Có Before/After + người duyệt cho mỗi thay đổi; không deploy khi chưa duyệt.
