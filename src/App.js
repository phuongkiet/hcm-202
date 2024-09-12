import React from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import './App.css';
import Overview from "./component/Overview";
import Quiz from "./component/Quiz";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full text-center mb-10">
        <Overview/>
        <div className="mt-10">
          <Quiz/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

