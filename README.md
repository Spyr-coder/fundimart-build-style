# Welcome to FundiMart

## Project info

**FundiMart** is a comprehensive construction materials and professional tools e-commerce platform built with modern web technologies.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Your local development environment will be set up to match the production configuration.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to various hosting platforms:

- **Vercel**: Connect your GitHub repository and deploy with automatic previews
- **Netlify**: Deploy via GitHub integration for seamless updates
- **Docker**: Build and deploy using the provided Vite build configuration
- **Traditional Hosting**: Build with `npm run build` and upload the `dist` folder to your server

For production deployments, ensure all environment variables are properly configured.

## Project Features

- **Product Catalog**: Browse building materials, power tools, hand tools, plumbing, electrical, and safety gear
- **Shopping Cart**: Add products to cart with dynamic pricing
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Manage products, orders, and store settings
- **Seller Dashboard**: Tools for sellers to manage their products
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Theme toggle for user preference
- **Search Functionality**: Find products quickly with search feature
- **Fundi-AI**: Intelligent construction assistant powered by Gemini API

## Fundi-AI Integration

Fundi-AI is a chat assistant integrated into the platform to help users with inquiries about products, construction advice, and platform services.

To enable Fundi-AI, add your Google Gemini API key to your `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

You can obtain an API key from the [Google AI Studio](https://aistudio.google.com/).
