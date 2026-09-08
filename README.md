# CirengSMP Hub

Create a modern, full-stack, single-page responsive web application for a Minecraft Bedrock server named "CirengSMP". Use React, Tailwind CSS, Lucide React icons, and Supabase for the backend. Use the attached logo image directly across the website for branding and identity.



### 🎨 1. Visual Identity & Logo Integration

- **Logo Usage (Attached Image):**

  - **Header/Navbar:** Place the attached logo as a small branding avatar next to the "CirengSMP" title.

  - **Hero Section:** Display the attached logo as a large, centered, high-resolution showcase image with a glowing ember/orange particle background effect behind it.

  - **Favicon & Meta:** Set the attached image as the site favicon.

- **Theme & Palette:** Dark Charcoal background (`#020617`), Ember Gold accents (`#F59E0B`), and Diamond Cyan highlights (`#06B6D4`) matched directly to the uploaded logo.



### 🏠 2. Website Structure & Features



**A. Header & Navigation (Fixed Top)**

- Brand mark with the attached logo icon and "CirengSMP" gradient text.

- Navigation links: Home, Announcements, Redeem, Info & Rules, Support.

- Platform Badges:

  1. Green glowing badge: "Bedrock Edition (Active)"

  2. Amber badge: "Java Edition (Coming Soon)"



**B. Hero Section**

- Large showcase of the attached CirengSMP mascot logo.

- **Title:** "Welcome to CirengSMP"

- **Subtitle:** "Server Minecraft Indonesia - Survival, Seru & Ramah Warga!"

- **Real-Time Player Count:** Fetch real-time status from Bedrock API `https://api.mcsrvstat.us/bedrock/2/cirengsmp.servegame.com:2042`. Display a pulsing green dot when online and show live player count (e.g., "Online • 12/50 Players").

- **Action Buttons:**

  1. **Direct Join:** Primary orange button "Buka Minecraft & Join" linking to `minecraft://?addExternalServer=CirengSMP|cirengsmp.servegame.com:2042`.

  2. **Copy IP:** Cyan button "Copy IP & Port" copying `cirengsmp.servegame.com:2042` to clipboard with a toast notification.

  3. **WhatsApp Group:** Green button "Grup WA" linking to `https://chat.whatsapp.com/DglW4TCscjS1pCU3zmFwgl`.



**C. Dynamic Content (Supabase Integration)**

- **Active Redeem Codes:** Fetch from table `redeem_codes` where `expires_at > NOW()`. Display as stylized cards showing the code, reward description, expiration countdown timer (24h limit), and a "Copy Code" button. Show "Belum ada kode aktif" if empty.

- **Server Announcements:** Fetch from table `announcements` sorted by `created_at desc`. Display news cards featuring Title, Content, Date, and an optional image (`image_url`).



**D. SocioBuzz Support & Live Alerts Section**

- **Title:** "Dukung CirengSMP"

- **Milestone Goal:** Embed iframe: `<iframe src="https://sociabuzz.com/pro/tribe/total1/v1/2346410023" width="100%" height="150" frameborder="0" scrolling="no"></iframe>`

- **Live Sound & GIF Alert Overlay:** Embed this iframe invisibly or floating fixed on bottom-right so sound/GIF alerts play on donations: `<iframe src="https://sociabuzz.com/pro/tribe/alert1/v3/2346410023?colorName=%2300ff00+&alphaName=1&colorNote=%23ffff00&alphaNote=1&colorFrom=%23ffffff&alphaFrom=1&gifActive=1&maxDuration=12&font=Open%2BSans%3A800" allow="autoplay" style="position:fixed; bottom:0; right:0; width:300px; height:300px; z-index:9999; pointer-events:none;" frameborder="0"></iframe>`

- **Donation CTA:** Button linking directly to SocioBuzz donation page.



**E. Information, Rules & FAQ Section**

- **Tutorial (Cara Join):** 4-step beginner guide for Bedrock players (Android, iOS, Windows).

- **Rules Accordion:** Drop-down list containing 5 standard Minecraft server rules.

- **FAQ Accordion:** Common Q&A about server uptime, version, and gameplay.



**F. Footer**

- Copyright info and link to Admin Login (`/admin`).



### 🔒 3. Admin Dashboard (`/admin`)

- Supabase Auth protected area.

- **Tab 1: Redeem Codes:** Form to insert new code and reward (automatically setting `expires_at` = current time + 24 hours). List active codes with delete functionality.

- **Tab 2: Announcements:** Form to post news (Title, Content, Optional

 Image URL). List news with delete functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f1bd4a58-68ee-455d-8965-aab121b9ad9b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
