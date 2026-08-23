/**
 * Spider Shop — Alpine stores + Swiper hero
 *
 * Maps 1:1 to future Livewire / Blade:
 *   siteHeader      → <x-layout.header />
 *   heroSlider      → App\Livewire\Storefront\HeroSlider
 *   categoryTabs    → App\Livewire\Storefront\CategoryTabs
 *   productRail     → App\Livewire\Storefront\AmazingOffers
 *   wishlistButton  → toggleWishlist() on product card
 *
 * Keep state local. Do not fetch APIs here — Livewire will own data later.
 * Alpine ships with Livewire 3; this CDN script is only for the static MVP.
 */

document.addEventListener("alpine:init", () => {
    Alpine.data("siteHeader", () => ({
        menuOpen: false,
        searchOpen: false,
        scrolled: false,

        onScroll() {
            this.scrolled = window.scrollY > 8;
        },

        closeMenu() {
            this.menuOpen = false;
        },
    }));

    Alpine.data("heroSlider", () => ({
        swiper: null,

        init() {
            this.swiper = new Swiper(this.$refs.viewport, {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1.32,
                spaceBetween: 24,
                speed: 700,
                grabCursor: true,
                watchSlidesProgress: true,
                autoplay: {
                    delay: 5600,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: this.$refs.dots,
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1.1, spaceBetween: 10 },
                    640: { slidesPerView: 1.16, spaceBetween: 14 },
                    960: { slidesPerView: 1.24, spaceBetween: 20 },
                    1280: { slidesPerView: 1.32, spaceBetween: 24 },
                },
            });
        },

        destroy() {
            if (this.swiper) {
                this.swiper.destroy(true, true);
                this.swiper = null;
            }
        },
    }));

    Alpine.data("categoryTabs", () => ({
        gender: "boys",

        next() {
            this.scroll(-1);
        },

        prev() {
            this.scroll(1);
        },

        scroll(direction) {
            const scroller = this.$refs[this.gender];
            if (!scroller) {
                return;
            }

            const amount = Math.min(scroller.clientWidth * 0.7, 360);
            scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
        },
    }));

    Alpine.data("productRail", () => ({
        next() {
            this.scroll(-1);
        },

        prev() {
            this.scroll(1);
        },

        scroll(direction) {
            const scroller = this.$refs.scroller;
            if (!scroller) {
                return;
            }

            const amount = Math.min(scroller.clientWidth * 0.7, 280);
            scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
        },
    }));

    Alpine.data("wishlistButton", () => ({
        liked: false,

        toggle() {
            this.liked = !this.liked;
        },
    }));
});
