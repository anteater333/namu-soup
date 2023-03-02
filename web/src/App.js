import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TrendingList from "./components/TrendingList";
import MemoList from "./components/MemoList";
import NotFoundPage from "./components/NotFoundPage";

import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="description" content="숲, 나무위키 인기 검색어" />
        <meta
          name="keywords"
          content="namu, wiki, 숲, 나무위키, 인기, 검색어"
        />
        <meta property="og:title" content="숲Soup - 나무위키 인기 검색어" />
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<TrendingList />} />
        <Route path="/m/*" element={<MemoList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
