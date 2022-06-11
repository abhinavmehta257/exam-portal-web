import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import UserHelpService from "../../services/UserHelpService";
import moment from "moment";
import { MdCheckCircle, MdHelp, MdOutlineHelpOutline } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { useCallback } from "react";
import { FavoriteRow } from "./FavoriteList";
import { useToasts } from "react-toast-notifications";
import { stringError } from "../../helper/common";

const ITEM_PER_PAGE = 15;
function StudentHelp() {
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const { addToast } = useToasts();

  function submit() {
    // initApis(page + 2);
    setIsLoading(true);
    UserHelpService.askQuery(message, null)
      .then(({ data }) => {
        // console.log(data);
        setIsLoading(false);
        setQueries(
          [
            {
              askedOn: new Date().toISOString(),
              isSolved: false,
              message,
              _id: data.id,
            },
            ...queries,
          ],
          () => setMessage("")
        );
        addToast("Query Asked!", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
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

  function initApis(page = 1) {
    if (maxPage >= page) return;
    setIsLoading(true);
    UserHelpService.getMyQueries(page).then((messages) => {
      // console.log(messages);
      setPage(page - 1);
      setMaxPage(Math.max(maxPage, page));
      setEnd(messages.length < ITEM_PER_PAGE);
      if (page === 1) {
        setQueries(messages);
      } else {
        setQueries(queries.concat(messages));
      }
      setIsLoading(false);
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moreInfo = useCallback((id) => {
    UserHelpService.getCompleteQueries(id)
      .then((q) => setSelectedQuery(q))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    document.title = "SuperC - Help";
    initApis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRange = queries.slice(
    page * ITEM_PER_PAGE,
    (page + 1) * ITEM_PER_PAGE
  );
  return (
    <Box>
      <div className="d-flex justify-space-between">
        <Typography variant="h3" component="div">
          Help
        </Typography>
        <LoadingButton
          variant="contained"
          disabled={selectedQuery === null}
          loading={isLoading}
          startIcon={<MdOutlineHelpOutline />}
          loadingPosition="start"
          onClick={() => setSelectedQuery(null)}
          color="success"
          sx={{ mt: "1rem", ml: "auto" }}
        >
          Ask Query
        </LoadingButton>
      </div>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={4}>
          {selectedRange.length > 0 && (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {selectedRange.map((que, ind) => (
                <React.Fragment key={que._id}>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={() => moreInfo(que._id)}
                  >
                    <ListItemAvatar>
                      {que.isSolved ? (
                        <MdCheckCircle size={48} color={"#0bbf08"} />
                      ) : (
                        <MdHelp size={48} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        wordBreak: "break-all",
                      }}
                      primary={que.message}
                      secondary={moment(que.askedOn).fromNow()}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              <ListItem
                alignItems="flex-start"
                sx={{ justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  disabled={page < 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Prev
                </Button>
                <LoadingButton
                  variant="contained"
                  disabled={end}
                  loading={isLoading}
                  // loadingPosition="start"
                  onClick={submit}
                >
                  Next
                </LoadingButton>
              </ListItem>
            </List>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          {selectedQuery === null && (
            <div className="d-flex flex-column">
              <Typography variant="h3" gutterBottom>
                Ask Query
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Message"
                type="text"
                fullWidth
                variant="standard"
                multiline
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <LoadingButton
                variant="contained"
                disabled={message.length <= 10}
                loading={isLoading}
                // loadingPosition="start"
                onClick={submit}
                sx={{ mt: "1rem", ml: "auto" }}
              >
                Submit
              </LoadingButton>
            </div>
          )}
          {selectedQuery && (
            <div className="d-flex flex-column">
              <Typography variant="h3" gutterBottom>
                Question
              </Typography>

              {selectedQuery.question && (
                <FavoriteRow question={selectedQuery.question} />
              )}
              <Typography variant="h6" gutterBottom sx={{ mt: "2rem" }}>
                Message
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {selectedQuery.message}
              </Typography>

              {selectedQuery.isSolved && (
                <Paper sx={{ p: "1rem" }}>
                  <Typography variant="h6" gutterBottom>
                    Reply
                  </Typography>
                  {selectedQuery.reply}
                </Paper>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentHelp;
