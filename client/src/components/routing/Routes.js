import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Jobs from '../jobs/jobs';
import AppliedJobsPage from '../jobs/appliedJobs';
import SavedJobs from '../jobs/savedJobs';
import RejectedJobs from '../jobs/rejectedJobs';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import CreateJobs from '../jobs/createJobs';
import { connect } from 'react-redux';

const Routes = ({auth:{user}}) => {
  console.log('user:', user);
  return (
    <section className='container'>
      <Alert />
      <Switch>

        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/jobs' component={Jobs} />
         <PrivateRoute exact path ='/appliedJobs' component ={ AppliedJobsPage}/>
        <PrivateRoute exact path ='/rejectedJobs' component = { RejectedJobs} />
        <PrivateRoute exact path ='/savedJobs' component = { SavedJobs} />
        <PrivateRoute exact path ='/createJobs' component = {CreateJobs} /> 
        <Route component={NotFound} />
        
      </Switch>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
