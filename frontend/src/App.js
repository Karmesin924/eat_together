import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LetsDo from "./pages/LetsDo";
import LetsEat from "./pages/LetsEat";
import BoardDetail from "./pages/BoardDetail";
import Write from "./components/Write";
import FilterDetail from "./pages/FilterDetail";
import { useState } from "react";
import MyContext from "./components/MyContext";

function App() {
  const [people, setPeople] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [menu, setMenu] = useState([]);
  const [conversation, setConversation] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleSaveFilters = (filters) => {
    setPeople(filters.people);
    setGender(filters.gender);
    setAge(filters.age);
    setMenu(filters.menu);
    setConversation(filters.conversation);
  };

  const handleLocation = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  return (
    <MyContext.Provider
      value={{
        handleSaveFilters,
        people,
        gender,
        age,
        menu,
        conversation,
        latitude,
        longitude,
        handleLocation,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LetsEat" element={<LetsEat />} />
            <Route path="/LetsDo" element={<LetsDo />} />
            <Route path="/board/:idx" element={<LetsDo />} />
            <Route path="/posts/:idx" element={<BoardDetail />} />
            <Route path="/write" element={<Write />} />
            <Route path="/write/:idx" element={<Write />} />
            <Route path="/FilterDetail" element={<FilterDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
