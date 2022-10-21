const url = [
	{
		usEducation:
			"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
	},
	{
		usCounty:
			"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
	},
];

document.addEventListener("DOMContentLoaded", function () {
	builder();
});

function builder() {
	const container = document.getElementById("graph-container");
	const w = d3.select(container).style("width"); // get container div width
	const h = d3.select(container).style("height"); // get container div height;
	const paddingX = 30; // value to use as margin to the sides of the graph
	const paddingY = 60; // value to use as margin to the sides of the graph

	// create svg element in the container div #root with 20% less width and height
	const svg = d3
		.select(container)
		.append("svg")
		.attr("id", "graph")
		// Responsive SVG needs these 2 attributes and no width and height attr.
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 900 500`)
		//.attr("viewBox", `0 0 ${w.slice(0,-2)} ${h.slice(0,-2)}`)
		//.attr("width", w)
		//.attr("height", h)
		.classed("svg-content-responsive", true)
		.style("border", "1px solid black");

	// Map and projection
	let path = d3.geoPath();
	let projection = d3
		.geoMercator()
		.scale(70)
		.center([0, 20])
		.translate([width / 2, height / 2]);
}
