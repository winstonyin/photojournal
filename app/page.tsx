'use client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Posts from "./pages/posts";
import Galleries from "./pages/galleries";

export default function Main() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4 ml-20">
        <Routes>
          <Route path="/galleries" element={<Galleries />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
