/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-redeclare */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import { Container, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { AiOutlineLeft } from "react-icons/ai";
import { fetchQuestion, updateCompetitions, loadMoreQuestion, fetchSkillType, fetchDifficulType } from "../../redux";
import { MdExpandMore } from "react-icons/md";
import { COMPETITION_NOTIFICATION } from "../../redux/actions/competitionType";
const ChooseQuestions = (props) => {
  const [status, setStatus] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [length, setLength] = useState(0);
  const [data, setData] = useState({});
  const [quesModalType, setQuesModalType] = useState('edit');
  const [chooseQues, setChooseQues] = useState([]);
  const [classData, setClassData] = useState({});
  const [subjectData, setSubjectData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [difficultId, setDifficultId] = useState("");
  const [skillId, setSkillId] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    const questionList = props.competitions.competitionsData.filter(val => val._id === props.data._id)
    const questionData = questionList[0];
    console.log(props.quesModalType);
    setStatus(props.quesStatus);
    // setQuesModalType(props.quesModalType);
    setData(questionData);
    setClassData(questionData.classData);
    setSubjectData(questionData.subjectData);
    setCountryData(questionData.countryData);
    setChooseQues(questionData.questions);
  }, [props.competitions.loadingUpdate]);


  useEffect(() => {
    const { countryId, classId, subjectId } = props.data;
    props.fetchQuestion(countryId, classId, subjectId, difficultId, skillId, length);
    props.fetchDifficulType()
    props.fetchSkillType()
  }, []);


  function mychooseque(val) {
    const choose = chooseQues.filter((vals) => {
      return vals === val;
    });
    let unSelect = null;
    if (choose.length !== 0 && props.competitions.loadingUpdate !== true) {
      unSelect = chooseQues.filter((dals) => {
        return dals !== val;
      });
      setChooseQues(unSelect);
      props.updateCompetitions(data._id, unSelect);
    } else {
      if (data.totalQuestion > data.questions.length && props.competitions.loadingUpdate !== true) {
        setChooseQues([...chooseQues, val]);
        unSelect = [...chooseQues, val];
        props.updateCompetitions(data._id, unSelect);
      } else {
        addToast("Your question choose limit is completed", {
          appearance: "error",
          autoDismissTimeout: 5000,
        });
      }
    }
  }

  function loadMore(length) {
    if (props.questionSheet.loading !== true) {
      const { countryId, classId, subjectId } = props.data;
      props.loadMoreQuestion(countryId, classId, subjectId, difficultId, skillId, length);
    }
  }
  function fetchFilterQuestion(difficultId, skillId, length) {
    setDifficultId(difficultId);
    setSkillId(skillId);
    if (props.questionSheet.loading !== true) {
      const { countryId, classId, subjectId } = props.data;
      props.fetchQuestion(countryId, classId, subjectId, difficultId, skillId, length);
    }
  }

  return (
    <>
      <SlidingPane
        className="mt-70"
        hideHeader={true}
        isOpen={status}
        onRequestClose={() => {setStatus(false);}}
      >
        <Container className="pb-5">
          {props.quesModalType === "edit" ?
            <Row className="p-1">
              <Col sm={12}><h2><AiOutlineLeft size={30} className="pointer text-primary" onClick={props.onHide} /> {`${subjectData.title} / ${countryData.name}`}</h2></Col>
              <Col sm={12}><p>{`${classData.title} Questions Choose Panel `}</p></Col>
              <Col sm={6}>
                <select
                  value={difficultId}
                  className="form-control"
                  onChange={(e) => {
                    fetchFilterQuestion(e.target.value, skillId, props.questionSheet.questionData.length);
                  }}
                >
                  <option value="">{props.difficultie.loading ? "Loading" : "Select Difficulti Type"}</option>
                  {(props?.difficultie?.difficultData || []).map((val, i) => (
                    <option key={i} value={val._id}>
                      {val.title}.
                    </option>
                  ))}
                </select>
              </Col>
              <Col sm={6}>
                <select
                  value={skillId}
                  className="form-control"
                  onChange={(e) => {
                    fetchFilterQuestion(difficultId, e.target.value, props.questionSheet.questionData.length);
                  }}
                >
                  <option value="">{props.skill.loading ? "Loading" : "Select Skills Type"}</option>
                  {(props?.skill?.skillData || []).map((val, i) => (
                    <option key={i} value={val._id}>
                      {val.title}.
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            :
            <Row className="p-1">
              <Col sm={12}><h2><AiOutlineLeft size={30} className="pointer text-primary" onClick={props.onHide} /> {`Selected Questions`}</h2></Col>
            </Row>
          }
          
          <Row className="pb-5">
            {props.questionSheet.loading ?
              <Row className="pb-5 text-center">
                <Col sm={12}>
                  <Spinner animation="border" />
                </Col>
              </Row>
              :
              (props?.questionSheet?.questionData || []).map((val, i) => {
                var chooseStatus = chooseQues.some((item) => item === val._id);
                console.log(props.quesModalType);
                if(props.quesModalType === 'edit'){
                  if (val.string.label === "Frmt_001") {
                    var questionView = (
                      <>
                        <p key={i}>
                          Q.{i + 1} :{" "}
                          {(val?.data?.options || []).map((ops, j) => {
                            return (
                              <button className="btn btn-info m-1" key={j}>
                                {ops}
                              </button>
                            );
                          })}
                        </p>
                        <p>
                          {" "}
                          Ans :{" "}
                          <b
                            className={
                              chooseStatus ? "text-white" : " text-success"
                            }
                          >
                            {" "}
                            {val.answer}
                          </b>{" "}
                        </p>
                      </>
                    );
                  } else if (val.string.label === "Frmt_002") {
                    var questionView = (
                      <>
                        <p>
                          Q.{i + 1} :{" "}
                          <b>
                            {" "}
                            {val.data.lhs || "___"} {val.data.lhsUnit}{" "}
                            {val.data.rhs || "___"} {val.data.rhsUnit}.
                          </b>
                        </p>
                        <p>
                          {" "}
                          Ans :{" "}
                          <b
                            className={
                              chooseStatus ? "text-white" : " text-success"
                            }
                          >
                            {" "}
                            {val.answer}
                          </b>{" "}
                        </p>
                      </>
                    );
                  } else if (val.string.label === "Frmt_003") {
                    var questionView = (
                      <>
                        <p>Q.{i + 1} :</p>
  
                        <Col className="text-center">
                          <b>
                            &nbsp;&nbsp;
                            {(val?.data?.addend1 || []).map((add, k) => {
                              if (add !== null) {
                                return <b key={k}>{add} </b>;
                              } else {
                                return <b key={k}> _ </b>;
                              }
                            })}
                            <br />
                            {val.data.operator}{" "}
                            {(val?.data?.addend2 || []).map((add, l) => {
                              if (add !== null) {
                                return <b key={l}> {add} </b>;
                              } else {
                                return <b key={l}> _</b>;
                              }
                            })}
                            <hr />
                            {(val?.data?.result || []).map((add, m) => {
                              if (add !== null) {
                                return <b key={m}> {add} </b>;
                              } else {
                                return <b key={m}> _</b>;
                              }
                            })}
                            <hr />
                          </b>
                        </Col>
                        <p>
                          {" "}
                          Ans :{" "}
                          <b
                            className={
                              chooseStatus ? "text-white" : " text-success"
                            }
                          >
                            {(val?.answer || []).map((add, n) => {
                              return <b key={n}> {add} , </b>;
                            })}
                          </b>{" "}
                        </p>
                      </>
                    );
                  } else if (val.string.label === "Frmt_004") {
                    var questionView = (
                      <>
                        <p>Q.{i + 1} :</p>
                        <Col className="text-center">
                          <b>
                            {(val?.data?.options || []).map((add, o) => {
                              return (
                                <b key={o}>
                                  {" "}
                                  <button className="btn btn-info m-1" key={i}>
                                    {add}
                                  </button>{" "}
                                </b>
                              );
                            })}
                            <br />
                            {(val?.data?.equation || []).map((add, p) => {
                              if (add !== null) {
                                return <b key={p}> {add} </b>;
                              } else {
                                return <b key={p}> __ </b>;
                              }
                            })}
                            .
                          </b>
                        </Col>
                        <p>
                          {" "}
                          Ans :{" "}
                          <b
                            className={
                              chooseStatus ? "text-white" : " text-success"
                            }
                          >
                            {(val?.answer || []).map((add, q) => {
                              return <b key={q}> {add} , </b>;
                            })}
                          </b>{" "}
                        </p>
                      </>
                    );
                  }
                  return (
                    <Col sm={6} key={i} title={val.title}>
                      <Card
                        className={`p-2 m-1 ${chooseStatus ? "bg-success text-white" : "bg-light"
                          }`}
                        role="button"
                        onClick={(e) => mychooseque(val._id)}
                      >
                        <p>
                          <b>{val.title}</b>
                        </p>
                        {questionView}
                      </Card>
                    </Col>
                  );
                }else{
                  if(chooseStatus){
                    if (val.string.label === "Frmt_001") {
                      var questionView = (
                        <>
                          <p key={i}>
                            Q.{i + 1} :{" "}
                            {(val?.data?.options || []).map((ops, j) => {
                              return (
                                <button className="btn btn-info m-1" key={j}>
                                  {ops}
                                </button>
                              );
                            })}
                          </p>
                          <p>
                            {" "}
                            Ans :{" "}
                            <b
                              className={" text-success"}
                            >
                              {" "}
                              {val.answer}
                            </b>{" "}
                          </p>
                        </>
                      );
                    } else if (val.string.label === "Frmt_002") {
                      var questionView = (
                        <>
                          <p>
                            Q.{i + 1} :{" "}
                            <b>
                              {" "}
                              {val.data.lhs || "___"} {val.data.lhsUnit}{" "}
                              {val.data.rhs || "___"} {val.data.rhsUnit}.
                            </b>
                          </p>
                          <p>
                            {" "}
                            Ans :{" "}
                            <b
                              className={" text-success"}
                            >
                              {" "}
                              {val.answer}
                            </b>{" "}
                          </p>
                        </>
                      );
                    } else if (val.string.label === "Frmt_003") {
                      var questionView = (
                        <>
                          <p>Q.{i + 1} :</p>
    
                          <Col className="text-center">
                            <b>
                              &nbsp;&nbsp;
                              {(val?.data?.addend1 || []).map((add, k) => {
                                if (add !== null) {
                                  return <b key={k}>{add} </b>;
                                } else {
                                  return <b key={k}> _ </b>;
                                }
                              })}
                              <br />
                              {val.data.operator}{" "}
                              {(val?.data?.addend2 || []).map((add, l) => {
                                if (add !== null) {
                                  return <b key={l}> {add} </b>;
                                } else {
                                  return <b key={l}> _</b>;
                                }
                              })}
                              <hr />
                              {(val?.data?.result || []).map((add, m) => {
                                if (add !== null) {
                                  return <b key={m}> {add} </b>;
                                } else {
                                  return <b key={m}> _</b>;
                                }
                              })}
                              <hr />
                            </b>
                          </Col>
                          <p>
                            {" "}
                            Ans :{" "}
                            <b
                              className={" text-success"}
                            >
                              {(val?.answer || []).map((add, n) => {
                                return <b key={n}> {add} , </b>;
                              })}
                            </b>{" "}
                          </p>
                        </>
                      );
                    } else if (val.string.label === "Frmt_004") {
                      var questionView = (
                        <>
                          <p>Q.{i + 1} :</p>
                          <Col className="text-center">
                            <b>
                              {(val?.data?.options || []).map((add, o) => {
                                return (
                                  <b key={o}>
                                    {" "}
                                    <button className="btn btn-info m-1" key={i}>
                                      {add}
                                    </button>{" "}
                                  </b>
                                );
                              })}
                              <br />
                              {(val?.data?.equation || []).map((add, p) => {
                                if (add !== null) {
                                  return <b key={p}> {add} </b>;
                                } else {
                                  return <b key={p}> __ </b>;
                                }
                              })}
                              .
                            </b>
                          </Col>
                          <p>
                            {" "}
                            Ans :{" "}
                            <b
                              className={" text-success"}
                            >
                              {(val?.answer || []).map((add, q) => {
                                return <b key={q}> {add} , </b>;
                              })}
                            </b>{" "}
                          </p>
                        </>
                      );
                    }
                    return (
                      <Col sm={6} key={i} title={val.title}>
                        <Card
                          className={`p-2 m-1 bg-success text-white`}
                        >
                          <p>
                            <b>{val.title}</b>
                          </p>
                          {questionView}
                        </Card>
                      </Col>
                    );
                  }
                }
              })
            }
          </Row>
          <Row className="text-center p-5">
            <Col sm={12}>
              {props.questionSheet.loadStatus ?
                <Button className="btn btn-dark" onClick={() => loadMore(props.questionSheet.questionData.length)}>
                  {props.questionSheet.loading2 ? <Spinner animation="border" size="sm" /> : <MdExpandMore size={20} />}
                </Button> : ""}
            </Col>
          </Row>
        </Container>
      </SlidingPane>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    questionSheet: state.questionSheet,
    competitions: state.competitions,
    difficultie: state.difficulties,
    skill: state.skills
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchQuestion: function (countryId, classId, subjectId, difficultId, skillId, length) {
      dispatch(fetchQuestion(countryId, classId, subjectId, difficultId, skillId, length));
    },
    updateCompetitions: function (competitionId, chooseQues) {
      dispatch(updateCompetitions(competitionId, chooseQues));
    },
    loadMoreQuestion: function (countryId, classId, subjectId, difficultId, skillId, length) {
      dispatch(loadMoreQuestion(countryId, classId, subjectId, difficultId, skillId, length))
    },
    fetchSkillType: function () {
      dispatch(fetchSkillType())
    },
    fetchDifficulType: function () {
      dispatch(fetchDifficulType())
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

export default connect(mapStatetoProps, mapDispatchtoProps)(ChooseQuestions);
