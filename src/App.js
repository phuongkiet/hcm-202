import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Overview from "./component/Overview";
import Quiz from "./component/Quiz";
import Content from "./component/Content"; 
import ChatBox from "./component/ChatBox";
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow w-full text-center mb-10">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/content" element={<Content />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
