import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  FloatingLabel,
  Card,
  Spinner,
} from "react-bootstrap";
import { COMPETITION_NOTIFICATION } from "../../redux/actions/competitionType";
import { useParams } from "react-router-dom";
import {
  fetchSubject,
  fetchCountry,
  fetchClass,
  fetchCompetition,
} from "../../redux";
import { IconButton } from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import PromoCodeRow from "./PromoCodeRow";

import { updateCompetition } from "../../redux/actions/competitionAction";
import CompetitionService from "../../services/CompetitionService";

function Competitions(props) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);
  const [competitionName, setCompetitionName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [totalQuestion, setTotalQuestion] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [skills, setSkills] = useState("");
  const [countryId, setCountryId] = useState("");
  const [classIds, setClassIds] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [age, setAge] = useState("");
  const [charges, setCharges] = useState("");
  const [discount, setDiscount] = useState("");
  const [remark, setRemark] = useState("");
  const [payStatus, setPayStatus] = useState(false);
  const [awardStatus, setAwardStatus] = useState(false);
  const [awardType, setAwardType] = useState(false);
  const [awardDesc, setAwardDesc] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState("");
  const { addToast } = useToasts();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCodes, setPromoCodes] = useState([]);

  function addNewRow() {
    setPromoCodes([
      ...promoCodes,
      {
        code: "",
        value: 0,
        isPercentage: false
      }
    ]);
  }

  function setPromoCodeData(index, data) {
    setPromoCodes(
      promoCodes.map((ele, i) => (i === index) ? data : ele)
    );
  }

  function removeRow(index) {
    if (promoCodes[index]?._id) {
      setPromoCodes(
        promoCodes.map((p, i) => (i === index) ? ({ ...p, loading: true }) : p)
      );
      CompetitionService.deletePromoCode(promoCodes[index]?._id)
        .then(() => {
          setPromoCodes(
            promoCodes.filter((_, i) => i !== index)
          );
        }).catch(err => {
          console.error(err);
          addToast("Failed to Remove PromoCode", {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
        });
    } else {
      setPromoCodes(
        promoCodes.filter((_, i) => i !== index)
      );
    }
  }

  function resetForm() {
    setCompetitionName("");
    setErrors({});
    setSubjectId("");
    setTotalQuestion("");
    setTotalMarks("");
    setSkills("");
    setCountryId("");
    setClassIds("");
    setStartDateTime("");
    setEndDateTime("");
    setRegistrationStartDate("");
    setRegistrationEndDate("");
    setAge("");
    setCharges("");
    setDiscount("");
    setRemark("");
    setPayStatus("");
    setStatus("");
    setValidated(false);
  }

  useEffect(() => {
    if (props.competitions.msg !== "") {
      if (props.competitions.msg) {
        if (props.competitions.msgType === "success") {
          addToast(props.competitions.msg, {
            appearance: "success",
            autoDismissTimeout: 5000,
          });
          navigate("/admin/competitionlist/1");
        } else {
          addToast(props.competitions.msg, {
            appearance: "error",
            autoDismissTimeout: 5000,
          });
        }
        props.msgReset();
        return;
      }
    }
    if (props.subject.fetchStatus !== false && props.subject.loading !== true) {
      props.fetchSubject();
    }
    if (props.country.fetchStatus !== false && props.country.loading !== true) {
      props.fetchCountry();
    }
    //  else {
    //       if (props.competitions.loading !== true) {
    //       }
    //     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.competitions.msg, props.country.loading]);


  useEffect(() => {
    props.fetchCompetition(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const datas = props.competitions.competitionsData.filter(
      (val) => val._id === id
    );
    if (datas.length > 0) {
      setData(...datas);
      updateState(datas[0]);
      setPromoCodes(datas[0].promos);
    }
  }, [props.competitions.competitionsData])

  const updateState = (response) => {
    classFetch(response.countryId);
    setCompetitionName(response.competitionName);
    setSubjectId(response.subjectId);
    setTotalQuestion(response.totalQuestion);
    setTotalMarks(response.totalMarks);
    setSkills(response.skills);
    setCountryId(response.countryId);
    setClassIds(response.classId);
    setStartDateTime(response.startDateTime);
    setEndDateTime(response.endDateTime);
    setRegistrationStartDate(response.registrationStartDate);
    setRegistrationEndDate(response.registrationEndDate);
    setAge(response.age);
    setCharges(response.charges);
    setDiscount(response.discount || 0);
    setRemark(response.remark);
    setPayStatus(response.payStatus);
    setStatus(response.payStatus);
  };

  function updateExam(e) {
    e.preventDefault();
    const isInvalidPromo = promoCodes.filter(ele => isNaN(parseInt(ele.value)));
    if (isInvalidPromo.length > 0) {
      return addToast("Invalid Promo Code", {
        appearance: "error",
      });
    }
    if (e.target.checkValidity() === true) {
      e.stopPropagation();
      setValidated(true);
      setErrors({});
      dispatch(
        updateCompetition({
          id,
          competitionName,
          subjectId,
          totalQuestion,
          totalMarks,
          skills,
          countryId,
          classIds,
          startDateTime: (new Date(startDateTime)).toISOString(),
          endDateTime: (new Date(endDateTime)).toISOString(),
          age,
          charges,
          remark,
          payStatus,
          registrationStartDate: (new Date(registrationStartDate)).toISOString(),
          registrationEndDate: (new Date(registrationEndDate)).toISOString(),
          discount,
          awardType,
          awardDesc,
          promoCodes: promoCodes.filter(e => !(e._id)),
          promoCodesUpdate: promoCodes.filter(e => !!(e._id))
        })
      );
    } else {
      setValidated(true);
    }
  }

  function classFetch(counId) {
    const countryId = props.country.countryData.filter((val) => {
      return val._id === counId;
    });
    if (countryId.length > 0) {
      const { code } = countryId[0];
      props.fetchClass(code);
    }
  }

  function setDateTime(setFor, e) {
    // console.log(startDateTime, e.target.validity, startDateTime > e.target.value)
    if (setFor === 'endDateTime') {
      setEndDateTime(e.target.value);
      setErrors({ enddt: false, enddtm: "" });
      if (startDateTime >= e.target.value) setErrors({ enddt: true, enddtm: "Start Date Time should be less then End Date Time." });
    }
    else if (setFor === 'startDateTime') {
      setStartDateTime(e.target.value);
      setErrors({ enddt: false, enddtm: "" });
      if (endDateTime && e.target.value >= endDateTime) setErrors({ enddt: true, enddtm: "Start Date Time should be less then End Date Time." });
    }
    else if (setFor === 'RegistrationEndDate') {
      setRegistrationEndDate(e.target.value);
      setErrors({ regEndDT: false, regEndDTM: "" });
      if (startDateTime && e.target.value >= startDateTime) setErrors({ regEndDT: true, regEndDTM: "Registration End Date Time should be less then exam Start Date Time." });
    }
  }

  return (
    <>
      <Container className="pb-5">
        <Form noValidate validated={validated} onSubmit={(e) => updateExam(e)}>
          <Row className="mb-12 m-3 ">
            <Card body className="bg-light">
              <Row className="mb-3 ">
                <Col sm={9}>
                  <h2 className="mt-2 mb-3">Competition Edit...</h2>
                </Col>
                <Col className="text-center" sm={3}>
                  <Link
                    to="/admin/competitionlist/1"
                    className="mt-2 mb-3 btn btn-success"
                  >
                    Competition List
                  </Link>
                </Col>
              </Row>
              <Row className="mb-3 ">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Competition Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Competition Name"
                    value={competitionName}
                    onChange={(e) => setCompetitionName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Competition Name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label>subject</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={subjectId}
                    onChange={(e) => {
                      setSubjectId(e.target.value);
                    }}
                    required
                  >
                    <option value="">
                      {props.subject.loading ? "Loading..." : "Select subject"}
                    </option>
                    {props.subject.subjectData.map((val, i) => (
                      <option key={i} value={val._id}>
                        {val.title}.
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid subject.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Total Question</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Total Question"
                    value={totalQuestion}
                    onChange={(e) => setTotalQuestion(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Total Question.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>Total Marks</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Total Marks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Total Marks.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom05">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Skills.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom06">
                  <Form.Label>Start Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Star Date Time"
                    value={moment(startDateTime).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setDateTime('startDateTime', e)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Star Date Time.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom07">
                  <Form.Label>End Date Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="end Date Time"
                    value={moment(endDateTime).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setDateTime('endDateTime', e)}
                    required
                    isInvalid={!!errors.enddt}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.enddt ? errors.enddtm : 'Please provide a valid End Date Time.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3 ">
                <Form.Group as={Col} md="4" controlId="validationCustom12">
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={countryId}
                    onChange={(e) => {
                      setCountryId(e.target.value);
                      classFetch(e.target.value);
                    }}
                    required
                  >
                    <option value="">
                      {props.country.loading ? "Loading..." : "Select country"}
                    </option>
                    {props.country.countryData.map((coun, i) => (
                      <option key={i} value={coun._id}>
                        {coun.name}.
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Country
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom16">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={classIds}
                    onChange={(e) => {
                      setClassIds(e.target.value);
                    }}
                    required
                  >
                    <option value="">
                      {props.class.loading ? "Loading..." : "Select Class"}
                    </option>
                    {props.class.classData.map((cla, i) => (
                      <option key={i} value={cla._id}>
                        {cla.title}.
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Country
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom11">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Age.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom06">
                  <Form.Label>Registration Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Registration Start Date"
                    value={moment(registrationStartDate).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) => setRegistrationStartDate(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Star Registration Start Date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom07">
                  <Form.Label>Registration End Date </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Registration End Date"
                    value={moment(registrationEndDate).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) => setDateTime('RegistrationEndDate', e)}
                    required
                    isInvalid={!!errors.regEndDT}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.regEndDT ? errors.regEndDTM : 'Please provide a valid End Registration End Date.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md={status ? "4" : "12"}
                  controlId="validationCustom08"
                >
                  <Form.Label>Exam Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={payStatus}
                    onChange={(e) => {
                      setPayStatus(e.target.value);
                      setStatus(!status);
                    }}
                    required
                  >
                    <option value={true}>Paid</option>
                    <option value={false}>Free</option>
                  </Form.Select>
                </Form.Group>
                {status ? (
                  <>
                    <Form.Group as={Col} md="4" controlId="validationCustom09">
                      <Form.Label>Charges</Form.Label>
                      <Form.Control
                        type="Number"
                        value={charges}
                        placeholder="Enter Charges"
                        onChange={(e) => setCharges(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Fee.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom09">
                      <Form.Label>Discount %</Form.Label>
                      <Form.Control
                        type="Number"
                        value={discount}
                        placeholder="Enter Discount %"
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a enter discount %
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  ""
                )}
              </Row>

              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" controlId="validationCustom08">
                  <Form.Label>Award Status</Form.Label>
                  <Form.Select
                    aria-label="Default Promo Code "
                    value={awardType}
                    onChange={(e) => {
                      setAwardType(e.target.value);
                      setAwardStatus(!awardStatus);
                    }}
                    required
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </Form.Group>
                {awardStatus ? (
                  <>
                    <Form.Group
                      as={Col}
                      md="12"
                      className="mt-3"
                      controlId="validationCustom09"
                    >
                      <Form.Label>Award Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        style={{ height: "100px" }}
                        placeholder="Award Description"
                        onChange={(e) => setAwardDesc(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a award sescription.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  ""
                )}
              </Row>


              <div className="d-flex flex-column">
                <div className="d-flex w-100">
                  <h4>Promo Codes</h4>
                  <IconButton color="primary" component="span" className="ml-auto mt-auto mb-auto" onClick={addNewRow}>
                    <MdAddCircleOutline />
                  </IconButton>
                </div>
                {(promoCodes || []).map((ele, i) => (
                  <PromoCodeRow data={ele} setData={(data) => setPromoCodeData(i, data)} key={i} removeRow={() => removeRow(i)} />
                ))}
              </div>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom13">
                  <Form.Label>Remark</Form.Label>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Remark..."
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="md-3">
                <Form.Group
                  as={Col}
                  className="mb-6 d-grid gap-2"
                  onClick={() => resetForm()}
                >
                  <Button variant="secondary" type="reset">
                    Clear
                  </Button>
                </Form.Group>
                <Form.Group as={Col} className="mb-6 d-grid gap-2">
                  {props.competitions.loadingUpdate ? (
                    <Button variant="light">
                      <Spinner animation="border" variant="dark" size="sm" />
                    </Button>
                  ) : (
                    <Button variant="dark" type="submit" value="submit">
                      Edit Exam
                    </Button>
                  )}
                </Form.Group>
              </Row>
            </Card>
          </Row>
        </Form>
      </Container>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    competitions: state.competitions,
    subject: state.subject,
    country: state.country,
    class: state.class,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    updateCompetition: function (
      competitionName,
      subjectId,
      totalQuestion,
      totalMarks,
      skills,
      countryId,
      classIds,
      startDateTime,
      endDateTime,
      age,
      charges,
      remark,
      payStatus,
      registrationStartDate,
      registrationEndDate,
      discount,
      promoCodeStatus,
      promoCode,
      awardType,
      awardDesc,
      promoCodeAmount
    ) {
      dispatch(
        updateCompetition(
          competitionName,
          subjectId,
          totalQuestion,
          totalMarks,
          skills,
          countryId,
          classIds,
          startDateTime,
          endDateTime,
          age,
          charges,
          remark,
          payStatus,
          registrationStartDate,
          registrationEndDate,
          discount,
          promoCodeStatus,
          promoCode,
          awardType,
          awardDesc,
          promoCodeAmount
        )
      );
    },
    fetchCompetition: function (id) {
      dispatch(fetchCompetition(id));
    },
    fetchSubject: function () {
      dispatch(fetchSubject());
    },
    fetchCountry: function () {
      dispatch(fetchCountry());
    },
    fetchClass: function (countryCode) {
      dispatch(fetchClass(countryCode));
    },
    msgReset: function () {
      dispatch({
        type: COMPETITION_NOTIFICATION,
        msg: "",
        msgType: "",
      });
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Competitions);
