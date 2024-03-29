import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { reactLocalStorage } from "reactjs-localstorage";
import Navbar from "../adminNav";

function BookingDashboard() {
  const [Employees, setEmployees] = useState([]);
  const [PEmployees, setPEmployees] = useState([]);

  const [AllPeddingBooking, setAllPeddingBooking] = useState([]);
  useEffect(() => {
    axios
      .get(global.APIUrl + "/serviceBooking/Servicebooking")
      .then((res) => setAllPeddingBooking(res.data))
      .catch((error) => console.log(error));
  });

  const [AllReject, setAllReject] = useState([]);
  useEffect(() => {
    axios
      .get(global.APIUrl + "/serviceBooking/ServicebookingReject")
      .then((res) => setAllReject(res.data))
      .catch((error) => console.log(error));
  });

  const [AllAccept, setAllAccept] = useState([]);
  useEffect(() => {
    axios
      .get(global.APIUrl + "/serviceBooking/ServicebookingAccept")
      .then((res) => setAllAccept(res.data))
      .catch((error) => console.log(error));
  });

  const [CompleteService, setallServiceComplete] = useState([]);
  useEffect(() => {
    axios
      .get(global.APIUrl + "/serviceBooking/allServiceComplete")
      .then((res) => setallServiceComplete(res.data))
      .catch((error) => console.log(error));
  });

  function remove(username) {
    axios
      .delete(global.APIUrl + "/employee/deleteEmployee/" + username)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Employee Delete",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Employee Not Delete",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  function view(username, name, address, phone, gender, bod, nic) {
    reactLocalStorage.setObject("EmployeeView", [
      username,
      name,
      address,
      phone,
      gender,
      bod,
      nic,
    ]);
    window.location.href = "/EmployeeView";
  }

  function editEmployeeProfile(
    username,
    name,
    address,
    phone,
    gender,
    bod,
    nic,
    position,
    salary
  ) {
    reactLocalStorage.setObject("EmployeeEdit", [
      username,
      name,
      address,
      phone,
      gender,
      bod,
      nic,
      position,
      salary,
    ]);
    window.location.href = "/EmployeeEdit";
  }

  function accept(id) {
    const status = "Accept";
    const statusUpdate = { status };
    axios
      .put(global.APIUrl + "/serviceBooking/statusUpdate/" + id, statusUpdate)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Status Updated!",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/BookingDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Status Not Updated!",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  function reject(id) {
    const status = "Reject";
    const statusUpdate = { status };
    axios
      .put(global.APIUrl + "/serviceBooking/statusUpdate/" + id, statusUpdate)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Status Updated!",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/BookingDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Status Not Updated!",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  function complete(id) {
    const status = "Complete";
    const statusUpdate = { status };
    axios
      .put(global.APIUrl + "/serviceBooking/statusUpdate/" + id, statusUpdate)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Status Updated!",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/BookingDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Status Not Updated!",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  function rejectDelete(id) {
    axios
      .delete(global.APIUrl + "/serviceBooking/deleteserviceBooking/" + id)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Reject Booking Delete",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Reject Booking Not Delete",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  return (
    <div class="dashboard-main-wrapper">
      <div>
        <Navbar />
        <div style={{ paddingTop: "3%", paddingLeft: "2%", width: "98%" }}>
          <h4
            className="text-uppercase  d-letter-spacing fw-bold"
            style={{ color: "black" }}
          >
            <i class="fas fa-home"></i>Admin Dashboard
          </h4>
          <hr />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "2%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <center>
              <h1 className="text-uppercase text-black">
                SL Car Sale Service Booking Management
              </h1>
            </center>
            <div className="text-end mt-5">
              <a href="#Accept">
                <MDBBtn
                  className="btn-sm"
                  style={{ fontSize: "13px", fontWeight: "light" }}
                  outline
                  color="dark"
                >
                  Accepted Booking
                </MDBBtn>{" "}
              </a>
              <a href="#Reject">
                <MDBBtn
                  className="btn-sm"
                  style={{ fontSize: "13px", fontWeight: "light" }}
                  outline
                  color="danger"
                >
                  Reject Booking
                </MDBBtn>{" "}
              </a>
              <a href="#Pending">
                <MDBBtn
                  className="btn-sm"
                  style={{ fontSize: "13px", fontWeight: "light" }}
                  outline
                  color="secondary"
                >
                  Pending Booking
                </MDBBtn>{" "}
              </a>

              <a href="#Complete">
                <MDBBtn
                  className="btn-sm"
                  style={{ fontSize: "13px", fontWeight: "light" }}
                  outline
                  color="success"
                >
                  Complete Booking
                </MDBBtn>{" "}
              </a>
            </div>
            <h3 className="mt-5" id="#Pending">
              Pending Booking
            </h3>
            <MDBTable className="mt-2" hover>
              <MDBTableHead className="bg-dark">
                <tr>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      {" "}
                      Name
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Email
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      {" "}
                      Telephone
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Service{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Vehicle{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Center
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Action
                    </h6>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {AllPeddingBooking.map((Booking, key) => (
                  <tr className="bg-light">
                    <td style={{ fontSize: "18px" }}>{Booking.name}</td>
                    <td style={{ fontSize: "18px" }}>{Booking.email}</td>
                    <td style={{ fontSize: "18px" }}>{Booking.telephone1}</td>
                    <td style={{ fontSize: "18px" }}>{Booking.serviceType}</td>
                    <td style={{ fontSize: "18px" }}>{Booking.vehicleType}</td>
                    <td style={{ fontSize: "18px" }}>
                      {Booking.serviceCenter}
                    </td>
                    <td>
                      <MDBBtn
                        size="lg"
                        className="shadow-0"
                        color="danger"
                        onClick={() => reject(Booking._id)}
                      >
                        <MDBIcon fas icon="times-circle" />
                      </MDBBtn>
                      {""}&nbsp;&nbsp;
                      <MDBBtn
                        size="lg"
                        className="shadow-0"
                        color="success"
                        onClick={() => accept(Booking._id)}
                      >
                        <MDBIcon fas icon="check" />
                      </MDBBtn>
                      {""}&nbsp;&nbsp;
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <br />
          <br />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "1%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <h3 className="mt-5" id="Accept">
              Accepted Bookings
            </h3>
            <MDBTable className="mt-2" hover>
              <MDBTableHead className="bg-dark">
                <tr>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      {" "}
                      Name
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      {" "}
                      Email
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      {" "}
                      Tel
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Service{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Vehicle{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Service Center
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px",fontSize:"20px" }}
                    >
                      Action
                    </h6>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {AllAccept.map((Accept, key) => (
                  <tr className="bg-light">
                    <td style={{ fontSize: "18px" }}>{Accept.name}</td>
                    <td style={{ fontSize: "18px" }}>{Accept.email}</td>
                    <td style={{ fontSize: "18px" }}>{Accept.telephone1}</td>
                    <td style={{ fontSize: "18px" }}>{Accept.serviceType}</td>
                    <td style={{ fontSize: "18px" }}>{Accept.vehicleType}</td>
                    <td style={{ fontSize: "18px" }}>{Accept.serviceCenter}</td>
                    <td>
                      <MDBBtn
                        size="lg"
                        className="shadow-0"
                        color="success"
                        onClick={() => complete(Accept._id)}
                      >
                        <MDBIcon fas icon="check" />
                      </MDBBtn>
                      {""}&nbsp;&nbsp;
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <br />
          <br />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "1%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <h3 className="mt-5" id="Reject">
              Rejected Bookings
            </h3>
            <MDBTable className="mt-2" hover>
              <MDBTableHead className="bg-dark">
                <tr>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Name
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Email
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Tel
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Service{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Vehicle{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Service Center
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Action
                    </h6>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {AllReject.map((Reject, key) => (
                  <tr className="bg-light">
                    <td style={{ fontSize: "18px" }}>{Reject.name}</td>
                    <td style={{ fontSize: "18px" }}>{Reject.email}</td>
                    <td style={{ fontSize: "18px" }}>{Reject.telephone1}</td>
                    <td style={{ fontSize: "18px" }}>{Reject.serviceType}</td>
                    <td style={{ fontSize: "18px" }}>{Reject.vehicleType}</td>
                    <td style={{ fontSize: "18px" }}>{Reject.serviceCenter}</td>
                    <td>
                      <MDBBtn
                        size="lg"
                        className="shadow-0"
                        color="danger"
                        onClick={() => rejectDelete(Reject._id)}
                      >
                        Delete
                      </MDBBtn>
                      {""}&nbsp;&nbsp;
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <br />
          <br />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "1%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <h3 className="mt-5" id="Complete">
              Completed Bookings
            </h3>
            <MDBTable className="mt-2" hover>
              <MDBTableHead className="bg-dark">
                <tr>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Name
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Email
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      {" "}
                      Tel
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Service{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Vehicle{" "}
                    </h6>
                  </th>
                  <th scope="col">
                    <h6
                      className="text-white"
                      style={{ fontWeight: "100", letterSpacing: "2px" ,fontSize:"20px"}}
                    >
                      Service Center
                    </h6>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {CompleteService.map((Complete, key) => (
                  <tr className="bg-light">
                    <td style={{ fontSize: "18px" }}>{Complete.name}</td>
                    <td style={{ fontSize: "18px" }}>{Complete.email}</td>
                    <td style={{ fontSize: "18px" }}>{Complete.telephone1}</td>
                    <td style={{ fontSize: "18px" }}>{Complete.serviceType}</td>
                    <td style={{ fontSize: "18px" }}>{Complete.vehicleType}</td>
                    <td style={{ fontSize: "18px" }}>
                      {Complete.serviceCenter}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default BookingDashboard;
