# اسپایدر شاپ — فرانت استاتیک فروشگاه

فروشگاه RTL فارسی با HTML و CSS جدا. Alpine.js از همین الان روی UI است تا بعداً بدون بازنویسی ظاهر، به Laravel + Livewire + Filament منتقل شود.

## اجرای محلی

فایل `index.html` را در مرورگر باز کنید. سرور لازم نیست.

```bash
php -S 127.0.0.1:8000
```

سپس `http://127.0.0.1:8000` را باز کنید.

## برای اینکه خروجی دقیقاً مثل طرح شود

اسکرین‌شات داخل چت برای چیدن بلوک‌ها کافی است، برای پیکسل‌پرفکت این‌ها را بفرستید:

1. لینک Figma با دسترسی Inspect (بهترین حالت: رنگ، فاصله، فونت، سایز)
2. خروجی PNG/JPG خود اسلایدر از طرح، نه اسکرین فشرده چت
3. عکس محصولات و آیکون‌ها با پس‌زمینه شفاف (PNG)
4. اگر Figma ندارید: هر سکشن را جدا، عرض حداقل ۱۹۲۰ پیکسل کراپ کنید

بدون فایل لایه باز، عکس بنر و توکن رنگ، HTML تقریبی می‌ماند نه کپی پیکسلی.

## ساختار

```
index.html              صفحه فروشگاه (بعداً resources/views)
assets/css/app.css      توکن‌ها و کامپوننت‌ها (بعداً resources/css/app.css)
assets/js/app.js        Alpine.data (بعداً resources/js/app.js)
assets/img/             لوگو و بج عنکبوت
```

## تصمیم معماری برای انتقال به Laravel

- **Filament** فقط پنل ادمین است (محصول، دسته، اسلایدر، مقاله). استورفرانت Tailwind اجباری ندارد؛ CSS اختصاصی همین فایل را با Vite لود کنید تا طرح پیکسلی خراب نشود.
- **Livewire** داده و اکشن‌ها را می‌گیرد. هر بلوک `x-data` در `assets/js/app.js` معادل یک کامپوننت Livewire است:
  - `heroSlider` → `App\Livewire\Storefront\HeroSlider`
  - `categoryTabs` → `App\Livewire\Storefront\CategoryTabs`
  - `productRail` → `App\Livewire\Storefront\ProductRail`
  - `gadgetFilter` → `App\Livewire\Storefront\GadgetGrid`
  - `wishlistButton` → متد `toggleWishlist` روی کارت محصول
- **Alpine** را جدا نصب نکنید؛ Livewire 3 آن را همراه دارد. فقط `Alpine.data` را به `resources/js/app.js` منتقل کنید.
- کارت محصول، هدر و فوتر Blade Component می‌شوند (`<x-product.card />`, `<x-layout.header />`). حلقه‌ها `@foreach` روی Eloquent.

این ریپو Laravel نیست. اول UI را قفل کنید، بعد اسکلت Laravel را روی همین مارکاپ سوار کنید.
