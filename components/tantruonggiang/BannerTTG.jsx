import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import ContactForm from "../header/ContactForm";
import { COMPANY_INFO } from "../../lib/companyInfo";
import { trackZaloClick } from "../../lib/meta-pixel";

// Cấu hình thời gian chạy slider và mốc bắt đầu video nền.
const SLIDE_DURATION = 6000;
const PROGRESS_TICK_MS = 50;
const BACKGROUND_VIDEO_START_SECONDS = 15;

// Các index này bám theo mảng slides để chọn crop/overlay ảnh và xử lý video.
const SMART_SLIDE_INDEX = 0;
const VIDEO_SLIDE_INDEX = 1;
const LIFESTYLE_SLIDE_INDEX = 2;

// Nội dung hero cố định (H1 + CTA hiển thị trên mọi slide).
const HERO_EYEBROW = "Xưởng may đồng phục thể thao tại Hà Nội";
const HERO_DESCRIPTION =
  "Thiết kế miễn phí, sản xuất theo yêu cầu cho phòng Gym, Pilates, Pickleball và doanh nghiệp.";
const ZALO_URL = COMPANY_INFO.social.zalo;
const HOTLINE_DISPLAY = COMPANY_INFO.hotline;

// Class Tailwind dùng chung cho 2 CTA chính của hero.
const HERO_CTA_BASE =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-semibold leading-none no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:h-[52px] sm:px-6 sm:text-base";
const HERO_TEXT_SHADOW =
  "[text-shadow:0_4px_18px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.45)]";

const seekVideoSafely = (video, seconds) => {
  try {
    video.currentTime = seconds;
  } catch {
    // Trình duyệt có thể chưa load metadata; lần play tiếp theo vẫn fallback bình thường.
  }
};

// Data gốc của slider; phần render bên dưới đọc data này để giữ nguyên routing/action.
const slides = [
  {
    type: "image",
    image: "/images/1.webp",
    mobileImage: "/images/2.webp",
    smallHeading: "GIẢI PHÁP SMART SPORT UNIFORM",
    heading: "Cho Chuỗi Phòng Tập",
    primaryLabel: "Khám phá",
    primaryLink: "/giai-phap-2s",
    secondaryLabel: "Liên Hệ Ngay",
    secondaryAction: "form",
    duration: SLIDE_DURATION,
  },

  {
    type: "video",
    videoSrc: "/video-univi.mp4",
    videoLabel: "Video giới thiệu đồng phục thể thao Univi",
    secondaryLabel: "Xem video",
    secondaryAction: "video",
    duration: SLIDE_DURATION,
  },
  {
    type: "image",
    image: "/images/3.webp",
    mobileImage: "/images/4.webp",
    smallHeading: "ĐỒNG PHỤC THỂ THAO UNIVI",
    heading: "Tiên Phong Đồng Phục Thể Thao",
    primaryLabel: "Khám Phá",
    primaryLink: "/san-pham",
    secondaryLabel: "Liên Hệ Ngay",
    secondaryAction: "form",
    duration: SLIDE_DURATION,
  },
];

export default function Banner() {
  // State hiển thị của carousel, modal form và chế độ xem video.
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Pause chỉ có nút điều khiển trên desktop; mobile vẫn tự chạy để giao diện gọn.
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isVideoFocused, setIsVideoFocused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Ref giữ DOM/timer để điều khiển video và tránh spam chuyển slide khi animation chưa xong.
  const modalRef = useRef(null);
  const backgroundVideoRefs = useRef([]);
  const activeVideoIndexRef = useRef(null);
  const animatingRef = useRef(false);
  const animationTimerRef = useRef(null);
  const slideElapsedRef = useRef(0);

  // Các cờ layout giúp JSX bên dưới chọn đúng bố cục theo slide hiện tại.
  const activeSlide = slides[currentSlide] || slides[0];
  const isVideoFeatureSlide = currentSlide === VIDEO_SLIDE_INDEX;
  const shouldPauseCarousel = isAutoPaused || isFormOpen || isVideoFocused;
  // Overlay video luôn hiện khi carousel chạy bình thường; chỉ ẩn sau khi bấm "Xem video".
  const videoOverlayVisibility = isVideoFocused ? "opacity-0" : "opacity-100";
  // Vòng xanh trên nút pause desktop cho biết còn bao lâu thì tự chuyển slide.
  const countdownStrokeOffset =
    100 - Math.min(Math.max(slideProgress, 0), 1) * 100;

  const changeSlide = useCallback(
    (newIndex) => {
      // Chuẩn hóa index để bấm next/prev luôn xoay vòng trong mảng slides.
      const nextIndex = (newIndex + slides.length) % slides.length;
      if (animatingRef.current || nextIndex === currentSlide) return;

      // Tắt chế độ xem video trước khi đổi slide để carousel quay lại trạng thái banner.
      animatingRef.current = true;
      setIsVideoFocused(false);
      setCurrentSlide(nextIndex);

      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }

      animationTimerRef.current = setTimeout(() => {
        animatingRef.current = false;
      }, 700);
    },
    [currentSlide]
  );

  const goToPreviousSlide = useCallback(() => {
    changeSlide(currentSlide - 1);
  }, [changeSlide, currentSlide]);

  const goToNextSlide = useCallback(() => {
    changeSlide(currentSlide + 1);
  }, [changeSlide, currentSlide]);

  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  const focusBackgroundVideo = useCallback(() => {
    // Khi bấm "Xem video", video phát lại từ đầu, bật âm thanh và ẩn overlay/text.
    const video = backgroundVideoRefs.current[currentSlide];
    setIsVideoFocused(true);

    if (video) {
      seekVideoSafely(video, 0);
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => { });
      });
    }
  }, [currentSlide]);

  const closeBackgroundVideo = useCallback(() => {
    // Khi đóng video, đưa nền về mốc 5s và bật lại overlay/text banner.
    const video = backgroundVideoRefs.current[currentSlide];

    if (video) {
      video.muted = true;
      seekVideoSafely(video, BACKGROUND_VIDEO_START_SECONDS);
    }

    setIsVideoFocused(false);
  }, [currentSlide]);

  const handleBackgroundVideoEnded = useCallback(
    (index) => {
      // Chỉ tự thoát khi người dùng đang xem video full ở slide 2.
      if (
        index !== VIDEO_SLIDE_INDEX ||
        index !== currentSlide ||
        !isVideoFocused
      ) {
        return;
      }

      closeBackgroundVideo();
    },
    [closeBackgroundVideo, currentSlide, isVideoFocused]
  );

  useEffect(() => {
    // Reset bộ đếm mỗi khi chuyển slide hoặc đổi duration.
    slideElapsedRef.current = 0;
    setSlideProgress(0);
  }, [currentSlide, activeSlide.duration]);

  // Timer auto-slide lưu elapsed để khi mở form/video xong carousel chạy tiếp đúng nhịp.
  useEffect(() => {
    const duration = activeSlide.duration || SLIDE_DURATION;

    if (shouldPauseCarousel) return undefined;

    const startedAt = performance.now();
    const baseElapsed = Math.min(slideElapsedRef.current, duration);

    const syncProgress = () => {
      const elapsed = Math.min(
        baseElapsed + performance.now() - startedAt,
        duration
      );
      setSlideProgress(elapsed / duration);
    };

    syncProgress();

    const progressInterval = window.setInterval(syncProgress, PROGRESS_TICK_MS);
    const timer = window.setTimeout(() => {
      slideElapsedRef.current = 0;
      setSlideProgress(1);
      goToNextSlide();
    }, Math.max(duration - baseElapsed, 0));

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(timer);

      const elapsed = Math.min(
        baseElapsed + performance.now() - startedAt,
        duration
      );
      slideElapsedRef.current = elapsed;
      setSlideProgress(elapsed / duration);
    };
  }, [activeSlide.duration, currentSlide, goToNextSlide, shouldPauseCarousel]);

  useEffect(() => {
    // Đồng bộ video nền theo slide active, tránh video ẩn vẫn tiếp tục chạy.
    backgroundVideoRefs.current.forEach((video, index) => {
      if (!video) return;

      const isActiveVideo =
        currentSlide === index && slides[index]?.type === "video";

      if (!isActiveVideo) {
        video.pause();
        video.currentTime = 0;
        if (activeVideoIndexRef.current === index) {
          activeVideoIndexRef.current = null;
        }
        return;
      }

      if (shouldPauseCarousel && !isVideoFocused) {
        video.pause();
        return;
      }

      if (activeVideoIndexRef.current !== index) {
        seekVideoSafely(
          video,
          isVideoFocused ? 0 : BACKGROUND_VIDEO_START_SECONDS
        );
        activeVideoIndexRef.current = index;
      }

      video.play().catch(() => { });
    });
  }, [currentSlide, isVideoFocused, shouldPauseCarousel]);

  useEffect(() => {
    // Dọn timer animation khi component unmount.
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Cho phép điều hướng slide bằng phím mũi tên khi không mở form/video.
    const handleKeyDown = (event) => {
      if (isFormOpen || isVideoFocused) return;
      if (event.key === "ArrowLeft") goToPreviousSlide();
      if (event.key === "ArrowRight") goToNextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide, isFormOpen, isVideoFocused]);

  useEffect(() => {
    // Nhấn Escape để thoát chế độ xem video.
    if (!isVideoFocused) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeBackgroundVideo();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeBackgroundVideo, isVideoFocused]);

  useEffect(() => {
    // Khi mở form, khóa focus trong modal để thao tác bàn phím không bị trôi ra ngoài.
    if (!isFormOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") toggleForm();
    };
    const modal = modalRef.current;
    if (!modal) return undefined;

    const elems = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = elems[0];
    const last = elems[elems.length - 1];
    const trapTab = (event) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    first?.focus();
    modal.addEventListener("keydown", trapTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", trapTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  return (
    <>

      {/* Khung hero chính: mobile-first, desktop override bằng sm/lg để Tailwind 3.1 build ổn định. */}
      <section aria-labelledby="homepage-heading" className="relative aspect-[32/36] min-h-[420px] max-h-none w-full overflow-hidden bg-[#050505] font-[var(--font-univi-site)] sm:aspect-[16/8] sm:min-h-[590px] sm:max-h-screen lg:aspect-[16/7.5]">
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            /* Mỗi slide nằm chồng absolute; chỉ slide active nhận opacity 100. */
            <div
              key={`${slide.type}-${index}`}
              className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${isActive ? "z-[1] opacity-100" : "z-0 opacity-0"
                }`}
              aria-hidden={!isActive}
            >
              {slide.type === "video" && (
                <>
                  {/* Video nền chạy trong carousel, defer sau hydration và dùng preload="none" với poster nhẹ */}
                  {isHydrated ? (
                    <video
                      ref={(node) => {
                        backgroundVideoRefs.current[index] = node;
                      }}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      src={slide.videoSrc}
                      poster={slide.image || "/images/banner-home-1.jpg"}
                      muted
                      playsInline
                      preload="none"
                      aria-label={slide.videoLabel}
                      onLoadedMetadata={(event) => {
                        if (index === VIDEO_SLIDE_INDEX && !isVideoFocused) {
                          seekVideoSafely(
                            event.currentTarget,
                            BACKGROUND_VIDEO_START_SECONDS
                          );
                        }
                      }}
                      onEnded={() => handleBackgroundVideoEnded(index)}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 h-full w-full bg-[#08121e] bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image || "/images/banner-home-1.jpg"})` }}
                    />
                  )}
                  {index === VIDEO_SLIDE_INDEX && (
                    <>
                      {/* Overlay giúp text slide video rõ hơn; ẩn khi người dùng bấm xem video. */}
                      <div
                        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,30,0.82)_0%,rgba(8,32,58,0.64)_55%,rgba(8,18,30,0.76)_100%)] transition-opacity duration-300 sm:bg-[linear-gradient(90deg,rgba(8,18,30,0.8)_0%,rgba(8,32,58,0.6)_50%,rgba(8,18,30,0.8)_100%)] ${videoOverlayVisibility}`}
                      />
                      {/* Vignette nhẹ quanh tâm ảnh, tăng chiều sâu mà không làm video tối quá. */}
                      <div
                        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.38)_50%,rgba(0,0,0,0)_78%)] transition-opacity duration-300 sm:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.36)_42%,rgba(0,0,0,0)_72%)] ${videoOverlayVisibility}`}
                      />
                    </>
                  )}
                </>
              )}

              {slide.type === "image" && (
                <>
                  {/* Ảnh desktop/tablet: ưu tiên bố cục rộng, giữ mẫu sáng và không che mặt. */}
                  <Image
                    src={slide.image}
                    alt={slide.smallHeading}
                    fill
                    className={`absolute inset-0 hidden h-full w-full object-cover sm:block ${index === LIFESTYLE_SLIDE_INDEX
                      ? `object-[62%_center] ${isActive ? "motion-safe:animate-hero-image-scale" : ""}`
                      : index === SMART_SLIDE_INDEX
                        ? `object-center ${isActive ? "motion-safe:animate-hero-image-scale" : ""}`
                        : "object-center"
                      }`}
                    quality={75}
                    priority={index === 0}
                    sizes="100vw"
                  />
                  {/* Ảnh mobile riêng để crop phù hợp màn dọc. */}
                  <Image
                    src={slide.mobileImage || slide.image}
                    alt={slide.smallHeading}
                    fill
                    className={`absolute inset-0 block h-full w-full object-cover sm:hidden ${index === LIFESTYLE_SLIDE_INDEX
                      ? `object-center ${isActive ? "motion-safe:animate-hero-image-scale" : ""}`
                      : index === SMART_SLIDE_INDEX
                        ? `object-center ${isActive ? "motion-safe:animate-hero-image-scale" : ""}`
                        : "object-center"
                      }`}
                    quality={75}
                    priority={index === 0}
                    sizes="100vw"
                  />
                  {index === LIFESTYLE_SLIDE_INDEX && (
                    // Slide 3: gradient trái sang phải để text bên trái rõ mà mặt mẫu vẫn sáng.
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,30,0.78)_0%,rgba(8,18,30,0.64)_48%,rgba(8,18,30,0.08)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,18,30,0.76)_0%,rgba(8,18,30,0.58)_35%,rgba(8,18,30,0.2)_58%,rgba(8,18,30,0)_78%)]" />
                  )}
                  {index === SMART_SLIDE_INDEX && (
                    // Slide 1: phủ tối đều hai bên để cụm text chính giữa đạt contrast tốt.
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,30,0.74)_0%,rgba(8,18,30,0.56)_52%,rgba(8,18,30,0.36)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,18,30,0.64)_0%,rgba(8,18,30,0.54)_24%,rgba(8,18,30,0.4)_50%,rgba(8,18,30,0.56)_76%,rgba(8,18,30,0.68)_100%)]" />
                  )}
                </>
              )}
            </div>
          );
        })}

        {/* Lớp phủ chung: tối dần về góc trái-dưới để H1 + CTA luôn đủ contrast trên mọi slide (kể cả video sáng). */}
        <div
          className={`pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(0deg,rgba(5,12,20,0.88)_0%,rgba(5,12,20,0.55)_40%,rgba(5,12,20,0.15)_75%,rgba(5,12,20,0)_100%)] transition-opacity duration-300 sm:bg-[linear-gradient(90deg,rgba(5,12,20,0.82)_0%,rgba(5,12,20,0.6)_40%,rgba(5,12,20,0.15)_70%,rgba(5,12,20,0)_100%)] ${isVideoFocused ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />

        {/* Nội dung hero cố định: H1 hiển thị thật + 2 CTA chính, không đổi theo slide. */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex items-end px-5 pb-14 text-left transition-opacity duration-300 sm:items-center sm:px-8 sm:pb-0 sm:pt-[70px] lg:px-14 xl:px-20 ${isVideoFocused ? "opacity-0" : "opacity-100"}`}
          aria-hidden={isVideoFocused}
          inert={isVideoFocused}
        >
          <div className="w-full max-w-[640px] font-medium text-white">
            <p className={`mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:mb-4 sm:gap-3 sm:text-sm ${HERO_TEXT_SHADOW}`}>
              <span className="hidden h-[2px] w-8 bg-[#1976d2] sm:block" aria-hidden="true" />
              {HERO_EYEBROW}
            </p>
            <h1
              id="homepage-heading"
              className={`mb-3 text-[26px] font-bold uppercase leading-[1.08] text-white sm:mb-4 sm:text-[40px] lg:text-[52px] ${HERO_TEXT_SHADOW}`}
              style={{ fontFamily: "'Univi Anton', 'Anton', sans-serif" }}
            >
              Đồng Phục Thể Thao <span className="text-[#4aa3ff]">Chuyên Nghiệp</span> Cho Phòng Tập &amp; Doanh Nghiệp
            </h1>
            <p className={`mb-5 hidden max-w-[560px] text-base leading-[1.55] text-white/90 sm:block lg:text-lg ${HERO_TEXT_SHADOW}`}>
              {HERO_DESCRIPTION}
            </p>

            <div className="pointer-events-auto flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={toggleForm}
                className={`${HERO_CTA_BASE} border border-[#1976d2] bg-[#1976d2] text-white shadow-[0_14px_28px_rgba(16,93,151,0.35)] hover:border-[#105d97] hover:bg-[#105d97]`}
              >
                Nhận báo giá
                <FaChevronRight size={12} aria-hidden="true" />
              </button>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-meta-tracked="true"
                onClick={() => trackZaloClick({ source: "homepage_hero" })}
                className={`${HERO_CTA_BASE} border border-white/80 bg-white/10 text-white backdrop-blur-[2px] hover:border-white hover:bg-white/20`}
              >
                Tư vấn Zalo: {HOTLINE_DISPLAY}
              </a>
              {isVideoFeatureSlide && (
                <button
                  type="button"
                  onClick={focusBackgroundVideo}
                  className="inline-flex items-center gap-2 self-start px-1 py-2 text-sm font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline sm:self-auto"
                  aria-label="Xem video giới thiệu"
                >
                  <FaPlay size={11} aria-hidden="true" />
                  Xem video
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Controls: desktop có mũi tên + pause, mobile chỉ giữ dots để giao diện gọn. */}
        <div
          className={`absolute bottom-5 left-5 right-5 z-20 flex items-center justify-center gap-0 transition-opacity duration-300 sm:bottom-6 sm:left-8 sm:right-auto sm:justify-start sm:gap-4 lg:left-14 xl:left-20 ${isVideoFocused ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          aria-hidden={isVideoFocused}
          inert={isVideoFocused}
        >
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={goToPreviousSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-black/10 text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/20"
              aria-label="Slide trước"
            >
              <FaChevronLeft size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-black/10 text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/20"
              aria-label="Slide tiếp theo"
            >
              <FaChevronRight size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPaused((prev) => !prev)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              aria-label={
                isAutoPaused ? "Tiếp tục tự động chạy banner" : "Tạm dừng banner"
              }
              aria-pressed={isAutoPaused}
            >
              <svg
                className="pointer-events-none absolute inset-[-3px] h-[46px] w-[46px] -rotate-90 overflow-visible"
                viewBox="0 0 44 44"
                aria-hidden="true"
              >
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  pathLength="100"
                  stroke="#1976d2"
                  strokeDasharray="100"
                  strokeDashoffset={countdownStrokeOffset}
                  strokeLinecap="round"
                  strokeWidth="2.6"
                  className="transition-all duration-75 ease-linear"
                />
              </svg>
              {isAutoPaused ? (
                <FaPlay size={12} aria-hidden="true" />
              ) : (
                <FaPause size={12} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Dots chuyển slide thủ công, luôn đồng bộ với currentSlide. */}
          <div className="flex items-center gap-2 sm:gap-3" aria-label="Chọn slide">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 w-1.5 rounded-full border-0 transition duration-300 ${currentSlide === idx
                  ? "scale-[1.35] bg-[#1976d2] opacity-100 shadow-[0_0_0_3px_rgba(25,118,210,0.16)]"
                  : "bg-white opacity-75 hover:opacity-100"
                  }`}
                onClick={() => changeSlide(idx)}
                aria-label={`Chuyển đến slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* Modal form liên hệ mở từ CTA, click nền đen để đóng. */}
        {isFormOpen && (
          <ContactForm
            isModal={true}
            isOpen={isFormOpen}
            onClose={toggleForm}
            source="Banner TTG"
          />
        )}

        {/* Nút đóng chỉ xuất hiện khi video đang được xem ở chế độ focus. */}
        {isVideoFocused && (
          <button
            type="button"
            onClick={closeBackgroundVideo}
            className="fixed right-3.5 top-[78px] z-[100000] inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-white/90 text-[#111] opacity-90 shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:opacity-100 sm:right-[22px] sm:top-[88px] sm:h-9 sm:w-9"
            aria-label="Đóng video và quay lại banner"
          >
            <FaTimes size={13} aria-hidden="true" />
          </button>
        )}
      </section>
    </>
  );
}
