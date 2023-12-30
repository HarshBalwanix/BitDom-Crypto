import React, { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "./baseurl";
import { useState } from "react";
import Loader from "./Loader";

const Exchanges = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${BaseUrl}/exchanges`);
      console.log(data);
      setLoading(false);
    };
    getExchangesData();
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div></div>
        </>
      )}
    </>
  );
};

export default Exchanges;
