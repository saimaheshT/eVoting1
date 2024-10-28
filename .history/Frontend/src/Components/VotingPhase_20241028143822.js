import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "../Styles/VotingPhase.css";

const VotingPhase = ({ eventId }) => {
  const [acceptedNominations, setAcceptedNominations] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});

  // Fetch accepted nominations on component mount
  useEffect(() => {
    const fetchAcceptedNominations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nominations/accepted/${eventId}`
        );
        const nominationsByRole = response.data.reduce((acc, nomination) => {
          const role = nomination.role;
          if (!acc[role]) acc[role] = [];
          acc[role].push(nomination);
          return acc;
        }, {});
        setAcceptedNominations(nominationsByRole);
      } catch (error) {
        console.error("Error fetching accepted nominations:", error);
      }
    };
    fetchAcceptedNominations();
  }, [eventId]);

  const handleCheckboxChange = (role, studentId) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [role]: prev[role] === studentId ? null : studentId,
    }));
  };

  const clearSelection = (role) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [role]: null,
    }));
  };

  const handleSubmit = () => {
    console.log("Selected Students:", selectedStudent);
    alert("Votes submitted successfully!");
    // Additional submission logic here
  };

  return (
    <div className="voting-phase">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Voting Phase</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5">
        {Object.keys(acceptedNominations).map((role) => (
          <div key={role} className="role-container">
            <h3>{role}</h3>
            {acceptedNominations[role].map((student) => (
              <div className="student-container" key={student._id}>
                <img
                  src={student.image}
                  alt="Student"
                  className="student-image"
                />
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-details">
                    {student.branch} - Section {student.section}
                  </div>
                  <div className="student-description">
                    {student.description}
                  </div>
                </div>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedStudent[role] === student._id}
                    onChange={() => handleCheckboxChange(role, student._id)}
                    className="styled-checkbox"
                  />
                  <span
                    className={`checkmark ${
                      selectedStudent[role] === student._id ? "checked" : ""
                    }`}
                  ></span>
                </label>
              </div>
            ))}
            <Button
              className="clear-button"
              onClick={() => clearSelection(role)}
            >
              Clear
            </Button>
          </div>
        ))}
        <div className="submit-container">
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Container>

      <footer className="footer">Voting System © 2024</footer>
    </div>
  );
};

export default VotingPhase;