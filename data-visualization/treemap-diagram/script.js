const dataBases = {
	KickstarterPledges: {
		title: "Kickstarter Pledges",
		description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
		url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
	},
	MovieSales: {
		title: "Movie Sales",
		description: "Top 100 Highest Grossing Movies Grouped By Genre",
		url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
	},
	VideoGameSales: {
		title: "VideoGame Sales",
		description: "Top 100 Most Sold Video Games Grouped by Platform",
		url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
	},
};

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("graph-container");
	const margin = 10; // this is the empty space to the edges of the graph
	const w = 800 - (2 * margin);
	const h = 500 - (2 * margin);

	// set title and description of the graph
	const dataBase = dataBases.MovieSales;
	d3.select("#title").text(dataBase.title);
	d3.select("#description").text(dataBase.description)

	// create svg element in the container div #root with 20% less width and height
	const svg = d3
		.select(container)
		.append("svg")
		.attr("id", "graph")
		// Responsive SVG needs these 2 attributes and no width and height attr.
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 ${w + (2 * margin)} ${h + (2 * margin)}`) // make size take on account the margins for the inner graph
		.classed("svg-content-responsive", true)
		.style("border", "1px solid black")
		.append("g") // this group will contain the whole graph
		.attr("transform", "translate(" + margin + "," + margin + ")");

	// read json data
	d3.json(dataBase.url, function (data) {
		// get data structure to get color sets
		const categories = data.children.map((d) => d.name);

		// prepare a color scale
		let color = d3
			.scaleOrdinal()
			.domain(categories)
			.range([
				"lightgreen",
				"skyblue",
				"cyan",
				"orange",
				"yellow",
				"gray",
				"violet",
			]);
		
		// set a color opacity scale
		// first remove data complex structure and stract just data values
		const valuesArr = data.children.map((d) =>
			d.children.map((d) => d.value)
		);
		let moviesSales = [];
		// then finish making 1 dimension array with values to find the min and max
		for (let i = 0; i < valuesArr.length; i++) {
			for (let j = 0; j < valuesArr[i].length; j++) {
				moviesSales.push(valuesArr[i][0]);
			}
		}
		const opacity = d3
			.scaleLinear()
			.domain([
				d3.min(moviesSales, (d) => d),
				d3.max(moviesSales, (d) => d),
			])
			.range([0.7, 1]);
		
		// Give the data to this cluster layout:
		let root = d3.hierarchy(data).sum((d) => d.value); // Here the size of each leave is given in the 'value' field in input data
		// Then d3.treemap computes the position of each element of the hierarchy
		d3.treemap().size([w, h]).padding(2)(root);
		// use this information to add rectangles:
		svg.selectAll("rect")
			.data(root.leaves())
			.enter()
			.append("rect")
			.attr("class", "tile")
			.attr("x", d => d.x0)
			.attr("y", d => d.y0)
			.attr("width", d => d.x1 - d.x0)
			.attr("height", d => d.y1 - d.y0)
			.style("stroke", "black")
			.style("fill", d => color(d.parent.data.name))
			.style("opacity", d => opacity(d.data.value));
		
		
	});
});
