import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "./Home.css";
import axios from "axios";

function Home() {
  const history = useHistory();

  function balance() {
    history.push(`/balance`);
  }

  function recharge() {
    history.push(`/recharge`);
  }

  function MonthlyPass() {
    history.push(`/pass`);
  }



  return (
    <div >
      <div 
        className="container"
        style={{ paddingTop: 35, paddingLeft: 155, marginBottom: 100 }}
      >
        {/* </div> */}
        <div align="center" className="row" style={{ paddingBottom: 35 }}>
          {/* <h4 className="mb-4"> Client Home  Page</h4> */}

          <br></br>
          <div className="col-md-4" style={{ paddingLeft: 200 }}>
            <div className="progressCards" >
              <div onClick={balance}>
                <div className="pp">
                  <div align="center">
                    <h2>Account Balance</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ paddingLeft: 200 }}>
            <div className="progressCards" >
              <div onClick={recharge}>
                <div className="pp">
                  <div align="center">
                    <h2>Account Recharge</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div align="center" className="row" style={{ paddingBottom: 35 }}>

          <div className="col-md-4" style={{ paddingLeft: 200 }}>
            <div className="progressCards">
              <div onClick={MonthlyPass}>
                <div className="pp">
                  <div align="center">
                    <h2>Get Monthly Pass</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ paddingLeft: 200 }}>
            <div className="progressCards">
              <div onClick={MonthlyPass}>
                <div className="pp">
                  <div align="center">
                    <h2>Get Weekly Pass</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
