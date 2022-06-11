import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import InfoHeader from "../infoheader/InfoHeader";
import classes from "./parentStudent.module.css";
import Footer from "../footer/Footer";
import SideNavMenu from "./SideNavMenu";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NotLoggedIn from "../NotLoggedIn";

function Parent() {
  const user = useSelector((selector) => selector.user);

  if (user.isLoading) return <div />;
  if (!user.isLoggedIn || !user.isParent) return <NotLoggedIn />;

  return (
    <React.Fragment>
      <InfoHeader />
      <Container fluid className={`${classes.gBg} px-0`}>
        <Row className="gx-0" style={{ minHeight: "85vh" }}>
          <Col lg={2} className={`${classes.lefNav} p-2`}>
            <SideNavMenu prefix={"/parent"} />
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

export default Parent;
