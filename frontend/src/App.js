import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LetsDo from "./pages/LetsDo";
import LetsEat from "./pages/LetsEat";
import BoardDetail from "./pages/BoardDetail";
import Write from "./components/Write";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LetsEat" element={<LetsEat />} />
          <Route path="/LetsDo" element={<LetsDo />} />
          <Route path="/board/:idx" element={<BoardDetail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:idx" element={<Write />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
