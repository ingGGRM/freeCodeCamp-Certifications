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

		// get x and y axis scales
		const xScale = d3
			.scaleTime() // set scale type to time, becouse of %Y values read from data array
			.domain([
				d3.min(json, (d) => d3.timeParse("%Y")(d.Year - 1)), // set domain 1 less than the min Year, so minimun values doesn't be over y axis
				d3.max(json, (d) => d3.timeParse("%Y")(d.Year))
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

		svg.selectAll("rect")
			.data(json)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => xScale(d3.timeParse("%Y")(d.Year))) // set rect on date data from json.data[0]
			.attr("cy", (d) => yScale(d3.timeParse("%M:%S")(d.Time)))
			.attr("r", 6)
			.attr("fill", (d) => d.Doping === "" ? "rgba(22, 137, 214, 0.5)" : "rgba(22, 214, 70, 0.5)")
			.attr("data-date", (d) => d[0])
			.attr("data-gdp", (d) => d[1])
			.style("stroke", "green")
			.style("transition-duration", "50ms")
			.on("mouseover", (e) => {
				// add mouseover event to bars
				d3.select("#tooltip-date").text(`${e[0]}`);
				d3.select("#tooltip-gdp").text(
					`USD${e[1].toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					})}`
				);
				tooltip
					.attr("data-date", e[0])
					.attr("data-gdp", e[1])
					.style("visibility", "visible") // show tooltip
					.style(
						"top",
						`${
							yScale(e[1]) + 80 > h
								? yScale(e[1]) - 80
								: yScale(e[1])
						}px`
					)
					.style(
						"left",
						`${
							padding + xScale(new Date(e[0])) + 200 > w
								? xScale(new Date(e[0])) - 200 - padding
								: padding + xScale(new Date(e[0]))
						}px`
					);
			})
			.on("mouseout", (e) => {
				// add mouseout event to bars
				tooltip.style("visibility", "hidden"); // hide tooltip
			});
	};
});
