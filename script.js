var t = -1;
var n = 40;
var v = 0;
var data = d3.range(n).map(next);
//generte next rand value
function next() {
    return {
        time: ++t,
        value: v = Math.floor(Math.random() * 30)
    };
}
//chart position
var margin = {
        top: 100,
        right: 10,
        bottom: 20,
        left: 40
    },
    width = document.getElementById("chart_one").offsetWidth - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 30])
    .range([height, 0]);

var line = d3.svg.line()
    .x(function (d, i) {
        console.log(d.time);
        return x(d.time);
    })
    .interpolate("monotone") // smooth interpollation
    .y(function (d, i) {
        return y(d.value);
    });

var svg = d3.select("#chart_one").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = g.append("svg")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var axis = graph.append("g")
    .attr("class", "x axis")
    .text("random X value")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

g.append("g")
    .attr("class", "y axis")
    .text("random Y value")
    .call(d3.svg.axis().scale(y).orient("left"));

var path = graph.append("g")
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line);

tick();

function tick() {
    // push a new data point onto the back
    data.push(next());

    // update domain
    x.domain([t - n, t]);

    // redraw path, shift path left
    path
        .attr("d", line)
        .attr("transform", null)
        .transition()
        .duration(500)
        .ease("basis")
        .attr("transform", "translate(" + t - 1 + ")")
        .each("end", tick);

    // shift axis left
    axis
        .transition()
        .duration(500)
        .ease("basis")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    // pop the old data point off the front
    data.shift();
}