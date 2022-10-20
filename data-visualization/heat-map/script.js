document.addEventListener("DOMContentLoaded", function () {
	builder();
});

function builder() {
	const container = document.getElementById("root");
	const w = container.offsetWidth; // get container div width
	const h = container.offsetHeight * 0.8; // get container div height less 20% for the legend;
	const paddingX = 30; // value to use as margin to the sides of the graph
	const paddingY = 60; // value to use as margin to the sides of the graph

	// create svg element in the container div #root with 20% less width and height
	const svg = d3
		.select(container)
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.style("background-color", "whitesmoke")
		.style("box-shadow", "5px 5px 10px 5px black");

	// get the data from the cloud
	const data = d3.json(
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
		(data) => {
			// function to work with received data
			console.log(data);

			// set title info from data
			d3.select("#base-temp").text(data["baseTemperature"]);
			d3.select("#min-year").text(
				d3.min(data["monthlyVariance"], (d) => d.year)
			);
			d3.select("#max-year").text(
				d3.max(data["monthlyVariance"], (d) => d.year)
			);

			// build x scale and axis:
			const xTicks = data["monthlyVariance"].map((d) => d.year);
			const xScale = d3
				.scaleBand()
				.domain(xTicks)
				.range([paddingY, w - paddingX]);
			svg.append("g")
				.attr("id", "x-axis")
				.attr("transform", "translate(0," + (h - paddingX) + ")")
				.call(
					d3.axisBottom(xScale).tickValues(
						xScale.domain().filter((d, i) => !(i % 10)) // changed ticksValue to use only each 10 years of the data array
					)
				);

			// build y scale and axis:
			var month = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			const yTicks = data["monthlyVariance"].map((d) => d.month);
			const yScale = d3
				.scaleBand()
				.domain(yTicks)
				.range([paddingX, h - paddingX]);
			svg.append("g")
				.attr("id", "y-axis")
				.attr("transform", "translate(" + paddingY + ", 0)")
				.call(d3.axisLeft(yScale).tickFormat((d, i) => month[i]));

			// Build color scale
			let colors = [
				"rgb(69, 117, 180)",
				"rgb(116, 173, 209)",
				"rgb(171, 217, 233)",
				"rgb(224, 243, 248)",
				"rgb(255, 255, 191)",
				"rgb(254, 224, 144)",
				"rgb(253, 174, 97)",
				"rgb(244, 109, 67)",
				"rgb(215, 48, 39)",
			];
			const colorScale = d3.scaleLinear().range(colors).domain([
				data["baseTemperature"] + (d3.min(data["monthlyVariance"], (d) => d.variance)),
				data["baseTemperature"] + (d3.max(data["monthlyVariance"], (d) => d.variance))
			]);
			console.log(colorScale.domain())

			// build the graph
			svg.selectAll("rect")
				.data(data["monthlyVariance"])
				.enter()
				.append("rect")
				.attr("class", "cell")
				.attr("data-month", (d) => d.month - 1)
				.attr("data-year", (d) => d.year)
				.attr("data-temp", (d) =>
					(data["baseTemperature"] + d.variance).toFixed(2)
				)
				.attr("x", (d) => xScale(d.year))
				.attr("y", (d) => yScale(d.month))
				.attr("width", xScale.bandwidth())
				.attr("height", yScale.bandwidth())
				.style("fill", (d) =>
					colorScale(data["baseTemperature"] + d.variance)
				);

			svg.selectAll("ticks").attr("class", "tick");

			// create svg element in the container div #root with 20% less width and height
			const legendH = container.offsetHeight * 0.15; // get container div height less 20% for the legend;
			const legend = d3
				.select(container)
				.append("svg")
				.attr("id", "legend")
				.attr("width", w)
				.attr("height", legendH)
				.style("margin-top", `${legendH / 3}px`)
				.style("background-color", "aliceblue")
				.style("box-sizing", "border-box");

            legend.selectAll("rect")
            .data(colors)
            .enter()
            .append("rect")
            .style("fill", (d) => d)
            .style("width", 40)
            .style("height", 40)
            .attr("x", (d, i) => ((w / 2) - ( 40 + (colors.length / 2) * 40)) + (40 * ++i))
            .attr("y", (legendH / 2) - 10);
			legend.selectAll("text")
			.data([colorScale.domain().slice(0,1), data.baseTemperature, colorScale.domain().slice(1,)])
            .enter()
			.append("text")
			.text((d) => `${Number(d).toFixed(2)} C`)
			.attr("x", (d, i) => w * [0.25, 0.47, 0.685][i])
			.attr("y", 20)
			.style("font-size", 18);
		}
	);
}
