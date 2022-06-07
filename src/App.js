import { useState } from "react";
import { Header } from "./components/Header";
import SegmentForm from "./components/SegmentForm";
import './Global.css'



function App() {
  return (
    <div className="App">
      <Header heading = "View Audience"/>
      <SegmentForm />
    </div>
  );
}

export default App;
