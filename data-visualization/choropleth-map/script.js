document.addEventListener("DOMContentLoaded", function () {
	builder();
});

function builder() {
	const container = document.getElementById("graph-container");
	//const w = d3.select(container).style("width"); // get container div width
	//const h = d3.select(container).style("height"); // get container div height;
	const w = 900;
	const h = 425;
	const paddingX = 30; // value to use as margin to the sides of the graph
	const paddingY = 60; // value to use as margin to the sides of the graph

	// create svg element in the container div #root with 20% less width and height
	const svg = d3
		.select(container)
		.append("svg")
		.attr("id", "graph")
		// Responsive SVG needs these 2 attributes and no width and height attr.
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 ${w} ${h}`)
		//.attr("viewBox", `0 0 ${w.slice(0,-2)} ${h.slice(0,-2)}`)
		//.attr("width", w)
		//.attr("height", h)
		.classed("svg-content-responsive", true)
		.style("border", "1px solid black");

	// Map and projection
	const path = d3.geoPath();
	let projection = d3
		.geoMercator()
		.scale(70)
		.center([0, 20])
		.translate([w / 2, h / 2]);

	// Load external data and boot
	d3.json(
		"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
		function (error, us) {
			d3.json(
				"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
				function (data) {
					let dataSet = {};
					// make a map with the data and the id of the counties, so can get the bachelorsOrHigher for an specific id
					data.map((d) => {
						dataSet[d.fips] = d.bachelorsOrHigher;
					});

					// Color scale using the max value of the dato to get 7 numbers for the 7 colors range
					const colorScale = d3
						.scaleThreshold()
						.domain(
							(function () {
								let arr = [];
								let max = d3.max(
									data,
									(d) => d.bachelorsOrHigher
								);
								for (let i = 0; i < 7; i++) {
									arr.push((max / 7) * (i + 1));
									// console.log(arr);
								}

								return arr;
							})()
						)
						.range(d3.schemeReds[7]);

					// create graph legend
					const legend = svg
						.append("g")
						.attr("id", "legend")
						.attr("width", "100px")
						.attr("height", "100px")
						.style("border", "1px solid green")
						.style("fill", "black")

					// Draw the map
					let feature = topojson.feature(us, us.objects.counties);
					// console.log(us);
					// console.log(dataSet);
					svg.selectAll("path")
						.data(feature.features)
						.enter()
						.append("path")
						// draw each country
						.attr("d", d3.geoPath())
						.attr("transform", `scale(0.85, 0.7)`)
						.attr("class", "county")
						.attr("fill", (d) => colorScale(dataSet[d.id]))
						.attr("data-fips", (d) => d.id)
						.attr("data-education", (d) => dataSet[d.id]);
					
					console.log(colorScale.range())

					legend.selectAll("rect")
						.data(colorScale.range())
						.enter()
						.append("rect")
						.attr("x", "calc(100% - 30px)")
						.attr("y", (d, i) => `${50 * (i + 1)}px`)
						.attr("width", "15px")
						.attr("height", "40px")
						.attr("fill", d => d);

					legend.selectAll("text")
						.data(colorScale.domain())
						.enter()
						.append("text")
						.attr("x", "calc(93%)")
						.attr("y", (d, i) => `${75 + (i * 50)}px`)
						.text(d => d.toFixed(2))
						.style("font-size", "2vh");
				}
			);
		}
	);
}
