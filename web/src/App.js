import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Header from "./components/Header";
import TrendingList from "./components/TrendingList";
import MemoList from "./components/MemoList";
import NotFoundPage from "./components/NotFoundPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TrendingList />} />
        <Route path="/m/:keyword" element={<MemoList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
