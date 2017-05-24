import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Nav from './nav';
import RecipeDisplay from './recipeDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignUpSubmit() {
    axios.post('/signup', { username: this.state.username, password: this.state.password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      });
  }

  handleLoginSubmit() {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                handleChange={this.handleChange}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                handleChange={this.handleChange}
                handleSignUpSubmit={this.handleSignUpSubmit}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            path="/search"
            render={({ match }) => (
              this.state.isAuthenticated ?
                <RecipeDisplay
                  username={this.state.username}
                  isAuthenticated={this.state.isAuthenticated}
                  match={match}
                /> :
                <p>NOT AUTHORIZED</p>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              this.state.isAuthenticated ?
                <Profile
                  username={this.state.username}
                  isAuthenticated={this.state.isAuthenticated}
                /> :
                <p>NOT AUTHORIZED</p>
            )}
          />
        </div>
      </Router>
    );
  }
}

module.exports = App;
