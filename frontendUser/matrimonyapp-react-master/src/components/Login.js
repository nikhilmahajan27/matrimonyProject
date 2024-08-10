import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import login from '../assets/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                username: "",
                password: ""
            },
            profileData: null,
            errorMessage: ""
        };
    }

    login = (event) => {
        event.preventDefault();
        const { formdata } = this.state;

        axios.post('http://localhost:8080/api/login', formdata)
            .then((response) => {
                console.log(response.data);
                this.setState({ profileData: response.data });
                this.props.history.push('/listof/' + response.data.userId);
            })
            .catch((error) => {
                console.error("Login failed:", error);
                this.setState({ errorMessage: "Invalid username or password" });
            });
    }

    // login = (event) => {
    //     event.preventDefault();
    //     const { formdata } = this.state;
    
    //     axios.post('http://localhost:8080/api/login', formdata)
    //         .then((response) => {
    //             console.log(response.data);
    //             this.setState({ profileData: response.data });
    //             // Redirect with profileId in the path and userId in the query parameters
    //             this.props.history.push(`/listof/${response.data.id}?userId=${response.data.id}`);
    //         })
    //         .catch((error) => {
    //             console.error("Login failed:", error);
    //             this.setState({ errorMessage: "Invalid username or password" });
    //         });
    // };

    loginHandler = (event) => {
        const { formdata } = this.state;
        formdata[event.target.name] = event.target.value;
        this.setState({ formdata });
    }

    render() {
        const { errorMessage, profileData } = this.state;
        return (
            <div className="login">
                <h1 align="center" color="white">Matrimonial Login Form</h1>
                <form className='needs-validation container'>
                    <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" className="form-control mb-2" placeholder="User Name" name="username" onChange={this.loginHandler} required />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control mb-2" placeholder="Password" name="password" onChange={this.loginHandler} required />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div>
                        <button onClick={this.login}>Login</button>
                        <button type='reset'>Reset</button>
                    </div>
                </form>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {profileData && (
                    <div>
                        <h2>Welcome, {profileData.firstName} {profileData.lastName}</h2>
                        <p>Gender: {profileData.gender}</p>
                        <p>Address: {profileData.address}</p>
                        {/* Display other profile data as needed */}
                    </div>
                )}
            </div>
        )
    }
}

export default Login;
