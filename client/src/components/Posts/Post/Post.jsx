import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardActionsStyled,
  CardMediaStyled,
  CardStyled,
  Details,
  Overlay,
  Title,
  Overlay2,
  ButtonBaseStyled,
} from "./styles";
import { Button, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLiked = post.likes.find((like) => like === userId);

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
    if (hasLiked) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
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
    <CardStyled raised elevation={6}>
      <ButtonBaseStyled onClick={openPost}>
        <CardMediaStyled image={post.selectedFile} title={post.title} />
        <Overlay>
          <Typography variant="h5">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Overlay>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Overlay2>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <ModeEditIcon />
            </Button>
          </Overlay2>
        )}
        <Details>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Details>
        <Title variant="h5" gutterBottom>
          {post.title}
        </Title>
        <CardContent>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            gutterBottom
            style={{ display: "flex" }}
          >
            {post.message.split(" ").splice(0, 12).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBaseStyled>

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
          <Button size="small" color="error" onClick={handleDelete}>
            <DeleteIcon fontSize="small" color="error" /> &nbsp; Delete
          </Button>
        )}
      </CardActionsStyled>
    </CardStyled>
  );
}

export default Post;
