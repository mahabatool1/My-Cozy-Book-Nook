/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // Cozy AI Companion Endpoint (Copilot API)
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      let apiKey = process.env.GEMINI_API_KEY;
      if (typeof apiKey === 'string') {
        apiKey = apiKey.trim().replace(/^['"]|['"]$/g, '').trim();
      }
      
      // Check if API key is missing or placeholder
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        console.warn("GEMINI_API_KEY is not set or is placeholder, using lovely offline fallback...");
        // Return a delightful custom, cozy offline fallback response directly
        return res.json({ 
          reply: `Oh, I'd love to tell you all about that! While my digital notes are currently resting offline, I completely believe a warm beverage and a good chapter can comfort any soul. What book is keeping you company today?` 
        });
      }

      // Initialize the GoogleGenAI client (lazy client initialization per rules)
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.5-flash'];
      let response;
      let lastError: any = null;

      // Construct system instruction that is warm, cozy, but strictly informative and helpful.
      const systemInstruction = 
        `You are "PageWise Copilot", a warm, loving, and digital-savvy virtual book companion and librarian in "My Cozy Book Nook". ` +
        `You adore the scent of paperbacks, dry lavender tea leaves, soft ambient lighting, and neat logs. ` +
        `Your job is to assist readers with all their book queries, summaries, recommendation requests, and reading goals. ` +
        `IMPORTANT: You must always address the reader's question directly with factual and precise information (e.g., summarize the exact book requested, suggest true titles, explain concepts). ` +
        `Always wrap your helpful answer in a sweet, comforting, and cozy tone. ` +
        `Keep your replies concise and easy to read (strictly 2 to 3 sentences, maximum 80 words) and optionally end with a gentle question to keep the reader engaged.`;

      // Build context from history with strict alternation and starting with 'user'
      const contents = [];
      
      if (history && Array.isArray(history)) {
        interface TempTurn {
          role: 'user' | 'model';
          text: string;
        }
        
        let rawTurns: TempTurn[] = [];
        
        // 1. Filter out empty messages
        for (const msg of history) {
          if (msg && typeof msg.text === 'string' && msg.text.trim()) {
            const role = msg.sender === 'user' ? 'user' : 'model';
            rawTurns.push({ role, text: msg.text.trim() });
          }
        }
        
        // 2. Collapse consecutive turns of the same role
        const collapsedTurns: TempTurn[] = [];
        for (const turn of rawTurns) {
          if (collapsedTurns.length > 0 && collapsedTurns[collapsedTurns.length - 1].role === turn.role) {
            collapsedTurns[collapsedTurns.length - 1].text += "\n" + turn.text;
          } else {
            collapsedTurns.push(turn);
          }
        }
        
        // 3. Ensure sequence starts with a 'user' turn (required by Gemini API)
        let startIndex = 0;
        while (startIndex < collapsedTurns.length && collapsedTurns[startIndex].role !== 'user') {
          startIndex++;
        }
        
        // 4. Extract valid history slices guaranteeing they ALWAYS start with a 'user' turn.
        // Slice at most 6 items from the end, but trim any items leading up to a 'user' role.
        const validSlots = collapsedTurns.slice(startIndex);
        const finalTurns = validSlots.slice(-6);
        while (finalTurns.length > 0 && finalTurns[0].role !== 'user') {
          finalTurns.shift();
        }

        for (const turn of finalTurns) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        }
      }
      
      // 5. Append current user message
      if (typeof message === 'string' && message.trim()) {
        const textToSearch = message.trim();
        // Merge with last message if it was also 'user' to maintain alternating format
        if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
          contents[contents.length - 1].parts[0].text += "\n" + textToSearch;
        } else {
          contents.push({
            role: 'user',
            parts: [{ text: textToSearch }]
          });
        }
      } else {
        return res.status(400).json({ error: 'Message cannot be empty' });
      }

      for (const currentModel of modelsToTry) {
        let retries = 2; // Try up to 2 times per model
        let delay = 1000;
        let success = false;

        while (retries > 0) {
          try {
            console.log(`[Copilot Engine] Attempting generation using model: ${currentModel}`);
            response = await ai.models.generateContent({
              model: currentModel,
              contents: contents,
              config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
              }
            });
            success = true;
            break; // success
          } catch (err: any) {
            retries--;
            lastError = err;
            console.warn(`[Copilot Engine] Model ${currentModel} failed. Retries left: ${retries}. Error:`, err.message || err);
            
            if (retries === 0) {
              break; // Try next model in sequence
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 1.5;
          }
        }

        if (success) {
          break; // Exit the model loop on success
        }
      }

      if (!response) {
        throw lastError || new Error("All models failed to respond");
      }

      const text = response?.text || "I was dreaming of books for a moment... what were we saying, dear reader?";
      return res.json({ reply: text });

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      // Smart Contextual Cozy Fallback Dialog logic
      const lowercaseMsg = (typeof message === 'string') ? message.toLowerCase() : "";
      let fallbackReply = "";

      if (lowercaseMsg.includes("recommend") || lowercaseMsg.includes("suggest") || lowercaseMsg.includes("next book") || lowercaseMsg.includes("what to read")) {
        fallbackReply = "My digital bookshelves are fluttering just a bit right now, but I always recommend the heartwarming *Legends & Lattes* by Travis Baldree—such a cozy orc coffee-shop read! ☕ What kind of vibe are you looking for today?";
      } else if (lowercaseMsg.includes("summary") || lowercaseMsg.includes("summarize") || lowercaseMsg.includes("about")) {
        fallbackReply = `Oh, my digital pages got a little misty just now so I couldn't reach my big encyclopedia! 🍂 But if it's a book you are reading or curious about, tell me: what has been your favorite part of it so far?`;
      } else {
        fallbackReply = "I had a tiny flutter of my pages just now (high server demand), but I am right here with you sipping a warm beverage. What book are you currently curled up with?";
      }

      return res.json({ reply: fallbackReply });
    }
  });

  // Books API endpoint
  const COZY_FALLBACK_BOOKS = [
    {
      id: "fb_legends_lattes",
      volumeInfo: {
        title: "Legends & Lattes",
        authors: ["Travis Baldree"],
        pageCount: 318,
        averageRating: 4.5,
        description: "A novel of high fantasy and low stakes. Cozy orc cafe-building.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_psalm_wild_built",
      volumeInfo: {
        title: "A Psalm for the Wild-Built",
        authors: ["Becky Chambers"],
        pageCount: 160,
        averageRating: 4.6,
        description: "A tea monk and a robot find comfort in the wild forest.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_house_cerulean",
      volumeInfo: {
        title: "The House in the Cerulean Sea",
        authors: ["TJ Klune"],
        pageCount: 396,
        averageRating: 4.7,
        description: "A cozy, magical orphanage with lovable children and lovely caregivers.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_before_coffee",
      volumeInfo: {
        title: "Before the Coffee Gets Cold",
        authors: ["Toshikazu Kawaguchi"],
        pageCount: 213,
        averageRating: 4.1,
        description: "In a small back alley in Tokyo, there is a café that offers its customers the chance to travel back in time.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_secret_garden",
      volumeInfo: {
        title: "The Secret Garden",
        authors: ["Frances Hodgson Burnett"],
        pageCount: 331,
        averageRating: 4.5,
        description: "A classic tale of healing and magic in a locked, overgrown garden.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_anne_green_gables",
      volumeInfo: {
        title: "Anne of Green Gables",
        authors: ["L.M. Montgomery"],
        pageCount: 320,
        averageRating: 4.6,
        description: "The heartwarming adventures of Anne Shirley, an imaginative orphan in Prince Edward Island.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_hobbit",
      volumeInfo: {
        title: "The Hobbit",
        authors: ["J.R.R. Tolkien"],
        pageCount: 310,
        averageRating: 4.8,
        description: "Bilbo Baggins' epic journey from his cozy hobbit-hole.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_night_circus",
      volumeInfo: {
        title: "The Night Circus",
        authors: ["Erin Morgenstern"],
        pageCount: 387,
        averageRating: 4.4,
        description: "A mysterious circus that only opens at night, full of wonderful black-and-white tents.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_starless_sea",
      volumeInfo: {
        title: "The Starless Sea",
        authors: ["Erin Morgenstern"],
        pageCount: 498,
        averageRating: 4.3,
        description: "A love letter to stories, featuring a secret subterranean library.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_little_women",
      volumeInfo: {
        title: "Little Women",
        authors: ["Louisa May Alcott"],
        pageCount: 528,
        averageRating: 4.5,
        description: "The classic story of the four March sisters growing up in New England.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=200"
        }
      }
    },
    {
      id: "fb_sweet_bean",
      volumeInfo: {
        title: "Sweet Bean Paste",
        authors: ["Durian Sukegawa"],
        pageCount: 160,
        averageRating: 4.2,
        description: "A moving story of friendship and culinary arts under cherry blossom trees.",
        imageLinks: {
          thumbnail: "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&q=80&w=200"
        }
      }
    }
  ];

  app.get('/api/books', async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let apiKey = process.env.VITE_GOOGLE_BOOKS_API_KEY || process.env.GOOGLE_BOOKS_API_KEY || process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    if (typeof apiKey === 'string') {
      apiKey = apiKey.trim().replace(/^['"]|['"]$/g, '').trim();
    }
    const baseUrl = "https://www.googleapis.com/books/v1/volumes";
    const url = apiKey 
      ? `${baseUrl}?q=${encodeURIComponent(query)}&key=${apiKey}`
      : `${baseUrl}?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Books API Error: ${response.status}`);
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.log("Note: Google Books API call fell back to curated cozy book search:", error.message || error);
      
      const term = query.toLowerCase();
      const matched = COZY_FALLBACK_BOOKS.filter(b => 
        b.volumeInfo.title.toLowerCase().includes(term) || 
        b.volumeInfo.authors.some(a => a.toLowerCase().includes(term))
      );
      
      // If there are specific search matches, return them; otherwise, return a default elegant selection.
      const fallbackItems = matched.length > 0 ? matched : COZY_FALLBACK_BOOKS.slice(0, 6);
      
      return res.json({ items: fallbackItems, fallback: true });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Cozy Cook Nook Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
