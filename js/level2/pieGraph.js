const data = {
  Apples: 10,
  Bananas: 20,
  Berries: 30,
  Grapes: 40,
  Lemons: 50,
  Oranges: 60,
};
const width = 700; // Width of the SVG
const height = 700; // Height of the SVG
const margin = 25;

const radius = Math.min(width, height) / 3 - margin;

const svg = d3
  .select("div.pie-graph") // Select the div with class pie-graph
  .append("svg") // Append an SVG element
  .attr("width", width) // Set the width of the SVG
  .attr("height", height) // Set the height of the SVG
  .append("g") // Append a group element to the SVG
  .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the group element

// Visualize the SVG container
svg.append("circle").attr("r", radius).attr("fill", "red");

const customColors = [
  "#A02334",
  "#FFAD60",
  "#FFEEAD",
  "#96CEB4",
  "#FF8343",
  "#179BAE",
];

const color = d3
  .scaleOrdinal() // Create an ordinal scale
  .domain(Object.keys(data)) // Set the domain to the keys of the data object
  .range(customColors); // Set the range to a predefined color scheme

// Visualize the color scale
Object.keys(data).forEach((key, i) => {
  svg
    .append("rect")
    .attr("x", -width / 2 + 20)
    .attr("y", -height / 2 + 30 + i * 20)
    .attr("width", 20)
    .attr("height", 18)
    .attr("fill", color(key));

  svg
    .append("text")
    .attr("x", -width / 2 + 45)
    .attr("y", -height / 2 + 30 + i * 20 + 9)
    .attr("dy", "5px")
    .attr("font-family", "Arial")
    .text(key);
});

const pie = d3.pie().value((d) => d.value);

// Visualize the pie layout
console.log("Pie layout defined:", pie);

// Step 2: Define the arc generator
const arc = d3.arc().innerRadius(0).outerRadius(radius);

// Visualize the arc generator
console.log("Arc generator defined:", arc);

// Step 3: Convert data to an array of objects
const dataArray = Object.keys(data).map((key) => ({ key, value: data[key] }));

// Visualize the data array
console.log("Data array:", dataArray);

// Step 4: Append pie slices
const arcs = svg
  .selectAll(".arc")
  .data(pie(dataArray))
  .enter()
  .append("g")
  .attr("class", "arc");

// Visualize the arcs
console.log("Arcs:", arcs);

arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", (d) => color(d.data.key));

// Visualize the pie slices
arcs
  .append("text")
  .attr("transform", (d) => {
    const centroid = arc.centroid(d);
    // Move the text further out by adjusting the centroid position
    const offset = 10; // Adjust this value to move text further out
    const x = centroid[0] * 2.2; // Increase by 20%
    const y = centroid[1] * 2.25; // Increase by 20%
    return `translate(${x}, ${y})`;
  })
  .attr("dy", "0.35em")
  .attr("font-family", "Arial")
  .attr("text-anchor", "middle")
  .text((d) => d.data.key);
