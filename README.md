<div align="center">
  <img src="public/alora_BG.png" alt="Alora Logo" style="width: 150px; height: auto;">
</div>

<div align="center">
  <h1>ALORA</h1>
</div>

Alora is a premium, full-stack e-commerce web application dedicated to exquisite perfumes and fragrances. Built with Next.js 15 and TypeScript, it offers a luxurious and seamless shopping experience. Customers can effortlessly browse exclusive scent collections (Men, Women, Unisex), manage their carts, and securely check out. The platform features robust user authentication, automated email notifications, secure payment processing, and a comprehensive administrative dashboard for managing products and orders.

<div align="center">
  <img src="https://img.shields.io/badge/Key%20Features-purple?style=for-the-badge" alt="Key Features" height="34">
</div>

* **Secure Authentication**: Streamlined user registration and login powered by Clerk, including social single sign-on (SSO) capabilities.
* **Dynamic Product Catalog**: Browse distinct fragrance categories with dedicated pages for Men, Women, and Unisex collections. Includes real-time search functionality.
* **Seamless Checkout & Payments**: A guided multi-step checkout process with integrated SSLCommerz for secure, versatile online transactions (Card, Mobile Banking, Net Banking) and Cash on Delivery (COD) options.
* **Automated Email System**: Beautiful, custom HTML email templates (Welcome Emails, Order Confirmations) handled via Nodemailer.
* **User Profiles**: Personalized user dashboards to view order history, manage account details, and track current purchases.
* **Admin Dashboard**: A secure, role-protected portal for store administrators to manage the product inventory, track daily/monthly sales, and monitor incoming orders.
* **Modern UI/UX**: Fully responsive and visually appealing interface built with Tailwind CSS, featuring custom elegant typography.

<div align="center">
  <img src="https://img.shields.io/badge/Tech%20Stack-purple?style=for-the-badge" alt="Tech Stack" height="34">
</div>

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Database ORM**: Prisma
-   **Authentication**: Clerk
-   **Payment Gateway**: SSLCommerz
-   **Email Service**: Nodemailer (with custom templates)
-   **Styling**: Tailwind CSS
-   **Deployment**: Vercel

<div align="center">
  <img src="https://img.shields.io/badge/Project%20Structure-purple?style=for-the-badge" alt="Project Structure" height="34">
</div>

The repository is cleanly organized utilizing the Next.js App Router architecture:

```text
.
├── prisma/
│   └── schema.prisma         # Database models (User, Product, Order)
├── public/                   # Static assets, fonts, and imagery (alora_BG.png)
└── src/
    ├── app/
    │   ├── api/              # Backend routes (SSLCommerz webhooks, Clerk sync, Admin API)
    │   ├── admin/            # Protected administrator dashboard and login
    │   ├── components/       # Reusable UI elements (Navbar, CartContext, Footer)
    │   └── (routes)/         # Public pages (shop, cart, checkout, profile, men, woman)
    └── lib/
        ├── email-templetes/  # Custom HTML structures for transactional emails
        ├── mail.ts           # Nodemailer configuration
        ├── prisma.ts         # Database connection client
        └── imageUrl.ts       # Utility for handling product imagery


Core Logic Highlights
src/app/api/payment/: Contains the critical endpoints (init, success, fail, cancel, cod) that interface with the SSLCommerz API to initialize transactions and handle post-payment redirection securely.

src/app/api/webhooks/clerk/route.ts: A webhook listener that synchronizes Clerk's authentication events (user creation/updates) directly into the application's Prisma database.

src/app/components/CartContext.tsx: Manages the global state of the user's shopping cart across the application using React Context.

src/lib/mail.ts & email-templetes/: Houses the logic to dynamically generate and dispatch stylized transactional emails based on user actions.

To run Alora locally on your machine, follow these steps:

Clone the repository:

Bash
git clone [https://github.com/uzicodes/alora.git](https://github.com/uzicodes/alora.git)
cd alora
Install dependencies:

Bash
npm install
Set up environment variables:
Create a .env.local file in the root directory and configure the following required variables:

Code snippet
# Database Configuration
DATABASE_URL="your_database_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
WEBHOOK_SECRET="your_clerk_webhook_secret"

# SSLCommerz Payment Gateway
STORE_ID="your_sslcommerz_store_id"
STORE_PASSWORD="your_sslcommerz_store_password"
IS_LIVE=false # Set to true for production environment

# Nodemailer Configuration (e.g., Gmail)
EMAIL_USER="your_email_address"
EMAIL_PASS="your_app_password"

# Base Application URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
Initialize the Database:
Generate the Prisma client and push the schema to your database.

Bash
npx prisma generate
npx prisma db push
Run the development server:

Bash
npm run dev
The store will now be accessible at http://localhost:3000.
