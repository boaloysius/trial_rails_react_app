import { API_URL } from "../../constants.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostEditForm = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occured");
        console.log("An error occured, ", e);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: post.title, body: post.body }),
    });

    if (response.ok) {
      const { id } = await response.json();
      navigate(`/posts/${id}`);
    } else {
      console.log("Error occured");
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
