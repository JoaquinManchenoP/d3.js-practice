var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160, 300];

var svgWidth = 550;
var svgHeight = 400;
var barPadding = 5;
var bottomPadding = 50;
var barWidth = svgWidth / dataset.length;

var svg = d3
  .select("svg.bar-chart-1")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", function (d) {
    return svgHeight - d - 50;
  })
  .attr("height", function (d) {
    return d;
  })
  .attr("width", barWidth - barPadding)
  .attr("transform", function (d, i) {
    var translate = [barWidth * i, 0];
    return "translate(" + translate + ")";
  });

var text = svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attr("y", function (d, i) {
    return svgHeight - 30; // Position the label just below the bars
  })
  .attr("x", function (d, i) {
    return barWidth * i + barWidth / 2;
  })
  .attr("text-anchor", "middle");
