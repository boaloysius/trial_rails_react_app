import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

const PostCreateForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[body]", body);
    formData.append("post[image]", image);

    try {
      const { id } = await createPost(formData);
      navigate(`/posts/${id}`);
    } catch (e) {
      console.error("Couldn't create the post: ", e);
    }
  };

  return (
    <div>
      Create a new post
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageInput">Image:</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreateForm;
