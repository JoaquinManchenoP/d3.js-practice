const initialPieData = [
  { name: "USA", value: 30 },
  { name: "China", value: 20 },
  { name: "Russia", value: 13 },
  { name: "Germany", value: 12 },
  { name: "Japan", value: 10 },
  { name: "India", value: 8 },
  { name: "UK", value: 7 },
];

//main svg dimensions
const mainSvgHeight = 900;
const mainSvgWidth = 900;
const margin = 20;

//custom pie colors
const customColors = [
  "#26355D",
  "#AF47D2",
  "#FF8F00",
  "#FFDB00",
  "#FFAA80",
  "#FF5580",
  "#FF00A0",
];

//Create color scale
const colors = d3
  .scaleOrdinal()
  .domain(initialPieData.map((d) => d.name))
  .range(customColors);

//Create main svg for pie chart
const mainSvg = d3
  .select("div.main-container")
  .append("svg")
  .attr("height", mainSvgHeight)
  .attr("width", mainSvgWidth)
  .append("g")
  .attr("transform", `translate(${mainSvgWidth / 2}, ${mainSvgHeight / 2})`);

//define pie gene
const radius = Math.min(mainSvgHeight, mainSvgWidth) / 3 - margin;
const pie = d3.pie().value((d) => d.value);
const arc = d3.arc().innerRadius(0).outerRadius(radius);

function renderIntitalPieChart(data) {
  console.log("render intial pie chart and data is", data);

  const pieChartArcs = mainSvg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  console.log("Arcs:", pieChartArcs);

  pieChartArcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colors(d.data.name));

  pieChartArcs
    .append("text")
    .attr("transform", (d) => {
      const centroid = arc.centroid(d); // Adjust this value to move text further out
      // Move the text further out by adjusting the centroid position
      const x = centroid[0] * 2.2; // Increase by 20%
      const y = centroid[1] * 2.25; // Increase by 20%
      return `translate(${x}, ${y})`;
    })
    .attr("dy", "0.35em")
    .attr("font-family", "Arial")
    .attr("text-anchor", "middle")
    .text((d) => d.data.name);
}

renderIntitalPieChart(initialPieData);
