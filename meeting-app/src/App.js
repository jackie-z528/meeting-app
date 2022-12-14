import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Dashboard from './Components/Dashboard/Dashboard'
import PostDetail from './Components/Posts/PostDetail'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import CreatePost from './Components/Posts/CreatePost'
import CreatePostTopic from './Components/Posts/CreatePostTopic';
import EditPostTopic from './Components/Posts/EditPostTopic';

class App extends Component {
		render () {
			return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path = '/post/:id/editTopic/:topicId' component={EditPostTopic}/>
						<Route path = '/post/:id/createTopic' component={CreatePostTopic} />
						<Route path = '/post/:id' component={PostDetail} />
						<Route path = '/signin' component={SignIn}/>
						<Route path = '/signup' component={SignUp}/>
						<Route path = '/create' component={CreatePost}/>
						</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
