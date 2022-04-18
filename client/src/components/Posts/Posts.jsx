import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../reducers/posts";
import Post from "./Post/Post";
import { GridStyled } from "./styles";
import { Grid, CircularProgress } from "@mui/material";

function Posts({ setCurrentId }) {
  const posts = useSelector(selectAllPosts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <GridStyled container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post?._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </GridStyled>
  );
}

export default Posts;
