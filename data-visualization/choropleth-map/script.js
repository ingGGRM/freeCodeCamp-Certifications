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
		.attr("width", w)
		.attr("height", h)
}
