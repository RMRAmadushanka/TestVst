
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from "../adminNav";

function PaymentDashboard() {
    
    const [searchName,setsearchName] = useState("")
    
    const [allVehiclePayment,setallVehiclePayment] = useState([]);     
        useEffect(() => {
        axios.get(global.APIUrl+"/payment/allOrderVehiclePayment/"+searchName)
        .then(res => setallVehiclePayment(res.data))
        .catch(error => console.log(error));
        })
     
   

    const [allOrderADVERTISEMENT,setallOrderADVERTISEMENT] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderADVERTISEMENT")
       .then(res => setallOrderADVERTISEMENT(res.data))
       .catch(error => console.log(error));
      })

    const [allOrderBooking,setallOrderBooking] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderBooking")
       .then(res => setallOrderBooking(res.data))
       .catch(error => console.log(error));
      })
   

      function Accept(id){
            const status = "Accept";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function Reject( id)
    { 
            const status = "Reject";
            const statusUpdate ={status}
            axios.put(global.APIUrl+"/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function View(_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status){
        reactLocalStorage.setObject("viewPayment", [_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status]);
        window.location.href = "/PaymentView";
    }

    function DeletePay(id){
          axios.delete(global.APIUrl+"/payment/deletePayment/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Payment  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Payment  Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div>
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                          <h1 className="text-uppercase text-black">Payments MANAGEMENT</h1>
                          <br/>
                     </center>
                     <div className="text-end mt-5">
                      
                         <a href="#Sale">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                                Vehicle Sale History
                            </MDBBtn>{' '}&nbsp;&nbsp;
                         </a>
                         
                         <a href="#Booking">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='danger'>
                                Service Booking History
                            </MDBBtn>{' '}&nbsp;&nbsp;
                         </a>

                          <a href="#Advertisement">
                            <MDBBtn className='btn-med' style={{ fontSize:'13px', fontWeight:'light'}} outline color='primary'>
                                Advertisement Publishing History
                            </MDBBtn>{' '}&nbsp;&nbsp;
                         </a>


                       
                     </div>
                     
                     <h3 className='mt-5' id="Sale">Vehicle Sale History</h3>
                     <br/>
                     <MDBTable hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Payment ID</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Amount</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Description</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Sale Status</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Actions</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allVehiclePayment.map((VehiclePayment,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{VehiclePayment._id}</td>
                                <td style={{fontSize:'18px'}}>RS.{VehiclePayment.Amount}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.createdAt}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.reason}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.status}</td>
                                <td>
                                    <MDBBtn size='lg' className="shadow-0" color='danger' onClick={() => Reject(VehiclePayment._id)}><MDBIcon fas icon="times-circle" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='success'  onClick={() => Accept(VehiclePayment._id)}  ><MDBIcon fas icon="edit" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='dark'  onClick={() => View(
                                        VehiclePayment._id,
                                        VehiclePayment.accountHold,
                                        VehiclePayment.cardNumber,
                                        VehiclePayment.expireDate,
                                        VehiclePayment.ccv,
                                        VehiclePayment.paymentMethod,
                                        VehiclePayment.reason,
                                        VehiclePayment.Amount,
                                        VehiclePayment.userName,
                                        VehiclePayment.paymentTitle,
                                        VehiclePayment.status
                                        )}  ><MDBIcon fas icon="eye" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='lg' className="shadow-0" color='danger' outline onClick={() => DeletePay(VehiclePayment._id)}><MDBIcon fas icon="trash" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                        <br/>
                        <br/>
                        <br/>

                        <h3 className='mt-5' id="Booking">Service Booking History</h3>
                        <br/>
                        <MDBTable hover>
                           <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Payment ID</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Amount</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Description</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Sales Status</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allOrderBooking.map((Booking,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{Booking._id}</td>
                                <td style={{fontSize:'18px'}}>RS.{Booking.Amount}.00</td>
                                <td style={{fontSize:'18px'}}>{Booking.createdAt}</td>
                                <td style={{fontSize:'18px'}}>{Booking.reason}</td>
                                <td style={{fontSize:'18px'}}>{Booking.status}</td>
                                <td>
                                    
                                        <MDBBtn size='lg' className="shadow-0" color='danger' outline onClick={() => DeletePay(Booking._id)}><MDBIcon fas icon="trash" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                      </MDBTable>
                      <br/>
                        <br/>
                        <br/>
                        <h3 className='mt-5' id="Advertisement">Advertisement Publishing History</h3>
                        <br/>
                        <MDBTable hover>
                           <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Payment ID</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Amount</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Description</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Sales Status</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px',fontSize:"20px"}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allOrderADVERTISEMENT.map((VehiclePayment,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{VehiclePayment._id}</td>
                                <td style={{fontSize:'18px'}}>RS.{VehiclePayment.Amount}.00</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.createdAt}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.reason}</td>
                                <td style={{fontSize:'18px'}}>{VehiclePayment.status}</td>
                                <td>
                                    
                                        <MDBBtn size='lg' className="shadow-0" color='danger' outline onClick={() => DeletePay(VehiclePayment._id)}><MDBIcon fas icon="trash" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                      </MDBTable>
                      <br/>
                        <br/>
                        <br/>
                 </div>
            </div>
        </div>
      </div>
      )
};


export default PaymentDashboard;