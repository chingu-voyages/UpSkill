import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-grotto h-screen flex flex-col justify-center items-center ">
        <h1 className="font-title text-ivory">Hello World</h1>
        <p className="font-body text-baby">Ready to go!</p>
      </div>
    </Router>
  );
}

export default App;
