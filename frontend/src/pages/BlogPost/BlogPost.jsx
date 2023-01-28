import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NO_AVATAR from "../../assets/noAvatar.png";
import { blogApiRequests, userApiRequests } from "../../services/apiRequests";
import { UserContext } from "../../context/UserContext";
import "./BlogPost.css";

const BlogPost = () => {
    const { user, isLogin } = useContext(UserContext);
    const [blog, setBlog] = useState({});
    const [author, setAuthor] = useState({});
    const params = useParams();
    const navigateTo = useNavigate();

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigateTo("/login");
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogId = params.blogId;
                const response = await blogApiRequests.getBlogById(blogId);
                if (response.status === 200) {
                    console.log(response);
                    setBlog(response.data);
                    const author = await userApiRequests.getUserById(response.data.userId);
                    if (author.status === 200) {
                        setAuthor(author.data);
                    }
                }
                else {
                    window.alert("Somethin went wrong.");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBlog();
    }, [])

    return (
        <div className="blogPost">
            <div className="nav">
                <div className="nav--logo">
                    <h1>My Blog</h1>
                </div>
                <div className="nav--navbar">
                    <Link to={"/"} className="link">Home</Link>
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
            <div className="blog">
                <h1>{blog?.title}</h1>
                <img src={blog?.thumbnail} alt="" className="blogImage" />
                <p style={{ padding: "10px" }}>{blog?.content}</p>
                <p>Published On: {blog?.createdAt?.split("T")[0]}</p>
                <div className="blog--author">
                    <img src={author?.profilePic || NO_AVATAR} alt="" className="author--pic" />
                    <p>{author?.firstName + " " + author?.lastName}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;