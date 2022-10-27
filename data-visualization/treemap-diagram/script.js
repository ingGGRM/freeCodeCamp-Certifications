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
	// get size aspect ratio from body wich is set to be as viewport size
	const body = d3.select("body");
	let w, h;
	if (
		Number(body.style("width").slice(0, -2)) >=
		Number(body.style("height").slice(0, -2)) * 1.5
	) {
		w = 900 - 2 * margin;
		h = 300 - 2 * margin;
	} else if (
		Number(body.style("width").slice(0, -2)) <=
		Number(body.style("height").slice(0, -2)) / 2
	) {
		w = 400 - 2 * margin;
		h = 800 - 2 * margin;
	} else {
		w = 800 - 2 * margin;
		h = 600 - 2 * margin;
	}

	/**********************************************************************
		SET TITLE AND DESCRIPTION FOR THE PAGE
	**********************************************************************/
	const dataBase = dataBases.MovieSales; // selected dataBase from the
	d3.select("#title").text(dataBase.title);
	d3.select("#description").text(dataBase.description);

	/**********************************************************************
		GET DATA FROM URL JSON
	**********************************************************************/
	d3.json(dataBase.url, function (data) {
		const groups = data.children.map((d) => d.name); // get data groups (categories), to know legend height
		const legendHeight = (1 + Math.floor(groups.length / 4)) * 20;

		/**********************************************************************
		CREATE THE CONTAINER SVG ELEMENT
		**********************************************************************/
		const svg = d3
			.select(container)
			.append("svg")
			.attr("id", "svg")
			// Responsive SVG needs these 2 attributes and no width and height attr.
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr(
				"viewBox",
				`0 0 ${w + 2 * margin} ${h + legendHeight + 2 * margin}`
			) // make size take on account the margins for the inner graph
			.classed("svg-content-responsive", true)
			.style("border", "1px solid black")
			.append("g") // this group will contain the whole graph
			.attr("id", "graph")
			.attr(
				"transform",
				"translate(" + margin + "," + (legendHeight + margin) + ")"
			);

		/**********************************************************************
			CREATE A COLOR AND OPPACITY SCALE
		**********************************************************************/
		let color = d3
			.scaleOrdinal()
			.domain(groups)
			.range([
				"#1f77b4",
				"#aec7e8",
				"#ff7f0e",
				"#ffbb78",
				"#2ca02c",
				"#98df8a",
				"#d62728",
				"#ff9896",
				"#9467bd",
				"#c5b0d5",
				"#8c564b",
				"#c49c94",
				"#e377c2",
				"#f7b6d2",
				"#7f7f7f",
				"#c7c7c7",
				"#bcbd22",
				"#dbdb8d",
				"#17becf",
				"#9edae5",
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
			CREATE THE TOOLTIP
		**********************************************************************/
		d3.select(container)
			.append("div")
			.attr("id", "tooltip")
			.style("visibility", "hidden")
			.style("transition", "50ms")
			.style("width", "150px")
			.style("height", "auto")
			.style("padding", "5px")
			.style("position", "absolute")
			.style("z-index", 10)
			.style("border", "1px solid black")
			.style("border-radius", "10px")
			.style("color", "white")
			.style("font-size", "80%");

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
			.attr("data-name", (d) => d.data.name)
			.attr("data-category", (d) => d.data.category)
			.attr("data-value", (d) => d.data.value)
			.attr("x", (d) => d.x0)
			.attr("y", (d) => d.y0)
			.attr("width", (d) => d.x1 - d.x0)
			.attr("height", (d) => d.y1 - d.y0)
			.style("stroke", "black")
			.style("fill", (d) => color(d.parent.data.name))
			.style("opacity", 1) // (d) => opacity(d.data.value));
			/**********************************************************************
				ADD MOUSE OVER EVENT TO THE TREEMAP TILES
			**********************************************************************/
			.on("mouseover", (e) => {
				var coordinates = [
					d3.event.clientX -
						document.getElementById("svg").getBoundingClientRect()
							.x +
						10,
					d3.event.clientY -
						document.getElementById("svg").getBoundingClientRect()
							.y +
						10,
				];

				d3.select("#tooltip")
					.attr("data-value", e.data.value)
					.style("left", coordinates[0] + "px")
					.style("top", coordinates[1] + "px")
					.style("background-color", "rgba(0,0,0,0.75")
					.style("visibility", "visible")
					.text(`${e.data.name} (${e.data.category}), Sales: ${e.data.value}`);
			})
			.on("mouseout", (e) => {
				// add mouseout event to bars
				d3.select("#tooltip").style("visibility", "hidden");
			});

		/**********************************************************************
			CREATE LEGEND FOR THE GRAPH
		**********************************************************************/
		const legend = d3
			.select("#svg")
			.append("g")
			.attr("id", "legend")
			.attr("transform", "translate(" + margin + ", " + margin + ")");

		// add legend rects with categories color
		legend
			.selectAll("rect")
			.data(groups)
			.enter()
			.append("rect")
			.attr("class", "legend-item")
			.attr("x", (d, i) => {
				let cnt = i - Math.floor(i / 4) * 4;
				return cnt === 0
					? w * 0.1
					: cnt === 1
					? w * 0.3
					: cnt === 2
					? w * 0.5
					: w * 0.7;
			})
			.attr("y", (d, i) => Math.floor(i / 4) * 20)
			.attr("width", 10)
			.attr("height", 10)
			.style("stroke", "black")
			.style("fill", (d) => color(d))
			.style("opacity", 1);

		// add legend text
		legend
			.selectAll("text")
			.data(groups)
			.enter()
			.append("text")
			.attr("class", "legend-item")
			.attr("x", (d, i) => {
				let cnt = i - Math.floor(i / 4) * 4;
				return cnt === 0
					? 15 + w * 0.1
					: cnt === 1
					? 15 + w * 0.3
					: cnt === 2
					? 15 + w * 0.5
					: 15 + w * 0.7;
			})
			.attr("y", (d, i) => 10 + Math.floor(i / 4) * 20)
			.text((d) => d)
			.style("color", "black")
			.style("font-weight", "gray")
			.style("font-size", "12px");
	});
});
