import { Component } from "react";
import { ResendOTP } from "otp-input-react";

import {
  setPasswordAPI,
  otpVerificationAPI,
} from "src/Services/forgetAPI";
import "./setPassword.css";

class SetPassword extends Component {
  state = {
    email: this.props.location.state.email,
    errorMessage: "",
    otp: "",
    setPassword: "",
    otpDisableState: false,
    showError: false,
    showVerifyBtnORSubmit: false,
    showOTPContent: false,
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  onClickVerifyButton = async () => {
    const { email, otp } = this.state;
    const verifyOTP = await otpVerificationAPI(email, otp);
    if (verifyOTP.ok) {
      this.setState({
        otpDisableState: true,
        showVerifyBtnORSubmit: true,
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
      showError,
      errorMessage,
      otp,
      setPassword,
      otpDisableState,
      showVerifyBtnORSubmit,
    } = this.state;

    return (
      <div className="modal-app">
        <div className="app-container">
          <h2>Set Password</h2>

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

export default SetPassword;
