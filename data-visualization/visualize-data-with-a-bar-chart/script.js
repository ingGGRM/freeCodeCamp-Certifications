const dataUrl =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// event handler to work after page content has loaded
document.addEventListener("DOMContentLoaded", function () {
	const svg = d3.select("#root"); // select #root element and store as svg

	//sampleCirclesTest(svg); // uncomment call to test function

	var json = getJson(dataUrl); // get json data from server and store
});

// function that receives an url and returns a fetched json file using that url
function getJson(url) {
	let json = {};
	const req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.send();
	req.onload = function () {
		json = JSON.parse(req.responseText);
		// console.log(json); // uncomment to print json file directly as an object
		// console.log(JSON.stringify(json)); // uncomment to print json file as string
	};

	return json;
}

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
