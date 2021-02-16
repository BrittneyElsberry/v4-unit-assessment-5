import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import {Link, withRouter} from 'react-router-dom' 
import {connect} from 'react-redux'
import {updateUser} from './../../Redux/heloReducer' 
import {logout} from './../../Redux/heloReducer' 
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
    // this.props.updateUser()
    // this.props.logout()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => this.props.updateUser(res.data))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(res => this.props.logout(res.data))
  }
  
  render() {
    console.log(this.props)
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic' ></div>
            <p>{this.props.initialState}</p>
          </div>
          <div className='nav-links'>
            <Link to="/dash"><img className='nav-img' src={homeLogo} alt='home' /></Link>
            <Link to='/form'><img className='nav-img' src={newLogo} alt='new post' /></Link>
          </div>
        <Link to='/'><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
  }
}

const mapStateToProps = (reduxStore) => {
  return reduxStore
  
}

export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav));

//style={{backgroundImage: `url('${REDUX_STATE_PIC}')`}}