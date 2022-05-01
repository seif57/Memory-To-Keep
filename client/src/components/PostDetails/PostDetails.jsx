import { Paper, Typography, Divider, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  ImageSection,
  LoadingPaper,
  Media,
  RecommendedPosts,
  Section,
} from "./styles";
import moment from "moment";
import { selectAllPosts, selectByPostId } from "../../reducers/posts";
import { getPostById } from "../../actions/posts";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { id } = useParams();
  const post = useSelector((state) => selectByPostId(state, id));
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  if (!post) return null;
  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
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
            component="h2"
          >
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
          <CommentSection post={post} />
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
      {recommendedPosts.length > 0 && (
        <Section>
          <Typography variant="h5">Recommended Posts</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <RecommendedPosts>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt="other-post" width="200px" />
                </div>
              )
            )}
          </RecommendedPosts>
        </Section>
      )}
    </Paper>
  );
}

export default PostDetails;
