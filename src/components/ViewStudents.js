import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/cjs/Button";
class Dashboard extends Component {

clearAndRefresh(){
    localStorage.clear();
    window.location.reload();
}

  render() {
    return (
        <section className="section mt-3">
            <div>
                <Navbar bg="light">
                    <Navbar.Brand>View registered students</Navbar.Brand>
                    <Button onClick={ this.clearAndRefresh}>Clear</Button>
                </Navbar>
                <Container>
                    <BootstrapTable data={Array.isArray(this.props.passedProp.items)?this.props.passedProp.items:[]} striped hover>
                      <TableHeaderColumn isKey dataField='Name'>Name</TableHeaderColumn>
                      <TableHeaderColumn dataField='Age'>Age</TableHeaderColumn>
                      <TableHeaderColumn dataField='Mobile'>Mobile</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
            </div>
        </section>
    );
  }
}

export default Dashboard;
