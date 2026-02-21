# 🛡️ Codenoid
**Codenoid** is a cutting-edge, high-performance AI platform for developers. Utilizing the latest **Gemini 2.5 Flash Lite** model and **Next.js 16**, it provides instantaneous code generation, architectural explanations, and deep security audits—optimized for speed and professional reporting.

## 🚀 Key Features
* **AI Code Generator**: High-speed, context-aware code generation.
* **Architecture Explainer**: Simplifies complex logic and design patterns.
* **Security & Bug Auditor**: Scans code for vulnerabilities with remediation steps.
* **Professional PDF Export**: Structured audit reports with formatted code blocks and severity scores.
* **Performance-First Auth**: Session-based auth with JWT access tokens to minimize database overhead.

## 🛠️ Tech Stack
* **Framework**: Next.js 16 (App Router)
* **AI Model**: Google Gemini 2.5 Flash Lite
* **Database**: MongoDB
* **State Management**: Redux Toolkit
* **Authentication**: JWT + Session Strategy
* **Rendering**: React Markdown + Syntax Highlighter
* **PDF Engine**: React-PDF

## 🏗️ Architecture Highlights
- **Gemini 2.5 Flash Lite**: Leverages the latest low-latency AI for near-instant streaming responses.
- **Database Efficiency**: MongoDB integration focused on lean document storage, paired with JWT-based session management to reduce per-request DB hits.
- **Responsive Layout**: A modern, sleek UI built with Tailwind CSS, focusing on high readability for large code snippets.
- **Robust Formatting**: Custom regex parsers convert AI outputs into clean, aligned, and professional PDF documents.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/DeveloperZeeshu/codenoid.git](https://github.com/DeveloperZeeshu/codenoid.git)
   cd codenoid

2. **Install dependencies**
    ```bash
    npm install

3. **Environment Variables**
    ```bash
    # App Configuration
    APP_URL=http://localhost:3000

    # Database & Cache
    MONGODB_URI=your_mongodb_connection_string
    UPSTASH_REDIS_REST_URL=your_upstash_url
    UPSTASH_REDIS_REST_TOKEN=your_upstash_token
    REDIS_PREFIX=codenoid:

    # Authentication
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_id
    GOOGLE_CLIENT_SECRET=your_google_secret
    GOOGLE_REDIRECT_URI=your_app_url/api/auth/google/callback

    # AI Engine
    GEMINI_API_KEY=your_gemini_key

4. **Run the Development Server**
    ```bash
    npm run dev