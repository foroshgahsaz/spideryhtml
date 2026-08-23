# اسپایدر شاپ — فرانت استاتیک فروشگاه

فروشگاه RTL فارسی با HTML و CSS جدا. Alpine.js و Swiper از همین الان روی UI هستند تا بعداً بدون بازنویسی ظاهر، به Laravel + Livewire + Filament منتقل شود.

صفحه فعلی همان طرح ارسالی است:

- هدر تیره با جستجو و منو
- اسلایدر هیرو با دیده شدن اسلاید قبلی و بعدی از دو طرف
- دسته‌بندی دایره‌ای با تب پسرانه / دخترانه
- پیشنهادات شگفت‌انگیز روی پس‌زمینه صورتی

## اجرای محلی

فایل `index.html` را در مرورگر باز کنید. سرور لازم نیست.

```bash
php -S 127.0.0.1:8000
```

سپس `http://127.0.0.1:8000` را باز کنید.

## برای اینکه خروجی دقیقاً مثل طرح شود

اسکرین‌شات داخل چت برای چیدن بلوک‌ها کافی است. برای پیکسل‌پرفکت این‌ها را بفرستید:

1. لینک Figma با دسترسی Inspect (رنگ، فاصله، فونت، سایز)
2. خروجی PNG/JPG خود اسلایدر از طرح، نه اسکرین فشرده چت
3. عکس محصولات و آیکون‌ها با پس‌زمینه شفاف (PNG)

بدون فایل لایه باز، HTML نزدیک به طرح می‌ماند نه کپی پیکسلی.

## ساختار

```
index.html              صفحه فروشگاه (بعداً resources/views)
assets/css/app.css      توکن‌ها و کامپوننت‌ها (بعداً resources/css/app.css)
assets/js/app.js        Alpine.data + Swiper (بعداً resources/js/app.js)
assets/img/             لوگو، اسلایدر، دسته، محصول
```

## تصمیم معماری برای انتقال به Laravel

- **Filament** فقط پنل ادمین است (محصول، دسته، اسلایدر). استورفرانت Tailwind اجباری ندارد؛ همین CSS را با Vite لود کنید تا طرح خراب نشود.
- **Livewire** داده و اکشن را می‌گیرد. هر `x-data` معادل یک کامپوننت است:
  - `siteHeader` → `<x-layout.header />`
  - `heroSlider` → `App\Livewire\Storefront\HeroSlider`
  - `categoryTabs` → `App\Livewire\Storefront\CategoryTabs`
  - `productRail` → `App\Livewire\Storefront\AmazingOffers`
  - `wishlistButton` → `toggleWishlist()` روی کارت محصول
- **Alpine** را جدا نصب نکنید؛ Livewire 3 آن را همراه دارد.
- **Swiper** را با npm به Vite اضافه کنید؛ تنظیمات همین فایل JS است.
- کارت محصول، هدر و فوتر Blade Component می‌شوند. حلقه‌ها `@foreach` روی Eloquent.

این ریپو Laravel نیست. اول UI را قفل کنید، بعد اسکلت Laravel را روی همین مارکاپ سوار کنید.
