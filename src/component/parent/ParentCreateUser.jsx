import { useState, useEffect } from "react";
import { Row, Form, Button, Container, Alert } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { arrayError } from "../../helper/common";
import ClassService from "../../services/ClassService";
import LoginService from "../../services/loginService";

function ParentCreateStudent(props) {
  const { addToast } = useToasts();
  const [userData, setUser] = useState({
    name: "",
    class: "",
    password: "",
    confirmPassword: "",
  });
  const [newStudent, setNewStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [confirmError, setConfirmError] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };

  const addNewStudent = () => {
    setSuccess("");
    setError("");
    setConfirmError("");
    setUser({
      name: "",
      class: classes.length > 0 ? classes[0]._id : "",
      password: "",
      confirmPassword: "",
    });
    setNewStudent(false);
  };

  const submit = () => {
    if (userData.password !== userData.confirmPassword) {
      setConfirmError("Password is Not Matching");
      return;
    }
    setConfirmError("");
    setError("");
    setIsLoading(true);
    LoginService.createStudent(
      userData.class,
      userData.password,
      userData.name,
      undefined,
      props.token
    )
      .then(({ data }) => {
        const _success = "Student Profile added Successfully!";
        if (props.addUser) {
          props.addUser(data);
          setSuccess(_success);
        } else {
          addToast(_success, {
            appearance: "success",
            autoDismissTimeout: 10000,
          });
        }
        setNewStudent(true);
        setIsLoading(false);
      })
      .catch(arrayError(setError).bind(this));
  };

  useEffect(() => {
    setIsLoading(true);
    ClassService.listClassesAuth(props.token)
      .then((classes) => {
        setIsLoading(false);
        setClasses(classes);
        setUser((u) => ({
          ...u,
          class: classes.length > 0 ? classes[0]._id : "",
        }));
      })
      .catch(arrayError(setError).bind(this));
  }, [props.token]);

  return (
    <Container>
      {!props.modal && <h2>Add a Student</h2>}
      <Form className={props.modal ? "" : "col-md-6"}>
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            {Array.isArray(error) ? (
              error.map((ele, i) => <p key={i}>{ele.msg}</p>)
            ) : (
              <p>{error}</p>
            )}
          </Alert>
        )}

        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group as={Row} className="mb-2" controlId="name">
          <Form.Label className="col-md-4">Student Name</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="text"
              placeholder="Student Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          {/* <Form.Text className="text-muted">Error</Form.Text> */}
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="class">
          <Form.Label className="col-md-4">Class</Form.Label>
          <div className="col-md-8">
            <Form.Select
              name="class"
              onChange={handleChange}
              value={userData.class}
            >
              {classes.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.title}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* <Form.Text className="text-muted">Error</Form.Text> */}
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="passcode">
          <Form.Label className="col-md-4">Passcode</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          {/* <Form.Text className="text-muted">Error</Form.Text> */}
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="confirmPasscode">
          <Form.Label className="col-md-4">Confirm Passcode</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            {confirmError && (
              <Form.Text className="text-danger">{confirmError}</Form.Text>
            )}
          </div>
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            className="mr-4"
            disabled={!newStudent}
            onClick={addNewStudent}
          >
            Add New Student
          </Button>
          <Button
            variant="success"
            onClick={submit}
            disabled={isLoading || newStudent}
          >
            {isLoading ? "Loading..." : "Add Student"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ParentCreateStudent;
