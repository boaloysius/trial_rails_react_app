import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllPost,
  deletePost as deletePostItem,
} from "../../services/postService.js";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchAllPost();
        setPosts(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostItem(id);
      setPosts(posts.filter((post) => post.id != id));
    } catch (e) {
      console.error("Failed to delete the post", e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit post</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
