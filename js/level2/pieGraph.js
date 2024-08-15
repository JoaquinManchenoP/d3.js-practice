// Data and dimensions
const data = {
  Apples: 10,
  Oranges: 20,
  Bananas: 30,
  Grapes: 40,
  Lemons: 50,
  Berries: 60,
};

const height = 400;
const width = 400;
const pieMargin = 20;
const radius = Math.min(width, height) / 2 - pieMargin;

// Create SVG element and append to the div.pie-graph
const svg = d3
  .select("div.pie-graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Append background rectangle
svg
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "lightgrey");

// Append a group element and center it
const pieGroup = svg
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Add a test circle to verify centering
pieGroup.append("circle").attr("r", 100).attr("fill", "red");
pieGroup.append("circle").attr("r", 40).attr("fill", "blue");
pieGroup.append("circle").attr("r", 30).attr("fill", "orange");

// pieGroup.append("circle").attr("r", 50).attr("fill", "blue");
