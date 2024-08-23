const message = "this is a practice";

practiceData = [
  { name: "dogs", value: 10 },
  { name: "cats", value: 20 },
  { name: "fish", value: 30 },
];

updatedPracticeData = [
  { name: "dogs", value: 60 },
  { name: "cats", value: 60 },
  { name: "fish", value: 60 },
];

d3.select("div.level-3-container").append("p").text(message);

const mainSvg = d3
  .select("div.level-3-container")
  .append("svg")
  .attr("width", 700)
  .attr("height", 700)
  .append("g")
  .attr("transform", `translate(${500 / 2}, ${700 / 2})`);

const customColors = ["#A02334", "#FFAD60", "#FFEEAD"];

const color = d3
  .scaleOrdinal() // Create an ordinal scale
  .domain(Object.keys(practiceData)) // Set the domain to the keys of the data object
  .range(customColors);

function updateCircles(data) {
  // Bind data to circles
  const circles = mainSvg.selectAll("circle").data(data, (d) => d.name);

  // Handle the enter selection: append new circles for new data
  circles
    .enter()
    .append("circle")
    .attr("r", (d) => d.value)
    .attr("fill", (d, i) => color(d.name))
    .attr("cx", (d, i) => i * 100) // Initial positioning
    .attr("cy", 0)
    .merge(circles) // Merge new circles with existing ones
    .transition() // Smooth transition for updates
    .attr("r", (d) => d.value) // Update radius based on new data
    .attr("cx", (d, i) => i * 150) // Update position (cx) to avoid overlap
    .attr("cy", 0); // Keep them on the same y level

  // Remove any circles that no longer have matching data
  circles.exit().remove();
}

// Initial render with practiceData
updateCircles(practiceData);

document.getElementById("update-circles").addEventListener("click", () => {
  console.log("clicked");
  updateCircles(updatedPracticeData);
});

function revertCircles() {
  const circles = mainSvg.selectAll("circle").data(practiceData, (d) => d.name);

  circles
    .transition()
    .duration(750)
    .attr("r", (d) => d.value)
    .attr("cx", (d, i) => i * 80)
    .attr("cy", 0)
    .attr("fill", (d) => color(d.name));

  circles.exit().remove();
}

document.getElementById("revert-circles").addEventListener("click", () => {
  revertCircles();
});
