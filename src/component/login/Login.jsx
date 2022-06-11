import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Registration from "../modals/RegisterModal";
import classes from "../generalCss/generalCss.module.css";
import { useSelector } from "react-redux";
// import ReactFlagsSelect from "react-flags-select";
import ForgetPasswordModal from "../modals/ForgetPasswordModal";
import PickProfilesModal from "../modals/PickProfilesModal";
import { useDispatch } from "react-redux";
import { hideProfile, loginProfiles } from "../../redux/actions/LoginActions";

function LoginTop() {
  const navigate = useNavigate();
  const [userData, setUser] = useState({ email: "", password: "" });
  const [register, setRegister] = useState(false);
  const [forget, setForget] = useState(false);
  // const [error, setError] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((selector) => selector.user);
  const loginState = useSelector((selector) => selector.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      if (user.isAdmin) {
        navigate("/admin");
      } else if (user.isParent) {
        navigate("/parent");
      } else {
        navigate("/student");
      }
    }
  }, [navigate, user.isLoggedIn, user.isAdmin, user.isParent]);

  function login() {
    dispatch(loginProfiles(userData.email, userData.password));
  }

  return (
    <React.Fragment>
      <PickProfilesModal
        show={loginState.profiles.length > 0 && loginState.showProfiles}
        profiles={loginState.profiles}
        handleClose={() => dispatch(hideProfile())}
      />

      {!user.isLoggedIn && (
        <div className="Userform-wrap">
          <Form className="row g-3 d-md-flex justify-content-center">
            <div className="col-auto px-2">
              <Form.Control
                className={classes.hideFocus}
                type="text"
                placeholder="Email / Phone"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto px-2">
              <Form.Control
                className={classes.hideFocus}
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto px-2">
              <Button
                variant="success"
                className={classes.hideButtonFocus}
                onClick={login}
                disabled={
                  !(userData.email && userData.password) ||
                  user.isLoading ||
                  loginState.isLoading
                }
              >
                {user.isLoading || loginState.isLoading
                  ? "Loading..."
                  : "Login"}
              </Button>
            </div>
            <div className="col-auto px-2">
              <Button
                variant="primary"
                className={classes.hideButtonFocus}
                onClick={() => setRegister(true)}
              >
                Register
              </Button>
            </div>
            {/* <div className="col-auto px-2">
              <ReactFlagsSelect
                countries={["IN", "GB"]}
                selected={"IN"}
                className={classes.flagDropDown}
                showSelectedLabel={false}
                onSelect={(code) => console.log(code)}
              />
            </div> */}
          </Form>
          <div
            className="d-flex justify-content-end"
            // style={{ paddingRight: "6em" }}
          >
            {loginState.error && (
              <div className="text-danger mr-2">{loginState.error}</div>
            )}

            <div
              className={`${classes.forgetPass} text-end`}
              onClick={() => setForget(true)}
            >
              Forget Password
            </div>
          </div>
        </div>
      )}

      {/* <div className="row mr-4 g-3 d-md-flex justify-content-center">
                <Button
                    variant="danger"
                    className={classes.hideButtonFocus}
                    onClick={() => setRegister(true)}
                >
                    Logout
                </Button>
            </div> */}

      {register && (
        <Registration show={register} handleClose={() => setRegister(false)} />
      )}
      {forget && (
        <ForgetPasswordModal
          show={forget}
          handleClose={() => setForget(false)}
        />
      )}
    </React.Fragment>
  );
}

export default LoginTop;
