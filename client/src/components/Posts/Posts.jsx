import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../reducers/posts";
import Post from "./Post/Post";
import { GridStyled } from "./postsCustomStyles";
import { Grid, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

function Posts() {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <GridStyled container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} />
        </Grid>
      ))}
    </GridStyled>
  );
}

export default Posts;
