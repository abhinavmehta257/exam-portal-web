import classes from './section1.module.css';
import { CloseButton } from 'react-bootstrap';
import React, { useState } from 'react';

let mainData;
function PopUP(props) {


    const [mainPop, setMainPop] = useState(false);

    function detailPop(e) {
        setMainPop(true);
        mainData = e.target.getAttribute("data");
    }
    function detailPopClose() {
        setMainPop(false);
    }

    let listData = props.detailList.map(
        function (va) {
            return (
                <li key={Math.random()} data={va[1]} onClick={detailPop}>{va[0]}</li>
            )
        }
    );



    return (
        <div className={classes.subPopUp}>
            {(mainPop) ? <div className={classes.mainPop}><div className="text-end"><CloseButton onClick={detailPopClose} /></div>{mainData}</div> : ""}
            <div className="text-end"><CloseButton onClick={props.exitPop} /></div>
            <h3>{props.heading}</h3>
            <div>{props.content}</div>
            <div>
                <ul>{listData}</ul>
            </div>
        </div>
    );



}
export default PopUP;