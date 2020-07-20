import React, { Component } from 'react';
import classes from './Signin.module.css';

// const axios = require('axios');


class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}




	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignin = () => {
		fetch('https://tranquil-mesa-21429.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
        	alert('Wrong username or password');
        }
      })
	 }

	render() {
	const { onRouteChange } = this.props;

		return (
		<main className={classes.Main}>
		  <div className={classes.Form}>
		    <fieldset className={classes.FieldSet}>
		      <legend className={classes.Legend}>Sign In</legend>
		      <div className={classes.InputPass}>
		        <label className={classes.Label}>Email</label>
		        <input onChange={this.onEmailChange} className={classes.Input} type="email" name="email-address"  id="email-address" />
		      </div>
		      <div className={classes.InputName}>
		        <label className={classes.Label} htmlFor="password">Password</label>
		        <input onChange={this.onPasswordChange} className={classes.Input} type="password" name="password"  id="password" />
		      </div>
		    </fieldset>
		    <div className="">
		      <input onClick={this.onSubmitSignin} className={classes.Submit} type="submit" value="Sign in" />
		    </div>
		    <div className={classes.RegisterContainer}>
		      <p href="#0" className={classes.Register}
		      onClick={() => onRouteChange('register')}>Register</p>
		    </div>
		  </div>
		</main>

	)
	}
	
}

export default Signin;