import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../helpers/api';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        department: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { username, password, department } = this.state;

            const result = await api.post('/auth/register', {
                username,
                password,
                department,
            });
            localStorage.setItem('token', result.data.token);
            this.props.history.push('/users');
        } catch(err) {
            console.error(err);
        }
    }

    handleChange = event =>  {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <>
                <h3>Signup</h3>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <input 
                        type="text"
                        name="department"
                        placeholder="Department"
                        onChange={this.handleChange}
                        value={this.state.department}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </>
        )
    }
}

export default withRouter(Signup);
