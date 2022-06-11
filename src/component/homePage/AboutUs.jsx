import React from "react";
import { Typography } from "@mui/material";
import ProgrammeHeader from "./ProgrammeHeader";

const paraBottom = { mb: "2rem" };

function AboutUs() {
  return (
    <div>
      <ProgrammeHeader />
      <div className="row">
        <div className="col-md-2" />
        <div
          className="col-md-8"
          style={{ padding: "2rem", maxWidth: "100vw", overflow: "hidden" }}
        >
          <Typography variant="h3" gutterBottom component="div">
            About SuperC
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            The SuperC is a competition program and the new leader in education
            exploration. The team has a diverse workforce and works with many
            more contractors, academia, and international and commercial
            partners to explore, discover, and expand knowledge for the benefit
            of humanity.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            Superc began developing learning resources in 2021 and specialises
            in preparing pupils for 11+ exams, SATs and many more.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            The founder of Superc , started creating, developing and publishing
            his own ‘how-to’ material for use within his tuition classes. As the
            number of books grew he decided to publish them for wider use. There
            are now over 100 books in the range and these are constantly being
            improved to meet the needs of parents, tutors, children and changing
            exam board requirements. New books are continuously being added to
            the range to ensure that all 11+ preparation requirements are
            covered.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            Does your child love maths? Do they enjoy being intellectually
            challenged? Then training to become a successful mathlete might be
            the ultimate extracurricular activity for them! Several national and
            international maths competitions take place throughout the year for
            kids and teens. Our extraordinary Competitive Maths classes will
            help your child unleash their full potential in these competitions.
            Your child will have fun learning to solve challenging maths
            problems with like minded peers.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            In each session we explore problem sets that begin at very
            accessible levels, then quickly require more complex thinking –
            enabling your child to develop mathematical knowledge, reasoning,
            and problem-solving skills well beyond the requirements of the
            national curriculum. Our approach models mathematical thinking from
            multiple viewpoints and highlights the importance of student
            conversation and voice in learning mathematics.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            Problem Solving Strategies we develop include: Systematic listing,
            Guess and improve, Visual modelling ,Working backwards, Looking for
            Patterns and Logical Reasoning.
          </Typography>
          <Typography variant="body1" sx={paraBottom}>
            Topics we cover: Arithmetic , Algebraic Thinking , Geometry and
            Measures, Statistics and Probability
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Typography variant="h4" gutterBottom>
              Benefits
            </Typography>

            <ul>
              <li>
                Strengthen creative problem solving and logical reasoning skills
              </li>
              <li>
                Improve performance in all school maths exams and entrance tests
                (11+, SATs, 13+, GCSE, A-level).
              </li>
              <li>
                Gain a competitive edge against their peers in prestigious
                national competitions.
              </li>
              <li>
                Participate in international maths competitions which may not be
                available via their school.
              </li>
              <li>
                <b>‘Stand out from the crowd’</b> when applying for entrance to
                top: ; universities.
              </li>
              <li>
                Be better prepared for the rigours of mathematically rich
                subjects at university.
              </li>
              <li>Learn with like minded peers.</li>
            </ul>
          </Typography>
          {/* <Typography variant="body1" gutterBottom></Typography> */}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
