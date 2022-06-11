import React from 'react';
import Header from '../header/Header'
import Slider from './Slider'
import Section1 from './Section1';
import Footer from '../footer/Footer'

function HomePage(){
    return(
        <React.Fragment>
            <Header/>
            <Slider/>
            <Section1/>
            <Footer/>
        </React.Fragment>
    );
}

export default HomePage;