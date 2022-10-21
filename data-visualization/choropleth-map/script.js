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

	// Data and color scale
	let dataSet = {};
	const colorScale = d3
		.scaleThreshold()
		.domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
		.range(d3.schemeBlues[7]);

	// Load external data and boot
	d3.json(
		"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
		function (error, us) {
			d3.json(
				"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
				function (data) {
					data.map((d) => {
						dataSet[d.fips] = d.bachelorsOrHigher;
					});
				}
			);
			// Draw the map
			let feature = topojson.feature(us, us.objects.counties);
			console.log(us);
			console.log(dataSet);
			svg.selectAll("path")
				.data(feature.features)
				.enter()
				.append("path")
				// draw each country
				.attr("d", d3.geoPath())
				.attr("transform", `scale(0.85, 0.7)`)
				.attr("class", "county")
				.attr("fill", function (d) {
					return colorScale(dataSet[d.id]);
				});
		}
	);
}
