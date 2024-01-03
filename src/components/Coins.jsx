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
          <div className="searchbar h-8 w-80 text-black ">
            <input
              type="text"
              placeholder="     Search Coin"
              style={{
                position: "absolute",
                top: "3.5%",
                left: "25%",
                paddingLeft: "5px",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="btns ml-48">
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
        className="ex-coins flex items-center justify-evenly mt-20 text-xl font-bold"
      >
        <div className="image flex items-center justify-between">
          <img src={coindata.image} width={"70px"} alt="loading error" />
          <div className="name w-60 ml-2 ">{coindata.name}</div>
        </div>
        <div className="price w-28 ">
          {currencySymbol}
          {coindata.current_price.toFixed(2)}
        </div>
        <div
          style={profit ? { color: "#0FCB80" } : { color: "red" }}
          className="Percent24hr w-28"
        >
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
          {"%"}
        </div>
        <div className="marketcap w-28">
          {currencySymbol}
          {coindata.market_cap}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
