import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CardActionsStyled,
  CardMediaStyled,
  CardStyled,
  Details,
  Overlay,
  Title,
  Overlay2,
} from "./postStyles";
import { Button, CardContent, Typography } from "@mui/material";
import moment from "moment";
function Post({ post }) {
  console.log(post);
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
        <Button style={{ color: "white" }} size="small" onClick={() => {}}>
          <MoreHorizIcon />
        </Button>
      </Overlay2>
      <Details>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Details>
      <CardContent>
        <Title variant="h5" gutterBottom>
          {post.message}
        </Title>
      </CardContent>
      <CardActionsStyled>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="error" onClick={() => {}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActionsStyled>
    </CardStyled>
  );
}

export default Post;
