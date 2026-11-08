# SPRINT 6.2.2-A1 – RESTORE APPROVED FACTORY FIGURES

- **Ngày:** 08/11/2026
- **Căn cứ:** Ban lãnh đạo Univi đã chính thức phê duyệt công bố hai số liệu nhà máy:
  - Diện tích: khoảng 2.000 m² tại Chương Mỹ, Hà Nội.
  - Công suất: khoảng 100.000 sản phẩm/tháng.
- **Lý do:** đợt `SPRINT-6.2.2-A1-CONTENT-CORRECTION.md` đã tạm ẩn hai số liệu này theo phương án cũ (khi chưa có phê duyệt). Đợt này khôi phục lại.
- **Phạm vi được phép sửa:** chỉ `pages/gioi-thieu/index.jsx`
- **Không thực hiện:** commit, push, merge, deploy, thao tác Git, ghi MongoDB/DirectPost, sửa `AboutUniviPage.jsx`, `AboutNavigation.jsx`, `DirectPostView.tsx`, `_app.js`, `knowledgeBase.ts`, file llms, Organization schema

---

## 1. File đã sửa

| File | Thời điểm sửa | Nội dung |
|---|---|---|
| `pages/gioi-thieu/index.jsx` | 21:33:07 | Khôi phục 2 số liệu trong khối "Năng lực & Quy mô sản xuất"; khôi phục import icon `Zap` dùng cho dòng "Công suất" |

Kiểm tra theo thời điểm sửa đổi (dự án không có Git): sau `SPRINT-6.2.2-A1-CONTENT-CORRECTION.md` **chỉ có file này thay đổi** (ngoài `.next/` do production build sinh ra).

---

## 2. Nội dung trước và sau

Khối "Năng lực & Quy mô sản xuất" (`index.jsx:144-151`):

| Dòng | Trước (bản Content Correction) | Sau (bản khôi phục) |
|---|---|---|
| Nhà máy | **Nhà máy:** Chương Mỹ, Hà Nội | **Nhà máy:** khoảng 2.000 m² tại Chương Mỹ, Hà Nội |
| Công suất | *(không có)* | **Công suất:** khoảng 100.000 sản phẩm/tháng (icon `Zap`, cùng định dạng các dòng khác) |

Import `lucide-react` (`index.jsx:3`): thêm lại `Zap`.

Câu chữ khôi phục **đúng nguyên văn** bản đã duyệt, có "khoảng", không thêm số liệu hay diễn giải khác. Thứ tự hiển thị trong khối: Thành lập: 2017 → Nhà máy → Công suất → Phạm vi phục vụ → Khách hàng → link "Xem chi tiết nhà máy sản xuất Đồng Phục Univi".

**Không thay đổi:** title, meta description, OG, Twitter, H1, H2, JSON-LD, câu định vị, timeline, thời gian sản xuất, giá, nội dung `AboutUniviPage.jsx`. **Không khôi phục** tuyên bố dẫn đầu nào.

---

## 3. Kiểm tra đã chạy và kết quả

| Kiểm tra | Lệnh / cách làm | Kết quả |
|---|---|---|
| Typecheck toàn dự án | `npx tsc --noEmit -p .` | ✅ exit 0, **0 lỗi** |
| Production build | `npx next build` | ✅ exit 0, "Compiled successfully", route `ƒ /gioi-thieu` |
| SSR `/gioi-thieu` | `next start` bản build production → `curl` | ✅ HTTP 200. Title: `Giới Thiệu Đồng Phục Univi – Đồng Phục Thể Thao B2B Từ 2017` |
| JSON-LD parse | `JSON.parse` từng khối | ✅ 2/2 khối, 0 lỗi. Types: Organization, WebSite, BreadcrumbList, AboutPage |
| Đúng một H1 | Đếm `<h1` trong body SSR | ✅ 1 |
| Hai số liệu xuất hiện chính xác trong SSR | Tìm chuỗi nguyên văn trong text SSR | ✅ "Nhà máy: khoảng 2.000 m² tại Chương Mỹ, Hà Nội" ×1; "Công suất: khoảng 100.000 sản phẩm/tháng" ×1; cả hai nằm trong khối "Năng lực & Quy mô sản xuất" |
| Không xuất hiện lại tuyên bố dẫn đầu | `hàng đầu` (hoa/thường), `dẫn đầu`, `đứng đầu`, `số 1`/`Số 1`, `số một`, `tốt nhất`, `biểu tượng sáng tạo`, `lựa chọn hàng đầu`, `vượt trội trong ngành` trên `<head>`, text body, toàn bộ `alt`, JSON-LD, `__NEXT_DATA__` | ✅ 0 kết quả |
| Nội dung đã duyệt giữ nguyên | Tìm trong text SSR | ✅ 7/7: "is TIÊN PHONG", "Thành lập: 2017", "3–7 ngày làm việc", "giá tham khảo từ 99.000đ", "Định hướng sáng tạo", anchor internal link, "2026: Bước Ngoặt Lớn" |
| Hồi quy claim đã loại ở A1 | "9 năm", "QCVN", "1000+", "Sóc Sơn", "Hải Dương", "chỉ từ", "phường Chương Mỹ" trên head + body SSR | ✅ 0 kết quả |
| Lint | — | ⛔ Không chạy được: repo không có cấu hình ESLint |
| Git diff / diff --check | — | ⛔ Không chạy được: dự án không phải Git repository |

Lưu ý: production build local đọc dữ liệu từ MongoDB qua `.env` của dự án (chỉ đọc), không ghi DB.

---

## 4. Vấn đề còn tồn tại

| ID | Mức | Vấn đề | Ghi chú |
|---|---|---|---|
| I-3 | **Chặn merge** | Dự án không có Git → không có branch/diff/rollback | Cần đưa 5 file mã nguồn A1/A2 (`pages/gioi-thieu/index.jsx`, `components/univisport/AboutUniviPage.jsx`, `components/univisport/AboutNavigation.jsx`, `components/layout/DirectPostView.tsx`, `pages/_app.js`) vào repository chính thức và chạy `git diff --check` |
| N-1 | Thấp – tùy chọn | Hai số liệu đã duyệt hiện **chỉ có trong nội dung body**; meta description, OG/Twitter và JSON-LD AboutPage không nhắc tới (0 lần trong `<head>` và JSON-LD) | Đúng phạm vi task ("đặt trong khối Năng lực & Quy mô"). Nếu muốn AI/SERP trích dẫn, có thể bổ sung vào AboutPage.description trong một task riêng |
| N-2 | Trung bình | Các tài liệu brand cần cập nhật theo phê duyệt mới: `brand-claims.md` mục B vẫn xếp 2.000 m² / 100.000 sp/tháng vào nhóm "cần bằng chứng"; báo cáo Content Correction (I-2) ghi "tạm ẩn" | Đề nghị cập nhật Fact Sheet/Brand Claims (người duyệt, ngày duyệt, bằng chứng) để các kênh khác đồng bộ |
| I-4 | Trung bình | Claim chất lượng chưa có bằng chứng, không thuộc nhóm "dẫn đầu" (ví dụ "chất lượng quốc tế", "hiệu suất sản xuất vượt trội", "tay nghề tinh hoa") | Chờ BĐH quyết định – không thuộc task này |
| I-5 | Trung bình | Trang `/xuong-may-dong-phuc-univi` vẫn sai trên production (Đan Phượng, 9 năm, 2–3/10–12 ngày) | Chờ đợt A3 (sửa DB, cần phê duyệt) |
| I-6 | Thấp | Thiếu cấu hình ESLint | Backlog |
