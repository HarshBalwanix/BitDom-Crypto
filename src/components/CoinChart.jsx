import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "./baseurl";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const CoinChartdata = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/coins/${id}/market_chart?vs_currency=inr&days=${days}`
      );
      setChartData(data.prices);
      console.log(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CoinChartdata();
  }, []);

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        labels: `Price in Past Days ${days}`,
        data: chartData.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: "3",
      },
    ],
  };

  return (
    <div>
      {
        <Line
          data={myData}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
          style={{ marginTop: "5rem" }}
        />
      }
    </div>
  );
};

export default CoinChart;
