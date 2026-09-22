# Video Script — Figma to Code (for narration / recording)

> Use this script with OBS/Loom. Speak slowly, click in Figma web app at each step. Total ~3 minutes.

---

### Intro [0:00]
"Hello students, today I'll show how I extracted everything from the Figma web app for the Teknic Euchner interview task — 1440 by 7592, 577 nodes — and built it pixel-perfect in HTML, CSS, and JS. We will cover colors, fonts, images, videos, CSS, and the final website."

### Step 0 — Open Figma Web App [0:04]
"Open Chrome, go to the Figma link, click Duplicate to drafts so you can edit. Press Shift+D to toggle Design to Dev Mode — that's where you copy CSS. Enable View → Rulers to see X=80, Y=480."

### Step 1 — Extract Colors [0:08]
"Select the header Frame 4. On the right, under Fill, you see #151B20 — click the swatch to copy HEX. Select the red button — #E60000. In Dev Mode, click Inspect → Colors — you get all HEX at once. We got Primary #E60000, Header #151B20, Dark #0F0F0F, Muted #5C5C5C. In code we loop fillPaints SOLID and convert r,g,b to HEX."

### Step 2 — Extract Fonts [0:12]
"Select the hero title 'Precision That Keeps...'. Right panel shows Space Grotesk Bold, 50.81px, line 58px. Subtitle is Space Grotesk Medium 20.16px. Eyebrows are IBM Plex Mono Medium 16px uppercase, body is IBM Plex Sans Regular 16px. In Dev Mode, Inspect → Typography → Copy CSS. We import them via Google Fonts in HTML head."

### Step 3 — Extract Images [0:16]
"Select any product image, like the Inductive switch. At the bottom right, Export → PNG 1x, 2x → Export. For all 44 images, File → Export all. Alternatively, unzip the .fig file — inside images folder you have 44 files named by hash, like 6afd91... — rename to .png and put in assets/images. Use <img src='assets/images/6afd91...png' loading='lazy'>."

### Step 4 — Extract Videos [0:20]
"Select the hero background 'Inside Teknic...' — Fill shows Video thumbnail, but no Export button. Figma doesn't export videos directly. So we unzip the .fig file — videos folder has 851ad... 28MB — copy to assets/hero.mp4. Then in HTML use <video autoplay muted loop playsinline poster='ff21ce...png'><source src='assets/hero.mp4'></video>. If web app only, ask designer for the original MP4."

### Step 5 — Copy CSS [0:24]
"Stay in Dev Mode, select the header — 1280 by 60 at y=30 — CSS tab shows position: fixed; top:30px; left:50%; width:1280px. Select hero Frame 8 at X 80 Y 480 W 587 — that's where title sits. Alt+Hover between layers shows red gap 30px between title and subtitle. We use left:50%; transform:translateX(-50%); width:1280 to keep it centered — hero is 587 plus 397 gap plus 296 equals 1280."

### Step 6 — Create HTML [0:28]
"Create index.html. Header is header>nav, hero is section.hero with video plus div.hero__content split into left 587 and right 296. Products are 6 article.product-card each with image, h3, lead, desc, and button. Use id for nav anchors, alt for images, aria-label for accessibility."

### Step 7 — Create CSS [0:32]
"For interview we keep it basic. Create desktop.css for 1440 — flex, width 1280, transform centering. Create mobile.css with @media 720px — display block, width 100%, hide nav show burger. In HTML link both: <link href='desktop.css'> and <link href='mobile.css'>. Remove mobile link if you want to ignore responsive."

### Step 8 — Create JS [0:36]
"JS is basic. One: IntersectionObserver to reveal sections on scroll. Two: scroll listener to hide header. Three: click on nav links to smooth scroll with offset for fixed header. Four: mousemove on cards for 3D tilt. All use querySelector and addEventListener — easy to explain."

### Step 9 — Run & Deploy [0:40]
"Double-click index.html to open file:/// — header stays centered because we used transform. Or run python -m http.server 8199 and open localhost:8199. Then vercel --prod to deploy to https://html-js-task.vercel.app — linked to GitHub figmatask repo."

### Done [0:44]
"That's it — we now have tree.json with 577 nodes, 44 PNGs, hero.mp4, and per-line comments in HTML, CSS, JS. Share the GitHub and Vercel URL with students, and they can follow docs/clean-guide.html for the text version."

---

**Files:**
- C:\Users\Qsp\Desktop\html-js-task\docs\tutorial.mp4 (slideshow, 0.5 MB)
- C:\Users\Qsp\Desktop\html-js-task\docs\video.html (player + steps)
- C:\Users\Qsp\Desktop\html-js-task\docs\clean-guide.html (text guide)
- C:\Users\Qsp\Desktop\html-js-task\docs\video-script.md (this narration)

**To make a real screen recording:** Install OBS Studio → Display Capture → Open Chrome Figma → Read this script → Export as screen-record.mp4 → Replace tutorial.mp4.
