import React from "react";
import { Typography, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import {
  PaperStyled,
  TextFieldStyled,
  SubmitButtonStyled,
  FormContainerStyled,
  FileInputContainerStyled,
} from "./formStyles";
import { createPost } from "../../actions/posts";
function Form() {
  const [postData, setPostData] = React.useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };
  const clearForm = () => {
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
        onSubmit={handleSubmit}
      >
        <Typography variant="h6"> Creating a Memory </Typography>
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
          type="submit"
        >
          Submit
        </SubmitButtonStyled>
        <Button
          variant="contained"
          color="error"
          size="small"
          fullWidth
          onClick={clearForm}
        >
          Clear
        </Button>
      </FormContainerStyled>
    </PaperStyled>
  );
}

export default Form;
