import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./MonthlyPass.css";
import { OutlinedInput, InputAdornment } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function MonthlyPass() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId ]= useState("");

  const history = useHistory();

//   const [startLocation, setStartLocation] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState(0);
  const [month, setMonth] = useState("");
  const [total, setTotal] = useState(0);

  const [name, setName]= useState("");
  const [username, setUserName]= useState("");
  const [email, setEmail]= useState("");
  const [nic, setNic]= useState("");
  const [phone, setPhone]= useState("");
  const [pcredit, setPCredit] = useState(0);


  useEffect(() => {
    async function getCredits() {
      await axios
        .get(`http://localhost:8070/users/${user._id}`)
        .then((res) => {
          setUserId(res.data.result._id);
          setName(res.data.result.name);
          setUserName(res.data.result.username);
          setEmail(res.data.result.email);
          setNic(res.data.result.nic);
          setPhone(res.data.result.phone);
          setPCredit(res.data.result.credits);
        })
        .catch((error) => {
          alert("fetching failed");
        });
    }
    getCredits();
  }, [user]);

  async function sendData(e) {
    e.preventDefault();

    if (+pcredit >= +total){

        const newPass = { userId, month }
        console.log(userId);

        const config = {
            headers: {
            "content-Type": "application/json",
            },
        };

        await axios
            .post(`http://localhost:8070/mpass/add`, newPass, config)
            .then((res) => {
                alert("Successfully Subscribed to Monthly Pass");
                console.log(res)
                balanceCredit();
            })
        .catch((error) => {
            if (error.response.status ===409 ){
                alert("You have already subscribed to this month");
            }else {
                alert("Failed to subscribed to monthly Pass");
            }
        });
    }else {
        alert("Insufficient Credits")
    }
  }

  async function balanceCredit() {
    let credits = +pcredit - +total;
    
    const newCredit = { name, username, email, nic, phone, credits };

    //header with authorization token
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    await axios
      .put(`http://localhost:8070/users/update/${user._id}`, newCredit, config)
      .then((res) => {
        history.push(`/`);
      })
      .catch((error) => {
        alert("Failed to recharge");
        alert(error);
      });
  }


  async function calculateTotal(distance){
    setTotal(+distance * 10 );
  }

  const months =[
    'January','February','March','April','May','June','July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleChange = (event) => {
        setMonth(event.target.value);
      };

  return (
    <div className="container" align="center">
      <div className="card-form">
      <br/>
      <h2>Get Monthly Pass</h2>
      <br/>
        <form onSubmit={sendData} className="boxAddPayment">
          <div className="row">
            <div className="col-12">
            <div className="col-xl-16" align="center">
                <h6>Current Balance: {pcredit}$</h6>
            </div>
              <div div className="row">
                <br></br>
                <div className="col-md-12 mb-4 mt-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="Start"
                      placeholder="Start Location"
                      required
                      fullWidth
                      inputProps={{ style: { padding: 12 } }}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="destination"
                      placeholder="Destination"
                      required
                      fullWidth
                      inputProps={{ style: { padding: 12 } }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="distance"
                      placeholder="Distance in KM"
                      required
                      fullWidth
                      onChange={(event) => {
                        calculateTotal(event.target.value);
                    }}
                      inputProps={{ style: { padding: 12 }}}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                    <div className="form-group" > 
                        <InputLabel align="left" id="demo-mutiple-chip-label">Month</InputLabel>
                        <br/>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                fullWidth
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" />}
                                >
                                {months.map((months) => (
                                    <MenuItem key={months} value={months} >
                                    {months}
                                    </MenuItem>
                                ))}
                            </Select>
                    </div>
                  
                </div>
                <div className="col-md-12 mb-4">
                    <div className="col-xl-16" align="center">
                        <h4>Total Amount for Pass : {total}$</h4>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  className="form-submit-btn"
                  type="submit"
                  value="Get Pass"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
