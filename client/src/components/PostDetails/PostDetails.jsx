import { Paper, Typography, Divider, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, ImageSection, LoadingPaper, Media, Section } from "./styles";
import moment from "moment";
import { selectByPostId } from "../../reducers/posts";
import { getPostById } from "../../actions/posts";

function PostDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const post = useSelector((state) => selectByPostId(state, id));
  const isLoading = useSelector((state) => state.posts.isLoading);
  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  if (!post) return null;

  if (isLoading) {
    return (
      <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper>
    );
  }
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Card>
        <Section>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </Section>
        <ImageSection>
          <Media
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </ImageSection>
      </Card>
    </Paper>
  );
}

export default PostDetails;
