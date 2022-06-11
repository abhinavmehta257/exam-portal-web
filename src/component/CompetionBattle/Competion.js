import { Button } from "react-bootstrap";
import { Col } from 'react-bootstrap';
import CompetitionForm from './CompetiotionForm';
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
                    <title>trophy</title>
                    <path d="M26 6v-4h-20v4h-6v4c0 3.314 2.686 6 6 6 0.627 0 1.232-0.096 1.801-0.275 1.443 2.063 3.644 3.556 6.199 4.075v6.2h-2c-2.209 0-4 1.791-4 4h16c0-2.209-1.791-4-4-4h-2v-6.2c2.555-0.519 4.756-2.012 6.199-4.075 0.568 0.179 1.173 0.275 1.801 0.275 3.314 0 6-2.686 6-6v-4h-6zM6 13.625c-1.999 0-3.625-1.626-3.625-3.625v-2h3.625v2c0 1.256 0.232 2.457 0.655 3.565-0.213 0.039-0.431 0.060-0.655 0.060zM29.625 10c0 1.999-1.626 3.625-3.625 3.625-0.224 0-0.442-0.021-0.655-0.060 0.423-1.107 0.655-2.309 0.655-3.565v-2h3.625v2z"></path>
                </svg></div>
                <h3 className={classes.heading}>Compitition</h3>
                <div className={classes.text}>
                    <h4>Create New Competition</h4>
                    Create new competion by providing information such as date, time of competion. Add question and other details to create.
                </div>
                <Button variant="success" className={`${classes.gShadow} mt-4`} onClick={openForm}>Create</Button>
            </Col>

            {open && <CompetitionForm onSubmit={closeForm}></CompetitionForm>}
        </React.Fragment>
    )

}

export default Competition;