import React, { Component } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import "../css/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      showError: false,
      errMsg: ""
    };
  }

  validateZipcode(zipcode) {
    const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    let zipSet = zipcode.split("-");
    let firstPart = Number(zipSet[0]);
    let secondPart = Number(zipSet[1]);
    return regex.test(firstPart + "-" + secondPart) ? true : false;
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const persons = res.data;
        this.setState({
          rows: persons,
          showError: false
        });
      })
      .catch(error => {
        this.setState({
          showError: true,
          errMsg: error
        });
      });
  }

  render() {
    if (this.state.showError) {
      return <h3 className="loading">{this.state.errMsg.message}</h3>;
    } else {
      return this.state.rows.length > 0 ? (
        <UserTable
          users={this.state.rows}
          validateZipcode={this.validateZipcode}
        />
      ) : (
        <h3 className="loading">Loding...</h3>
      );
    }
  }
}

export default App;
