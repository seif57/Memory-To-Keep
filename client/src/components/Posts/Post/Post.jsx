import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
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
  const user = useSelector((state) => state.auth.authData);

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const handleLike = () => {
    console.log(post._id);
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <CardStyled>
      <CardMediaStyled image={post.selectedFile} title={post.title} />
      <Overlay>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Overlay>
      <Overlay2>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
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
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={handleDelete}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActionsStyled>
    </CardStyled>
  );
}

export default Post;
