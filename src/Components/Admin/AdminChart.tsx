import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AdminAPI from "../../APIs/AdminAPIs";
import { ApexOptions } from "apexcharts";

interface PackageReportData {
  packageCount: number;
  year: number;
  month: number;
}

export default function AdminPackageChart() {
  const [packageData, setPackageData] = useState<PackageReportData[]>([]);

  useEffect(() => {
    async function getPackageData() {
      const response = await AdminAPI.sales_report();
      if (response?.data) {
        setPackageData(response.data);
      }
    }
    getPackageData();
  }, []);

  // Combine year and month for each data point
  const categories = packageData?.map((data) => `${data.year}-${data.month}`);

  // Extract package counts
  const packageCounts = packageData?.map((data) => data.packageCount);

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
      name: "Packages Created",
      data: packageCounts,
    },
  ];

  return (
    <div className="w-full">
      <h2>Monthly Package Creation Report</h2>
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
