import React from 'react';
import api from '../helpers/api'
import withAuth from '../helpers/auth';

class Users extends React.Component {
    state = {
        users: [],
    }

    async componentDidMount() {
        try {
            const result = await api.get('/users');

            this.setState({
                users: result.data,
            })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <>
                <h3>Users</h3>

                <ul>
                    {this.state.users.map((user, i) => {
                        return <li key={i}>{user.username}</li>
                    })}
                </ul>
            </>
        )
    }
}

export default withAuth(Users);
