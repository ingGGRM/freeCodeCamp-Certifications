const dataUrl =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// event handler to work after page content has loaded
document.addEventListener("DOMContentLoaded", function () {
	const svg = d3.select("#root"); // select #root element and store as svg
	const w = 800;
	const h = 600;
	const padding = 60;

	//sampleCirclesTest(svg); // uncomment call to test function

	//set svg size
	svg.attr("width", w).attr("height", h);

	const req = new XMLHttpRequest();
	req.open("GET", dataUrl, true);
	req.send();
	req.onload = function () {
		const json = JSON.parse(req.responseText);
		console.log(json.data); // uncomment to print json file directly as an object
		// console.log(JSON.stringify(json)); // uncomment to print json file as string

		// get x and y axis scales
		const xScale = d3
			.scaleLinear()
			.domain([d3.min(json.data, (d) => d[0].slice(0, 4)), d3.max(json.data, (d) => d[0].slice(0, 4))])
			.range([padding, w - padding]);
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(json.data, (d) => d[1])])
			.range([h - padding, padding]);

		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		svg.append("g")
			.attr("transform", "translate(0, " + (h - padding) + ")")
			.call(xAxis);
		svg.append("g")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		//svg.data(json.data).enter().append("");
	};
});

// test function that draws 3 color circles in svg element
function sampleCirclesTest(svg) {
	// change svg size and background color
	svg.attr("width", 240)
		.attr("height", 240)
		.style("background-color", "lightgray");
	// add red circle to svg
	svg.append("circle")
		.attr("cx", 40)
		.attr("cy", 40)
		.attr("r", 40)
		.style("fill", "red");
	// add green circle to svg
	svg.append("circle")
		.attr("cx", 120)
		.attr("cy", 120)
		.attr("r", 40)
		.style("fill", "green");
	// add blue circle to svg
	svg.append("circle")
		.attr("cx", 200)
		.attr("cy", 200)
		.attr("r", 40)
		.style("fill", "blue");
}
