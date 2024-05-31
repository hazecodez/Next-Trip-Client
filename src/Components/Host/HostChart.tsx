import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import HostAPIs from "../../APIs/HostAPIs";
import { useSelector } from "react-redux";
import { ApexOptions } from "apexcharts";
import { User } from "../../Interfaces/Interfaces";

// Define types for booking data
interface BookingData {
  totalBookings: number;
  year: number;
  month: number;
}

// Define types for the Redux state
interface UserData {
  host?: {
    host: User;
  };
}

export default function HostChart() {
  const host = useSelector((state: UserData) => state.host);
  const [bookingData, setBookingData] = useState<BookingData[]>([]);

  useEffect(() => {
    async function getBookingData() {
      if (host?.host?._id) {
        const response = await HostAPIs.sales_report();
        if (response?.data) {
          setBookingData(response.data);
        }
      }
    }
    getBookingData();
  }, [host]);

  // Combine year and month for each data point
  const categories = bookingData.map((data) => `${data.year}-${data.month}`);

  // Extract booking counts
  const bookingCounts = bookingData.map((data) => data.totalBookings);

  // Chart options configuration
  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString(); // Display as string without decimals
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toString(); // Display as string without decimals
        },
      },
    },
  };

  const series = [
    {
      name: "Total Bookings",
      data: bookingCounts,
    },
  ];

  return (
    <div className="w-4/4">
      <h2>Monthly Booking Data</h2>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
