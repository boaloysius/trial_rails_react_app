import { API_URL } from "../../constants.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostsDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div key={post.id} className="post-container">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to="/">Back to posts</Link>
      </div>
    </div>
  );
};

export default PostsDetails;
