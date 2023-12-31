import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "./baseurl";
import Loader from "./Loader";
import Header from "./Header";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${BaseUrl}/coins/markets?vs_currency=inr`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            {coins.map((item, i) => {
              return (
                <div
                  key={i}
                  className="ex-coins flex items-center justify-evenly mt-20"
                >
                  <div className="image flex items-center justify-between">
                    <img src={item.image} width={"70px"} alt="loading error" />
                    <div className="name w-60 ml-2 ">{item.name}</div>
                  </div>
                  <div className="price w-20 ">
                    {item.current_price.toFixed(2)}
                  </div>
                  <div className="Percent24hr w-20">
                    {item.price_change_percentage_24h}
                  </div>
                  <div className="marketcap w-20">{item.market_cap}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Coins;
