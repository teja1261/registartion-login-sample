import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "./Signup.css";
import { signupAPI } from "src/Services/signupAPI";

class Signup extends Component {
  state = {
    fullName: "",
    email: "",
    mobile: "",
    showSubmitError: false,
    errorMsg: "",
    loader: false,
  };

  onChangeUsername = (event) => {
    this.setState({ fullName: event.target.value, errorMsg: "" });
  };

  onChangePassword = (event) => {
    this.setState({ email: event.target.value, errorMsg: "" });
  };

  onChangeMobile = (event) => {
    this.setState({ mobile: event.target.value, errorMsg: "" });
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  submitForm = async () => {
    const { fullName, mobile, email } = this.state;
    this.setState({ loader: true });
    const response = await signupAPI(fullName, mobile, email);
    console.log(response);
    if (response.ok) {
      this.setState({ loader: false });
      this.onSubmitSuccess();
    } else {
      console.log("Error", response);
      this.setState({
        loader: false,
        errorMsg: response.statusText,
        showSubmitError: true,
      });
    }
  };

  validateData = (event) => {
    event.preventDefault();
    const { fullName, mobile, email } = this.state;
    if (fullName === "") {
      this.setState({ showSubmitError: true, errorMsg: "*Full Name is empty" });
    } else if (mobile === "") {
      this.setState({ showSubmitError: true, errorMsg: "*Mobile is empty" });
    } else if (email === "") {
      this.setState({ showSubmitError: true, errorMsg: "*Email is empty" });
    } else {
      this.submitForm();
    }
  };

  renderMobileField = () => {
    const { mobile } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          MOBILE
        </label>
        <input
          type="text"
          id="mobile"
          className="password-input-field"
          value={mobile}
          onChange={this.onChangeMobile}
        />
      </>
    );
  };

  renderPasswordField = () => {
    const { email } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          EMAIL
        </label>
        <input
          type="text"
          id="password"
          className="password-input-field"
          value={email}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { fullName } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          FULL NAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={fullName}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, loader } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {loader === true ? (
          <div className="login-form-container">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.validateData}>
              <h1>SIGN UP</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              <div className="input-container">{this.renderMobileField()}</div>
              <button type="submit" className="login-button">
                SIGNUP
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
              <p></p>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Signup;
