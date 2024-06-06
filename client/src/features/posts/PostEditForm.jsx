import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, fetchPost } from "../../services/postService.js";

const PostEditForm = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const data = await fetchPost(id);
        setPost(data);
      } catch (e) {
        setError(e);
        console.error("Couldn't fetch the post: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost(id, post);
      navigate(`/posts/${id}`);
    } catch (e) {
      console.error("Couldn't update the post: ", e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostEditForm;
