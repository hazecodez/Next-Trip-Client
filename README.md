# Next Trip Plan Vacations - Frontend

Next Trip Plan Vacations is a travel package planning and booking website that connects travelers with travel hosts. The platform features real-time communication, package booking, and a social component where travelers can share their experiences with others. This repository contains the frontend code of the project built with React, TypeScript, and Vite.

## Features:

### For Travelers:

- Explore & Book Packages: Browse and book travel packages provided by travel hosts.
- Moments Sharing: Share travel experiences by uploading images in the "Moments" section, visible to other travelers who can like and comment on the posts.
- Profile Page: Manage your profile, track booking history, view transaction history, and monitor your wallet balance.
- Real-Time Communication: Chat with travel hosts via live chat using Socket.IO or initiate video calls using ZegoCloud.
- Booking Management: Track active bookings and cancel them if needed, with refunds credited to the traveler's wallet.
- Secure Payments: Make payments through Stripe during the booking process.

### For Travel Hosts:

- Create Packages: Travel hosts can create travel packages, which are verified by the admin before becoming publicly available.
- Manage Bookings: View a list of travelers who have booked packages and track the status of each package.
- Analytics: View package statistics with ApexCharts for visualizing data.

### For Admins:

- Admin Control: Admins have full control over managing travelers, travel hosts, and packages.
- Verification: Admins verify travel packages before they are made available to the public.
- Moments Moderation: Admins can manage the moments posted by travelers and remove any inappropriate content.
- Analytics: View platform statistics with ApexCharts for visualizing data.

## Technology Stack

- Frontend Framework: React, TypeScript, Vite
- State Management: Redux
- Real-Time Features: Socket.IO (Chat), ZegoCloud (Video Call)
- Payment Integration: Stripe
- OAuth Authentication: Google OAuth
- Image Management: Cloudinary
- Charts & Analytics: ApexCharts
- Styling: Tailwind CSS

## Key Libraries & Integrations

- React & TypeScript: The core frontend library for building the user interface and ensuring type safety.
- Vite: A fast build tool and development server optimized for modern web projects.
- Redux: For state management, ensuring a predictable state across the application.
- Socket.IO: For real-time communication between travelers and hosts (chat feature).
- ZegoCloud: For seamless video call integration between travelers and hosts.
- Stripe: For secure payment processing during the booking process.
- Google OAuth: For easy and secure user authentication via Google.
- Cloudinary: For efficient cloud-based image uploading and storage (used in Moments and package creation).
- ApexCharts: For rendering interactive charts in the admin and host dashboard.
- Tailwind CSS: For responsive and modern design with utility-first CSS classes.

## How to Set Up

Clone the project

```bash
  git clone https://github.com/hazecodez/Next-Trip-Client.git
```

Go to the project directory

```bash
  cd Next-Trip-Client
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root directory and configure the following variables:

```bash
  VITE_BACKEND_URL=your_backend_api_url
  VITE_CLIENT_ID=your_google_oauth_client_id
  VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
  VITE_ZEGO_APP_ID=your_zegocloud_app_id
  VITE_ZEGO_SERVER_SECRET=your_zegocloud_server_secret
  VITE_AMADEUS_API_KEY=your_amadeus_api_key
  VITE_AMADEUS_SECRET=your_amadeus_secret_key


```

Start the development server:

```bash
  npm run dev
```

- Open your browser and go to http://localhost:5173.