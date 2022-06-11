import React, { Fragment } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import SliderImg1 from '../../images/cr1.jpg';
import './slider.css';

function Slider() {
    return (
        <Fragment>
            <div className="container-fluid blueBar p-1"></div>
            <Carousel variant="dark" className="topSlider">
                <Carousel.Item>
                    <img
                        src={SliderImg1}
                        alt="First slide"
                        className="w-100"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={SliderImg1}
                        alt="First slide"
                        className="w-100"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={SliderImg1}
                        alt="First slide"
                        className="w-100"
                    />
                </Carousel.Item>
            </Carousel>
        </Fragment>
    );
}

export default Slider;