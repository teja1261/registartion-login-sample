export const emailSendingOTPAPI = async (email) => {
  const url = "https://ring-ring-food.herokuapp.com/api/user/send-otp-email";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
    },
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};

export const otpVerificationAPI = async (email, otp) => {
  const url = "https://ring-ring-food.herokuapp.com/api/user/verify-otp";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
    }),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};

export const setPasswordAPI = async (email, otp, password) => {
  const url = "https://ring-ring-food.herokuapp.com/api/user/set-password";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
      password,
    }),
  };

  console.log(options.body);

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};
