import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/cjs/Button";
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
class Dashboard extends Component {



  render() {
    return (
        <section className="section mt-3">
      <div>
        <Navbar bg="light">
          <Navbar.Brand>Dashboard - Total number of registered students: {this.props.passedProp.items.length}</Navbar.Brand>

        </Navbar>
        <Container>
          <Row >

            <div className="col-sm">
              <Link to="/RegisterNewStudents">
                <Button variant={"primary py-0"}
                        type={"button"}
                        style={{ height: '50px',width:'200px' }}
                        class = "btn btn-primary btn-lg">
                  Register Students
                </Button>
              </Link>
            </div>
            <div className="col-sm">
              <Link to="/ViewStudents">
                <Button variant={"primary py-0"}
                        type={"button"}
                        style={{ height: '50px' ,width:'200px'}}
                        class = "btn btn-primary btn-lg">
                  View Students
                </Button>
              </Link>
            </div>
          </Row>
        </Container>


      </div>
        </section>
    );
  }
}

export default Dashboard;
