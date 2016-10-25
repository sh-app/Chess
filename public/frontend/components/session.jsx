import React from 'react';

export default class Session extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", password: "", login: true};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.login) {
      this.setState({['login']: false});
    } else {
      this.setState({['login']: true});
    }
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.target.value});
  }

  handleSubmit(e) {
    let user = Object.assign({}, {username: this.state.username, password: this.state.password});
    this.state.login ? this.props.login(user) : this.props.signup(user);
  }

  render() {
    const buttonValue = this.state.login ? 'Log In' : 'Sign Up';
    const linkText = this.state.login ? "Don't have an account?" : "Already have an account?";

    return(
      <div>
        <div className='main-page-header group'>
          <div id='logo'>&#9816;</div>
          <form  className='login' onSubmit={this.handleSubmit}>
              <input
                id='username'
                onChange={this.handleChange('username')}
                type='text'
                placeholder='username'
                value={this.state.username}/>
              <input
                id='password'
                onChange={this.handleChange('password')}
                type='password'
                placeholder='* * * * * *'
                value={this.state.password}/>

              <button>{buttonValue}</button>
          </form>
        </div>
        <div className="main-page-bg">
          <a href="#" onClick={this.handleClick}>{linkText}</a>
        </div>
      </div>
    );
  }

}
