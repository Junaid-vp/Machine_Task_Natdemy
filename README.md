# Natdemy – Real Estate Web Application

A modern, responsive real estate application built with React, Vite, and Tailwind CSS. Includes property search, filters, dark/light mode, and a local admin panel.

## 🚀 Setup Instructions

Clone the repository:

```bash
git clone <your-repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## ✅ Features Completed
- Responsive UI with dark/light mode
- Home, Properties, Property Details, Admin, and 404 pages
- Property search, filtering, and sorting
- Image gallery with lightbox and video support
- Enquiry form with validation
- Call and WhatsApp contact options
- Similar properties
- React Context API for global property state
- Admin form to add properties with image upload, preview, cover selection, ordering, and deletion
- Image lazy loading and skeleton loaders
- LocalStorage persistence

## 🚧 Not Implemented
- Backend API and database
- Admin authentication
- Edit and delete property features
- Cloud image storage (AWS S3/Cloudinary)

## 🧠 Assumptions & Technical Decisions
- Property data is loaded from properties.json initially.
- New properties are saved in localStorage.
- Uploaded images are converted to Base64 for persistence.
- LocalStorage has limited storage, so large images may exceed its quota.
- Dark/light mode is available through a theme toggle.
- An artificial delay (`setTimeout`) was added to property loading specifically so evaluators can see and review the Skeleton UI.
- An "Admin" link was placed in the main Navbar purely for evaluation purposes, to make testing the add-property flow easier without needing to guess the URL.
