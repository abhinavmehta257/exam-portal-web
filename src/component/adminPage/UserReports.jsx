/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

import {
  MdRefresh,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";
import LineChart from "../common/LineChart";
import ReportService from "../../services/ReportService";
import moment from "moment";
import { IMAGE_URL, parseAxiosError } from "../../helper/common";

function MonthlyUsers() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [totalUsers, SetTotalUsers] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUserReport() {
    setData(null);
    setIsLoading(true);
    ReportService.getMonthlyUsers(date)
      .then((data) => {
        const tmp = new Array(moment(date).daysInMonth()).fill(0);
        data?.monthly.forEach((ele) => {
          tmp[ele._id - 1] = ele.count;
        });
        SetTotalUsers(data.count);
        setData(tmp);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(parseAxiosError(err));
      });
  }

  useEffect(() => {
    getUserReport();
  }, []);

  function prevMonth() {
    setDate(moment(date).subtract(1, "month").toDate());
  }

  function nextMonth() {
    setDate(moment(date).add(1, "month").toDate());
  }

  useEffect(() => {
    getUserReport();
  }, [date]);

  return (
    <Grid item md={6}>
      <Paper sx={{ padding: "1em" }}>
        <div className="d-flex">
          <IconButton aria-label="delete" size="large" onClick={prevMonth}>
            <MdArrowBackIosNew fontSize="inherit" />
          </IconButton>
          <h4 style={{ flex: 1 }} className="mt-auto mb-auto">
            Monthly Users ( {moment(date).format("MMMM")} -{" "}
            {moment(date).year()} )
          </h4>
          <IconButton aria-label="delete" size="large" onClick={nextMonth}>
            <MdArrowForwardIos fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => getUserReport()}
          >
            <MdRefresh fontSize="inherit" />
          </IconButton>
        </div>
        {isLoading && (
          <Skeleton variant="rectangular" height={385} animation="wave" />
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        )}

        {data && (
          <LineChart
            labels={data.map((_, i) => i + 1)}
            title="Monthly Users"
            data={data}
          />
        )}

        {totalUsers >= 0 && <h4 className="mt-4">Total Users: {totalUsers}</h4>}
        {totalUsers < 0 && (
          <Skeleton variant="text" height={30} animation="wave" />
        )}
      </Paper>
    </Grid>
  );
}

function MonthlyMemberships() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [totalUsers, SetTotalUsers] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUserReport() {
    setData(null);
    setIsLoading(true);
    ReportService.getMonthlyMemberships(date)
      .then((data) => {
        const tmp = new Array(moment(date).daysInMonth()).fill(0);
        data?.monthly.forEach((ele) => {
          tmp[ele._id - 1] = ele.count;
        });
        SetTotalUsers(data.count);
        setData(tmp);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(parseAxiosError(err));
      });
  }

  useEffect(() => {
    getUserReport();
  }, []);

  function prevMonth() {
    setDate(moment(date).subtract(1, "month").toDate());
  }

  function nextMonth() {
    setDate(moment(date).add(1, "month").toDate());
  }

  useEffect(() => {
    getUserReport();
  }, [date]);

  return (
    <Grid item md={6}>
      <Paper sx={{ padding: "1em" }}>
        <div className="d-flex">
          <IconButton aria-label="delete" size="large" onClick={prevMonth}>
            <MdArrowBackIosNew fontSize="inherit" />
          </IconButton>
          <h4 style={{ flex: 1 }} className="mt-auto mb-auto">
            Monthly Memberships ( {moment(date).format("MMMM")} -{" "}
            {moment(date).year()} )
          </h4>
          <IconButton aria-label="delete" size="large" onClick={nextMonth}>
            <MdArrowForwardIos fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => getUserReport()}
          >
            <MdRefresh fontSize="inherit" />
          </IconButton>
        </div>
        {isLoading && (
          <Skeleton variant="rectangular" height={385} animation="wave" />
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        )}
        {data && (
          <LineChart
            labels={data.map((_, i) => i + 1)}
            title="Monthly Memberships"
            data={data}
          />
        )}

        {totalUsers >= 0 && (
          <h4 className="mt-4">Total Memberships: {totalUsers}</h4>
        )}
        {totalUsers < 0 && (
          <Skeleton variant="text" height={30} animation="wave" />
        )}
      </Paper>
    </Grid>
  );
}

function UserListCardItem({ name, phone, email, createdAt, profile }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={name} src={profile ? IMAGE_URL + profile : undefined} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <div className="d-flex flex-column">
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {email}
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {phone}
            </Typography>
            {moment(createdAt).format("DD MMMM YYYY HH:MM")}
          </div>
        }
      />
    </ListItem>
  );
}

function UserList({ isMembership, selectedDate }) {
  const [date, setDate] = useState(selectedDate);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(-1);
  const [noNext, setNoNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUsers(page = 1) {
    setPage(page);
    setIsLoading(true);
    const endpoint = isMembership
      ? ReportService.getMembershipUsers
      : ReportService.getUsersLists;
    endpoint(date, page)
      .then((data) => {
        if (page === 1) {
          setUsers(data);
        } else {
          setUsers([...data]);
        }
        if (data.length < 20) {
          setNoNext(true);
          setMaxPage(data.length <= 0 ? page - 1 : page);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        const axError = parseAxiosError(err);
        setError(axError);
        setIsLoading(false);
        // TODO: Print Error
      });
  }

  function nextUsers() {
    if (maxPage > -1) {
      if (page + 1 > maxPage) return;
      if (page + 1 === maxPage) {
        setNoNext(true);
      }
      setPage(page + 1);
    } else {
      getUsers(page + 1);
    }
  }

  function prevUsers() {
    setPage(page > 0 ? page - 1 : 0);
    setNoNext(true);
  }

  useEffect(() => {
    getUsers(1);
  }, []);

  useEffect(() => {
    getUsers(1);
  }, [date]);

  const usersPiece = users.slice((page - 1) * 20, page * 20);
  return (
    <Grid item md={6}>
      <Paper>
        <div className="pt-4 pl-4 pr-4 d-flex">
          <h3 className="flex-1 mt-auto mb-auto">
            {isMembership ? "Memberships" : "Users"}{" "}
          </h3>
          <DatePicker
            disableFuture
            // openTo="year"
            format="DD MMMM YYYY"
            label=""
            value={date}
            onChange={setDate}
            className="m-auto"
          />
          {isLoading ? (
            <CircularProgress color="success" className="ml-2" />
          ) : (
            <IconButton
              className="ml-2"
              aria-label="delete"
              size="large"
              onClick={() => getUsers(1)}
            >
              <MdRefresh fontSize="inherit" />
            </IconButton>
          )}
        </div>
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        ) : (
          <List
            sx={{
              width: "100%",
              height: 378,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {usersPiece.length === 0 && (
              <ListItem>
                <ListItemIcon sx={{ fontSize: 50 }}>🥺</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="No Users Found"
                  primaryTypographyProps={{
                    fontSize: 40,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItem>
            )}

            {usersPiece.map((usr, ind) => (
              <React.Fragment key={usr._id}>
                <UserListCardItem {...usr} />
                {ind < users.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
        <div className="d-flex p-4">
          <Button
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            disabled={page <= 1}
            onClick={prevUsers}
          >
            Prev
          </Button>
          <div className="flex-1"></div>
          <Button
            variant="contained"
            endIcon={<MdArrowForwardIos />}
            disabled={noNext}
            onClick={nextUsers}
          >
            Next
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

function MonthlyEnrollment() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [totalUsers, SetTotalUsers] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUserReport() {
    setData(null);
    setIsLoading(true);
    ReportService.getMonthlyEnrollments(date)
      .then((data) => {
        const tmp = new Array(moment(date).daysInMonth()).fill(0);
        data?.monthly.forEach((ele) => {
          tmp[ele._id - 1] = ele.count;
        });
        SetTotalUsers(data.count);
        setData(tmp);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(parseAxiosError(err));
      });
  }

  useEffect(() => {
    getUserReport();
  }, []);

  function prevMonth() {
    setDate(moment(date).subtract(1, "month").toDate());
  }

  function nextMonth() {
    setDate(moment(date).add(1, "month").toDate());
  }

  useEffect(() => {
    getUserReport();
  }, [date]);

  return (
    <Grid item md={6}>
      <Paper sx={{ padding: "1em" }}>
        <div className="d-flex">
          <IconButton aria-label="delete" size="large" onClick={prevMonth}>
            <MdArrowBackIosNew fontSize="inherit" />
          </IconButton>
          <h4 style={{ flex: 1 }} className="mt-auto mb-auto">
            Monthly Enrollments ( {moment(date).format("MMMM")} -{" "}
            {moment(date).year()} )
          </h4>
          <IconButton aria-label="delete" size="large" onClick={nextMonth}>
            <MdArrowForwardIos fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => getUserReport()}
          >
            <MdRefresh fontSize="inherit" />
          </IconButton>
        </div>
        {isLoading && (
          <Skeleton variant="rectangular" height={385} animation="wave" />
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        )}
        {data && (
          <LineChart
            labels={data.map((_, i) => i + 1)}
            title="Monthly Enrollments"
            data={data}
          />
        )}

        {totalUsers >= 0 && (
          <h4 className="mt-4">Total Enrollments: {totalUsers}</h4>
        )}
        {totalUsers < 0 && (
          <Skeleton variant="text" height={30} animation="wave" />
        )}
      </Paper>
    </Grid>
  );
}

function EnrollmentCard({ enrollment }) {
  const user = enrollment.user;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={user.name}
          src={user.profile ? IMAGE_URL + user.profile : undefined}
        />
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <div className="d-flex flex-column">
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {user.email} ({user.phone})
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {enrollment?.competition.competitionName} ( ₹&nbsp;
              {enrollment.charges || 0})
            </Typography>
            {moment(enrollment.createDate).format("DD MMMM YYYY HH:MM")}
          </div>
        }
      />
    </ListItem>
  );
}

function EnrollmentList({ selectedDate }) {
  const [date, setDate] = useState(selectedDate);
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(-1);
  const [noNext, setNoNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUsers(page = 1) {
    setPage(page);
    setIsLoading(true);
    ReportService.getEnrollmentUsers(date, page)
      .then((data) => {
        if (page === 1) {
          setEnrollments(data);
        } else {
          setEnrollments([...data]);
        }
        if (data.length < 20) {
          setNoNext(true);
          setMaxPage(data.length <= 0 ? page - 1 : page);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        const axError = parseAxiosError(err);
        setError(axError);
        setIsLoading(false);
        // TODO: Print Error
      });
  }

  function nextUsers() {
    if (maxPage > -1) {
      if (page + 1 > maxPage) return;
      if (page + 1 === maxPage) {
        setNoNext(true);
      }
      setPage(page + 1);
    } else {
      getUsers(page + 1);
    }
  }

  function prevUsers() {
    setPage(page > 0 ? page - 1 : 0);
    setNoNext(true);
  }

  useEffect(() => {
    getUsers(1);
  }, []);

  useEffect(() => {
    getUsers(1);
  }, [date]);

  const enrollmentPiece = enrollments.slice((page - 1) * 20, page * 20);
  return (
    <Grid item md={6}>
      <Paper>
        <div className="pt-4 pl-4 pr-4 d-flex">
          <h3 className="flex-1 mt-auto mb-auto">Enrollments</h3>
          <DatePicker
            disableFuture
            // openTo="year"
            format="DD MMMM YYYY"
            label=""
            value={date}
            onChange={setDate}
            className="m-auto"
          />
          {isLoading ? (
            <CircularProgress color="success" className="ml-2" />
          ) : (
            <IconButton
              className="ml-2"
              aria-label="delete"
              size="large"
              onClick={() => getUsers(1)}
            >
              <MdRefresh fontSize="inherit" />
            </IconButton>
          )}
        </div>
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        ) : (
          <List
            sx={{
              width: "100%",
              height: 378,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {enrollmentPiece.length === 0 && (
              <ListItem>
                <ListItemIcon sx={{ fontSize: 50 }}>🥺</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="No Users Found"
                  primaryTypographyProps={{
                    fontSize: 40,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItem>
            )}

            {enrollmentPiece.map((usr, ind) => (
              <React.Fragment key={usr._id}>
                <EnrollmentCard enrollment={usr} />
                {ind < enrollments.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
        <div className="d-flex p-4">
          <Button
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            disabled={page <= 1}
            onClick={prevUsers}
          >
            Prev
          </Button>
          <div className="flex-1"></div>
          <Button
            variant="contained"
            endIcon={<MdArrowForwardIos />}
            disabled={noNext}
            onClick={nextUsers}
          >
            Next
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

function UserReports() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <h2>User Reports</h2>
        <Grid container spacing={2}>
          <MonthlyUsers />
          <UserList selectedDate={new Date()} />
          <MonthlyMemberships />
          <UserList isMembership={true} selectedDate={new Date()} />
          <MonthlyEnrollment />
          <EnrollmentList selectedDate={new Date()} />
        </Grid>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default UserReports;
