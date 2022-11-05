import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [name,setName] = useState("");
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [nic,setNIC] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false)

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    //header
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    //add new item
    async function register(event){
        event.preventDefault();


        if(password === confirmpassword){

            const newUser = {name,username,email,nic,phone,password}

            try {
                await axios.post("http://localhost:8070/users/signup", newUser , config)
                    alert("Registration Successful")
                    history.push('/signin')
            } catch (error) {
                if(error.response.status === 409){
                    alert(error.response.data.message)
                }
                else{
                    alert("User Registration failed")
                } 
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    return (
            <div className="container" align="center">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>
                <div className="card-form">
                    <form onSubmit={register} className="boxSignUp">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="name" placeholder="Name" 
                                                required fullWidth
                                                onChange={(event)=> {setName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="username" placeholder="User Name" 
                                                required fullWidth
                                                onChange={(event)=> {setUserName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
                                                required fullWidth
                                                onChange={(event)=> {setEmail(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="phone" placeholder="phone" required fullWidth
                                                onChange={(event)=> {setPhone(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="nic" placeholder="NIC" required fullWidth
                                                onChange={(event)=> {setNIC(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([0-9]{9}[x|X|v|V]|[0-9]{12})'}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="password" name="password" placeholder="Password" required fullWidth
                                                onChange={(event)=> {setPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required fullWidth
                                                onChange={(event)=> {setConfirmPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                            
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="form-submit-btn" type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                        
                        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                    </form>             
                </div>                   
            </div>
    )
}

export default SignUp
