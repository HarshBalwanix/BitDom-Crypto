import React, { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "./baseurl";
import { useState } from "react";
import Loader from "./Loader";
import OurModel from "./OurModel";

// import coin from "../coin.png";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${BaseUrl}/exchanges`);
      // console.log(data);
      setExchanges(data);
      setLoading(false);
    };
    getExchangesData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <OurModel />
          <div>
            {exchanges.map((item, i) => {
              return (
                <div
                  key={i}
                  className="ex-cards flex items-center justify-evenly sm:mt-20 sm:text-xl sm:font-bold"
                >
                  <div className="image h-12 ml-10 mr-5">
                    <img src={item.image} alt="loading error" />
                  </div>
                  <div className="name w-40 text-sm sm:w-28 sm:text-xl">
                    {item.name}
                  </div>
                  <div className="price w-40 text-sm sm:w-28 sm:text-xl">
                    {item.trade_volume_24h_btc.toFixed(2)}
                  </div>
                  <div className="rank w-28 text-sm sm:text-xl ">
                    {item.trust_score_rank}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
