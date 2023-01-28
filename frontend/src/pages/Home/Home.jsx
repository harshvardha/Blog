import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogApiRequests } from "../../services/apiRequests";
import NO_AVATAR from "../../assets/noAvatar.png";
import BlogCard from "../../components/BlogCard/BlogCard";
import { UserContext } from "../../context/UserContext";
import "./Home.css";

const Home = () => {
    const { user, isLogin } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const navigateTo = useNavigate();

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigateTo("/login");
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogApiRequests.getAllBlogs();
                if (response.status === 200) {
                    console.log(response);
                    setBlogs(response.data.map(blog => <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none", color: "black" }}><BlogCard key={blog._id} blog={blog} /></Link>));
                }
                else {
                    window.alert("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBlogs();
    }, [])

    return (
        <div className="home">
            <div className="nav">
                <div className="nav--logo">
                    <h1>My Blog</h1>
                </div>
                <div className="nav--navbar">
                    {
                        isLogin && (
                            <>
                                <Link to={"/myBlogs"} className="link">My Blogs</Link>
                                <Link to={"/publishBlog"} className="link">Publish Blog</Link>
                            </>
                        )
                    }
                </div>
                <div className="nav--profile">
                    {
                        isLogin ? (
                            <>
                                <p>{user?.firstName + " " + user?.lastName}</p>
                                <img src={user?.profilePic || NO_AVATAR} alt="dp" className="profilePic" onClick={logout} />
                            </>
                        ) : (
                            <Link to={"/register"} className="customButton">Register</Link>
                        )
                    }
                </div>
            </div>
            <div className="home--blogs">
                {blogs}
            </div>
        </div>
    )
}

export default Home;