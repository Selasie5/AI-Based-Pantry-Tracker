# Pantry Tracker

## Overview
Welcome to **Pantry Tracker**, a user-friendly application designed to help you manage your kitchen pantry efficiently. This project aims to provide a simple and intuitive interface for tracking the quantity and expiration dates of your pantry items, ensuring you always know what you have on hand. This README file provides an overview of the project, installation instructions, and usage guidelines.

## Features
- **Item Management**: Easily add, edit, and delete pantry items.
- **Real-Time Inventory Tracking**: Instantly update item quantities as you use or restock them.
- **Expiration Alerts**: Receive notifications for items nearing their expiration date.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Secure Authentication**: User authentication using email and password or Google Sign-In.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **Firebase Account**: Set up a Firebase project and enable the necessary authentication methods.

### Installation

1. **Clone the Repository**:
   ```bash
   https://github.com/Selasie5/AI-Based-Pantry-Tracker.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd pantry-tracker
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Setup Firebase**:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration details to the `.env` file:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

### Running the Application

1. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000` or use the deployed version at https://ai-based-pantry-tracker.vercel.app/

## Usage

### Sign In
- Users can sign in using their email and password or through Google Sign-In. For first-time users, click on "Sign Up" to create an account.

### Managing Pantry Items
- **Add Items**: Click the "Add Item" button and fill in the details such as item name, quantity, and expiration date.
- **Edit Items**: Click on an item to edit its details.
- **Delete Items**: Remove items that are no longer in your pantry.

### Notifications
- Users will receive alerts for items that are about to expire, helping them manage their pantry more efficiently and reduce food waste.

## Contributing
We welcome contributions to enhance Pantry Tracker. If you'd like to contribute, please fork the repository and create a pull request with a detailed description of your changes.

### Reporting Issues
If you encounter any issues or bugs, please report them in the [Issues](https://github.com/Selasie5/AI-Based-Pantry-Tracker/issues) section of the repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **Material-UI**: For providing the design components.
- **Firebase**: For authentication and real-time database support.

Thank you for using Pantry Tracker! We hope it makes your kitchen management easier and more efficient. For any questions or feedback, please feel free to contact us at [selasisepenu5@gmail.com].

---

Feel free to customize this README content to suit your project's specific details and requirements.
