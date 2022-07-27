import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { fetchProductsAPI } from "../../Services/ProductsAPI";
import { RotatingLines } from "react-loader-spinner";
import "./homePage.css";

const HomePage = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const dataApiCall = async (latitude, longitude) => {
    setLoader(true);
    const fetchRequest = await fetchProductsAPI(latitude, longitude);
    if (fetchRequest.ok) {
      const dataRes = await fetchRequest.json();
      setLoader(false);
      setProductsList(dataRes.data.products);
      console.log(dataRes.data.products);
    } else {
      setLoader(false);
      console.log(fetchRequest);
      setProductsList([]);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve data based on your location");
        }
      );
    }

    dataApiCall(lat, lng);
  }, []);

  const renderNoDataContent = () => (
    <div className="no-notifications-container">
      <h1 className="no-notifications-header">{setStatus}</h1>
    </div>
  );

  const renderCardDetails = () => (
    <div className="mainContainer">
      {/* <h1>Products List Based on Current Geolocation</h1> */}
      {productsList.map((eachItem, index) => (
        <div className="card-container" key={index}>
          <div className="card">
            <h3>{eachItem.name}</h3>
            <p>{eachItem.description}</p>
            <div className="products-display">
              <div>
                <p>Cuisine-Type</p>
                <div className="products-display">
                  <p>{eachItem.category[0].name}</p>
                  <p>{eachItem.category[1].name}</p>
                </div>
                <div>
                  <p>Meal-Type</p>
                  <div className="products-display">
                    <p>{eachItem.meal[0].name}</p>
                    <p>{eachItem.meal[1].name}</p>
                  </div>
                </div>
              </div>
            </div>
            <p>{`Price: ${eachItem.price}`}</p>
            <p>{`Quantity: ${eachItem.quantity}`}</p>
            <p>{`User Rating: ${eachItem.rating}`}</p>
            <p>Sub Category</p>
            <div className="products-display">
              <p>{eachItem.subCategory[0].name}</p>
              <p>{eachItem.subCategory[1].name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Header />
      <div>
        {loader === true ? (
          <div className="loader-notification">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <div>
            {productsList.length !== 0
              ? renderCardDetails()
              : renderNoDataContent()}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
