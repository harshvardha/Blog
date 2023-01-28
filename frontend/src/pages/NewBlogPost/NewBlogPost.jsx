import { useState, useContext } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import NO_AVATAR from "../../assets/noAvatar.png";
import Button from "../../components/Button/Button";
import { blogApiRequests } from "../../services/apiRequests";
import { UserContext } from "../../context/UserContext";
import storage from "../../firebase";
import "./NewBlogPost.css";

const NewBlogPost = () => {
    const { user, isLogin } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState();
    const navigateTo = useNavigate();

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigateTo("/login");
    }

    const publishBlog = (event) => {
        event.preventDefault();
        const fileName = new Date().getTime() + file;
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                const blogDetails = {
                    title,
                    content,
                    thumbnail: url
                };
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                blogApiRequests.create(blogDetails, accessToken).then(response => {
                    console.log("blog uploaded: ", response);
                    if (response.status === 201) {
                        window.alert("Blog Published.");
                        navigateTo("/myBlogs");
                    }
                    else {
                        window.alert("Blog upload failed.");
                    }
                });
            });
        });
    }

    return (
        <div className="newBlogPost">
            <div className="nav">
                <div className="nav--logo">
                    <h1>My Blog</h1>
                </div>
                <div className="nav--navbar">
                    {
                        isLogin && (
                            <>
                                <Link to={"/"} className="link">Home</Link>
                                <Link to={"/myBlogs"} className="link">My Blogs</Link>
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
            <div className="newBlogForm">
                <div className="form--header">
                    <h1>Publish New Blog</h1>
                </div>
                <form onSubmit={publishBlog}>
                    <div className="newBlog--form">
                        <div className="newBlog--title">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>
                        <div className="newBlog--content">
                            <label htmlFor="content">Content</label>
                            <textarea
                                name="content"
                                id="content"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                required
                                cols="100"
                                rows="20"
                            >
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="thumbnail">Thumbnail</label>
                            <input
                                type="file"
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                        </div>
                        <Button buttonText={"Publish"} buttontType="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewBlogPost;