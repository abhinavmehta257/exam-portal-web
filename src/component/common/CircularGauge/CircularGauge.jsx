import React from "react";
import { styled } from "@mui/material/styles";
// import { keyframes } from "@mui/system";
import PropTypes from "prop-types";

const Container = styled("div")(({ theme }) => ({
  width: 160,
  height: 160,
  position: "relative",
}));

const Score = styled("span")(() => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

// const width = 160,
//   height = 160,
//   strokeWidth = 16,
//   score = 8,
//   total = 10;

// export default CircularGauge;

class CircularGauge extends React.Component {
  size = 0;
  innerWidth = 0;
  total = 0;
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.total = this.props.total || 1;
    this.size = this.props.size;
    this.innerWidth = this.props.size - 2 * this.props.strokeWidth;
  }

  componentDidMount() {
    let _intervalId = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
      if (this.state.count >= this.props.score) {
        clearInterval(this.state.intervalId);
      }
    }, 75);

    this.setState({
      intervalId: _intervalId,
    });
  }

  render() {
    const progressDeg = (this.state.count / (this.props.total || 10)) * 360;

    return (
      <Container>
        <div
          className="outer"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: this.size,
            height: this.size,
            borderRadius: "50%",
            background: `conic-gradient(#4D5Bf9 ${progressDeg}deg,#cadcff ${progressDeg}deg)`,
          }}
        >
          <div
            className="inner"
            style={{
              position: "absolute",
              width: this.innerWidth,
              height: this.innerWidth,
              borderRadius: "50%",
              backgroundColor: "#fff",
              left: this.props.strokeWidth,
              top: this.props.strokeWidth,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Score>
              {this.state.count} / {this.total}
            </Score>
          </div>
        </div>
      </Container>
    );
  }
}

CircularGauge.defaultProps = {
  size: 160,
  strokeWidth: 16,
  total: 10,
  score: 8,
};

CircularGauge.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  total: PropTypes.number,
  score: PropTypes.number,
  //     userInfo: React.PropTypes.object,
  //   cityList: React.PropTypes.array.isRequired,
  //   provinceList: React.PropTypes.array.isRequired,
};

export default CircularGauge;
