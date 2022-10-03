import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.keys = [
			{ symbol: "7", id: "seven", keyCode: 103 },
			{ symbol: "8", id: "eight", keyCode: 104 },
			{ symbol: "9", id: "nine", keyCode: 105 },
			{ symbol: "AC", id: "clear" },
			{ symbol: "4", id: "four", keyCode: 100 },
			{ symbol: "5", id: "five", keyCode: 101 },
			{ symbol: "6", id: "six", keyCode: 102 },
			{ symbol: "X", id: "multiply", keyCode: 106 },
			{ symbol: "/", id: "divide", keyCode: 111 },
			{ symbol: "1", id: "one", keyCode: 97 },
			{ symbol: "2", id: "two", keyCode: 98 },
			{ symbol: "3", id: "three", keyCode: 99 },
			{ symbol: "+", id: "add", keyCode: 107 },
			{ symbol: "-", id: "substract", keyCode: 109 },
			{ symbol: "0", id: "zero", keyCode: 96 },
			{ symbol: ".", id: "decimal", keyCode: 110 },
			{ symbol: "=", id: "equals", keyCode: 13 },
		];

		this.state = {
			result: 0.0,
			num1: 0.0,
			num2: 0.0,
			operator: "",
		};

		this.keypressHandler = this.keypressHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.compute = this.compute.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keypressHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keypressHandler);
	}

	keypressHandler(e) {
		this.setState((state) => this.compute(e.keyCode));
	}

	clickHandler(event) {
		this.setState((state) => this.compute(event));
	}

	compute(pressed) {
		this.keys.map((key) => {
			if (key.symbol === pressed || key.keyCode === pressed) {
				console.log(key.symbol);
			}
		});

		return {};
	}

	render() {
		return (
			<div id="calculator">
				<span className="header">f<sub>(X)</sub> = ingGGRM</span>
				<span className="header">JavaScript Calculator</span>
				<div id="display">{String(this.state.result)}</div>
				<div id="keys">
					{this.keys.map((key) => (
						<KeyCreator
							symbol={key.symbol}
							ident={key.id}
							stateChanger={this.clickHandler}
						/>
					))}
				</div>
			</div>
		);
	}
}

class KeyCreator extends React.Component {
	constructor(props) {
		super(props);

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.props.stateChanger(this.props.symbol);
	}

	render() {
		return (
			<button
				className="key"
				id={this.props.ident}
				onClick={this.clickHandler}
			>
				{this.props.symbol}
			</button>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
