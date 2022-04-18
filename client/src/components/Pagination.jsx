import * as React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function BasicPagination() {
  return (
    <Stack spacing={2}>
      <StyledPagination
        count={5}
        page={1}
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
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
