import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CommentsInnerContainer, CommentsOuterContainer } from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const commentsRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const finalComment = `${user.result.name} : ${comment}`;
    setComments([...comments, finalComment]);

    dispatch(commentPost({ value: finalComment, id: post._id }));

    setComment("");
  };

  useEffect(() => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <div>
      <CommentsOuterContainer>
        <CommentsInnerContainer>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, i) => (
            <Typography
              style={{
                marginTop: "10px",
              }}
              key={i}
              gutterBottom
              variant="subtitle1"
            >
              <strong>{comment.split(": ")[0]}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </CommentsInnerContainer>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write A Comment
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              variant="contained"
              color="primary"
              disabled={comment.length === 0}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </div>
        )}
      </CommentsOuterContainer>
    </div>
  );
};

export default CommentSection;
