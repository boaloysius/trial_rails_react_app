import { useState, useEffect } from "react";
import { fetchAllPost, searchPosts } from "../services/postService";

function usePostsData(searchTerm) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm);
        } else {
          data = await fetchAllPost();
        }
        setPosts(data);
      } catch (e) {
        setError(e);
        console.log("Failed to fetch posts: ", e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [searchTerm]);

  return { posts, loading, error };
}

export default usePostsData;
