import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Accepted from './components/Accepted';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Formvalidation from './components/Formvalidation';
import Intrested from './components/Intrested';
import Listof from './components/Listof';
import Login from './components/Login';
import Registration from './components/Registration';
import Rejected from './components/Rejected';

class App extends Component {
  render(){
    return (
      <div>
      <HashRouter>
      <div>
            <Switch>
               <Route path='/' component={Dashboard} exact />
               <Route path='/dashboard' component={Dashboard}/>
               <Route path='/listof/:profileIdParam' component={Listof}/>
               <Route path='/login' component={Login}/>
               {/* <Route path='/adminlogin' component={AdminProfiles}/> */}
               <Route path='/adminlogin' component={AdminLogin}/>
               <Route path='/form' component={Formvalidation}/>
               <Route path='/register' component={Registration}/>
               <Route path="/accepted/:profileIdParam" component={Accepted}/>
               <Route path="/intrested/:profileId" component={Intrested}/>
               <Route path="/rejected/:profileIdParam" component={Rejected}/>
               <Route path='/details' component={Details}/>
            </Switch>
         </div>
      </HashRouter>
   </div>
  );
}
}
export default App;
