import React, { Component } from 'react';
import classes from './App.module.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';



const particleOptions = {
                    particles: {
                    	number: {
                    		value: 100,

                    		density: {
                    			enable: true,
                    			value_area: 800
                    		}
                    	}
                    }
                }
const initState = {
	input: '',
	imgURL: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		password: '',
		entries: 0,
		joined: new Date()
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = initState;
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			password: data.password,
			entries: data.entries,
			joined: data.joined
		}})
	} 


	componentDidMount(){
		fetch('https://tranquil-mesa-21429.herokuapp.com')
		.then(res => res.json())
	}

	calculateFaceLocation = (data) => {
		
		const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiData.left_col * width,
			topRow: clarifaiData.top_row * height,
			rightCol: width - (clarifaiData.right_col * width),
			bottomRow: height - (clarifaiData.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box})
	}

	onRouteChange = route => {
		if (route === 'signout') {
			this.setState(initState)
		} else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route})
	}

	onSignOut = () => {
		this.setState({route: 'signin'});
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value});
	}

	onSubmit = () => {
		this.setState({ imgURL: this.state.input })
		fetch('https://tranquil-mesa-21429.herokuapp.com/imageurl', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						input: this.state.input
					})
				})
			.then(response => response.json())
		.then( response => {
			if (response) {
				fetch('https://tranquil-mesa-21429.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then(count => {
					this.setState(Object.assign(this.state.user, {entries: count}))
				})
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
	    .catch(err => console.log(err))
	   
	}

	

  render() {
  		const {imgURL, box, route, isSignedIn} = this.state;
	  	return (
	  		
	    <div className={classes.App}>
	    <Particles className={classes.Particles} params={particleOptions} />
	    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
	    { route === 'home' ?
		<div>
	     <Logo />
	      <Rank name={this.state.user.name}
	      entries={this.state.user.entries}/>
	      <ImageLinkForm onButtonSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
	      <FaceRecognition data={this.calculateFaceLocation} className={classes.Face} box={box} imgURL={imgURL}/>
	    </div>

	    : (
	    	this.state.route === 'signin' ?
	   		<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
	   		<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

	    )
	    }
	    </div>
	  );
  }
  
}

export default App;
