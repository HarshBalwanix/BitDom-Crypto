import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { BaseUrl } from "./baseurl";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoPulseOutline } from "react-icons/io5";
// import coinImg from "../coinImg.png";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const profit = coin.market_data?.price_change_percentage_24h > 0;
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);
  return (
    <div>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="coindetail pt-12 pl-28">
              <div className="coininfo">
                <div className="time font-bold">{coin.last_updated}</div>
                <div className="coinimage">
                  <img
                    className="mt-16"
                    src={coin.image.large}
                    width={"120px"}
                    alt=""
                  />
                </div>
                <div className="coinname font-bold mt-10 text-2xl ">
                  {coin.name}
                </div>
                <div className="coinprice font-bold mt-3 text-xl">
                  {"₹"} {coin.market_data.current_price["inr"]}
                </div>
                <div className="coinprofit mt-3 ml-2 flex items-center ">
                  {profit ? (
                    <BiSolidUpArrow color="green" />
                  ) : (
                    <BiSolidDownArrow color="red" />
                  )}
                  {coin.market_data.price_change_percentage_24h}%
                </div>
                <div className="marketrank font-bold text-2xl mt-5 ml-1 flex items-center  ">
                  <IoPulseOutline color="orange" />
                  {"#"}
                  {coin.market_cap_rank}
                </div>
                <div className="coindesc w-80">
                  <p className="mt-8">{coin.description["en"].split(".")[0]}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default CoinDetails;
