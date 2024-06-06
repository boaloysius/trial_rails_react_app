import { API_URL } from "../../constants.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostsDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const deletePost = async () => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      navigate("/");
    } else {
      console.log("Error occured");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div key={post.id} className="post-container">
        <h2>{post.title}</h2>
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
