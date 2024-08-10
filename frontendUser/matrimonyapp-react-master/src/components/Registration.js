import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';
import '../assets/register.css'; // Ensure this path is correct
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regdata: {
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                gender: "",
                dateOfBirth: "",
                maritalStatus: "",
                address: "",
                religion: "",
                religionPref: "",
                email: "",
                mobileNumber: "",
                education: "",
                occupation: "",
                income: "",
                aboutMe: ""
            }
        };
    }

    validateFields = () => {
        const { regdata } = this.state;

        // Check if any required field is empty
        for (const [key, value] of Object.entries(regdata)) {
            if (value.trim() === "") {
                return key; // Return the first empty field's name
            }
        }
        return null; // Return null if all fields are filled
    };

    register = (event) => {
        event.preventDefault();
        const { regdata } = this.state;

        // Validate fields before submission
        const emptyField = this.validateFields();
        if (emptyField) {
            swal("Error", `${emptyField} is required. Please fill it out.`, "error");
            return;
        }

        axios.post('http://localhost:8080/api/register', regdata, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            console.log(response.data);
            swal("Registration Successful!", "Done", "success");
            this.props.history.push('/login');
        }).catch(error => {
            // Check if there is a response from the server
            if (error.response && error.response.data) {
                // Display the error message from the server
                swal("Registration Error", error.response.data, "error");
            } else {
                // Display a generic error message if there is no server response
                swal("Error", "An error occurred. Please try again later.", "error");
            }
            console.log(error);
        });
    }

    regHandler = (event) => {
        const { regdata } = this.state;
        regdata[event.target.name] = event.target.value;
        this.setState({ regdata });
        console.log(this.state.regdata, "name");
    }

    render() {
        return (
            <div className="reg">
                <div className="container">
                    <h1 align="center">Matrimonial Registration Form</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fname">First Name:</label>
                            <input type="text" className="form-control" id="fname" name="firstName" placeholder="First Name" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Last Name:</label>
                            <input type="text" className="form-control" id="lname" name="lastName" placeholder="Last name.." onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" name="gender" onChange={this.regHandler} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">DOB:</label>
                            <input type="date" className="form-control" id="dob" name="dateOfBirth" placeholder="Enter DOB" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="religion">Religion:</label>
                            <input type="text" className="form-control" id="religion" name="religion" placeholder="Religion" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maritalStatus">Marital Status:</label>
                            <input type="text" className="form-control" id="maritalStatus" name="maritalStatus" placeholder="Marital Status" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Address" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label>Religion Preferences:</label>
                            <select className="form-control" name="religionPref" onChange={this.regHandler} required>
                                <option value="">Select Preference</option>
                                <option value="As per My Religion">As per My Religion</option>
                                <option value="Any Religion">Any Religion</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Id:</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email id" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile.No:</label>
                            <input type="number" className="form-control" id="mobileNumber" name="mobileNumber" placeholder="Contact Number" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Education:</label>
                            <input type="text" className="form-control" id="education" name="education" placeholder="Education" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="occupation">Occupation:</label>
                            <input type="text" className="form-control" id="occupation" name="occupation" placeholder="Occupation" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="income">Income:</label>
                            <input type="number" className="form-control" id="income" name="income" placeholder="Salary" onChange={this.regHandler} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="aboutMe">About me:</label>
                            <textarea className="form-control" id="aboutMe" name="aboutMe" placeholder="Enter something about you" onChange={this.regHandler} required></textarea>
                        </div>
                        <br />
                        <button className="btn btn-primary" onClick={this.register}>Register</button>
                        <Link to="/login"><button className="btn btn-secondary">Login</button></Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
