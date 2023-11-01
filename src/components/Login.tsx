import React, { Component, SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessful: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessful: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({loginAttempted: true})
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      console.log(result);
      this.setState({loginSuccessful: true})
    } else {
      console.log("Wrong login");
      this.setState({loginSuccessful: false})
    }
  }

  render() {
    return (
      <div>
        <h2>Please login</h2>
        <form action="" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />{" "}
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        {(this.state.loginAttempted && this.state.loginSuccessful) && <label>Login Successful</label>}
        {(this.state.loginAttempted && !this.state.loginSuccessful) && <label>Login Failed</label>}
      </div>
    );
  }
}

export default Login;
