import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { MdFavorite, MdOutlineHelpOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../redux/actions/QuestionAction";
import AskQueryDialog from "../Student/AskQueryDialog";
import QuestionTimer from "./QuestionTimer";

/**
 * Header Containing the Timer,Add To Favorite Button and Ask Query Button.
 * Used in the Practice Screen.
 * @returns React Functional Component.
 */
function QuestionHeader() {
  const practice = useSelector((selector) => selector.question);
  const dispatch = useDispatch();
  const [query, setQuery] = useState(false);

  return (
    <div className="d-flex justify-content-end mb-4">
      {/* StopWatch */}
      <QuestionTimer />
      <LoadingButton
        variant="contained"
        loading={practice.favoriteLoading}
        loadingPosition="start"
        disabled={practice.question === null || practice.onFavorite}
        startIcon={<MdFavorite className="mr-1" />}
        sx={{ marginRight: "1rem" }}
        onClick={() => dispatch(addToFavorite())}
      >
        Add to Favorite
      </LoadingButton>
      <Button
        disabled={practice.question === null}
        variant="contained"
        startIcon={<MdOutlineHelpOutline />}
        color="success"
        onClick={() => setQuery(true)}
      >
        Ask Query
      </Button>
      <AskQueryDialog open={query} handleClose={() => setQuery(false)} />
    </div>
  );
}

export default QuestionHeader;
