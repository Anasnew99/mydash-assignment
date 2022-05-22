import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
interface IBarChartProps {
  width: number;
  height: number;
  data: any;
  fill: string;
}

const updateData = (
  x: any,
  y: any,
  xAxis: any,
  yAxis: any,
  data: any,
  svg: any,
  height: number,
  fill: string
) => {
  x.domain(
    data.map(function (d: any) {
      return d.name;
    })
  );
  xAxis.call(d3.axisBottom(x));

  // Update the Y axis
  y.domain([
    0,
    d3.max(data, function (d: any) {
      return d.value;
    }),
  ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect").data(data);

  u.enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function (d: any) {
      return x(d.name);
    })
    .attr("y", function (d: any) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d: any) {
      return height - y(d.value);
    })
    .attr("fill", fill);

  // If less group in the new dataset, I delete the ones not in use anymore
  u.exit().remove();
};

const drawSVG = (ref: any, svgRef: any, width: number, height: number) => {
  svgRef.current.svg = d3
    .select(ref.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // defining x axis
  svgRef.current.x = d3.scaleBand().range([0, width]).padding(0.2);

  svgRef.current.xAxis = svgRef.current.svg
    .append("g")
    .attr("transform", "translate(0," + height + ")");

  //defining y axis
  svgRef.current.y = d3.scaleLinear().range([height, 0]);
  svgRef.current.yAxis = svgRef.current.svg
    .append("g")
    .attr("class", "myYaxis");
};
var margin = { top: 30, right: 30, bottom: 70, left: 60 };
function BarChart({ width, height, data, fill }: IBarChartProps) {
  const ref = useRef<any>();
  const svgRef = useRef<any>({});
  useEffect(() => {
    // drawing a svg
    if (!svgRef.current.svg) {
      // svg not drawn yet
      drawSVG(ref, svgRef, width, height);
    } else {
      // svg drawn but clear to draw again
      svgRef.current.svg.remove("*");
      drawSVG(ref, svgRef, width, height);
    }
  }, [width, height]);

  // cb to redraw the chart when width or height change
  // useEffect(() => {
  //   svgRef.current.svg.selectAll("*").remove();
  // }, [width, height]);

  useEffect(() => {
    // updating the data
    updateData(
      svgRef.current.x,
      svgRef.current.y,
      svgRef.current.xAxis,
      svgRef.current.yAxis,
      data,
      svgRef.current.svg,
      height,
      fill
    );
  }, [data, height, fill]);

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default BarChart;
