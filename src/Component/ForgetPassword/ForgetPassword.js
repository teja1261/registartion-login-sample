import { Component } from "react";
import { ResendOTP } from "otp-input-react";

import {
  emailSendingOTPAPI,
  setPasswordAPI,
  otpVerificationAPI,
} from "src/Services/forgetAPI";
import "./forgetPassword.css";

class ForgotPassword extends Component {
  state = {
    email: "",
    errorMessage: "",
    otp: "",
    setPassword: "",
    textDisbaleState: false,
    otpDisableState: false,
    showError: false,
    showVerifyBtnORSubmit: false,
    showOTPContent: false,
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  onClickEmailButton = async () => {
    const { email } = this.state;
    const requestOTP = await emailSendingOTPAPI(email);
    if (requestOTP.ok) {
      this.setState({ textDisbaleState: true, showOTPContent: true });
    } else {
      this.setState({ showError: true, errorMessage: requestOTP.statusText });
    }
  };

  onClickVerifyButton = async () => {
    const { email, otp } = this.state;
    const verifyOTP = await otpVerificationAPI(email, otp);
    if (verifyOTP.ok) {
      this.setState({
        otpDisableState: true,
        showVerifyBtnORSubmit: true,
        textDisbaleState: true,
      });
    } else {
      this.setState({ showError: true, errorMessage: verifyOTP.statusText });
    }
  };

  onClickSubmitButton = async () => {
    const { email, otp, setPassword } = this.state;
    const setPasswordRequest = await setPasswordAPI(email, otp, setPassword);
    console.log(setPasswordRequest);
    if (setPasswordRequest.ok) {
      this.onSubmitSuccess();
    } else {
      this.setState({
        showError: true,
        errorMessage: setPasswordRequest.statusText,
      });
    }
  };

  validatePassword = () => {
    const { setPassword } = this.state;
    if (setPassword === "") {
      this.setState({
        errorMessage: "Password Should Not empty",
        showError: true,
      });
    } else if (setPassword.length < 8) {
      this.setState({
        errorMessage: "Password Should be more than 8 char",
        showError: true,
      });
    } else {
      this.onClickSubmitButton();
    }
  };

  validateOTP = () => {
    const { otp } = this.state;
    if (otp === "") {
      this.setState({
        errorMessage: "OTP Field Empty",
        showError: true,
      });
    } else {
      this.onClickVerifyButton();
    }
  };

  validateEmail = () => {
    const { email } = this.state;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      this.setState({
        errorMessage: "Email is not valid",
        showError: true,
      });
    } else if (email === "") {
      this.setState({
        errorMessage: "Email Required",
        showError: true,
      });
    } else {
      this.onClickEmailButton();
    }
  };

  renderButton = (buttonProps) => {
    const { otpDisableState } = this.state;
    return (
      <button
        {...buttonProps}
        className="resend-button"
        disabled={otpDisableState}
      >
        {buttonProps.remainingTime !== 0
          ? `${buttonProps.remainingTime} sec`
          : "Resend"}
      </button>
    );
  };

  renderTime = () => React.Fragment;

  submitform = async () => {};

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
      errorMessage: "",
      showError: false,
    });
  };

  onChangeOTP = (e) => {
    this.setState({ otp: e.target.value, errorMessage: "", showError: false });
  };

  onChangePassword = (e) => {
    this.setState({
      setPassword: e.target.value,
      errorMessage: "",
      showError: false,
    });
  };

  render() {
    const {
      email,
      showError,
      errorMessage,
      otp,
      setPassword,
      textDisbaleState,
      otpDisableState,
      showVerifyBtnORSubmit,
      showOTPContent,
    } = this.state;

    return (
      <div className="modal-app">
        <div className="app-container">
          <h2>Forget Password</h2>
          <div>
            <input
              type="text"
              required={true}
              disabled={textDisbaleState}
              value={email}
              onChange={this.onChangeEmail}
              placeholder="Enter Email"
            />
            <button
              className="request-button"
              disabled={textDisbaleState}
              onClick={this.validateEmail}
            >
              Get OTP
            </button>
          </div>
          {showOTPContent && (
            <>
              <div className="otp-section">
                <input
                  maxLength={4}
                  type="text"
                  required={true}
                  value={otp}
                  onChange={this.onChangeOTP}
                  className="otp-box"
                  placeholder="Enter OTP"
                  disabled={otpDisableState}
                />
                <ResendOTP
                  renderButton={this.renderButton}
                  renderTime={this.renderTime}
                  maxTime={300}
                />
                ;
              </div>
              {!showVerifyBtnORSubmit && (
                <div className="space">
                  <button onClick={this.validateOTP} className="request-button">
                    Verify OTP
                  </button>
                </div>
              )}
            </>
          )}
          {showVerifyBtnORSubmit && (
            <div className="space">
              <input
                type="text"
                required={true}
                value={setPassword}
                onChange={this.onChangePassword}
                className="otp-box"
                placeholder="Enter Password"
              />
              <button
                className="request-button"
                onClick={this.validatePassword}
              >
                Submit
              </button>
            </div>
          )}

          {showError && (
            <div className="error-section">
              <p className="error-mesage">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
