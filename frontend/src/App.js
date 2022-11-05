import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';
import './App.css';
import Header from './components/Header/Header'
import Home from './components/HomePage/Home';
import UserSignIn from './components/UserManagement/SignIn/SignIn';
import UserSignUp from './components/UserManagement/SignUp/SignUp';
import Footer from './components/Footer/Footer';
import AccountBalance from './components/PaymentManagement/AccountBalance/AccountBalance';
import Recharge from './components/PaymentManagement/Recharge/Recharge';
import MonthlyPass from './components/passManagement/MonthlyPass';
import WeeklyPass from './components/passManagement/WeeklyPass '


function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            {/* <Route path="/" exact component={Homepage} /> */}
            <Route path="/signin" exact component={UserSignIn} />
            <Route path="/signup" exact component={UserSignUp} /> 
            <PrivateRoute path="/" exact component={Home} /> 
            <Route path="/balance" exact component={AccountBalance} /> 
            <Route path="/recharge" exact component={Recharge} /> 
            <Route path="/mpass" exact component={MonthlyPass} /> 
            <Route path="/wpass" exact component={WeeklyPass} /> 
            
            
            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
