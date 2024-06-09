import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost as deletePostItem } from "../../services/postService.js";
import "../../assets/global.css";

import SearchBar from "./SearchBar.jsx";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useURLSearchParam("");

  const {
    posts: fetchedPosts,
    loading,
    error,
  } = usePostsData(debounceSearchTerm);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  const deletePost = async (id) => {
    try {
      await deletePostItem(id);
      setPosts(posts.filter((post) => post.id != id));
    } catch (e) {
      console.error("Failed to delete the post", e);
    }
  };

  const handleImmediateChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebounceSearchTerm(searchValue);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateChange}
      />
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="post-image" />
          )}
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
