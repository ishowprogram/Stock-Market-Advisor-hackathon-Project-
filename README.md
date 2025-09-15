<h1 align="center">📊🤖 AI Stock Market Advisor</h1>

<p align="center">
  <b>Real-time Indian stock insights 💹 + AI-powered analysis 🧠 — built with React + TypeScript + Vite</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/OpenAI-API-412991?logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Alpha%20Vantage-API-orange" alt="Alpha Vantage" />
</p>

<p align="center">
  <i>Note: This project now runs purely via APIs (OpenAI + Alpha Vantage). No n8n or Google Sheets required.</i>
</p>

<hr/>

<h2>✨ Features</h2>
<ul>
  <li>⚡ <b>AI Chatbot</b> — Ask about NSE/BSE stocks, sectors, trends</li>
  <li>📈 <b>Real-time Stock Data</b> — Live quotes and recent historical chart via Alpha Vantage</li>
  <li>🧠 <b>OpenAI-powered Insights</b> — Clear, concise, and context-aware responses</li>
  <li>🎛️ <b>Beautiful UI</b> — Modern Tailwind UI, charts, and a responsive layout</li>
  <li>🧭 <b>Pages</b> — Dashboard, Chatbot, About, and Not Found</li>
</ul>

<hr/>

<h2>🛠️ Tech Stack</h2>
<table>
  <tr>
    <td>🌐 Frontend</td>
    <td>React 18, TypeScript, Vite, React Router</td>
  </tr>
  <tr>
    <td>🎨 Styling</td>
    <td>Tailwind CSS</td>
  </tr>
  <tr>
    <td>📊 Charts</td>
    <td>Recharts</td>
  </tr>
  <tr>
    <td>🧠 AI Engine</td>
    <td>OpenAI Chat Completions API</td>
  </tr>
  <tr>
    <td>💹 Market Data</td>
    <td>Alpha Vantage (GLOBAL_QUOTE, TIME_SERIES_DAILY)</td>
  </tr>
</table>

<hr/>

<h2>📦 Installation</h2>

```bash
# 1) Clone
git clone <your-repo-url>
cd <your-project-folder>

# 2) Install dependencies
npm install

# 3) Configure environment
cp .env.example .env
# Open .env and fill in your keys

# 4) Run the app (dev)
npm run dev

# 5) Build for production
npm run build

# 6) Preview production build
npm run preview
```

<hr/>

<h2>🔐 Environment Variables</h2>

Create a <code>.env</code> file (same directory as <code>package.json</code>) using <code>.env.example</code> as a template:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key

VITE_APP_VERSION=1.0.0
VITE_ENV=development
VITE_DEBUG=true
```

<b>Important:</b> In a client-only app, variables prefixed with <code>VITE_</code> are exposed to the browser. For production, consider adding a lightweight serverless proxy to keep secrets secure. See <a href="#%F0%9F%94%8E-security--production-notes">Security Notes</a>.

<hr/>

<h2>🚦 Scripts</h2>

```bash
npm run dev       # Start Vite dev server
npm run build     # Build the production bundle
npm run preview   # Preview the production build
npm run lint      # Lint the project
```

<hr/>

<h2>🧭 Project Structure</h2>

```text
.
├─ src/
│  ├─ components/
│  │  ├─ AISuggestionCard.tsx
│  │  ├─ ChatDock.tsx
│  │  ├─ ErrorBoundary.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ StockCard.tsx
│  │  └─ StockChart.tsx
│  ├─ pages/
│  │  ├─ About.tsx
│  │  ├─ Chatbot.tsx
│  │  ├─ Dashboard.tsx
│  │  └─ NotFound.tsx
│  ├─ contexts/
│  │  └─ ThemeContext.tsx
│  ├─ utils/
│  │  └─ api.ts          # OpenAI + Alpha Vantage integrations
│  ├─ config/
│  │  └─ n8n.ts          # Legacy (unused) — can be removed
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
└─ .env.example
```

<hr/>

<h2>🧱 Architecture Overview</h2>

<ul>
  <li><b>Chatbot</b> (<code>src/pages/Chatbot.tsx</code>) — UI for messaging; calls <code>askBot()</code> from <code>src/utils/api.ts</code> which hits OpenAI.</li>
  <li><b>Stock Search</b> (<code>src/components/SearchBar.tsx</code>) — On submit, calls <code>getStockData()</code> which pulls Alpha Vantage <i>GLOBAL_QUOTE</i> and <i>TIME_SERIES_DAILY</i>.</li>
  <li><b>Dashboard</b> (<code>src/pages/Dashboard.tsx</code>) — Displays results with charts and metrics (Recharts).</li>
  <li><b>Styling</b> — Tailwind for components; Lucide icons for visuals.</li>
</ul>

<hr/>

<h2>🧪 How It Works (Data Flow)</h2>

<ol>
  <li>User searches a ticker (e.g., <code>RELIANCE</code>).</li>
  <li><code>getStockData()</code> normalizes it to NSE (e.g., <code>RELIANCE.NS</code>), fetches quote and daily series.</li>
  <li>Builds chart data and a lightweight momentum-based recommendation.</li>
  <li>User chats with the bot; <code>askBot()</code> calls the OpenAI Chat Completions API.</li>
  <li>Responses render in the UI with typing indicators and graceful error handling.</li>
  <li>Rate limit or network issues are handled with timeouts and fallbacks.</li>
  
</ol>

<hr/>

<h2>📷 Screenshots</h2>
<p align="center">
  <!-- Replace with your own screenshots -->
  <img width="800" alt="Dashboard" src="https://github.com/user-attachments/assets/0db6cfdb-6041-496f-8643-fa604d3205e2" />
  <br/>
</p>

<hr/>

<h2>🧰 Troubleshooting</h2>
<ul>
  <li><b>Empty or incorrect stock data</b> — Alpha Vantage free tier is rate-limited. Try again after a minute. Ensure you used a valid NSE symbol; the app auto-appends <code>.NS</code> if missing.</li>
  <li><b>OpenAI errors</b> — Check your <code>VITE_OPENAI_API_KEY</code>. If running in production, use a serverless proxy to avoid exposing keys.</li>
  <li><b>Build errors</b> — Run <code>npm run lint</code> and ensure Node 18+.</li>
</ul>

<hr/>

<h2 id="🔎-security--production-notes">🔎 Security & Production Notes</h2>
<ul>
  <li><b>Do NOT expose real API keys</b> in a public client. For production, proxy API calls via a serverless function (Netlify, Vercel, Cloudflare) and keep secrets server-side.</li>
  <li><b>Alpha Vantage</b> free tier has strict rate limits. Consider caching or a higher tier for production workloads.</li>
  <li><b>Legacy files</b> — <code>src/config/n8n.ts</code> is unused and can be safely removed.</li>
</ul>

<hr/>

<h2>🤝 Contributing</h2>
<ul>
  <li>Fork the repo, create a feature branch, and open a PR.</li>
  <li>Run <code>npm run lint</code> and ensure a clean build before submitting.</li>
</ul>
