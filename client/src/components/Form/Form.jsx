import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  PaperStyled,
  TextFieldStyled,
  SubmitButtonStyled,
  FormContainerStyled,
  FileInputContainerStyled,
} from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { selectByPostId } from "../../reducers/posts";

function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) => selectByPostId(state, currentId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(postData));
    } else {
      dispatch(createPost(postData));
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <PaperStyled elevation={2}>
      <FormContainerStyled
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextFieldStyled
          name="creator"
          label="Creator"
          variant="outlined"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextFieldStyled
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextFieldStyled
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextFieldStyled
          name="tags"
          label="Tags (coma separated)"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <FileInputContainerStyled>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </FileInputContainerStyled>
        <SubmitButtonStyled
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit">
          Submit
        </SubmitButtonStyled>
        <Button
          variant="contained"
          color="error"
          size="small"
          fullWidth
          onClick={clearForm}>
          Clear
        </Button>
      </FormContainerStyled>
    </PaperStyled>
  );
}

export default Form;
