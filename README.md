# Alumni Network

A modern web application built to connect and engage alumni communities. This platform facilitates networking, knowledge sharing, and maintaining lasting connections between graduates.

## 🌟 Features

- **User Authentication**
  - Email/Password login
  - Google authentication
  - Secure user sessions

- **Alumni Profiles**
  - Customizable user profiles
  - Professional information
  - Academic history
  - Profile picture upload

- **Interactive Feed**
  - Share posts and updates
  - Like and comment on posts
  - Filter posts by categories
  - Rich text content support

- **Messaging System**
  - Real-time chat functionality
  - Private conversations
  - User online status

- **Achievement Showcase**
  - Share professional milestones
  - Academic achievements
  - Awards and recognition

## 🚀 Technologies Used

- **Frontend**
  - React.js
  - Vite
  - TailwindCSS
  - React Router

- **Backend & Database**
  - Firebase
  - Firestore
  - Firebase Authentication
  - Firebase Hosting

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mubbashir123/Alumni-Network.git
   cd alumni-network
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a new project in [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google Sign-in)
3. Create a Firestore database
4. Add your web app to get configuration details
5. Update the `.env` file with your Firebase configuration

## 🚀 Deployment

The application is configured for Firebase Hosting:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase:
   ```bash
   firebase init
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   firebase deploy
   ```

## 💻 Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
