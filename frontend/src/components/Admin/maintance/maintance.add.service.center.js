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
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { reactLocalStorage } from "reactjs-localstorage";
import Navbar from "../adminNav";
import NumberFormat from "react-number-format";
import html2canvas from "html2canvas";

function ServiceCenter() {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [telephone1, setTelephoneOne] = useState("");
  const [telephone2, setTelephoneTwo] = useState("");
  const [email, setEmail] = useState("");
  const [imageSelected, setimageSelected] = useState("");

  const [ServiceCenters, setServiceCenter] = useState([]);
  useEffect(() => {
    axios
      .get(global.APIUrl + "/service_Center/allService_center")
      .then((res) => setServiceCenter(res.data))
      .catch((error) => console.log(error));
  });

  function Save(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ml_default");

    axios
      .post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload", formData)
      .then((response) => {
        console.log(imageSelected);
        const picture = imageSelected.name;

        const addService_center = {
          location,
          address,
          telephone1,
          email,
          telephone2,
          picture,
        };

        axios
          .post(
            global.APIUrl + "/service_Center/addService_center",
            addService_center
          )
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Service Center Added!",
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
              text: "Service Center Not Added!",
              icon: "error",
              confirmButtonText: "OK",
              type: "success",
            });
          });
      });
  }

  function remove(location) {
    axios
      .delete(
        global.APIUrl + "/service_Center/deleteService_center/" + location
      )
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Service Center Deleted",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Service Center Not Delete",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  function edit(_id, location, address, telephone1, telephone2, image, email) {
    reactLocalStorage.setObject("service_center", [
      _id,
      location,
      address,
      telephone1,
      telephone2,
      image,
      email,
    ]);
    window.location.href = "/ServiceCenterEdit";
  }

  return (
    <div class="dashboard-main-wrapper">
      <Navbar />
      <div>
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
              <h2 className="text-uppercase">Add New Service Center </h2>
              <br/>
            </center>
            <MDBRow className="mt-3">
              <MDBCol sm="5">
                <MDBCard className="shadow-0">
                  <MDBTable borderless className="mt-3">
                    <MDBTableHead>
                      <tr className="bg-dark">
                        <th
                          scope="col"
                          className="text-white d-letter-spacing h6"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="text-white d-letter-spacing h6 text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {ServiceCenters.map((ServiceCenter, key) => (
                        <tr className="bg-light">
                          <td>
                            <h6>{ServiceCenter.location}</h6>
                          </td>
                          <td className="text-center">
                            <MDBBtn
                              size="sm"
                              className="shadow-0"
                              color="danger"
                              onClick={() => remove(ServiceCenter.location)}
                            >
                              <MDBIcon fas icon="trash-alt" />
                            </MDBBtn>
                            {""}&nbsp;&nbsp;
                            <MDBBtn
                              size="sm"
                              className="shadow-0"
                              color="success"
                              onClick={() =>
                                edit(
                                  ServiceCenter._id,
                                  ServiceCenter.location,
                                  ServiceCenter.address,
                                  ServiceCenter.telephone1,
                                  ServiceCenter.telephone2,
                                  ServiceCenter.image,
                                  ServiceCenter.email
                                )
                              }
                            >
                              <MDBIcon fas icon="edit" />
                            </MDBBtn>
                            {""}&nbsp;&nbsp;
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCard>
              </MDBCol>
              <MDBCol sm="1"></MDBCol>
              <MDBCol sm="6">
                <MDBCard className="shadow-0">
                  <MDBCardBody className="bg-light">
                    <center>
                      <h4>New Service Center</h4>
                    </center>
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        onChange={(e) => {
                          setimageSelected(e.target.files[0]);
                        }}
                        class="form-control"
                        id="customFile"
                      />
                    </div>
                    <div className="text-end">
                      <button
                        type="button"
                        class="btn btn-dark d-letter-spacing "
                        onClick={Save}
                      >
                        Save
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <a href="../Admin">
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

export default ServiceCenter;
