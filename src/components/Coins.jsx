import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "./baseurl";
import Loader from "./Loader";
import Header from "./Header";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${BaseUrl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="searchbar h-8  w-80   text-black absolute top-16 left-3 sm:top-5  sm:left-1/4  pl-2 ">
            <input
              type="text"
              placeholder="     Search Coin"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="btns ml-2 sm:ml-48">
            <button
              className="bg-orange-500 h-8 w-20 ml-7 border-none rounded-xl mt-14"
              onClick={() => {
                setCurrency("usd");
              }}
            >
              USD
            </button>
            <button
              className="bg-orange-500 h-8 w-20 ml-7 border-none rounded-xl mt-14"
              onClick={() => {
                setCurrency("inr");
              }}
            >
              INR
            </button>
          </div>

          <div>
            {coins
              .filter((data) => {
                if (data === "") {
                  return data;
                } else if (
                  data.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((item, i) => {
                return (
                  <CoinCard
                    coindata={item}
                    id={item.id}
                    i={i}
                    currencySymbol={currencySymbol}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, i, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`}>
      <div
        key={i}
        className="ex-coins flex items-center justify-evenly sm:mt-20 sm:text-xl sm:font-bold"
      >
        <div className="image flex items-center justify-between h-12 w-8 sm:h-12 sm:w-16">
          <img src={coindata.image} alt="loading error" />
          <div className="name text-sm w-30 sm:w-60 sm:ml-2 sm:text-xl ">
            {coindata.name}
          </div>
        </div>
        <div className="price ml-20 w-30 text-sm sm:w-28 sm:text-xl ">
          {currencySymbol}
          {coindata.current_price.toFixed(2)}
        </div>
        <div
          style={profit ? { color: "#0FCB80" } : { color: "red" }}
          className="Percent24hr w-20 text-sm sm:w-28 sm:text-xl"
        >
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
          {"%"}
        </div>
        <div className="marketcap w-40 text-sm sm:w-28 sm:text-xl ">
          {currencySymbol}
          {coindata.market_cap}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
