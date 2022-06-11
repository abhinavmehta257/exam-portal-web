import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../helper/common";

function CompetionPage() {

    const [Competion, setCompetion] = useState({});

    /* const handleChange = e => {
        const {name, value} = e.target;
        setUser({ ...user, [name]:value });
    } */

    useEffect(() => {
        axios.post(`${BASE_URL}/fetchallcompetions`)
            .then(res => setCompetion({ "competitions": res.data.competitions })
            )

    }, []);

    const fetchContent = () => {
        return (
            Competion['competitions'] && Competion['competitions'].map((cur) => (
                <Card
                    bg='light'
                    text='dark'
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>{cur.competitionheading}</Card.Header>
                    <Card.Body>
                        <Card.Title>{cur.skills}</Card.Title>
                        <Card.Text>Starts at: {cur.starttime}, Ends at: {cur.endtime}</Card.Text>
                        <Card.Text>Total questions: {cur.noofques}</Card.Text>
                        <Button variant="primary">Start</Button>
                    </Card.Body>
                </Card>
            ))
        )
    };

    return (
        <React.Fragment>
            <div>
                {fetchContent()}
            </div>
        </React.Fragment>

    );
}

export default CompetionPage;