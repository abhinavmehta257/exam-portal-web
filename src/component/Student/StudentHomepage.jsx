import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import InfoHeader from "../infoheader/InfoHeader";
import classes from "../parent/parentStudent.module.css";
import Footer from "../footer/Footer";
import SideNavMenu from "../parent/SideNavMenu";
import { Outlet } from "react-router-dom";
import NotLoggedIn from "../NotLoggedIn";
import { useSelector } from "react-redux";

function StudentHomepage() {
  const user = useSelector((selector) => selector.user);

  if (user.isLoading) return <div />;
  if (!user.isLoggedIn || user.isParent) return <NotLoggedIn />;

  return (
    <React.Fragment>
      <InfoHeader />
      <Container fluid className={`${classes.gBg} px-0`}>
        <Row className="gx-0" style={{ minHeight: "85vh" }}>
          <Col lg={2} className={`${classes.lefNav} p-2`}>
            <SideNavMenu prefix={"/student"} role="STUDENT" />
          </Col>
          <Col lg={10} className="p-3">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default StudentHomepage;
