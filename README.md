# My Cozy Book Nook

My Cozy Book Nook is a cozy digital reading web application designed to help readers build their personal library, discover books, and continue their reading journey in a calm and aesthetically pleasing environment. The platform combines a minimalist interface with smart book-related features, using the Gemini API and Google Books API to enhance recommendations,soundtrack where user enter there playlist, and user interaction.

The project aims to make reading more organized, enjoyable, and interactive by giving users one relaxing digital space to explore books, manage their collection, and stay inspired.

---

## 📌 Overview

My Cozy Book Nook is built for readers who want a simple and beautiful way to manage their books and discover new ones. It offers a personal library experience with cozy visuals, Reading ambience and playlist support , reading-focused tools, and AI-powered assistance to help users interact with their collection more naturally.

---

## 🎯 Problem Statement

Many readers use separate apps or manual methods to search for books, track their reading, save favorites, and write reflections. This often makes the reading experience feel scattered and less engaging.

My Cozy Book Nook addresses these challenges by providing:

- A personal digital library
- Easy book discovery through the Google Books API, just search the book and add it to your log directly with author name and book cover
- Smart reading guidance through the Pagewise Assisstant via Gemini API and copilot
- Reading ambience and playlist support
- A simple and cozy reading-focused interface
- Book organization, favorites, and notes in one place
- Cross-device reading continuity through sign-in

---

## 🌐 Live Demo

**Website:**  
[https://my-cozy-book-nook-970617132166.us-west1.run.app/](https://my-cozy-book-nook-970617132166.us-west1.run.app/)

---

## 🏗️ Technical Architecture & Implementation Report

### 1. Server Architecture & AI Integration
* **Server-Side API Route:** Built using Express (`server.ts`) running on Google Cloud Run to keep API keys secure and prevent client-side exposure.
* **Gemini API Integration:** Rather than client-side prompts, user requests pass through the server directly to the Google GenAI SDK (`@google/genai`).
* **Active Conversational Logic:** The system prompt in `server.ts` conditions the Gemini model to operate as an active book intelligence tool—handling plot breakdowns, specific Q&A, and interactive summaries rather than basic recommendations.

### 2. Data Flow & Database Architecture
* **Authentication:** Handled via Firebase Authentication (Google Sign-In), establishing secure user IDs.
* **Database (Cloud Firestore):** Syncs user library states, reading logs, streak counters, custom tags, and timers in real-time.
* **External API Pipeline:** Intercepts search queries through the Google Books API, parses JSON metadata, and automatically populates Firestore documents with book covers, authors, and page counts.

### 3. Deployment & Cloud Infrastructure
* **Containerization & Hosting:** Deployed on **Google Cloud Run** using containerized build artifacts for serverless scaling.
* **Build Tools:** Built with React, Vite, and Tailwind CSS on the frontend; TypeScript and Node.js on the backend.

--- 
## 🤖AI Instructions / Logic/ System Prompt

You are the Cozy Books Assistant (Pagewise Assistant) for "My Cozy Book Nook." Your persona is warm, encouraging, knowledgeable, and reader-friendly.

Your core objectives are to:
1. Understand user reading preferences, favorite genres, and reading habits.
2. Recommend relevant books, genres, or library organization actions based on user input.
3. Help users decide what to read next based on their mood or "coziness" preference.
4. Keep interactions supportive, calm, and inspiring—encouraging consistency in reading goals.
5. Ask thoughtful follow-up questions when details are ambiguous or incomplete.

--- 

## ✨ Features
- 📚 Personal digital library
- 🔐 Sign in with Google
- ➕ Add new books to your library
- 🖼 Add or update custom book pictures
- ⭐ Curate favorite books
- ✅ Mark books as finished
- 📝 Log reading sessions
- 🔥 Reading streak tracking
- 💭 Book notes and reflections
- 🏷 Coziness tags and genres
- 🤖 Cozy Books Assistant
- 🎯 Reading recommendations
- 🎵 Reading ambience and playlist support
- 📱 Minimal and responsive reading interface
- 🌍 Book information fetched from Google Books API
- 🎨 Warm, cozy visual design

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

## 👨‍💻 Developer

Maha Batool

BS Computer Science 

---

📄 License

This project was developed for educational and portfolio purposes.
© 2026 Maha Batool. All rights reserved.

