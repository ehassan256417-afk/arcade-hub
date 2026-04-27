# 🎮 Arcade Hub

> A login-gated web arcade featuring Emoji Memory Match with a persistent leaderboard, session-based authentication, and JSON-backed data — built with Vanilla JS, ES Modules, and Bootstrap 5.
>
> **Author:** Hassan ([@ehassan256417-afk](https://github.com/ehassan256417-afk))
>
> **Course:** CIS 376 — Web Development | Spring 2026 | Final Project
>
> ---
>
> ## 🌐 Live Demo
>
> - 🌐 **GitHub Pages:** https://ehassan256417-afk.github.io/arcade-hub/
> - - 🚀 **GCP Production:** http://35.184.199.164
>  
>   - ---
>
> ## 👤 User Story
>
> > **As a** casual gamer who enjoys quick, brain-training challenges,
> > > **I want** a clean, accessible web arcade where I can log in, play memory match games at different difficulty levels, and track my best scores,
> > > > **So that** I can compete with myself and others in a relaxing way without ads, downloads, or complicated sign-ups.
> > > >
> > > > ---
> > > >
> > > > ## 📖 Narrative
> > > >
> > > > ### What it does
> > > > Arcade Hub is a single-page web arcade that combines classic memory-match gameplay with a competitive leaderboard. Players log in with simple credentials, choose their difficulty (Easy / Medium / Hard), and try to match all emoji pairs in the fewest attempts. Best scores are saved per session, and a global leaderboard shows top players with search, filter, and sort capabilities.
> > > >
> > > > ### Why I chose it
> > > > After receiving feedback on my earlier Emoji Memory Match project that "a leaderboard would make it more engaging," I decided to extend it into a full arcade hub. This let me reuse my strongest existing code while adding everything the final rubric requires: login/logout, fetch + JSON, session persistence, and form data packaging — all wrapped in a polished UI.
> > > >
> > > > ### What I improved
> > > > Compared to the original emoji-memory-match:
> > > > - ✅ Migrated from localStorage to sessionStorage (rubric requirement)
> > > > - - ✅ Added a full authentication system with credential hints in the console
> > > >   - - ✅ Built a leaderboard with fetch() loading from JSON files
> > > >     - - ✅ Added search, filter, and sort capabilities
> > > >       - - ✅ Form data is packaged as JSON and printed to the console
> > > >         - - ✅ Removed all inline styles in favor of CSS classes
> > > >           - - ✅ Added Normalize.css and Bootstrap Icons (previously missing)
> > > >             - - ✅ Used @import to organize stylesheets
> > > >               - - ✅ Refactored to clean ES Modules with explicit imports/exports
> > > >                 - - ✅ Added bilingual code comments (English + Arabic) for clarity
> > > >                  
> > > >                   - ### Brief development story
> > > >                   - This was a 10-day sprint built in tight, focused sessions. Day 1 was repo scaffolding and folder structure. Days 2–5 built the UI, authentication, game engine, and leaderboard. Day 6 was the biggest learning curve — deploying to a Google Cloud VM with nginx as a reverse proxy. Days 7–10 covered validation, documentation, and polish. Each day was committed to GitHub Pages with progressive features, and the GCP production deployment was kept in sync via git pull.
> > > >                  
> > > >                   - ---
> > > >
> > > > ## 🛠️ Tech Stack
> > > >
> > > > | Layer | Technology |
> > > > |-------|------------|
> > > > | Markup | Semantic HTML5 + ARIA |
> > > > | Styling | Bootstrap 5.3 + Normalize.css + Bootstrap Icons + Custom CSS |
> > > > | Font | Google Fonts: Nunito |
> > > > | Scripting | Vanilla JavaScript (ES Modules) |
> > > > | Storage | sessionStorage (Web Storage API) |
> > > > | Data | fetch API + local JSON files |
> > > > | Deployment | GitHub Pages + GCP VM (nginx reverse proxy) |
> > > > | Validation | Nu HTML Checker + WAVE Accessibility |
> > > >
> > > > ---
> > > >
> > > > ## 📚 Attribution
> > > >
> > > > This project was built with help from the following resources:
> > > >
> > > > ### Libraries & Frameworks
> > > > - [Bootstrap 5.3](https://getbootstrap.com/) — UI components and grid system
> > > > - - [Bootstrap Icons](https://icons.getbootstrap.com/) — Iconography
> > > >   - - [Normalize.css](https://necolas.github.io/normalize.css/) — Cross-browser consistency
> > > >     - - [Google Fonts: Nunito](https://fonts.google.com/specimen/Nunito) — Typography
> > > >      
> > > >       - ### Tutorials & References
> > > >       - - [MDN Web Docs](https://developer.mozilla.org/) — JavaScript, CSS, and HTML reference
> > > >         - - [Fisher-Yates Shuffle (Wikipedia)](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) — Shuffling algorithm
> > > >           - - [Course materials by Prof. Barry Cumbie](https://github.com/barrycumbie) — GCP deployment walkthrough
> > > >             - - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Accessibility verification
> > > >              
> > > >               - ### AI Assistance
> > > >               - - Used Claude (Anthropic) for code review, architecture suggestions, and documentation help. All final code was reviewed, tested, and committed manually.
> > > >                
> > > >                 - ### Source Code Reuse
> > > >                 - - Extended my own emoji-memory-match](https://github.com/ehassan256417-afk/emoji-memory-match) project (Fisher-Yates shuffle, card flip logic)
> > > >                   - - Authentication patterns from my own CIS-376-MID-TERM-PROJECT](https://github.com/ehassan256417-afk/CIS-376-MID-TERM-PROJECT)
> > > >                    
> > > >                     - ---
> > > >
> > > > ## 📁 Project Structure
> > > >
.
├── LICENSE
├── README.md
├── assets
│   ├── data
│   └── images
├── docs
├── index.html
├── pages
│   ├── game.html
│   ├── leaderboard.html
│   └── login.html
├── scripts
│   ├── config
│   ├── controllers
│   └── modules
└── styles
    ├── components.css
    ├── layout.css
    └── main.css
> > > >
> > > > The project follows a logical separation:
> > > > - assets/ — Static data (JSON) and images
> > > > - - pages/ — Sub-pages (login, game, leaderboard)
> > > >   - - scripts/ — All JavaScript organized into config/controllers/modules
> > > >     - - styles/ — CSS files using @import to chain stylesheets
> > > >       - - docs/ — Documentation and reference files
> > > >        
> > > >         - ---
> > > >
> > > > ## 💡 Code Highlight
> > > >
> > > > The cleanest example of DOM manipulation tied to a clear data flow is the leaderboard rendering pipeline. Here's the core search filter from scripts/modules/leaderboard.js:
> > > >
> > > > ```js
> > > > /**
> > > >  * Searches entries by player name (case-insensitive)
> > > >  * يبحث عن اللاعب بالاسم
> > > >  */
> > > > export function searchByPlayer(entries, searchTerm) {
> > > >   // Convert search term to lowercase for case-insensitive matching
> > > >   const term = searchTerm.toLowerCase().trim();
> > > >
> > > >   // If empty search, return all entries
> > > >   if (!term) return entries;
> > > >
> > > >   // Filter entries where player name contains the search term
> > > >   return entries.filter(entry =>
> > > >     entry.player.toLowerCase().includes(term)
> > > >   );
> > > > }
> > > > ```
> > > >
> > > > ### What it does
> > > > This pure function takes an array of leaderboard entries and a search term, then returns a filtered array containing only entries whose player name includes the search term (case-insensitive).
> > > >
> > > > ### Why it matters
> > > > The function is **pure** (no side effects, same input always gives same output), which makes it easy to test, compose, and chain with other filters. It powers the real-time search experience in the leaderboard — every keystroke triggers this function and updates the DOM table without page reloads.
> > > >
> > > > ### How it interacts with the DOM
> > > > The data flow is: **DOM → script → DOM**.
> > > > 1. User types in <input id="searchInput"> — the DOM emits an input event
> > > > 2. 2. leaderboard-controller.js listens via addEventListener('input', ...) and reads searchInput.value
> > > >    3. 3. The controller calls searchByPlayer(allEntries, value) — pure data transformation
> > > >       4. 4. The result passes through filterByDifficulty() and applySorting() (also pure functions)
> > > >          5. 5. Finally renderLeaderboard() clears the <tbody id="leaderboardBody"> and appends new <tr> rows for each match
> > > >             6. 6. The DOM updates instantly — no reload, no flicker
> > > >               
> > > >                7. This separation of **data transformation** (pure functions) from **DOM manipulation** (single render function) makes the code testable, predictable, and easy to extend with new filters in the future.
> > > >               
> > > >                8. ---
> > > >               
> > > >                9. ## ✅ Validation
> > > >
> > > > All pages have been validated for HTML correctness and accessibility:
> > > >
> > > > ### HTML Validation (Nu Validator) — ✅ Clean
> > > > - [Home](https://validator.w3.org/nu/?doc=https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2F)
> > > > - - [Login](https://validator.w3.org/nu/?doc=https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Flogin.html)
> > > >   - - [Game](https://validator.w3.org/nu/?doc=https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Fgame.html)
> > > >     - - [Leaderboard](https://validator.w3.org/nu/?doc=https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Fleaderboard.html)
> > > >      
> > > >       - ### Accessibility (WAVE) — ✅ 0 Errors
> > > >       - - [Home](https://wave.webaim.org/report#/https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2F)
> > > >         - - [Login](https://wave.webaim.org/report#/https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Flogin.html)
> > > >           - - [Game](https://wave.webaim.org/report#/https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Fgame.html)
> > > >             - - [Leaderboard](https://wave.webaim.org/report#/https%3A%2F%2Fehassan256417-afk.github.io%2Farcade-hub%2Fpages%2Fleaderboard.html)
> > > >              
> > > >               - ---
> > > >
> > > > ## 🚀 Future Improvements
> > > >
> > > > Planned enhancements are tracked in the **Sprint 99** milestone:
> > > >
> > > > 👉 **[Sprint 99 — Post-Launch Improvements](https://github.com/ehassan256417-afk/arcade-hub/milestone/1)**
> > > >
> > > > This milestone includes:
> > > > - 🎮 Sound effects with accessibility mute toggle
> > > > - - 🏆 Cross-session leaderboard with backend API
> > > >   - - 🌗 Light/dark theme toggle
> > > >     - - 🐛 Progress bar flicker bug fix
> > > >       - - 📹 Video walkthrough in README
> > > >         - - ♿ Re-validation after new features
> > > >          
> > > >           - ---
> > > >
> > > > ## 🔐 Demo Credentials
> > > >
> > > > To explore the app:
> > > > 1. Visit the [Login page](https://ehassan256417-afk.github.io/arcade-hub/pages/login.html)
> > > > 2. 2. Open the browser console (F12) — credential hint is logged there
> > > >    3. 3. Username: hassan or player1
> > > >       4. 4. Password: lasagna
> > > >         
> > > >          5. ---
> > > >         
> > > >          6. ## 📜 License
> > > >         
> > > >          7. MIT — see [LICENSE](LICENSE) file.
> > > >
> > > > ---
> > > >
> > > > *Built with ☕ and 🎮 for CIS 376 Final Project, Spring 2026*
> > > > 
