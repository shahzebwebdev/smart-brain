import React, { Component } from 'react';
import classes from '.././Signin/Signin.module.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}
	onNameChange = (event) => {
		this.setState({ name: event.target.value })
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value })
	}

	onSubmitSignin = () => {
		fetch('https://tranquil-mesa-21429.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home')
			} else {
				alert('Please fill all the inputs to get registered!')
			}
		})
		
	 }

	render() {
		return (
		<main className={classes.Main}>
		  <div className={classes.Form}>
		    <fieldset className={classes.FieldSet}>
		      <legend className={classes.Legend}>Register</legend>
		      <div className={classes.InputPass}>
		        <label className={classes.Label}>Name</label>
		        <input className={classes.Input} 
		        type="text"
		        name="name"
		        id="name"
		        onChange={this.onNameChange} />
		      </div>
		      <div className={classes.InputPass}>
		        <label className={classes.Label}>Email</label>
		        <input className={classes.Input} 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange={this.onEmailChange} />
		      </div>
		      <div className={classes.InputName}>
		        <label className={classes.Label} htmlFor="password">Password</label>
		        <input className={classes.Input} 
		        type="password" 
		        name="password"  
		        id="password"
		        onChange={this.onPasswordChange} />
		      </div>
		    </fieldset>
		    <div className="">
		      <input onClick={this.onSubmitSignin} className={classes.Submit} type="submit" value="Register" />
		    </div>
		  </div>
		</main>

	);
	}
	
}

export default Register;