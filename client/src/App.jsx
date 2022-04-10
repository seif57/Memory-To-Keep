import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import memories from "./assets/images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { AppBarStyled, TitleStyled, GridStyled } from "./customAppStyles";
import { ImageStyled } from "./appStyles";
import { getPosts } from "./actions/posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBarStyled position="static" color="inherit">
        <TitleStyled variant="h2" align="center">
          Memories
        </TitleStyled>
        <ImageStyled src={memories} alt="memories" height="60" />
      </AppBarStyled>
      <Grow in>
        <Container>
          <GridStyled
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </GridStyled>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
