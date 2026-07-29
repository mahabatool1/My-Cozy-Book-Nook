# 📖 My Cozy Book Nook

> A calm, aesthetically pleasing digital sanctuary designed to help book lovers track their reading journey, curate personal libraries, listen to ambient playlists, and discover their next favorite read.

---

## 📌 Project Report & Overview

### a. About the App & Problem Solved
**My Cozy Book Nook** is a web application designed for readers, students, casual book lovers, and trackers who want a unified, clutter-free space for their reading habits.

* **The Problem:** Many readers rely on fragmented methods to manage their books—scattered notes apps, complex spreadsheets, separate playlist tools for reading ambience, and disjointed search tools. This creates friction and takes away from the relaxing nature of reading.
* **The Solution:** My Cozy Book Nook brings everything into one cozy ecosystem. It combines book tracking, Google Books API integration, ambient playlist support, streak management, and AI guidance into a warm, aesthetic interface.

### b. Live Deployed URL
🔗 **Live Application:** [https://my-cozy-book-nook-970617132166.us-west1.run.app/](https://my-cozy-book-nook-970617132166.us-west1.run.app/)

---

## ✨ Features List

* 📚 **Personal Digital Library:** Create, manage, and curate your personal collection.
* 🔐 **Google Authentication:** Secure cross-device sign-in powered by Firebase.
* 🔍 **Seamless Book Search:** Instant fetch from Google Books API to autofill covers, authors, descriptions, and metadata.
* ⭐ **Favorites & Shelf Status:** Mark books as favorites, currently reading, or finished.
* 🔥 **Reading Streak Tracker:** Log reading sessions to build and maintain habits.
* 📝 **Notes & Reflections:** Save personal thoughts, quotes, and reflections per book.
* 🏷 **Coziness Tags & Genres:** Organize books using custom tags and cozy filters.
* 🎵 **Reading Ambience & Playlists:** Embedded playlist support for immersive reading sessions.
* 🤖 **Pagewise AI Assistant:** Intelligent chat interface offering personalized reading suggestions and guidance.
* 📱 **Responsive Cozy UI:** Designed with warm, relaxing visuals using Tailwind CSS and Vite.

---

## 🤖 AI Feature & System Prompt

The **Cozy Books Assistant (Pagewise Assistant)** acts as an empathetic reading companion. Powered primarily by the **Gemini API** (with automatic fallback to Copilot), it offers tailored recommendations, helps navigate library organization, and keeps readers motivated.

### System Prompt / Core Logic
```text
You are the Cozy Books Assistant (Pagewise Assistant) for "My Cozy Book Nook." Your persona is warm, encouraging, knowledgeable, and reader-friendly.

Your core objectives are to:
1. Understand user reading preferences, favorite genres, and reading habits.
2. Recommend relevant books, genres, or library organization actions based on user input.
3. Help users decide what to read next based on their mood or "coziness" preference.
4. Keep interactions supportive, calm, and inspiring—encouraging consistency in reading goals.
5. Ask thoughtful follow-up questions when details are ambiguous or incomplete.# My Cozy Book Nook

My Cozy Book Nook is a cozy digital reading web application designed to help readers build their personal library, discover books, and continue their reading journey in a calm and aesthetically pleasing environment. The platform combines a minimalist interface with smart book-related features, using the Gemini API and Google Books API to enhance recommendations,soundtrack where user enter there playlist, and user interaction.

The project aims to make reading more organized, enjoyable, and interactive by giving users one relaxing digital space to explore books, manage their collection, and stay inspired.

---

## 📚 API Integration

This project uses two main APIs:

### Gemini API (if gemini is not working it automatically redirect to copilot)
The Cozy Books Assistant is designed to make reading management feel more natural, supportive, and interactive. Powered by the Gemini API and Copilot, it can help readers:

Find book recommendations based on interests
Decide what to read next
Navigate library-related actions
Ask book-related questions
Stay encouraged and engaged with reading goals
The assistant follows a warm, reader-friendly interaction style. It is intended to understand requests related to books, genres, favourites, and reading activity; recommend relevant reading actions or books; and ask for more details whenever needed.

### Google Books API
Book discovery is powered by the Google Books API. When a reader searches for a title, the application can retrieve available book details, including:

Title
Author
Description
Categories
Cover image
This makes it easy to add books to a reading log without manually entering core book information.

---

## 🛠 Technologies Used

Frontend Framework,"React.js, Vite"
Languages,"JavaScript (ES6+), HTML5, CSS3"
Styling,"Tailwind CSS, Google Fonts"
AI Models & Assistants,"Google Gemini API, Copilot (Fallback)"
External APIs,Google Books API
Authentication & Database,"Firebase Authentication, Cloud Firestore"
Version Control,"Git, GitHub"
Cloud Hosting / Deployment,Google Cloud Run

---
## 📷 Screenshots

<img width="1701" height="918" alt="image" src="https://github.com/user-attachments/assets/e58efe04-4626-4127-a1b3-2d1a3984eca9" />



<img width="1696" height="921" alt="image" src="https://github.com/user-attachments/assets/accc54e1-aea8-47e3-aba5-bddaa688f391" />



<img width="1704" height="923" alt="image" src="https://github.com/user-attachments/assets/023cf720-84da-4d38-a856-4319a04c07af" />



<img width="1697" height="916" alt="image" src="https://github.com/user-attachments/assets/39c66343-a945-4ce3-a8da-ce6bc5c8a86b" />


---

## 👥 Target Users
- Book lovers
- Casual readers
- Students and learners
- Users who enjoy tracking their reading journey
- Readers looking for a calm and aesthetic digital library
- People who want AI support for discovering books

---

## 🚀 Future Improvements
- Personalized book recommendations based on reading history
- User profile customization
- Advanced filters and search options
- Reading goals and achievements
- Social sharing or community features
- Exportable reading reports
- Dark mode and more cozy themes
- More advanced Gemini-powered conversations

---
##🚀 How to Run the Project Locally

Follow these instructions to run My Cozy Book Nook on your local machine:

###Prerequisites
Node.js (v18.0 or higher)

npm or yarn

A Firebase Project (for Auth & Firestore)

A Gemini API Key (from Google AI Studio)
---
###Steps
1. Clone the Repository:

###Bash
git clone [https://github.com/your-username/my-cozy-book-nook.git](https://github.com/your-username/my-cozy-book-nook.git)
cd my-cozy-book-nook
---
2.Install Dependencies:

###Bash
npm install

---

3.Set Up Environment Variables:
Create a .env file in the root directory and add your API keys:

###Code snippet
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key

---

4.Start the Development Server:

###Bash
npm run dev
---

5.Open in Browser:
Navigate to http://localhost:5173 to explore your Cozy Book Nook!
---

## 👨‍💻 Developer

Maha Batool

BS Computer Science 

---

📄 License

This project was developed for educational and portfolio purposes.
© 2026 Maha Batool. All rights reserved.

