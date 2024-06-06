import { API_URL } from "../../constants.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
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
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id != id));
    } else {
      console.log("Error occured");
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
            <button onClick={() => deletePost(post.id)}>Delete post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
