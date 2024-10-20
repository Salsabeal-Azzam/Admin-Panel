# Admin-Panel

## Overview
This project is a responsive admin panel built using Angular and PrimeNG. The panel provides functionalities to manage users, products, and categories. The layout includes a sidebar, a navbar, and various admin-focused features. The project is styled using SCSS and includes components for login, product management, category management, and more.

## Features
- User Authentication: Protect routes using Angular Guard.
- Product Management: Add, update, and delete products via a responsive interface.
- Category Management: Add, update, and delete categories.
- Responsive Design: Utilizes SCSS and PrimeNG for a mobile-first responsive design.
- PrimeNG Integration: UI components like tables, buttons, input fields, and modals from PrimeNG.
- Reusable Components: Includes reusable components like Navbar, Sidebar, and Spinner.

## Technologies Used
- Angular: Frontend framework for building web applications.
- PrimeNG: Angular UI component library for building responsive UIs.
- SCSS: CSS preprocessor for managing styles.
- TypeScript: Strongly typed programming language that builds on JavaScript.


## Project Structure 
<img width="664" alt="Screenshot 2024-10-20 at 10 08 02 PM" src="https://github.com/user-attachments/assets/b75638ef-99d2-4050-8e04-7a4a9d7732e0">

## Components
1. Login Component
- Description: Provides user authentication functionality.
- Technologies: PrimeNG form components, Angular services for authentication.
2. Navbar Component
- Description: Displays a responsive navigation bar with links to different sections of the admin panel.
- Features: Avatar for logged-in users, logout button.
3. Sidebar Component
- Description: A collapsible sidebar for navigating through different sections of the admin panel.
- Features: Links to manage products, categories, and admin settings.
4. Products Component
- Description: Manages the list of products, allowing adding, updating, and deleting of product information.
- Features: PrimeNG tables, modals for editing, and forms for updating products.
5. Categories Component
- Description: Similar to products but focuses on managing product categories.
6. Spinner Component
- Description: A reusable spinner to show loading states.


## Services
1. AuthService
- Handles user authentication and token management.
2. CategoryService
- Provides API interactions for managing categories.
3. ProductService
- Handles API interactions for managing products, including adding, updating, and deleting products.
4. HelperService
- Provides utility functions like formatting and reusable logic.

## Authentication Guard
- AuthGuard: Protects routes from being accessed by unauthenticated users. Redirects to the login page if a user is not logged in.

## Installation and Setup
1. Clone the repository:
git clone https://github.com/Salsabeal-Azzam/Admin-Panel.git
2. Navigate to the project directory:
   cd admin-panel
3. Install the required dependencies:
 npm install
4. Run the application:
   ng serve


## Usage
1. Login using valid credentials.
2. Navigate through the panel to manage products and categories.
3. Update or Delete products and categories using the respective modals.
4. Log out using the button in the navbar.

## Styles
All global styles and variables are located in the src/styles folder. You can customize the theme by modifying _variables.scss.
