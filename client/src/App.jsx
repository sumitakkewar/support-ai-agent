import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ChatPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
