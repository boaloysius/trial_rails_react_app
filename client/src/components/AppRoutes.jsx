import React from "react";
import { Route, Routes } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostsDetails from "../features/posts/PostsDetails";
import NewPostForm from "../features/posts/NewPostForm";
import PostEditForm from "../features/posts/PostEditForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />}></Route>
      <Route path="/posts/:id" element={<PostsDetails />}></Route>
      <Route path="/posts/:id/edit" element={<PostEditForm />}></Route>
      <Route path="/new" element={<NewPostForm />}></Route>
    </Routes>
  );
};

export default AppRoutes;
