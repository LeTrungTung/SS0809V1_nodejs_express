import "./App.css";
import HeaderComponent from "./components/header/HeaderComponent";
import BlogPanel from "./components/blogpanel";
import UserPanel from "./components/userpanel";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/users" index element={<UserPanel />} />
        <Route path="/blogs" element={<BlogPanel />} />
      </Routes>
    </div>
  );
}

export default App;
