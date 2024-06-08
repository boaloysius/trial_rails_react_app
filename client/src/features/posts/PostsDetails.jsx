import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchPost,
  deletePost as deletePostItem,
} from "../../services/postService.js";
import "../../assets/global.css";

const PostsDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchPost(id);
        setPost(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [id]);

  const deletePost = async () => {
    try {
      await deletePostItem(id);
      navigate("/");
    } catch (e) {
      console.error("Failed to delete the post", e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div key={post.id} className="post-container">
        <h2>{post.title}</h2>
        {post.image_url && (
          <img src={post.image_url} alt={post.title} className="post-image" />
        )}
        <p>{post.body}</p>
        <Link to={`/posts/${id}/edit`}>Edit posts</Link>
        {" | "}
        <Link to="/">Back to posts</Link>
        {" | "}
        <button onClick={deletePost}>Delete post</button>
      </div>
    </div>
  );
};

export default PostsDetails;
