import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/cjs/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import validator from 'validator'
import './App.css';

class RegisterNewStudents extends Component {

  constructor(props) {
    super(props);


    this.state = {firstname: '',
      lastname: '',
      DOB: '',
      mobile: '',
      BirthMark: '',
      errors:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  handleSubmit(event) {
    event.preventDefault();

    //VALIDATE
    const errors = [];

    //firstname only accept alphabets
    if (!validator.isAlpha(this.state.firstname)) {
      errors.push("firstname");
    }

    //lastname only accept alphabets
    if ( !validator.isAlpha(this.state.lastname)) {
      errors.push("lastname");
    }

    //Birthday need to be 5 years older from now
    const enteredDate = Date.parse(this.state.DOB);
    const curDate = new Date();
    if (curDate.getTime()-enteredDate<5*365*24*3600000) {
      errors.push("DOB");
    }

    //Phone number only accept numbers
    if ( !validator.isMobilePhone(this.state.mobile)) {
      errors.push("mobile");
    }

    this.setState({
      errors: errors
    });

    if (errors.length > 0) {
      return false;
    } else {
        this.props.passedProp.items.forEach(element => {

          if (element.firstname === this.state.firstname
              && element.lastname === this.state.lastname
              && element._mobile === this.state.mobile
          ) {
            errors.push("duplicate");
            return false;
          }
        })
      if (errors.length > 0) {
        this.setState({
          errors: errors
        });
        return false;
      }else{
        this.props.passedProp.addItem(this.getObj());
        this.props.history.push("/");
      }

    }
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  getObj(){
    let name = this.state.lastname+", "+this.state.firstname
    const enteredDate = Date.parse(this.state.DOB);
    const curDate = new Date();
    let age = Math.floor((curDate.getTime()-enteredDate)/(365*24*3600000));
    let ageStr = age>20? age+" Yrs":age+" Yrs (Minor)"
    let mobile = this.normalizeNumber(this.state.mobile,"1");
    return {
      "firstname":this.state.firstname,
      "lastname":this.state.lastname,
      "DOB":this.state.DOB,
      "_mobile":this.state.mobile,
      "Mobile":mobile,
      "birthmark":this.state.BirthMark,
      "Name": name,
      "Age": ageStr,
    }
  }

  normalizeNumber(input) {

      return input.slice(-10,-7)+"-"+input.slice(-7,-4)+"-"+input.slice(-4)

  }


  render() {


    return (
        <section className="section mt-3">
      <div>
        <Navbar bg="light">
          <Navbar.Brand>Register new students</Navbar.Brand>

        </Navbar>
        <Container>

          <Form  onSubmit={this.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="studentFirstname">
                <Form.Label>First name</Form.Label>
                <input name = "firstname" className={
                      this.hasError("firstname")
                          ? "form-control is-invalid"
                          : "form-control"
                    } onChange={this.handleInputChange} required
                              type="name" placeholder="Enter your first name" />
                <div
                    className={
                      this.hasError("firstname") ? "inline-errormsg" : "hidden"
                    }
                >
                  Firstname is not valid, please enter only alphabets
                </div>
              </Form.Group>

              <Form.Group as={Col} className="mb-3"  controlId="studentLastname">
                <Form.Label>Last name</Form.Label>
                <input name = "lastname" className={
                  this.hasError("lastname")
                      ? "form-control is-invalid"
                      : "form-control"
                } onChange={this.handleInputChange} required
                              type="text" placeholder="Enter your last name" />
                <div
                    className={
                      this.hasError("lastname") ? "inline-errormsg" : "hidden"
                    }
                >
                  Lastname is not valid, please enter only alphabets
                </div>

              </Form.Group>

            </Row>

            <Form.Group className="mb-3"  controlId="DOB">
              <Form.Label>Date of Birth</Form.Label>
              <input name = "DOB" className={
                this.hasError("DOB")
                    ? "form-control is-invalid"
                    : "form-control"
              } type="date" required onChange={this.handleInputChange}  />
              <div
                  className={
                    this.hasError("DOB") ? "inline-errormsg" : "hidden"
                  }
              >
                The Date of birth you have chosen is not valid, we only accept for students older than 5 years to register
              </div>
            </Form.Group>

            <Form.Group className="mb-3"  controlId="phoneNumber">
              <Form.Label>Mobile number</Form.Label>
              <input name = "mobile" className={
                this.hasError("mobile")
                    ? "form-control is-invalid"
                    : "form-control"
              } onChange={this.handleInputChange} required
                            type="mobile" placeholder="Enter your phone number" />
              <div
                  className={
                    this.hasError("mobile") ? "inline-errormsg" : "hidden"
                  }
              >
                The mobile number you have entered is not valid, please enter 10 digits phone number
              </div>
            </Form.Group>

            <Form.Group className="mb-3"  controlId="BirthMark">
              <Form.Label>Birth mark</Form.Label>
              <Form.Control type="text" name="BirthMark" onChange={this.handleInputChange}
                            as="textarea" rows={3} placeholder="Option. Enter your birth mark" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div
                className={
                  this.hasError("duplicate") ? "inline-errormsg" : "hidden"
                }
            >
              The student is already been registered.
            </div>
          </Form>
        </Container>
      </div>
        </section>
    );
  }
}

export default RegisterNewStudents;
