    
import React, { useState , useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBCardImage,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function Reset() {
    const [password, setPassword] = useState("");
    const [UserName, setUsername] = useState("");
    const [disabled, setdisabled] = useState(true);

    const [isValidCFpassword, setIsValidCfpassword] = useState(false);
    const [messageCfpassword, setMessageCfpassword] = useState('');
    const [messageStrongpassword, setmessageStrongpassword] = useState('');
    const [CPassword, setCPassword] = useState("");

    schema
    .is().min(4)                               
    .is().max(100)                             
    .has().uppercase()                         
    .has().lowercase()                         
    .has().digits(2)       
    .has().not().spaces()  
    .is().not().oneOf(['Passw0rd', 'Password123']); 
    const setPasswordFunction = (event) =>{
            if(schema.validate(event) === false) {
                setIsValidCfpassword(false);
                setmessageStrongpassword('Password is not strong');
               
            }else{
                setIsValidCfpassword(true);
                setmessageStrongpassword('Password is strong');
               
            }
            setPassword(event);
    }

   const setCPasswordFnction = (event) => {
      const ConfirmPassword = event;
         
              if ((ConfirmPassword === password) && (ConfirmPassword !=='') && (ConfirmPassword!== null) ) {
                  setIsValidCfpassword(true);
                  setMessageCfpassword('Password Are Matching');
                  if((UserName.length > 0) && (ConfirmPassword.length >0) &&(ConfirmPassword.length>0)){
                      setdisabled(false);
                  }else{
                      setdisabled(true);
                  }
              } else {
                  setIsValidCfpassword(false);
                  setMessageCfpassword('Passwords Are Not Match');
                  setdisabled(true);
              }
      setCPassword(event);
    };

     function resetPassword(e){
       e.preventDefault();
       const userReg ={ UserName, CPassword}

        axios.put(global.APIUrl+"/user/resetPassword/",userReg).then(() =>{

        Swal.fire({  
        title: "Success!",
        text: "Password Reset Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
            window.location.href = "/UserLogin";
        }
        });

        
    }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Password Reset Not Success",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
    })
  }

    return (
            <div>
                <Navbar/>
                 <MDBRow  style={{marginTop:'10%', marginBottom:'10%', width:'99%'}}>
                <MDBCol sm='1'></MDBCol>
                 <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{width:'99%', marginTop:'15%'}}  position='top' alt='...' src='./img/suv2.png' />
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0 p-5">
                    <MDBCardBody className="pt-5 mt-3 text-left">
                       <div className="bg-light p-4">
                        <center><h2 className="text-uppercase">Password Reset</h2></center>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">User Name</label>
                         <input class="form-control"  id="pass" onChange={(e) =>{
                            setUsername(e.target.value);
                         }}/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Password</label>
                         <input class="form-control" type="password" id="pass" onChange={(e) =>{
                            setPasswordFunction(e.target.value);
                         }}/>
                         <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                              {messageStrongpassword}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Retype Password</label>
                          <input class="form-control"id="pass" type="password" onChange={(e) =>{
                                            setCPasswordFnction(e.target.value);
                                          }} />
                          <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                              {messageCfpassword}
                          </span>
                        </div>
                         <div class="mt-3 mb-2">
                            <div class="d-grid gap-2">
                                    <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" disabled={disabled} onClick={resetPassword}> Reset Password</MDBBtn> 
                            </div>
                         </div>
                         <center>
                          <MDBRow >
                              <MDBCol size='5'></MDBCol>
                              <MDBCol size='5'></MDBCol>
                              <MDBCol size='2'><a href="/UserLogin" class="text-muted"><small>Login</small></a></MDBCol>
                          </MDBRow>
                         </center>
                       </div> 
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
                <Footer/>
            </div>
          )
};

export default Reset;