import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatDock from './components/ChatDock';
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Chatbot = React.lazy(() => import('./pages/Chatbot'));
const About = React.lazy(() => import('./pages/About'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-black transition-colors duration-200">
          <Navbar />
          <div className="flex">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <main className="flex-1 p-6 overflow-auto">
              <Suspense fallback={<div className="text-white">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <ChatDock />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;