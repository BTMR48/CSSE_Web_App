import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Recharge.css";
import { OutlinedInput, InputAdornment } from "@material-ui/core";

export default function Recharge() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const [creditCardNumber, setCreditCardNumber] = useState("");

  const [name, setName]= useState("");
  const [username, setUserName]= useState("");
  const [email, setEmail]= useState("");
  const [nic, setNic]= useState("");
  const [phone, setPhone]= useState("");
  const [pcredit, setPCredit] = useState(0);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function getCredits() {
      await axios
        .get(`http://localhost:8070/users/${user._id}`)
        .then((res) => {
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

    let credits = +pcredit + +amount;

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
        alert("Recharge Successful");
        history.push(`/balance`);
      })
      .catch((error) => {
        alert("Failed to recharge");
        alert(error);
      });
  }

  return (
    <div className="container" align="center">
      <div className="card-form">
      <br/>
      <h2>Recharge Account</h2>
      <br/>
        <form onSubmit={sendData} className="boxAddPayment">
          <div className="row">
            <div className="col-12">
            <div className="col-xl-16" align="center">
                <h6>Current Balance: {pcredit}LKR</h6>
            </div>
              <div div className="row">
                <h4>Payment methods</h4>
                <div className="col-12">
                  <img
                    src="/images/payment.png"
                    height="50px"
                    width="180px"
                    alt="payment"
                  />
                </div>
                <br></br>
                <div className="col-md-12 mb-4 mt-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Name on card"
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
                      id="creditCardNumber"
                      placeholder="Credit Card Number"
                      required
                      fullWidth
                      onChange={(event) => {
                        setCreditCardNumber(event.target.value);
                      }}
                      inputProps={{ style: { padding: 12 }, pattern: "(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="CVV"
                      placeholder="CVV"
                      required
                      fullWidth
                      inputProps={{ style: { padding: 12 }, pattern: "[0-9]{3}"}}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="text"
                      id="Expire Date"
                      placeholder="Expiry Date"
                      required
                      fullWidth
                      inputProps={{ style: { padding: 12 }, pattern:"^(0[1-9]|1[0-2])\/?([0-9]{2})$" }}/>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <OutlinedInput
                      type="number"
                      id="amount"
                      placeholder="Total Amount"
                      required
                      fullWidth
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                      inputProps={{ style: { padding: 12 } }}
                      startAdornment={
                        <InputAdornment position="start">LKR</InputAdornment>
                      }
                    />
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
                  value="Recharge "
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
