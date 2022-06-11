import React, { useState } from "react";
import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import OtpInput from "react-otp-input-rc-17";
import { parseAxiosError } from "../../helper/common";
import LoginService from "../../services/loginService";

function ForgetPasswordModal(props) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [token, setToken] = useState("");
  const [timeout, setTimeoutHandler] = useState(null);
  const [resend, setResend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  async function clickSendOTP() {
    if (email) {
      setIsLoading(true);
      setError("");
      setSuccess("");
      LoginService.sendOtp(email)
        .then(({ data }) => {
          setSuccess(data.sent);
          setIsLoading(false);
          setError("");
          setResend(false);
          setOtpSent(true);
          if (timeout != null) clearTimeout(timeout);
          setTimeoutHandler(setTimeout(() => setResend(true), 5 * 60 * 1000));
        })
        .catch((err) => {
          setIsLoading(false);
          setSuccess("");
          const messages = parseAxiosError(err);
          if (Array.isArray(messages)) {
            setError(messages.map((ele) => ele.msg).join(" , "));
          } else setError(messages);
        });
    } else {
      setError("Email is Empty");
    }
  }

  async function verifyOTP() {
    if (!email) {
      return setError("Email is Empty");
    }
    if (!otp) {
      return setError("OTP is Empty");
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    LoginService.verifyOtp(email, otp)
      .then(({ data }) => {
        setToken(data.token);
        setIsLoading(false);
        setError("");
        setOtpVerified(true);
      })
      .catch((err) => {
        setIsLoading(false);
        const messages = parseAxiosError(err);
        if (Array.isArray(messages)) {
          setError(messages.map((ele) => ele.msg).join(" , "));
        } else setError(messages);
      });
  }

  async function updatePassword() {
    if (!password) {
      return setError("Password is Empty");
    }
    if (password === cPassword) {
      setIsLoading(true);
      setError("");
      setSuccess("");
      LoginService.updatePassword(token, password)
        .then(({ data }) => {
          setSuccess(data.status);
          setIsLoading(false);
          setUpdated(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setSuccess("");
          const messages = parseAxiosError(err);
          if (Array.isArray(messages)) {
            setError(messages.map((ele) => ele.msg).join(" , "));
          } else setError(messages);
        });
    } else {
      setError("Password and Confirm password");
    }
  }

  function buttonClick() {
    if (otpVerified) return updatePassword();
    if (otpSent) return verifyOTP();
    return clickSendOTP();
  }

  function getButtonText() {
    if (isLoading) return "Loading...";
    if (otpVerified) return "Update Password";
    if (otpSent) return "Verify OTP";
    return "Send OTP";
  }

  return (
    <Modal
      show={props.show}
      backdrop="static"
      onHide={props.handleClose}
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Forget Password</Modal.Title>
      </Modal.Header>
      <Container className="p-4">
        {success && <Alert variant="success">{success}</Alert>}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {otpVerified && (
          <>
            <Form.Group className="mb-2" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        {!otpVerified && (
          <>
            <Form.Group className="mb-2" controlId="name">
              <Form.Label>Email / Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email / Phone Number"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="otp">
              <Form.Label>OTP</Form.Label>
              <div className="d-flex">
                <OtpInput
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  numInputs={6}
                  separator={<span>-</span>}
                  inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                />
                <Button variant="link" disabled={!resend}>
                  Resend
                </Button>
              </div>
            </Form.Group>
          </>
        )}
      </Container>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={isLoading || updated}
          onClick={buttonClick}
        >
          {getButtonText()}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ForgetPasswordModal;
