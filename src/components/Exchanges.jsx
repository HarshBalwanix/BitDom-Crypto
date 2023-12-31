import React, { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "./baseurl";
import { useState } from "react";
import Loader from "./Loader";
import coin from "../coin.png";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${BaseUrl}/exchanges`);
      console.log(data);
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
          <div>
            {exchanges.map((item, i) => {
              return (
                <div
                  key={i}
                  className="ex-cards flex items-center justify-evenly mt-20"
                >
                  <div className="image">
                    <img src={item.image} height={"80px"} alt="loading error" />
                  </div>
                  <div className="name w-20">{item.name}</div>
                  <div className="price w-20">
                    {item.trade_volume_24h_btc.toFixed(2)}
                  </div>
                  <div className="rank w-20">{item.trust_score_rank}</div>
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
