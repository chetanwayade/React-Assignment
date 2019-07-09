import React, { Component } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import '../css/App.css';

class App extends Component {
    constructor() {
        super();        
        this.state = {
            rows: [],
            showError: false,
            errMsg: ''
        };
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const persons = res.data;
            this.setState({
                rows: persons,
                showError: false
            });
          }).catch(error => {
            this.setState({
                showError: true,
                errMsg: error
            });
          });
    }

    render() {
        if (this.state.showError) {                        
            return <h3 className="loading">{this.state.errMsg.message}</h3>;
        }
        else {
            return this.state.rows.length > 0 ? 
            <UserTable users={this.state.rows}/> : 
            <h3 className="loading">Loding...</h3>;
        }                        
    }
}

export default App;