
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import html2canvas from 'html2canvas';
import Navbar from "../adminNav";

function FeedbackView() {

    var customerFeedback = reactLocalStorage.getObject('customerFeedback');
    const feedbackId = customerFeedback[0];

    const [Feedbacks,setAllFeedback] = useState([]);
    axios.get(global.APIUrl+"/feedback/oneFeedback/"+feedbackId)
       .then(res => setAllFeedback(res.data))
       .catch(error => console.log(error));
   

    
 

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div >
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                 <div className="text-end mt-5">
                         <a href="DashboardFeedback">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>&nbsp;&nbsp;&nbsp;
                        
                     </div>

                     <center>
                          <h1 className="text-uppercase text-black">Feedback View</h1>
                     </center>
                     
                    <MDBRow className="mt-5">
                     <MDBCol sm='3'></MDBCol>
                    <MDBCol sm='6'  id="summery">
                    {Feedbacks.map((Feedback,key) => (
                      <table width='80%'>
                          <tr>
                              <td>
                                  <h4>User Name</h4>
                              </td>
                              <td>
                                  
                                  <h4 style={{fontWeight:'600'}}>{Feedback.username}</h4>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h4>Stars</h4>
                              </td>
                              <td>
                                  <h4 style={{fontWeight:'600'}}>{Feedback.start} Stars</h4>                                  
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h4>Feedback Type</h4>
                              </td>
                              <td>
                                  
                                  <h4 style={{fontWeight:'600'}}>{Feedback.FeedbackType}</h4> 
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h4>About Feedback</h4>
                              </td>
                              <td>
                                 
                                 <h4 style={{fontWeight:'600'}}>{Feedback.FeedBackAbout}</h4> 
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h4><br/><br/><u>Description</u></h4>
                              </td>
                              <td>
                                 
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  
                                  <h5>{Feedback.Feedback}</h5>
                              </td>
                          </tr>
                      </table>
                         ))}
                    </MDBCol>
                    <MDBCol sm='3'></MDBCol>
                 </MDBRow>

                 </div>
            </div>
        </div>
      </div>
      )
};


export default FeedbackView;