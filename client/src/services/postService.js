import { POSTS_API_URL, SEARCH_API_URL } from "../constants";

async function fetchAllPost() {
  const response = await fetch(POSTS_API_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

async function fetchPost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

async function createPost(postData) {
  const response = await fetch(POSTS_API_URL, {
    method: "POST",
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

async function updatePost(id, postData) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "PUT",
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

async function deletePost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status == 204) {
    return null;
  }

  return response.json();
}

async function searchPosts(query) {
  const response = await fetch(`${SEARCH_API_URL}/posts/?q=${query}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

export {
  fetchAllPost,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
};
