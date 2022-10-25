const dataBases = {
	KickstarterPledges: {
		title: "Kickstarter Pledges",
		description:
			"Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
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
	/**********************************************************************
		START GETTING CONTAINER DIV FOR THE GRAPH
		SET SIZE AND DIMENSIONS
	**********************************************************************/
	const container = document.getElementById("graph-container");
	const margin = 10; // this is the empty space to the edges of the graph
	const w = 900 - 2 * margin;
	const h = 400 - 2 * margin;

	/**********************************************************************
		SET TITLE AND DESCRIPTION FOR THE PAGE
	**********************************************************************/
	const dataBase = dataBases.MovieSales; // selected dataBase from the
	d3.select("#title").text(dataBase.title);
	d3.select("#description").text(dataBase.description);

	/**********************************************************************
		CREATE THE CONTAINER SVG ELEMENT
	**********************************************************************/
	const svg = d3
		.select(container)
		.append("svg")
		.attr("id", "svg")
		// Responsive SVG needs these 2 attributes and no width and height attr.
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 ${w + 2 * margin} ${h + 100 + 2 * margin}`) // make size take on account the margins for the inner graph
		.classed("svg-content-responsive", true)
		.style("border", "1px solid black")
		.append("g") // this group will contain the whole graph
		.attr("id", "graph")
		.attr("transform", "translate(" + margin + "," + margin + ")");

	/**********************************************************************
		GET DATA FROM URL JSON
	**********************************************************************/
	d3.json(dataBase.url, function (data) {
		const groups = data.children.map((d) => d.name); // get data groups

		/**********************************************************************
			CREATE A COLOR AND OPPACITY SCALE
		**********************************************************************/
		let color = d3
			.scaleOrdinal()
			.domain(groups)
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
		let dataValues = [];
		// then finish making 1 dimension array with values to find the min and max
		for (let i = 0; i < valuesArr.length; i++) {
			for (let j = 0; j < valuesArr[i].length; j++) {
				dataValues.push(valuesArr[i][0]);
			}
		}
		const opacity = d3
			.scaleLinear()
			.domain([
				d3.min(dataValues, (d) => d),
				d3.max(dataValues, (d) => d),
			])
			.range([0.7, 1]);

		/**********************************************************************
			CREATE THE TREEMAP DIAGRAM
		**********************************************************************/
		// Give the data to the d3 treeMap layout:
		let root = d3.hierarchy(data).sum((d) => d.value); // Here the size of each leave is given in the 'value' field in input data
		// Then d3.treemap computes the position of each element of the hierarchy
		d3.treemap().size([w, h]).padding(2)(root);
		// use this information to add rectangles:
		svg.selectAll("rect")
			.data(root.leaves())
			.enter()
			.append("rect")
			.attr("class", "tile")
			.attr("data-name", d => d.data.name)
			.attr("data-category", d => d.data.category)
			.attr("data-value", d => d.data.value)
			.attr("x", (d) => d.x0)
			.attr("y", (d) => d.y0)
			.attr("width", (d) => d.x1 - d.x0)
			.attr("height", (d) => d.y1 - d.y0)
			.style("stroke", "black")
			.style("fill", (d) => color(d.parent.data.name))
			.style("opacity", (d) => opacity(d.data.value));

		/**********************************************************************
			CREATE LEGEND FOR THE GRAPH
		**********************************************************************/
		const legend = d3
			.select("#svg")
			.append("g")
			.attr("id", "legend")
			.attr(
				"transform",
				"translate(" + margin + ", " + (h + 2 * margin) + ")"
			);

		legend
			.selectAll("rect")
			.data(groups)
			.enter()
			.append("rect")
			.attr("class", "legend-item")
			.attr("x", (d, i) => ((w / 2) - (groups.length / 2) * 50) + (i * 50))
			.attr("y", (d) => d.y0)
			.attr("width", 20)
			.attr("height", 20)
			.style("stroke", "black")
			.style("fill", (d) => color(d))
			.style("opacity", 1);
	});
});
