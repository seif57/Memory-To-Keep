import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  CardActionsStyled,
  CardMediaStyled,
  CardStyled,
  Details,
  Overlay,
  Title,
  Overlay2,
} from "./styles";
import { Button, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  return (
    <CardStyled>
      <CardMediaStyled image={post.selectedFile} title={post.title} />
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Overlay>
      <Overlay2>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon />
        </Button>
      </Overlay2>
      <Details>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Details>
      <Title variant="h5" gutterBottom>
        {post.title}
      </Title>
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActionsStyled>
        <Button size="small" color="primary" onClick={handleLike}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActionsStyled>
    </CardStyled>
  );
}

export default Post;
