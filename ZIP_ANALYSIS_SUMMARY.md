# Zion University - Extraction and Source Zip Analysis Summary

## Source Archive Inspection
- **Source Zip File:** `grad-school-1.0.0 (1).zip`
- **Extracted Folder:** `grad-school-1.0.0`
- **Original Template:** TemplateMo 557 Grad School (Bootstrap 4.5.2 / jQuery HTML5 template)

## 1. Folder Structure & Files Discovered
```
grad-school-1.0.0/
├── .gitattributes
├── index.html
├── prepros.config & prepros-6.config
├── assets/
│   ├── css/
│   │   ├── flex-slider.css
│   │   ├── fontawesome.css
│   │   ├── lightbox.css
│   │   ├── owl.css
│   │   └── templatemo-grad-school.css
│   ├── fonts/
│   │   ├── Flaticon.woff
│   │   ├── FontAwesome.otf, .eot, .svg, .ttf, .woff, .woff2
│   │   ├── flexslider-icon.*
│   │   └── slick.*
│   ├── images/
│   │   ├── author-01.png to author-05.png
│   │   ├── choose-us-image-01.png to 03.png
│   │   ├── choosing-bg.jpg
│   │   ├── coming-soon-bg.jpg
│   │   ├── contact-bg.jpg
│   │   ├── course-video.mp4
│   │   ├── courses-01.jpg to 05.jpg
│   │   ├── courses-bg.jpg
│   │   ├── loading.gif
│   │   ├── main-slider-01.jpg to 03.jpg
│   │   ├── main-thumb.png
│   │   └── video-bg.jpg, video-thumb-01.jpg, video-thumb-02.jpg
│   └── js/
│       ├── custom.js
│       ├── isotope.min.js
│       ├── lightbox.js
│       ├── owl-carousel.js
│       ├── slick-slider.js
│       ├── tabs.js
│       └── video.js
└── vendor/
    ├── bootstrap/ (css/bootstrap.min.css, js/bootstrap.bundle.min.js)
    └── jquery/ (jquery.min.js, jquery.slim.min.js)
```

## 2. Design Tokens and CSS Variables Extracted
From `templatemo-grad-school.css` and template source:
- **Primary Navy Dark:** `#162239` / `rgba(22, 34, 57, 0.95)`
- **Deep Navy Background:** `#0c1228`
- **Surface / Section Navy:** `#172238`
- **Card Navy:** `#18233a`
- **Footer Navy:** `#152036`
- **Primary Accent Gold:** `#f5a425`
- **Accent Hover / Light Amber:** `#FC3` / `#ffb733`
- **Link Accent Cyan:** `#33CCFF` / `#3CF`
- **Subtle White Borders / Transparencies:** `rgba(250, 250, 250, 0.1)`, `rgba(250, 250, 250, 0.25)`
- **Text White:** `#ffffff`
- **Overlay Video Background:** `rgba(22, 34, 57, 0.85)`

## 3. Typography
- **Font Family:** `'Montserrat', sans-serif`
- **Weights Loaded:** 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Size System:**
  - Body text: minimum 15px (template was 13px, upgraded to 15px per specification)
  - Metadata: minimum 11px
  - Navigation links: 13px uppercase with 0.5px letter-spacing, font-weight 700
  - Buttons: 12px-13px uppercase with 0.5px letter-spacing, font-weight 700
  - Hero headline: 64px desktop / 36px mobile, bold 800-900

## 4. UI Elements & Components in Template
- **Header:** Sticky navbar (height 80px), `#162239` background, gold logo accent `<em>Grad</em> School`, navigation menu with hover underline/border `2px solid #f5a425`, dropdown sub-menu in `#18233a`.
- **Banner / Hero:** Video/photo background with dark overlay, centered caption, 2-line title with italic gold accent, CTA button in gold `#f5a425`.
- **Features Strip:** 3 interactive hover cards with icons (`pencil`, `graduation-cap`, `book`), sliding content, background `#0c1228` turning `#f5a425` on hover.
- **Why Us (Tabs):** 3-tab layout with dot & circle indicator (`#tabs-1`, `#tabs-2`, `#tabs-3`), split 2-column image and content.
- **Countdown Offer / Registration Strip:** Background `#172238` with image overlay, 4-unit countdown timer (Days, Hours, Minutes, Seconds), quick registration form.
- **Courses Carousel:** Card grid with course images, descriptions, author avatars, and free/paid badges.
- **Video Section:** Presentation text with video modal trigger and thumbnail.
- **Contact Section:** 2-column layout with dark transparent form on the left and full Google Map on the right.
- **Footer:** Dark background `#152036`, copyright notice with gold links.

## 5. Elements Not Present in Static Zip (Implemented as specified)
- **Loading Screen:** Branded Zion University crest loader with circular ring drawing animation, progress bar, under 2s timing, CSS visibility hidden.
- **Cookie Consent Banner:** Compliant banner for Kenya Data Protection Act 2019, preference modal with Necessary (locked), Analytics, and Marketing toggles, localStorage persistence, `/legal/cookie-policy` link.
- **reCAPTCHA v3 & v2 Fallback:** Invisible verification on forms with server-side scoring fallback.
- **Legal Pages:** `/legal/privacy-policy`, `/legal/terms`, and `/legal/cookie-policy`.
- **Error Pages:** Custom branded 404 with course search and 500 with reload CTA.
- **Full Next.js App Router Architecture:** All 14 pages & sections, dynamic routes (`/faculties/[slug]`, `/research/[slug]`, `/news/[slug]`, `/events/[slug]`), protected student portal `/portal`, multi-step application form `/apply`, and complete REST API backend.
