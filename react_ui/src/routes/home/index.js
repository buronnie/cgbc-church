import React, { Component } from 'react';
import userFactory from '../../factories/user';
import { Button, DatePicker } from 'antd';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }
  getAllUsers = () => {
    userFactory.index().then(
      (res) => { this.setState({ users: res.data });},
      (res) => {console.log(res.responseJSON.errors);},
    );
  };

  render() {
    let items = null;
    if (this.state.users !== null) {
      items = this.state.users.map((user) => {
        return <p key={user.id}>Email: {user.attributes.email}</p>;
      });
    }

    return (
      <div>
        <Button onClick={this.getAllUsers}>Users</Button>
        { items }
        <DatePicker />
        <div className="jumbotron">
          <h1>Hello, world!</h1>
          <p>...</p>
          <p><button className="btn btn-primary btn-lg">Learn more</button></p>
        </div>
      </div>
    );
  }
}
