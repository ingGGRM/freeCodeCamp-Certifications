const dataUrl =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

// event handler to work after page content has loaded
document.addEventListener("DOMContentLoaded", function () {
	createGraph();
});

function createGraph() {
	const svg = d3.select("#graph"); // select #root element and store as svg
	const tooltip = d3.select("#tooltip").attr("data-year", "");

	const padding = 60;
	const parentDiv = document.getElementById("root");
	const w = parentDiv.offsetWidth; // get container div width
	const h = parentDiv.offsetHeight; // get container div height

	// set svg size
	svg.attr("width", w).attr("height", h);

	// create tooltip inner elements that will show data of bar on mouseover event
	d3.select("#tooltip").append("strong").text("Name: ");
	d3.select("#tooltip").append("span").attr("id", "tooltip-name");
	d3.select("#tooltip").append("br");
	d3.select("#tooltip").append("strong").text("Time: ");
	d3.select("#tooltip").append("span").attr("id", "tooltip-time");
	d3.select("#tooltip").append("strong").text("Year: ");
	d3.select("#tooltip").append("span").attr("id", "tooltip-year");
	d3.select("#tooltip").append("br");
	d3.select("#tooltip").append("strong").text("Dopping: ");
	d3.select("#tooltip").append("span").attr("id", "tooltip-doping");

	const req = new XMLHttpRequest();
	req.open("GET", dataUrl, true);
	req.send();
	req.onload = function () {
		const json = JSON.parse(req.responseText); // convert string to object

		// get x and y axis scales
		const xScale = d3
			.scaleTime() // set scale type to time, becouse of %Y values read from data array
			.domain([
				d3.min(json, (d) => d3.timeParse("%Y")(d.Year - 1)), // set domain 1 less than the min Year, so minimun values doesn't be over y axis
				d3.max(json, (d) => d3.timeParse("%Y")(d.Year + 1)),
			])
			.range([padding, w - padding]);
		const yScale = d3
			.scaleTime() // set scale type to time, becouse of %M:%S values read from data array
			.domain([
				d3.min(json, (d) => d3.timeParse("%M:%S")(d.Time)),
				d3.max(json, (d) => d3.timeParse("%M:%S")(d.Time)),
			])
			.range([padding, h - padding]);

		// create x and y axis
		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")); // show Time values correctly

		// draw x and y axis
		svg.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0, " + (h - padding) + ")")
			.call(xAxis);
		svg.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		// select tick elements to add tick class to them
		d3.selectAll("ticks").attr("class", "tick");

		svg.selectAll("circles")
			.data(json)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => xScale(d3.timeParse("%Y")(d.Year)))
			.attr("cy", (d) => yScale(d3.timeParse("%M:%S")(d.Time)))
			.attr("r", 6)
			.attr(
				"fill",
				(
					d // set dot's fill color based on the doping data
				) =>
					d.Doping === ""
						? "rgba(22, 137, 214, 0.5)"
						: "rgba(22, 214, 70, 0.5)"
			)
			.attr("data-xvalue", (d) =>
				d3.timeParse("%Y")(d.Year).getFullYear()
			) // special attribute for certification
			.attr("data-yvalue", (d) => d3.timeParse("%M:%S")(d.Time)) // special attribute for certification
			.style("stroke", "black") // set border to each dot
			.style("transition-duration", "50ms")
			// add mouseover event to dots
			.on("mouseover", (e) => {
				d3.select("#tooltip-name").text(`${e.Name} (${e.Nationality})`);
				d3.select("#tooltip-time").text(`${e.Time}  `);
				d3.select("#tooltip-year").text(`${e.Year}`);
				d3.select("#tooltip-doping").text(
					`${e.Doping === "" ? "Never Detected." : e.Doping}`
				);
				tooltip
					.attr("data-year", e.Year)
					.style("visibility", "visible") // show tooltip
					.style(
						"top",
						`${yScale(d3.timeParse("%M:%S")(e.Time)) - 30}px`
					)
					.style(
						"left",
						`${
							30 + xScale(d3.timeParse("%Y")(e.Year)) + 200 < w
								? 30 + xScale(d3.timeParse("%Y")(e.Year))
								: xScale(d3.timeParse("%Y")(e.Year)) - 200 - 30
						}px`
					);
			})
			.on("mouseout", (e) => {
				// add mouseout event to bars
				tooltip.style("visibility", "hidden"); // hide tooltip
			});

		// add legend to the graph
		d3.select("#root").append("div").attr("id", "legend");

		const legend = d3.select("#legend");

		legend
			.append("div")
			.style("display", "inline-block")
			.style("width", "20px")
			.style("height", "20px")
			.style("background-color", "rgba(22, 137, 214, 0.5)")
			.style("border", "1px solid black");
		legend
			.append("div")
			.style("display", "inline-block")
			.text("No Doping Data")
			.style("font-size", "16px");
		legend.append("br");
		legend
			.append("div")
			.style("display", "inline-block")
			.style("width", "20px")
			.style("height", "20px")
			.style("background-color", "rgba(22, 214, 70, 0.5)")
			.style("border", "1px solid black");
		legend
			.append("div")
			.style("display", "inline-block")
			.text("Doping Data")
			.style("font-size", "16px");
	};
}
