# King Pie Website — Part 3

## Project overview
A responsive multi-page King Pie website built with HTML5, CSS3 and vanilla JavaScript. Part 3 adds interactive elements, dynamic gallery tools, client-side form validation, AJAX form submission for Netlify, SEO metadata, technical SEO files and deployment configuration.

## Pages
- `index.html` — Home page, FAQ accordion and feature sections.
- `about.html` — About, mission and vision.
- `gallery.html` — Dynamic search, category filter, sorting and image lightbox.
- `enquiry.html` — Product/service enquiry form and Leaflet map demonstration.
- `contact.html` — General contact form.
- `success.html` — Form success page.

## Folder structure
```text
king-pie/
├── index.html
├── about.html
├── gallery.html
├── enquiry.html
├── contact.html
├── success.html
├── css/style.css
├── js/script.js
├── images/
├── robots.txt
├── sitemap.xml
├── netlify.toml
└── README.md
```

## Run locally
1. Extract the ZIP folder.
2. Open the `king-pie` folder in Visual Studio Code.
3. Open `index.html` in a browser (or use the Live Server extension).
4. Test navigation, FAQ accordion, gallery search/filter/sort, image lightbox and form validation.

## Forms and AJAX
The contact and enquiry forms use Netlify Forms markup and JavaScript `fetch()` for asynchronous submission. To receive real submissions:
1. Deploy the site to Netlify.
2. Ensure form detection is enabled in Netlify and trigger a new deploy if required.
3. Confirm that Netlify detects the forms named `contact` and `enquiry`.
4. Test each form from the published website.
A local file preview cannot deliver a real form submission. Do not enter real customer data during local testing.

## Map
The Leaflet map is a demonstration centered on Johannesburg, not a verified King Pie branch. Replace the sample coordinates and popup text in `enquiry.html` with the actual store address/coordinates before publishing. Leaflet and OpenStreetMap tiles require an internet connection.

## SEO checklist before publishing
- Replace every `YOUR-GITHUB-USERNAME` and `YOUR-REPOSITORY` placeholder in canonical links, `robots.txt` and `sitemap.xml` with the final public website URL.
- Confirm the correct business address, telephone number, email address and opening hours. Placeholder contact details have deliberately not been invented.
- Use genuine business-approved social media profiles and request relevant backlinks from legitimate partner/community websites.
- Submit the sitemap to Google Search Console after deployment.
- Compress oversized images further if required and keep descriptive alt text.
- Do not claim live prices, product availability or store location until verified.

## Deployment using Netlify
1. Sign in to Netlify.
2. Choose **Add new site** → **Deploy manually**.
3. Drag the extracted `king-pie` folder (the folder containing `index.html`) into the deployment area.
4. Open the generated site URL and test all pages and forms.
5. Replace the canonical URL and sitemap placeholders with the live URL, then redeploy.

## Deployment using GitHub Pages
1. Create a GitHub repository and upload the contents of the `king-pie` folder.
2. In repository **Settings** → **Pages**, select the deployment branch and root folder.
3. Save and wait for the published URL.
4. Replace URL placeholders in the HTML canonical links, `robots.txt` and `sitemap.xml`.
5. Commit and push the updated files.

## Accessibility and performance
- Semantic HTML landmarks and descriptive image alt text.
- Keyboard-operable navigation, accordion and lightbox.
- Form labels, native validation and status announcements.
- Responsive layouts and reduced-motion support.
- Images use lazy loading on the gallery page.
- Static assets are separated into CSS, JavaScript and images folders.

## Limitations to resolve before final submission
- The map needs the verified branch coordinates.
- The business contact details need to be confirmed.
- Netlify Forms must be enabled on the deployed site for real AJAX submissions.
- Replace all example canonical and sitemap URLs with the final deployed URL.
