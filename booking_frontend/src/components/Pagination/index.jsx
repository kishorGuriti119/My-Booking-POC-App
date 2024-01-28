import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent(props) {
  const [cardCountValue, setCardCountValue] = useState(
    Math.ceil(props.cardCount / 4)
  );
  useEffect(() => {
    setCardCountValue(Math.ceil(props.cardCount / 4));
  }, []);

  const handleChange = (e, value) => {
    props.changePage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={cardCountValue}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
}
