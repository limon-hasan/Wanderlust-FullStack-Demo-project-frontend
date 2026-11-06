<div align="center">

# 🌍 Wanderlust — Frontend Client

An immersive full-stack travel discovery and destination reservation platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://wanderlust-frontend-livid.vercel.app)
[![Backend Repository](https://img.shields.io/badge/Backend-Repository-blue?style=for-the-badge&logo=github)](https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-backend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Project Overview

**Wanderlust** is a modern web application designed for travelers to discover picturesque destinations, explore curated travel spots, and reserve experiences seamlessly. 

This repository contains the client-side user interface, optimized for fast page loads, responsive navigation, and direct integration with the Wanderlust Express/MongoDB backend service.

- **Live Frontend:** [wanderlust-frontend-livid.vercel.app](https://wanderlust-frontend-livid.vercel.app)
- **Live API Backend:** [wanderlust-backend-green.vercel.app](https://wanderlust-backend-green.vercel.app)
- **Backend Source Code:** [Wanderlust-FullStack-Demo-project-backend](https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-backend)

---

## ✨ Key Features

- **Destination Discovery:** Dynamic listing of travel spots with pricing, ratings, and location details.
- **Modern UI & UX:** Sleek, accessible interface with smooth transitions, interactive cards, and responsive grid layouts.
- **Fast Client & Server Rendering:** Powered by Next.js for optimized performance and SEO.
- **REST API Integration:** Clean asynchronous client fetch service connected to the serverless Express backend.
- **Fully Responsive:** Fluid layouts crafted with Tailwind CSS for mobile, tablet, and desktop views.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (React 19 / App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) / JavaScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons & UI** | Lucide React |
| **HTTP Client** | Native Fetch API / Axios |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
├── public/                 # Static assets, logos, and images
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable UI components (Navbar, Cards, Modals)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility helpers and API client configurations
│   ├── types/              # TypeScript interfaces and type definitions
│   └── styles/             # Global style configurations
├── .gitignore              # Ignored files and environment variables
├── components.json         # UI component schema configuration
├── package.json            # Scripts and project dependencies
└── README.md               # Frontend documentation
```

---

## 🚀 Getting Started Locally

Follow these instructions to run the frontend client locally on your machine.

### Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository

```bash
git clone [https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-frontend.git](https://github.com/limon-hasan/Wanderlust-FullStack-Demo-project-frontend.git)
cd Wanderlust-FullStack-Demo-project-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=[https://wanderlust-backend-green.vercel.app](https://wanderlust-backend-green.vercel.app)
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Scripts

- `npm run dev` — Starts the Next.js local development server.
- `npm run build` — Compiles and builds the production-ready bundle.
- `npm run start` — Starts the production build server.
- `npm run lint` — Runs ESLint checks across source code.

---

## 👨‍💻 Author

**Maksudul Hasan Limon**
- GitHub: [@limon-hasan](https://github.com/limon-hasan)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
