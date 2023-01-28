import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import BlogPost from "./pages/BlogPost/BlogPost";
import NewBlogPost from "./pages/NewBlogPost/NewBlogPost";
import MyBlogs from "./pages/MyBlogs/MyBlogs";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/publishBlog" element={<NewBlogPost />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
