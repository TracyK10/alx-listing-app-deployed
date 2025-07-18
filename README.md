# ALX Listing App

A modern, responsive property listing application built with Next.js, React, TypeScript, and Tailwind CSS. This application provides a clean and intuitive interface for browsing various property types including hotels, apartments, villas, and cabins.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Property Browsing**: Browse through various property types with detailed information
- **Filter System**: Filter properties by categories (All, Hotels, Apartments, Villas, Cabins)
- **Modern UI**: Clean and modern user interface with Tailwind CSS
- **TypeScript Support**: Full TypeScript integration for type safety and better development experience
- **Component-Based Architecture**: Modular and reusable React components
- **Hero Section**: Eye-catching hero section with property search capabilities

## 🚀 Tech Stack

- **Framework**: [Next.js 15.3.4](https://nextjs.org/) - React framework for production
- **Frontend**: [React 19](https://react.dev/) - JavaScript library for building user interfaces
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Typed superset of JavaScript
- **Styling**: [Tailwind CSS 4.1.11](https://tailwindcss.com/) - Utility-first CSS framework
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - Turbopack for fast development builds

## 📁 Project Structure

```
alx-listing-app-00/
├── components/              # Reusable React components
│   ├── common/             # Common UI components
│   │   ├── Button.tsx      # Reusable button component
│   │   ├── Card.tsx        # Property card component
│   │   └── Pill.tsx        # Filter pill component
│   └── layout/             # Layout components
│       ├── Footer.tsx      # Footer component
│       ├── Header.tsx      # Header with navigation
│       └── Layout.tsx      # Main layout wrapper
├── constants/              # Application constants
│   └── index.ts           # Constants and sample data
├── interfaces/             # TypeScript interfaces
│   └── index.ts           # Type definitions
├── pages/                  # Next.js pages
│   ├── api/               # API routes
│   │   └── hello.ts       # Example API endpoint
│   ├── _app.tsx           # App component wrapper
│   ├── _document.tsx      # Document component
│   └── index.tsx          # Home page
├── public/                 # Static assets
│   └── assets/            # Images and icons
│       ├── detail-images/ # Property detail images
│       ├── hero-section/  # Hero section images
│       ├── icons/         # UI icons
│       ├── listing-images/# Property listing images
│       └── logos/         # Category logos
├── styles/                # Global styles
│   └── globals.css        # Global CSS with Tailwind imports
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/alx-listing-app-00.git
   cd alx-listing-app-00
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues

## 🎨 Components Overview

### Layout Components

- **Layout**: Main wrapper component that includes header and footer
- **Header**: Navigation bar with search functionality and authentication buttons
- **Footer**: Simple footer with copyright information

### Common Components

- **Card**: Displays property information including image, name, price, and rating
- **Button**: Reusable button component with customizable props
- **Pill**: Filter button component for property categories

## 📊 Data Structure

The application uses TypeScript interfaces for type safety:

### PropertyProps Interface

```typescript
interface PropertyProps {
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
}
```

## 🎯 Key Features Explained

### Property Filtering

The application includes a filter system that allows users to browse properties by category:

- All properties
- Hotels
- Apartments
- Villas
- Cabins

### Responsive Design

Built with mobile-first approach using Tailwind CSS responsive utilities:

- Mobile: Single column layout
- Tablet: 2-column grid
- Desktop: 3-4 column grid

### Sample Data

The application includes comprehensive sample data with properties from various locations including:

- Bali, Indonesia
- Aspen, Colorado
- New York, USA
- Queenstown, New Zealand
- And many more...

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration for:

- Content paths for component scanning
- Theme extensions (can be customized)
- Plugin integrations

### Next.js

Configured with:

- React Strict Mode enabled
- TypeScript support
- Turbopack for fast development builds

## 👨‍💻 Author

**Tracy Karanja**

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Property booking functionality
- [ ] Advanced search and filtering
- [ ] Property details page
- [ ] User reviews and ratings
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Real-time chat support
- [ ] Map integration
- [ ] Wishlist functionality

---

_Built with ❤️ as part of the ALX Software Engineering Program_
