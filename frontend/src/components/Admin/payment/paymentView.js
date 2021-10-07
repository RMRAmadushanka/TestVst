
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from "../adminNav";

function PaymentView() {

    var viewPayment = reactLocalStorage.getObject('viewPayment');
    const paymentId = viewPayment[0];
    const [accountHold,setaccountHold] = useState(viewPayment[1]);
    const [cardNumber,setcardNumber] = useState(viewPayment[2]);
    const [expireDate,setexpireDate] = useState(viewPayment[3]);
    const [ccv,setccv] = useState(viewPayment[4]);
    const [paymentMethod,setpaymentMethod] = useState(viewPayment[5]);
    const [reason,setreason] = useState(viewPayment[6]);
    const [Amount,setAmount] = useState(viewPayment[7]);
    const [userName,setuserName] = useState(viewPayment[8]);
    const [paymentTitle,setpaymentTitle] = useState(viewPayment[9]);
    const [status,setstatus] = useState(viewPayment[10]);
     
 

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                          <h2 className="text-uppercase text-black">Payment View</h2>
                     </center>
                     <div className="text-end mt-5">
                         <a href="PaymentDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>&nbsp;&nbsp;&nbsp;
                    
                     </div>
                    <MDBRow className="mt-5">
                     <MDBCol sm='3'></MDBCol>
                    <MDBCol sm='6'  id="summery">
                   
                      <table width='80%'>
                          <tr>
                              <td>
                                  <h5>Payment Id</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{paymentId}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Account Holder</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{accountHold}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Card Number</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{cardNumber}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Expire Date</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{expireDate}</p>
                              </td>
                          </tr>
                            <tr>
                              <td>
                                  <h5>CCV</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{ccv}</p>
                              </td>
                          </tr>
                            <tr>
                              <td>
                                  <h5>Payment Method</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{paymentMethod}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Reson</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{reason}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Amount</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{Amount}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>User Name</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{userName}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Status</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{status}</p>
                              </td>
                          </tr>
                      </table>
                         
                    </MDBCol>
                    <MDBCol sm='3'></MDBCol>
                 </MDBRow>

                 </div>
            </div>
        </div>
      </div>
      )
};


export default PaymentView;