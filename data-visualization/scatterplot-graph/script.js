const dataUrl =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

// event handler to work after page content has loaded
document.addEventListener("DOMContentLoaded", function () {
	const svg = d3.select("#graph"); // select #root element and store as svg
	const tooltip = d3
		.select("#tooltip")
		.attr("data-date", "")
		.attr("data-gdp", 0);

	const padding = 60;
	const parentDiv = document.getElementById("root");
	const w = parentDiv.offsetWidth; // get container div width
	const h = parentDiv.offsetHeight; // get container div height

	//set svg size
	svg.attr("width", w).attr("height", h);
	console.log(h, w);

	const req = new XMLHttpRequest();
	req.open("GET", dataUrl, true);
	req.send();
	req.onload = function () {
		const json = JSON.parse(req.responseText); // convert string to object
		console.log(json); // uncomment to print json file directly as an object
		// The 3 aspects to take on account for graph construction
		console.log(json[0].Year); // example getting object 0 Year
		console.log(json[0].Time); // example getting object 0 Time
		console.log(json[0].Doping); // if not "", then clasified as "Doping Allegation", else "Not Doping Allegation"

        // proccessing data formats to make it be like date (years, minutes, seconds, etc) data
        let years = json.map(d => d3.timeParse("%Y")(d.Year));
        let times = json.map(d => d3.timeParse("%M:%S")(d.Time));

		// get x and y axis scales
		const xScale = d3
			.scaleTime()
			.domain(d3.extent(years))
			.range([padding, w - padding]);
		const yScale = d3
			.scaleTime() // set scale type to time, becouse of %M:%S values read from data array
			.domain(d3.extent(times))
			.range([h - padding, padding]);

		// create x and y axis
		const xAxis = d3.axisBottom(xScale); // quit comma thousands separator in values format
		const yAxis = d3.axisLeft(yScale);

		// draw x and y axis
		svg.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0, " + (h - padding) + ")")
			.call(xAxis).ticks(d3.timeYear.every(2));
		svg.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		// select tick elements to add tick class to them
		d3.selectAll("ticks").attr("class", "tick");
	};
});
