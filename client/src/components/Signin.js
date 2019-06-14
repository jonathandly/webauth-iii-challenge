import React from 'react';
import { withRouter } from 'react-router-dom';

import api from '../helpers/api';

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { username, password } = this.state;

            const result = await api.post('/auth/login', {
                username,
                password
            });
            
            localStorage.setItem('token', result.data.token);
            this.props.history.push('/users');
        } catch(err) {
            console.error(err);
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <>
            <h3>Sign In</h3>

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
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />

                    <button type="submit">Signin</button>
                </form>
            </>
        )
    }
}

export default withRouter(Signin);
