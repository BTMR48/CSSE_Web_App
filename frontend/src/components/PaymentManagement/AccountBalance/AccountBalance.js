import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import "./AccountBalance.css";

export default function AccountBalance() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [credit, setCredit] = useState(0);

  const history = useHistory();

  useEffect(() => {
    async function getCredits() {
      await axios
        .get(`http://localhost:8070/users/${user._id}`)
        .then((res) => {
          setCredit(res.data.result.credits);
        })
        .catch((error) => {
          alert("fetching failed");
        });
    }
    getCredits();
  }, [user]);


  function handleClick() {
    history.push(`/`);
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div>
            <div className="container" align="center">
              <div className="box-payment-report">
                <div className="row">
                  <div className="col-xl-2" align="center">
                  </div>
                  <div className="col-xl-8" align="center">
                    <h3>Account Balance</h3>
                  </div>
                </div>
                <hr />
                <br />
                <div className="col-xl-16" align="center">
                    <h4>{credit}$</h4>
                </div>
              </div>
            </div>
          </div>
          <center>
            <div className="w-25 p-3" align="center">
              <Button
                className="print__button"
                variant="contained"
                color="secondary"
                style={{ backgroundColor: green[700], color: "white" }}
                disableElevation
                onClick={handleClick}
                fullWidth
              >
                Back
              </Button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
