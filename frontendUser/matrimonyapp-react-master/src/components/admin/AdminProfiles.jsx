import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import UserProfile from './UserProfile';

const AdminProfiles = () => {

    const [allusers, setAllusers] = useState([]);

    useEffect(() => {
        //axios.get('http://localhost:5000/auth/getusers')
        axios.get('http://localhost:8080/api/getusers')
            .then(response => {
                setAllusers(response.data);
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
            });
    }, []);



    // Features of Admin panel
    // Dashboard is designed with graphs, and tables where you can view overall app functionality like today or month-wise register user, total send, accept, reject a request by one user to another, also you can filter the data as per the date
    // You can see the list of app users, admin users, and block users which is done by the system with the search functionality
    // Admin can add the packages for the app user so they can make a bond with the other user by chat, call etc.
    // admin have created all the master entry of occupation, religion, community, annual Income, education etc of the user with edit, add and active/inactive, search functionality.
    // Here you can find the report with print, and export to the CSV facility.
    // you also add the faqs





    const [selectedUser, setSelectedUser] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);




    const handleViewProfile = user => {
        setSelectedUser(user);
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setSelectedUser(null);
        setShowProfileModal(false);
    };


    const deleteUser = (userId) => {
        // Make a DELETE request to your backend to delete the user by ID
        axios
          .delete(`http://localhost:8080/auth/deleteuser/${userId}`)
          .then((response) => {
            // Handle the deletion success (e.g., remove the user from the list)
            const updatedUsers = allusers.filter((user) => user._id !== userId);
            setAllusers(updatedUsers);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      };





    return (
        <>

            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-sm-12 mb-4 mb-xl-0">
                            <h4 className="font-weight-bold text-dark">Welcome, Admin</h4>
                            <p className="font-weight-normal mb-2 text-muted">All Profiles</p>
                        </div>
                    </div>
                    <div className="row mt-3">

                        <div className="container">

                            <div className="row my-3">

                                {allusers.map(all => (


                                    <div className="col my-3" key={all._id} style={{margin:"10px 30px", backgroundColor:"white", padding:"10px 30px"}}>
                                        <img className="card-img-top" style={{ width: "200px" }} src={`http://localhost:8080/${all.image}`} alt="Card cap" />


                                        <div>
                                            <p className='my-2'><strong>Name: </strong>{all.name}</p>
                                            <p className='my-2'><strong>Age: </strong> {all.age}</p>

                                            <p className='my-2'><strong>Caste: </strong> {all.caste}</p>
                                            <p className='my-2'><strong>State: </strong> {all.state}</p>
                                            <p className='my-2'><strong>District: </strong> {all.district}</p>
                                            <p className='my-2'><strong>DOB: </strong> {all.dob}</p>

                                        </div>
                                        
                                        <button className="btn btn-info btn-sm" onClick={() => handleViewProfile(all)}>View</button>
                                        <button
                      onClick={() => deleteUser(all._id)} // Pass the user's ID for deletion
                      className="mx-1 my-1 btn btn-sm btn-danger"
                    >Delete</button>
                                        
                                    </div>
                                ))}

                            </div>




                        </div>
                    </div>


                </div>

            </div>

            <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && <UserProfile user={selectedUser} />}
                </Modal.Body>
            </Modal>






        </>
    )
}

export default AdminProfiles