import Button from 'react-bootstrap/Button';
import { Col } from "react-bootstrap";
import BattleForm from './BattleForm';
import React from 'react';
import classes from '../adminPage/adminPage.module.css'

function Competition() {
    const [open, setOpen] = React.useState(false);

    const openForm = () => {
        setOpen(true);
    }
    const closeForm = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <Col md={4} className={`p-3 text-center ${classes.borderR}`}>
                <div className={classes.icon}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>shield</title>
                    <path d="M30 0l-14 4-14-4c0 0-0.141 1.616 0 4l14 4.378 14-4.378c0.141-2.384 0-4 0-4zM2.256 6.097c0.75 7.834 3.547 21.007 13.744 25.903 10.197-4.896 12.995-18.069 13.744-25.903l-13.744 5.167-13.744-5.167z"></path>
                </svg></div>
                <h3 className={classes.heading}>Battle</h3>
                <div className={classes.text}>
                    <h4>Create New Battle</h4>
                    Create new competion by providing information such as date, time of competion. Add question and other details to create.
                </div>
                <Button variant="success" className={`${classes.gShadow} mt-4`} onClick={openForm}>Create</Button>
            </Col>

            {open && <BattleForm onSubmit={closeForm}></BattleForm>}
        </React.Fragment>
    )

}

export default Competition;