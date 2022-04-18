import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import { Grow, Container, Grid, Paper, TextField } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { GridStyled, AppBarStyled } from "./styles";
import BasicPagination from "../Pagination";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const params = useParams();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("search") || "";
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const handleEnterkey = (e) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const searchPosts = () => {
    console.log(search);
    if (search.trim()) {
      dispatch(getPostsBySearch(search));
    } else {
      dispatch(getPosts());
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <GridStyled
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBarStyled position="static" color="inherit">
              <TextField
                name="search"
                label="Search Memories"
                variant="outlined"
                fullWidth
                value={search}
                onKeyDown={handleEnterkey}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </AppBarStyled>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper
              sx={{
                paddding: "16px",
                marginTop: "16px",
                borderRadius: "4",
              }}
              elevation={6}
            >
              <BasicPagination />
            </Paper>
          </Grid>
        </GridStyled>
      </Container>
    </Grow>
  );
}

export default Home;
