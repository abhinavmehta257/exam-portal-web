import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Format1 from "../Questions/Formats/Format1";
import Format2 from "../Questions/Formats/Format2";
import Format3 from "../Questions/Formats/Format3";
import Format4 from "../Questions/Formats/Format4";
import { MdDelete } from "react-icons/md";
import FavoriteService from "../../services/FavoriteService";
import { stringError } from "../../helper/common";
import { useToasts } from "react-toast-notifications";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  nextFavorite,
  removeFavorite,
} from "../../redux/actions/FavoriteActions";

function DeleteConfirm({ handleClose, favoriteID, removeFavorite }) {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  function submit() {
    setIsLoading(true);
    FavoriteService.deleteFavorite(favoriteID)
      .then(() => {
        removeFavorite();
        setIsLoading(false);
        addToast("Deleted!", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
        handleClose();
      })
      .catch(
        stringError((x) => {
          setIsLoading(false);
          addToast(x, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
        })
      );
  }

  return (
    <Dialog open={Boolean(favoriteID)} onClose={handleClose}>
      <DialogTitle>Are you sure you want to Delete</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          // variant="contained"
          loading={isLoading}
          // loadingPosition="start"
          onClick={submit}
        >
          Ok
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export function FavoriteRow({ question }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  function answerUpdate(_) {}
  const answer = null;

  if (question?.formatID === "61bace9584476677d477e76b")
    return (
      <Format1
        question={question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (question?.formatID === "61bace9584476677d477e76c")
    return (
      <Format2
        question={question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (question?.formatID === "61bace9584476677d477e76d")
    return (
      <Format3
        question={question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (question?.formatID === "61bace9584476677d477e76e")
    return (
      <Format4
        question={question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  return <div />;
}

function FavoriteList() {
  const { questions, isLoading } = useSelector((state) => state.favorite);
  const [selectedId, setSelectedId] = useState("");
  const loader = useRef(null);
  const dispatch = useDispatch();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      dispatch(nextFavorite());
    }
    document.title = "SuperC - Favorite";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const currentElement = loader.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [loader, handleObserver]);

  return (
    <div>
      <Typography variant="h3" gutterBottom component="div">
        Favorites
      </Typography>

      <div
        className="scroll"
        // style={{ overflow: "scroll", height: "calc(100vh - 64px - 1rem)" }}
      >
        {questions.map((ele) => (
          <Paper key={ele._id} sx={{ padding: "1rem", mb: "1rem" }}>
            <FavoriteRow question={ele.question} />
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                sx={{ background: "#eb0505" }}
                startIcon={<MdDelete />}
                onClick={() => setSelectedId(ele._id)}
              >
                Delete
              </Button>
            </div>
          </Paper>
        ))}
        {isLoading && <p>Loading...</p>}
        {/* {isLoading && } */}
        <div ref={loader} className="loader" />
      </div>

      <DeleteConfirm
        favoriteID={selectedId}
        handleClose={() => setSelectedId("")}
        removeFavorite={() => dispatch(removeFavorite(selectedId))}
      />
    </div>
  );
}

export default FavoriteList;
