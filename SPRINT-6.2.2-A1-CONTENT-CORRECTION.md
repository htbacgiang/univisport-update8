# SPRINT 6.2.2-A1 – CONTENT CORRECTION

- **Ngày:** 08/11/2026
- **Căn cứ:** `SPRINT-6.2.2-A1-PRE-MERGE-REVIEW.md` – vấn đề I-1 (tuyên bố dẫn đầu) và I-2 (số liệu nhà máy chưa có bằng chứng)
- **Phạm vi được phép sửa:** `pages/gioi-thieu/index.jsx`, `components/univisport/AboutUniviPage.jsx`
- **Không thực hiện:** commit, push, merge, deploy, thao tác Git, ghi MongoDB, sửa DirectPost, `DirectPostView.tsx`, `AboutNavigation.jsx`, `_app.js`, `knowledgeBase.ts`, file llms, Organization schema

---

## 1. File đã sửa

| File | Thời điểm sửa | Nội dung |
|---|---|---|
| `pages/gioi-thieu/index.jsx` | 21:25:10 | Task 1 (1 vị trí), Task 2 (2 số liệu), bỏ import `Zap` không còn dùng |
| `components/univisport/AboutUniviPage.jsx` | 21:25:14 | Task 1 (5 vị trí) |
| `tsconfig.tsbuildinfo` | 21:25:42 | Do `tsc` tự sinh khi typecheck – không phải mã nguồn, không commit |

Kiểm tra theo thời điểm sửa đổi (dự án không có Git): sau `SPRINT-6.2.2-A1-PRE-MERGE-REVIEW.md` **chỉ có 2 file mã nguồn trên thay đổi**. `.next/` là output của production build.

---

## 2. Nội dung trước và sau

### Task 1 – Loại bỏ tuyên bố dẫn đầu

| # | Vị trí | Trước | Sau | Ghi chú |
|---|---|---|---|---|
| 1 | `index.jsx:203` (Tầm nhìn chiến lược) | Univi định hướng trở thành **biểu tượng sáng tạo hàng đầu** trong lĩnh vực Đồng phục tại Việt Nam, đặc biệt trong mảng Đồng Phục Thể Thao chuyên sâu. | Univi định hướng phát triển **theo hướng sáng tạo** trong lĩnh vực Đồng phục tại Việt Nam, đặc biệt trong mảng Đồng Phục Thể Thao chuyên sâu. | |
| 2 | `AboutUniviPage.jsx:116` | …Chiến lược 2025-2028 nhấn mạnh việc **trở thành lựa chọn hàng đầu** trong mảng Đồng Phục Thể Thao và xây dựng thương hiệu mạnh mẽ… | …Chiến lược 2025-2028 **tập trung phát triển** mảng Đồng Phục Thể Thao và xây dựng thương hiệu mạnh mẽ… | |
| 3 | `AboutUniviPage.jsx:128` (thẻ H4 tầm nhìn 01) | **Biểu tượng sáng tạo hàng đầu** / trong lĩnh vực Đồng Phục | **Định hướng sáng tạo** / trong lĩnh vực Đồng Phục | Heading H4 |
| 4 | `AboutUniviPage.jsx:146` | Univi định hướng **trở thành biểu tượng sáng tạo hàng đầu** trong lĩnh vực Đồng Phục tại Việt Nam… | Univi định hướng phát triển **theo hướng sáng tạo** trong lĩnh vực Đồng Phục tại Việt Nam… | |
| 5 | `AboutUniviPage.jsx:187` (biến thể tương tự) | …nghiên cứu chuyên sâu về chất liệu tạo nên **sự khác biệt vượt trội trong ngành đồng phục tại Việt Nam**. | …nghiên cứu chuyên sâu về chất liệu, tạo nên **sự khác biệt cho sản phẩm đồng phục của Univi**. | Tuyên bố vượt trội so với toàn ngành = cùng nhóm ý nghĩa vị thế thị trường |
| 6 | `AboutUniviPage.jsx:193` | …luôn **đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu**. | …luôn **ưu tiên chất lượng và sự hài lòng của khách hàng**. | Không phải tuyên bố vị thế (thành ngữ "đặt lên hàng đầu" = ưu tiên). Diễn đạt lại cùng nghĩa để loại bỏ chuỗi "hàng đầu" khỏi trang |

Không tạo tuyên bố vị thế thị trường mới.

### Task 2 – Tạm ẩn số liệu nhà máy (`index.jsx`, khối "Năng lực & Quy mô sản xuất")

| Trước | Sau |
|---|---|
| **Nhà máy:** khoảng 2.000 m² tại Chương Mỹ, Hà Nội | **Nhà máy:** Chương Mỹ, Hà Nội |
| **Công suất:** khoảng 100.000 sản phẩm/tháng | *(đã bỏ cả dòng)* |

Không thay bằng số liệu ước lượng khác. Kéo theo: bỏ icon `Zap` khỏi import `lucide-react` vì không còn dùng trong file (`AboutUniviPage.jsx` vẫn import `Zap` riêng cho giá trị cốt lõi "Quyết liệt", không bị ảnh hưởng).

Kiểm tra thêm: title, meta description, OG, Twitter, JSON-LD AboutPage và alt ảnh của trang **không** chứa hai số liệu này (đã loại từ đợt A1 trước).

### Task 3 – Giữ nguyên (đã xác nhận còn nguyên trong SSR)

- Câu định vị "Đồng Phục Univi **is TIÊN PHONG**…"
- "Thành lập: 2017"
- "Thời gian sản xuất tham khảo từ 3–7 ngày làm việc, tùy đơn hàng"
- "Một số sản phẩm có giá tham khảo từ 99.000đ; báo giá chính thức…"
- Timeline (không chạm `AboutNavigation.jsx`; toàn văn mục 2026 vẫn có trong SSR)
- Internal link "Xem chi tiết nhà máy sản xuất Đồng Phục Univi" → `/xuong-may-dong-phuc-univi`

---

## 3. Kiểm tra đã chạy và kết quả

| Kiểm tra | Lệnh / cách làm | Kết quả |
|---|---|---|
| Typecheck toàn dự án | `npx tsc --noEmit -p .` | ✅ exit 0, **0 lỗi** |
| Production build | `npx next build` | ✅ exit 0, "Compiled successfully", route `ƒ /gioi-thieu` |
| SSR `/gioi-thieu` | `next start` bản build production → `curl` | ✅ HTTP 200. Title: `Giới Thiệu Đồng Phục Univi – Đồng Phục Thể Thao B2B Từ 2017` |
| JSON-LD parse | `JSON.parse` từng khối | ✅ 2/2 khối, 0 lỗi. Types: Organization, WebSite, BreadcrumbList, AboutPage |
| Đúng một H1 | Đếm `<h1` trong body SSR | ✅ 1 |
| Grep cụm dẫn đầu – mã nguồn 2 file | `hàng đầu`, `dẫn đầu`, `đứng đầu`, `số 1`, `số một`, `tốt nhất`, `biểu tượng sáng tạo`, `lựa chọn hàng đầu`, `vượt trội trong ngành` (kèm biến thể hoa/thường) | ✅ 0 kết quả |
| Grep cụm dẫn đầu – toàn trang SSR | Cùng danh sách, trên `<head>` (title/meta/OG/Twitter), text body, toàn bộ `alt`, JSON-LD, `__NEXT_DATA__` – bao gồm component dùng chung (Navbar, Footer, CategoryGrid, PartnersSection, AboutNavigation) | ✅ 0 kết quả |
| Số liệu nhà máy – mã nguồn 2 file | `2.000`, `2000 m`, `100.000`, `100000`, `m²`, `Công suất` | ✅ 0 kết quả |
| Số liệu nhà máy – toàn trang SSR | Cùng danh sách, cùng 5 vùng như trên | ✅ 0 kết quả |
| Nội dung giữ nguyên (Task 3) | Tìm trong text SSR | ✅ 8/8: "is TIÊN PHONG", "Thành lập: 2017", "Nhà máy: Chương Mỹ, Hà Nội", "3–7 ngày làm việc", "giá tham khảo từ 99.000đ", "Định hướng sáng tạo", anchor internal link, "2026: Bước Ngoặt Lớn" |
| Hồi quy claim đã loại ở A1 | "9 năm", "QCVN", "1000+", "Sóc Sơn", "Hải Dương", "chỉ từ", "phường Chương Mỹ" trên head + body SSR | ✅ 0 kết quả |
| Lint | — | ⛔ Không chạy được: repo không có cấu hình ESLint |
| Git diff / diff --check | — | ⛔ Không chạy được: dự án không phải Git repository |

Lưu ý: production build local đọc dữ liệu từ MongoDB qua `.env` của dự án (chỉ đọc), không ghi DB.

---

## 4. Vấn đề còn tồn tại

| ID | Mức | Vấn đề | Trạng thái |
|---|---|---|---|
| I-1 | — | Tuyên bố dẫn đầu trên `/gioi-thieu` | ✅ **Đã xử lý** |
| I-2 | — | Số liệu 2.000 m² / 100.000 sp/tháng chưa có bằng chứng | ✅ **Đã tạm ẩn** trên `/gioi-thieu`. Có thể hiển thị lại khi BĐH cung cấp bằng chứng phê duyệt |
| I-3 | **Chặn merge** | Dự án không có Git → không có branch/diff/rollback | ⛔ Còn nguyên. Cần xác định repository chính thức (D-1) |
| I-2b | Trung bình | Hai số liệu nhà máy **vẫn còn ở trang/kênh khác** ngoài phạm vi task: trang xưởng (DB), `lib/companyInfo.ts` (`factory.area`, `factory.capacity`), `public/llms-full.txt`, `components/univisport/VideoHero.jsx`, `SeoArticleSection.jsx` (`/san-pham`), nhiều pillar `bai-viet/*` | Ngoài phạm vi. Nếu BĐH muốn ẩn đồng bộ, cần task riêng |
| I-4 | Trung bình | Claim chất lượng/quy mô có từ trước, không thuộc nhóm "dẫn đầu" nên chưa sửa: `AboutUniviPage.jsx` "hàng trăm nghìn khách hàng" (mục tiêu), "tay nghề tinh hoa", "hiệu suất sản xuất vượt trội", "chất lượng Quốc tế", "khác biệt hoàn toàn với nhiều sản phẩm thị trường", "cam kết không tính phí nếu sản phẩm không đạt chuẩn"; `index.jsx` "chất lượng quốc tế", "mạnh mẽ nhất" | Chờ BĐH quyết định có xử lý trong A1 hay backlog |
| I-4b | Trung bình | `AboutNavigation.jsx:21` "một trong những đơn vị uy tín… có mặt tại hầu hết các tỉnh thành" – claim mức độ phủ, nằm trong file bị khóa ở task này | Ngoài phạm vi |
| I-5 | Trung bình | Trang `/xuong-may-dong-phuc-univi` vẫn sai trên production (Đan Phượng, 9 năm, 2–3/10–12 ngày, 2.000 m², 100.000) | Chờ đợt A3 (sửa DB, cần phê duyệt) |
| I-6 | Thấp | Thiếu cấu hình ESLint | Backlog |
| I-7 | Thấp | `tsconfig.tsbuildinfo`, `.next/` bị công cụ ghi lại | Không commit |

### Trạng thái merge

Các điểm chặn về nội dung từ review trước (I-1, I-2) **đã xử lý** trong phạm vi `/gioi-thieu`. Điểm chặn còn lại là **I-3 (không có Git)**: chỉ merge sau khi đưa đúng 5 file mã nguồn của A1/A2 + correction (`pages/gioi-thieu/index.jsx`, `components/univisport/AboutUniviPage.jsx`, `components/univisport/AboutNavigation.jsx`, `components/layout/DirectPostView.tsx`, `pages/_app.js`) vào repository chính thức, và `git diff --check` sạch.
