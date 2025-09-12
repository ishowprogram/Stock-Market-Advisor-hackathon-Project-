<h1 align="center">📊🤖 AI Stock Advisor with Sensitive Info Logger</h1>

<p align="center">
  <b>Real-time stock insights 💹 + AI-powered Buy/Hold/Sell advice 🧠 + Sensitive info logging 🔒 </b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/OpenAI-GPT-blue?logo=openai" />
  <img src="https://img.shields.io/badge/n8n-Automation-green?logo=n8n" />
  <img src="https://img.shields.io/badge/Google-Sheets-brightgreen?logo=googlesheets" />
  <img src="https://img.shields.io/badge/Stock-API-orange" />
</p>

---

## ✨ Features  
- ⚡ **AI Chatbot** – Ask about any stock, get instant analysis  
- 📈 **Stock Data Integration** – Live data via Alpha Vantage / Yahoo Finance  
- 🧠 **OpenAI-powered Advice** – Clear Buy/Hold/Sell suggestions  
- 🔍 **Sensitive Info Detection** – Detects emails 📧, phones 📱, passwords 🔑, handles @  
- 📑 **Google Sheets Logging** – Securely logs sensitive inputs  
- 🌐 **Webhook Integration** – Connect easily with your website chat widget  

---

## 🛠️ Tech Stack  
<table>
<tr>
<td>🌐 Frontend</td>
<td>HTML, CSS, JavaScript</td>
</tr>
<tr>
<td>⚡ Automation</td>
<td>n8n</td>
</tr>
<tr>
<td>🧠 AI Engine</td>
<td>OpenAI GPT</td>
</tr>
<tr>
<td>📊 Database</td>
<td>Google Sheets</td>
</tr>
<tr>
<td>💹 Stock Data</td>
<td>Alpha Vantage / Yahoo Finance</td>
</tr>
</table>

---

## 🚀 How It Works  
1️⃣ User asks a question in chat 💬  
2️⃣ n8n Webhook captures it 🌐  
3️⃣ Sensitive info detected → Stored in Google Sheets 📑  
4️⃣ Stock data fetched via API 📈  
5️⃣ Query + Stock Data → Processed by OpenAI 🧠  
6️⃣ Reply (Buy/Hold/Sell) → Sent back to chat UI ⚡  

---

## 📷 Screenshots  
<p align="center">
  <img width="1913" height="871" alt="image" src="https://github.com/user-attachments/assets/0db6cfdb-6041-496f-8643-fa604d3205e2" />
<img width="1184" height="558" alt="image" src="https://github.com/user-attachments/assets/9e0ecd85-0b0e-47a5-a825-5c951c2b0e2d" />

  <br/>
</p>

---

## 🔧 Setup Instructions 
```bash
# Clone the repo
git clone https://github.com/your-username/ai-stock-advisor.git
cd ai-stock-advisor

# Setup n8n and import workflow JSON
# Add your API keys (OpenAI, Alpha Vantage, Google Sheets)
