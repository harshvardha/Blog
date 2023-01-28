import BLOG from "../../assets/blog.png";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
    return (
        <div className="blogCard">
            <img src={blog?.thumbnail || BLOG} alt="thumbnail" className="thumbnail" />
            <p>{blog?.title.length > 30 ? blog?.title.substr(0, 30) + "..." : blog?.title}</p>
        </div>
    )
}

export default BlogCard;