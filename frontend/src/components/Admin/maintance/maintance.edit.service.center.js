import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { reactLocalStorage } from "reactjs-localstorage";
import Navbar from "../adminNav";
import NumberFormat from "react-number-format";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ServiceCenterEdit() {
  var service_center = reactLocalStorage.getObject("service_center");
  const id = service_center[0];

  const [location, setLocation] = useState(service_center[1]);
  const [address, setAddress] = useState(service_center[2]);
  const [telephone1, setTelephoneOne] = useState(service_center[3]);
  const [telephone2, setTelephoneTwo] = useState(service_center[4]);
  const [email, setEmail] = useState(service_center[6]);
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" +
      service_center[5]
  );

  function Edit(e) {
    e.preventDefault();
    const Service_centerUpdate = { address, telephone1, email, telephone2 };

    axios
      .put(
        global.APIUrl + "/service_Center/Service_centerUpdate/" + id,
        Service_centerUpdate
      )
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Service Center Updated!",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/ServiceCenter";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Service Center Not Update!",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  return (
    <div class="dashboard-main-wrapper">
      <Navbar />
      <div >
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
              <h1 className="text-uppercase">Edit Service Center </h1>
            </center>
            <MDBRow className="mt-3">
              <MDBCol sm="5">
                <MDBCard className="shadow-0">
                  <MDBCardBody id="divToPrint">
                    <MDBCardImage src={image} alt="..." fluid />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol sm="1"></MDBCol>
              <MDBCol sm="6">
                <MDBCard className="shadow-0">
                  <MDBCardBody className="bg-light">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label h6"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        disabled
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label h6"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label h6"
                      >
                        Telephone Number 1
                      </label>
                      <NumberFormat
                        format="### ### ####"
                        class="form-control"
                        placeholder="000 000 0000"
                        value={telephone1}
                        onChange={(e) => {
                          setTelephoneOne(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label h6"
                      >
                        Telephone Number 2
                      </label>
                      <NumberFormat
                        format="### ### ####"
                        class="form-control"
                        placeholder="000 000 0000"
                        value={telephone2}
                        onChange={(e) => {
                          setTelephoneTwo(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label h6"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="text-end">
                      <button
                        type="button"
                        class="btn btn-dark d-letter-spacing "
                        onClick={Edit}
                      >
                        Edit
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <a href="ServiceCenter">
                        <MDBBtn
                          className="btn-sm"
                          outline
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            letterSpacing: "2px",
                          }}
                          color="dark"
                        >
                          Back
                        </MDBBtn>
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCenterEdit;
