export const emailSendingOTPAPI = async (email) => {
  const jwtToken = Cookies.get("jwt_token");
  const url = "https://ring-ring-food.herokuapp.com/api/user/send-otp-email";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
      Authorization: `Bearer ${jwtToken}`,
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
