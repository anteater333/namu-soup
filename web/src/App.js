import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/nanum-gothic";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const TrendingList = lazy(() => import("./components/TrendingList"));
const MemoList = lazy(() => import("./components/MemoList"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

// Deprecated. 학습 목적으로 남겨둠
// import TrendingList from "./components/TrendingList";
// import MemoList from "./components/MemoList";
// import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<TrendingList />} />
          <Route path="/m/*" element={<MemoList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
