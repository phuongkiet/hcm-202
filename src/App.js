import React from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import './App.css';
import Overview from "./component/Overview";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full text-center mb-10">
        <Overview/>
      </main>
      <Footer />
    </div>
  );
}

export default App;

