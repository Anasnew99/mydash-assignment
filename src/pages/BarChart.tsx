// create default react component
import React from "react";
import BarChart from "../components/BarChart";
import Button from "../components/Button";
var sampleData = [
  { name: "A", value: 2 },
  { name: "B", value: 4 },
  { name: "C", value: 6 },
];
// generate random number in range b/w a and b
function getRandomNumber(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}
function getAlphabetUsingNumber(a: number) {
  return String.fromCharCode(65 + a);
}

export default function BarChartPage() {
  const [chartData, setChartData] = React.useState(sampleData);
  const [fill, setChartFill] = React.useState("#00bcd4");
  const randomizeData = () => {
    const newLength = getRandomNumber(2, 10);
    const newData = new Array(newLength).fill(0).map((_, i) => {
      return {
        name: getAlphabetUsingNumber(i),
        value: getRandomNumber(1, 100),
      };
    });

    setChartData(newData);
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setChartFill(color);
  };
  return (
    <div className={"bcp"}>
      <div className={"bcp-chart"}>
        <BarChart width={500} height={400} data={chartData} fill={fill} />
      </div>
      <div className={"bcp-button"}>
        <Button onClick={randomizeData}>Randomize Data</Button>
      </div>
    </div>
  );
}
