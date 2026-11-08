# SPRINT 6.2.2-A1/A2 – PRE-MERGE REVIEW

- **Ngày review:** 08/11/2026
- **Người review:** Claude (chỉ review – không sửa code, không commit, không merge/push/deploy, không chạm MongoDB)
- **Đối tượng review:** các thay đổi Sprint 6.2.2-A1/A2 (chuẩn hóa brand fact trên `/gioi-thieu` + matcher CTA của DirectPost)
- **Nguồn chuẩn:** `SPRINT-6.2.2-A-CLAUDE-REVIEW.md`, Brand Fact Sheet v1.0 + brief triển khai A1/A2

## Kết luận nhanh

### **NOT READY TO MERGE**

Phần kỹ thuật **đạt** (typecheck toàn dự án, production build, SSR, JSON-LD, 1 H1, internal link, matcher CTA trên 9/9 DirectPost). Không merge được vì 3 lý do:

1. **Không có Git.** Thư mục dự án và các thư mục cha **không phải Git repository**. Branch, `git status`, `git diff` và `git diff --check` **không chạy được**, nên không có diff chính thức để merge. Phạm vi thay đổi chỉ xác định được gián tiếp (mục 2).
2. **Còn tuyên bố dẫn đầu.** "lựa chọn hàng đầu" và "biểu tượng sáng tạo hàng đầu" vẫn còn ở 4 vị trí (mục 5, I-1). Tiêu chí review yêu cầu không còn các cụm này.
3. **Số liệu nhà máy chưa có bằng chứng phê duyệt.** 2.000 m² và 100.000 sản phẩm/tháng đang hiển thị mà không đánh dấu "cần xác nhận". `brand-claims.md` mục B yêu cầu bằng chứng (mục 5, I-2).

---

## 1. Phạm vi đã kiểm tra

| Hạng mục | Đã kiểm tra | Cách kiểm tra |
|---|---|---|
| Git: branch, status, diff, diff --check | **Không chạy được** | `git rev-parse` → `fatal: not a git repository` (thư mục dự án và mọi thư mục cha) |
| Phạm vi file thay đổi | Có (gián tiếp) | Liệt kê file theo thời điểm sửa đổi (mtime) trong cửa sổ triển khai 20:10:45 → kết thúc review |
| Thay thế cho `git diff --check` | Có | Script kiểm tra trailing whitespace, line ending, conflict marker trên 5 file |
| Nội dung | Có | Đọc mã nguồn và grep các claim bị loại bỏ/cần giữ trên 3 file brand |
| Typecheck toàn dự án | Có | `npx tsc --noEmit -p .` |
| Lint | **Không chạy được** | Repo không có cấu hình ESLint (`ESLint couldn't find a configuration file`) |
| Production build | Có | `npx next build` |
| SSR `/gioi-thieu` | Có | `next start` bản build production → `curl` → phân tích HTML |
| Matcher CTA | Có | 9/9 DirectPost: so sánh HTML production (code cũ) với bản build local (code mới) |
| Validator ngoài (Rich Results Test, schema.org validator) | **Không** | Không có trong phạm vi môi trường |

Lưu ý: bản build local đọc dữ liệu DirectPost từ MongoDB qua `.env` của dự án (chỉ đọc). Không có thao tác ghi DB.

---

## 2. Danh sách file thay đổi

Không có Git nên danh sách dưới đây dựa trên thời điểm sửa đổi. Mọi file sửa sau khi báo cáo `SPRINT-6.2.2-A-CLAUDE-REVIEW.md` được ghi (20:10:44, 08/11/2026):

| Thời điểm sửa | File | Trong phạm vi? | Ghi chú |
|---|---|---|---|
| 20:15:15 | `components/univisport/AboutUniviPage.jsx` | ✅ | Thay đổi A1 |
| 20:15:33 | `components/univisport/AboutNavigation.jsx` | ✅ | Thay đổi A1 |
| 20:15:34 | `components/layout/DirectPostView.tsx` | ✅ | Matcher A2 |
| 20:15:35 | `pages/_app.js` | ✅ | Chỉ sửa comment |
| 20:16:22 | `pages/gioi-thieu/index.jsx` | ✅ | Thay đổi A1 |
| 20:16:04 | `tsconfig.tsbuildinfo` | ⚠️ ngoài phạm vi | File cache do `tsc` tự sinh khi typecheck. Không phải mã nguồn, không nên commit |
| 20:16:39 → khi build | `next-env.d.ts` | ⚠️ ngoài phạm vi | Do Next.js tự sinh. `next dev` đổi import thành `./.next/dev/types/routes.d.ts`; `next build` đã ghi lại thành `./.next/types/routes.d.ts` (dạng chuẩn). Không chỉnh tay. Kiểm tra lại khi đưa vào Git |
| — | `.next/` | ⚠️ artifact | Thư mục build output, đã bị ghi đè bởi lần build review này |

**Không phát hiện thay đổi mã nguồn ngoài 5 file được phép** trong cửa sổ triển khai.

**Hạn chế:** khoảng 40 file mã nguồn khác (ví dụ `lib/knowledgeBase.ts` lúc 02:28, `models/Product.js` lúc 18:14, `pages/chat-lieu-vai/index.jsx` lúc 18:16) cũng bị sửa **trong ngày 08/11** nhưng **trước** cửa sổ A1/A2. Chúng thuộc các sprint trước (0.4, 0.5, audit 08/11). Không có Git thì không thể xác minh độc lập rằng các file này không lẫn vào gói merge. Phải giải quyết khi đưa mã nguồn vào Git (mục 6, D-1).

Báo cáo và bằng chứng (không phải mã nguồn) tạo trong sprint: `SPRINT-6.2.2-A-CLAUDE-REVIEW.md`, `reports/sprint-6/sprint-6.2.2-a/*`, và file này.

---

## 3. Kết quả review từng file

### 3.1 `pages/gioi-thieu/index.jsx`

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| Không còn logic tính số năm từ năm hiện tại | ✅ Đạt | Không còn `yearsExperience`, `getFullYear`, `new Date(` trong file |
| Title / description / keywords / OG / Twitter / H1 / H2 / JSON-LD | ✅ Đạt | Title SSR: `Giới Thiệu Đồng Phục Univi – Đồng Phục Thể Thao B2B Từ 2017`; H1: `…thành lập năm 2017`; H2: `I. Hành trình phát triển từ năm 2017` |
| Câu định vị giữ nguyên "is TIÊN PHONG" | ✅ Đạt | Dòng 88, có trong HTML server |
| Không còn 9 năm / QCVN / 1000+ / số 1 / "phường Chương Mỹ" | ✅ Đạt | Grep mã nguồn + HTML SSR (cả `<head>` và body): 0 kết quả |
| Số liệu nhà máy | ⚠️ Cần xác nhận | Dòng 146 `khoảng 2.000 m² tại Chương Mỹ, Hà Nội`, dòng 150 `khoảng 100.000 sản phẩm/tháng`. Đúng giá trị Fact Sheet nhưng **chưa có bằng chứng phê duyệt** (I-2) |
| Internal link | ✅ Đạt | Dòng 158-160: `href="/xuong-may-dong-phuc-univi"`, anchor đúng yêu cầu |
| Alt ảnh xưởng + og:image:alt | ✅ Đạt | Mô tả trung tính, không ghi địa danh |
| JSON-LD `primaryImageOfPage` + OG kích thước | ✅ Đạt | 2253×1230 = kích thước file thật |
| Tuyên bố dẫn đầu | ❌ Còn | Dòng 207: "biểu tượng sáng tạo **hàng đầu**" (I-1) |
| Tuyên bố khác cần lưu ý | ⚠️ | Dòng 219 "mạnh mẽ nhất" (văn phong niềm tin, không phải claim thị trường); dòng 245 "chất lượng quốc tế" (claim chất lượng chưa có chuẩn đối chiếu); dòng 128 "MST: 0111401705" (Fact Sheet để trống, Q8) |

### 3.2 `components/univisport/AboutUniviPage.jsx`

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| "Số 1 Đồng Phục Thể Thao" | ✅ Đã bỏ | Dòng 129 → "Chuyên sâu Đồng Phục Thể Thao" |
| Thời gian sản xuất | ✅ Đạt, không mở rộng phạm vi | Dòng 232-233: đúng câu đã duyệt "3–7 ngày làm việc, tùy đơn hàng" + điều kiện xác nhận. Không còn "3 ngày", "2 ngày" |
| Giá | ✅ Đạt, không mở rộng phạm vi | Dòng 368-371: "Một số sản phẩm có giá tham khảo từ 99.000đ; báo giá chính thức…". Không còn "Tất cả sản phẩm", "chỉ từ" |
| MOQ | ✅ Không đề cập | Trang không công bố MOQ nên không có rủi ro diễn giải rộng |
| "kiểm định an toàn với da" | ✅ Đã bỏ (2 vị trí) | Thay bằng câu trung tính về tư vấn chất liệu |
| Alt/figcaption "Phân xưởng số 03" | ✅ Đã sửa | Trung tính, đã sửa lỗi chính tả |
| Tuyên bố dẫn đầu | ❌ Còn 3 vị trí | Dòng 116 "trở thành **lựa chọn hàng đầu**"; dòng 128 thẻ H4 "Biểu tượng sáng tạo **hàng đầu**"; dòng 146 "biểu tượng sáng tạo **hàng đầu**" (I-1) |
| Claim cần bằng chứng khác (có từ trước, không thuộc brief A1) | ⚠️ | Dòng 116 "hàng trăm nghìn khách hàng" (mục tiêu); 187 "tay nghề tinh hoa… khác biệt vượt trội"; 192 "hiệu suất sản xuất vượt trội"; 286 "chất lượng Quốc tế"; 301 "an toàn cho người mặc"; 346 "cam kết không tính phí nếu sản phẩm không đạt chuẩn" (chưa đối chiếu chính sách bảo hành 30 ngày) |

### 3.3 `components/univisport/AboutNavigation.jsx`

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| Không còn Sóc Sơn, Hải Dương | ✅ Đạt | Grep mã nguồn + SSR: 0 kết quả |
| Giữ năm thành lập 2017 | ✅ Đạt | Dòng 11: "thành lập năm 2017 tại Hà Nội" |
| Không tạo sự kiện mới | ✅ Đạt | Chỉ xóa chi tiết chưa xác minh, không thêm dữ kiện |
| Nội dung đầy đủ trong HTML server | ✅ Đạt | Cả 6 mục render toàn văn trong SSR; mục chưa mở chỉ thu gọn bằng CSS (`-webkit-line-clamp: 2`). Đã xác nhận đoạn 2026 xuất hiện trọn câu trong HTML |
| Thông tin bị lược bỏ cần BĐH biết | ⚠️ | Đã bỏ câu "Công ty TNHH Bảo Phong Evenes – tiền thân của Univi, thành lập tháng 7/2017" vì không có trong Fact Sheet (D-3) |
| Tuyên bố cần lưu ý (có từ trước) | ⚠️ | Dòng 21 "một trong những đơn vị **uy tín**… có mặt tại **hầu hết các tỉnh thành**"; dòng 36 mốc "tháng 3 năm 2026" chưa xác minh |
| Vấn đề kỹ thuật tồn tại từ trước | ⚠️ | Thẻ `<h3>` nằm trong `<button>` (dòng 85) – HTML không hợp lệ, không thuộc phạm vi A1 |

### 3.4 `components/layout/DirectPostView.tsx`

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| Giữ matcher cũ | ✅ | `normalizedText.includes("UNIVI SPORTS UNIFORM")` |
| Nhận diện tên mới | ✅ | `"ĐỒNG PHỤC UNIVI"` **và** slogan `"YOUR UNIFORM, YOUR BRAND"` cùng đoạn, để tránh bắt nhầm đoạn chữ hoa thông thường |
| Unicode | ✅ | Chuẩn hóa NFC trước khi so khớp (nội dung DB có thể lưu dạng NFD) |
| Không làm mất class/CSS | ✅ | Nhánh trả về giữ nguyên `className="cta-contact-info"` + `marginTop` |
| Phạm vi thay đổi | ✅ | Chỉ khối matcher; không đổi logic khác |
| Lưu ý thiết kế | ⚠️ nhỏ | Điều kiện mới yêu cầu slogan. Nếu sau này khối liên hệ trong DB đổi thành "ĐỒNG PHỤC UNIVI" nhưng **bỏ slogan**, style sẽ không áp dụng. Biên tập viên cần biết khi sửa DB |

### 3.5 `pages/_app.js`

| Kiểm tra | Kết quả |
|---|---|
| Chỉ sửa comment | ✅ Dòng 294-295: comment giờ mô tả đúng thực tế (DirectPost chỉ inject BreadcrumbList, FAQ chỉ ở dạng `<details>`) |
| Không đổi logic/Organization schema | ✅ Organization vẫn là stub (name, url, logo); SSR xác nhận không có trường mới |

---

## 4. Kết quả kiểm tra kỹ thuật

| Kiểm tra | Kết quả | Chi tiết |
|---|---|---|
| `git status` / `git diff` / branch | ⛔ **Không chạy được** | Không phải Git repository |
| Thay thế `git diff --check` | ✅ Đạt | 5 file: 0 dòng trailing whitespace, 0 conflict marker, line ending LF nhất quán (0 CRLF, 0 CR lẻ). `index.jsx` và `AboutNavigation.jsx` không có newline cuối file – đã như vậy từ trước |
| Typecheck toàn dự án | ✅ Đạt | `npx tsc --noEmit -p .` → exit 0, **0 lỗi** |
| Lint | ⛔ **Không chạy được** | Không có cấu hình ESLint trong repo |
| Production build | ✅ Đạt | `npx next build` → exit 0. "Compiled successfully", route `/gioi-thieu` và `/[slug]` build dạng dynamic (ƒ). Chỉ có cảnh báo Mongoose `isNew` reserved pathname (tồn tại từ trước, không liên quan) |
| SSR `/gioi-thieu` (bản build production) | ✅ Đạt | HTTP 200. Title, description, canonical đúng (`https://dongphucunivi.com/gioi-thieu`) |
| Claim đã loại bỏ trong HTML SSR | ✅ Đạt | 0 kết quả trong `<head>` và body cho: 9 năm, 9+ năm, năm kinh nghiệm, QCVN, 1000+, số 1/Số 1, Sóc Sơn, Hải Dương, chỉ từ, phường Chương Mỹ, Đan Phượng. `__NEXT_DATA__` cũng không chứa các chuỗi này |
| Nội dung bắt buộc trong HTML SSR | ✅ Đạt | Có: "is TIÊN PHONG", "Hành trình phát triển từ năm 2017", "3–7 ngày làm việc", "giá tham khảo từ 99.000đ", "khoảng 2.000 m² tại Chương Mỹ, Hà Nội", "khoảng 100.000 sản phẩm/tháng", toàn văn mục timeline 2026 |
| JSON-LD parse | ✅ Đạt | 2 khối, 2/2 parse thành công. Types: Organization, WebSite, BreadcrumbList, AboutPage. AboutPage.description không còn claim bị loại bỏ |
| Đúng một H1 | ✅ Đạt | 1 H1 (vẫn `sr-only` – đã có từ trước) |
| Internal link `/xuong-may-dong-phuc-univi` | ✅ Đạt | 1 link trong body, anchor "Xem chi tiết nhà máy sản xuất Đồng Phục Univi" |
| Matcher CTA – dữ liệu tổng hợp | ✅ Đạt | 5/5 ca: tên cũ ✓, tên mới + slogan ✓, tên mới dạng NFD ✓, "ĐỒNG PHỤC UNIVI LÀ ĐƠN VỊ" (không slogan) → không khớp ✓, "Đồng Phục Univi" chữ thường → không khớp ✓ |
| Matcher CTA – không ảnh hưởng DirectPost khác | ✅ Đạt | `DirectPostView` chỉ được dùng bởi `pages/[slug].tsx`. Toàn bộ 9 DirectPost trong `sitemap-posts.xml` được render bằng bản build mới và so với production (code cũ): **9/9 giống nhau**, mỗi trang đúng 1 khối `cta-contact-info`, nội dung khối trùng khớp. Khác biệt duy nhất ban đầu là Cloudflare che email (`/cdn-cgi/l/email-protection`) ở production; sau khi chuẩn hóa thì 9/9 giống nhau. DirectPost ở trạng thái nháp (không có trong sitemap) chưa được kiểm tra |
| Tốc độ (tham khảo) | — | Request đầu tiên sau khi khởi động server mất 11,8 s (cold start local); request tiếp theo 0,07 s. Không dùng làm số đo production |

---

## 5. Các vấn đề còn tồn tại

| ID | Mức | Vấn đề | Vị trí | Đề xuất (không tự sửa) |
|---|---|---|---|---|
| **I-1** | **Chặn merge** | Còn tuyên bố dẫn đầu "hàng đầu" | `AboutUniviPage.jsx:116` ("trở thành lựa chọn hàng đầu trong mảng Đồng Phục Thể Thao"); `AboutUniviPage.jsx:128` (H4 "Biểu tượng sáng tạo hàng đầu"); `AboutUniviPage.jsx:146` ("biểu tượng sáng tạo hàng đầu"); `pages/gioi-thieu/index.jsx:207` ("biểu tượng sáng tạo hàng đầu") | Chờ BĐH (D-2). Gợi ý câu thay: "trở thành lựa chọn tin cậy…", "Biểu tượng sáng tạo / trong lĩnh vực Đồng Phục", "định hướng trở thành thương hiệu sáng tạo trong lĩnh vực…" |
| **I-2** | **Chặn merge** | 2.000 m² và 100.000 sản phẩm/tháng hiển thị như dữ kiện, chưa có bằng chứng phê duyệt | `pages/gioi-thieu/index.jsx:146`, `:150` | BĐH cung cấp/xác nhận bằng chứng nội bộ (D-4). Nếu chưa có: tạm bỏ số khỏi trang hoặc chấp nhận rủi ro bằng văn bản |
| **I-3** | **Chặn merge** | Không có Git → không có diff, branch, lịch sử để merge/rollback | Toàn dự án | Đưa mã nguồn vào Git (hoặc xác định repository gốc đang deploy), tạo branch chứa đúng 5 file, chạy lại `git diff --check` |
| I-4 | Trung bình | Claim chất lượng/quy mô chưa có bằng chứng (có từ trước, ngoài brief A1) | `AboutUniviPage.jsx:116, 187, 192, 286, 301, 346`; `AboutNavigation.jsx:21`; `index.jsx:245` | Đưa vào backlog brand claims (Q6 của báo cáo 6.2.2-A) |
| I-5 | Trung bình | Trang xưởng `/xuong-may-dong-phuc-univi` vẫn sai trên production (Đan Phượng, 9 năm, 2–3/10–12 ngày) | MongoDB `posts._id 6a002351ed66e0ea91519cbf` | Đợt A3 sửa DB qua dashboard sau khi merge `DirectPostView` (cần phê duyệt riêng) |
| I-6 | Thấp | Lint không chạy được do thiếu cấu hình ESLint | Repo | Bổ sung `.eslintrc` (sprint kỹ thuật riêng) |
| I-7 | Thấp | `tsconfig.tsbuildinfo`, `next-env.d.ts`, `.next/` bị sửa bởi công cụ | Root | Không commit `tsconfig.tsbuildinfo` và `.next/`; với `next-env.d.ts` chỉ giữ bản do `next build` sinh |
| I-8 | Thấp | `/gioi-thieu` không có MOQ – OK; nhưng llms-full vẫn chép "1000+", "QCVN", MST từ trang cũ | `public/llms-full.txt:24-35` | Đồng bộ trong A14 (ngoài phạm vi, không sửa) |
| I-9 | Thấp | H1 `sr-only`, hai H2 cùng số "II.", `<h3>` trong `<button>` | `/gioi-thieu` | Backlog cấu trúc (R3/R4 của báo cáo 6.2.2-A) |

---

## 6. Các quyết định cần ban lãnh đạo xác nhận

| ID | Quyết định | Tại sao cần | Ảnh hưởng merge |
|---|---|---|---|
| **D-1** | Repository/branch chính thức để merge và deploy là gì? Dự án hiện không có Git tại thư mục làm việc | Không thể xác minh phạm vi bằng diff, không có rollback | **Chặn** |
| **D-2** | Giữ hay thay các cụm "lựa chọn hàng đầu", "biểu tượng sáng tạo hàng đầu" (4 vị trí)? Quy chuẩn nội bộ `lib/knowledgeBase.ts` cấm "hàng đầu" | Tiêu chí review yêu cầu loại bỏ tuyên bố dẫn đầu | **Chặn** |
| **D-4** | Có bằng chứng phê duyệt cho diện tích khoảng 2.000 m² và công suất khoảng 100.000 sản phẩm/tháng không? | `brand-claims.md` mục B | **Chặn** (hoặc chấp nhận rủi ro bằng văn bản) |
| D-3 | Câu lịch sử "Công ty TNHH Bảo Phong Evenes – tiền thân, tháng 7/2017" đã bị bỏ. Có cần khôi phục không? | Có thể là dữ kiện đúng; đã bỏ vì không có trong Fact Sheet | Không chặn |
| D-5 | Giữ nguyên "Đồng Phục Univi **is** TIÊN PHONG…" trên trang tiếng Việt? (đang giữ đúng theo brief) | Người đọc và AI có thể hiểu "is" là lỗi đánh máy | Không chặn |
| D-6 | Tiếp tục hiển thị MST 0111401705 và logo đối tác khi Fact Sheet chưa xác nhận? | Fact Sheet `tax_id: null`; `brand-claims.md` mục B cho logo khách hàng | Không chặn |
| D-7 | Phê duyệt đợt A3 (ghi DB trang xưởng qua dashboard) | Trang xưởng vẫn công bố Đan Phượng / 9 năm / 2–3, 10–12 ngày | Không chặn A1/A2 |

---

## 7. Kết luận

### **NOT READY TO MERGE**

**Đạt:** 5 file đúng phạm vi; không có thay đổi mã nguồn ngoài phạm vi trong cửa sổ triển khai. Typecheck toàn dự án 0 lỗi. Production build thành công. SSR `/gioi-thieu` sạch các claim đã loại bỏ, có câu định vị nguyên văn, 1 H1, JSON-LD parse 100%, có internal link đúng anchor. Thời gian sản xuất, giá và MOQ không bị diễn giải rộng hơn phạm vi duyệt. Matcher CTA tương thích ngược, xác nhận trên 9/9 DirectPost.

**Chưa đạt (điều kiện để chuyển sang READY TO MERGE):**
1. Có Git repository/branch chứa đúng 5 file, kèm `git diff --check` sạch (D-1, I-3).
2. BĐH quyết định về 4 cụm "hàng đầu", sau đó sửa theo quyết định (D-2, I-1).
3. BĐH xác nhận bằng chứng cho 2.000 m² / 100.000 sản phẩm/tháng, hoặc chấp nhận rủi ro bằng văn bản (D-4, I-2).

Khi đủ 3 điều kiện trên, chỉ cần chạy lại mục 4 (đặc biệt là grep claim và SSR `/gioi-thieu`) trước khi merge. Không cần review lại matcher nếu `DirectPostView.tsx` không đổi.

*Không có commit, merge, push hay deploy nào được thực hiện trong vòng review này.*
