# Image Directory - e-Qurbanify

## Required Images for Production

### Root Images Folder (/images/)
Place these files directly in the images folder:

1. **hero-bg.jpg** (1920x800px)
   - Background image for hero section
   - Should show: Pakistani farm landscape, livestock, or pastoral scene
   - Natural lighting, professional quality

2. **cattle-placeholder.jpg** (800x600px)
   - Representative image of cattle (cow/bull)
   - For category cards on home page

3. **goat-placeholder.jpg** (800x600px)
   - Representative image of goat
   - For category cards on home page

4. **sheep-placeholder.jpg** (800x600px)
   - Representative image of sheep
   - For category cards on home page

5. **camel-placeholder.jpg** (800x600px)
   - Representative image of camel
   - For category cards on home page

6. **video-thumb.jpg** (400x300px)
   - Thumbnail showing play button overlay
   - Used in product detail gallery

---

### Products Folder (/images/products/)
Individual animal photos for each product listing:

#### Cattle Photos:
- red-sindhi-1.jpg (front view)
- red-sindhi-2.jpg (side view)
- red-sindhi-3.jpg (back view)
- sahiwal-1.jpg (front view)
- cholistani-1.jpg (front view)

#### Goat Photos:
- beetal-1.jpg (front view)
- beetal-2.jpg (alternate beetal)
- teddy-1.jpg (front view)
- kamori-1.jpg (front view)

#### Sheep Photos:
- kachhi-1.jpg (front view)
- lohi-1.jpg (front view)
- harnai-1.jpg (front view)

#### Camel Photos:
- camel-1.jpg (front view)
- camel-2.jpg (alternate camel)

**Photo Specifications:**
- Resolution: 1200x900px minimum
- Format: JPG (optimized for web)
- Real photos only (no stock illustrations)
- Clear, well-lit images
- Animals should be visible from multiple angles
- Background should be clean (farm setting preferred)

---

### Videos Folder (/images/videos/)
1. **walking.mp4**
   - Short video (10-30 seconds) showing animal walking
   - Format: MP4 (H.264 codec)
   - Resolution: 720p or 1080p
   - Should demonstrate animal's health and movement

---

## Temporary Placeholders

Until you add real images, the site will work but show:
- Broken image icons
- Alt text descriptions
- Colored background placeholders (CSS fallbacks are in place)

## Image Optimization Tips

1. **Compress images** before uploading (use TinyPNG.com or similar)
2. **Use descriptive filenames** (already done in HTML)
3. **Maintain aspect ratios** to avoid stretching
4. **Consider WebP format** for better compression (convert JPGs to WebP)
5. **Add watermark** to protect your photos from theft

## Stock Photo Resources (Temporary Use Only)

If you need placeholder images while gathering real photos:
- Unsplash.com (search: cattle, goat, sheep, camel, farm)
- Pexels.com (livestock, animals)
- Pixabay.com (free stock images)

**Important:** Replace with REAL animal photos for production. Trust is built on authenticity!

---

## Quick Setup Commands

If you have ImageMagick installed, you can batch resize images:

```bash
# Resize all images to appropriate sizes
mogrify -resize 1200x900 -quality 85 *.jpg
```

Or use online tools like:
- Squoosh.app (Google's image optimizer)
- TinyPNG.com (PNG/JPG compression)
- CloudConvert.com (format conversion)

---

Last updated: January 9, 2026
