import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import {fetchProductsAPI} from "../../Services/ProductsAPI";
import { RotatingLines } from "react-loader-spinner";

const HomePage = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loader, setLoader] = useState(false);


  const dataApiCall = async(latitude, longitude) => {
      setLoader(true);
      const fetchRequest = await fetchProductsAPI(latitude, longitude);
      if(fetchRequest.ok){
        const dataRes = await fetchRequest.json();
        setLoader(false);
        console.log(dataRes.data.products);
      }else{
        setLoader(false);
        console.log(fetchRequest)
      }

  }
  useEffect(() => {

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }

    dataApiCall(lat,lng)
  }, []);

  return (
    <>
      <Header />
      {loader === true ? <div className="home-main-container">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>: <div className="home-main-container">
        <h1>{status}</h1>
        <h2>latitude : {lat}</h2>
        <h2>longitude : {lng}</h2>
      </div>}
    </>
  );
};

export default HomePage;
