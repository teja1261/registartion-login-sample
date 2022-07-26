export const loginAuth = async (email, password) => {
  const url = "https://ring-ring-food.herokuapp.com/api/user/auth";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};
