export const signupAPI = async (fullName, mobile, email) => {
  const url = "https://ring-ring-food.herokuapp.com/api/user";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      fullName,
      mobile,
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABDElEQVR42u3SMQEAAAgDoJnc6FrA0xMyUJl04FmJhViIhVhiIRZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWIglFmIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFtwUbHOBr8Qik0gAAAABJRU5ErkJggg==",
      tandcAccepted: true,
    }),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};
