import Cookies from 'js-cookie';

export const fetchProductsAPI = async (latitude, longitude) => {
  const jwtToken = Cookies.get("jwt_token");
  const url = "https://ring-ring-food.herokuapp.com/api/product/get-list";
  const options = {
    headers: {
      "content-type": "application/json",
      "x-csrf-token": "cnJmQDIwMjI=",
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "POST",
    body: JSON.stringify({
      latitude,
      longitude,
      "radius": 2,
      "sorts": {
        "rating": -1
      },
      "limit": 10
    }),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    return error;
  }
};
