import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

export default function BasicPagination({ page }) {
  const totalPages = useSelector((state) => state.posts.totalPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page, dispatch]);
  return (
    <Stack spacing={2}>
      <StyledPagination
        count={totalPages}
        page={Number(page) || 1}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </Stack>
  );
}

const StyledPagination = styled(Pagination)`
  ul {
    justify-content: center;
  }
`;
