# 🏠 ALX Listing App

The **ALX Listing App** is the foundational setup for a modern Airbnb clone. This project establishes a clean, scalable, and production-ready codebase using **Next.js**, **TypeScript**, **TailwindCSS**, and **ESLint**.

## 📌 Project Goals

- Scaffold a responsive and modular Airbnb-style property listing page.
- Enforce best practices in project structure, styling, and type safety.
- Lay the groundwork for scalable, reusable components and clean asset management.

---

## 📁 Project Structure

```

alx-listing-app/
├── components/        # Reusable UI components (Card, Button)
│   └── common/
├── interfaces/        # TypeScript interfaces for component props
├── constants/         # Static data and config variables
├── public/
│   └── assets/        # Images and icons used in the app
├── pages/             # Next.js routing (index.tsx as entry point)
├── styles/            # Global CSS (Tailwind base, components, utilities)

````

### Folder Descriptions

- **components/**: Contains reusable UI components like `Card` and `Button` to promote modularity.
- **interfaces/**: Stores all TypeScript interfaces to maintain strong typing across the app.
- **constants/**: Contains configuration values and static data used across the project.
- **public/assets/**: Stores all images, icons, and static assets for the app UI.

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### ✅ Prerequisites

- Node.js v16+
- npm (Node Package Manager)
- A text editor like **VS Code**

### 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/TracyK10/alx-listing-app.git
cd alx-listing-app
````

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

You should see the base Next.js project with TailwindCSS set up correctly.

---

## 🛠 Technologies Used

* [Next.js](https://nextjs.org/) (v15+)
* [TypeScript](https://www.typescriptlang.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [ESLint](https://eslint.org/)