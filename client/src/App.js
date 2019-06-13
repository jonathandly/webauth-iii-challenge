import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Users from './components/Users';

class App extends React.Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin');
  }
  
  render() {
    return (
      <>
        <h1>Welcome</h1>

        <ul>
          <li><NavLink to="/signin" component={Signin}>Sign In</NavLink></li>
          <li><NavLink to="/signup" component={Signup}>Sign Up</NavLink></li>
          <li><NavLink to="/users" component={Users}>Users</NavLink></li>
          <li><button onClick={this.logout}>Logout</button></li>
        </ul>

        <main>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }
}

export default App;
