import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard'
import Register from './components/RegisterNewStudents'
import View from './components/ViewStudents'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: JSON.parse(localStorage.getItem('items')) || []
        }
    }

    addItem = obj =>{
        this.state.items.push(obj)
        this.setState( {items: this.state.items},
        () => {
            localStorage.setItem('items', JSON.stringify(this.state.items))
        });
    }

    setItem = obj =>{
        this.setState({items:obj})
    }



    render() {
        const curProps = {
            items:this.state.items,
            addItem:this.addItem,
            setItem:this.setItem
        }


        return (
            <div className="App">
                <Router>
                    <div>
                        <Navbar/>
                        <Switch>
                            <Route exact path="/" render={(props) => <Dashboard {...props} passedProp = {curProps} />}/>
                            <Route exact path="/RegisterNewStudents" render={(props) => <Register {...props} passedProp = {curProps} />}/>
                            <Route exact path="/ViewStudents" render={(props) => <View {...props} passedProp = {curProps} />}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
