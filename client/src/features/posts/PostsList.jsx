import { API_URL } from "../../constants.js";
import { useState, useEffect } from "react";
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
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

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
