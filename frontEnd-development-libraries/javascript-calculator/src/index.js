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
			{ symbol: "x", id: "multiply", keyCode: 106 },
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
			result: "0",
			num1: 0.0,
			operator: "",
			concat: false,
			dotPermit: true,
			clean: true,
		};

		this.keypressHandler = this.keypressHandler.bind(this);
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.computeKeys = this.computeKeys.bind(this);
		this.operate = this.operate.bind(this);
		this.clearAll = this.clearAll.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keypressHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keypressHandler);
	}

	keypressHandler(e) {
		console.log(
			this.keys.filter((key) => key.keyCode === e.keyCode)[0].symbol
		);
		//this.setState((state) => this.compute(e.keyCode));
	}

	buttonClickHandler(event) {
		//console.log(event);
		this.setState((state) => this.computeKeys(event));
		console.log("Clicked!!!");
	}

	computeKeys(pressed) {
		//const pressedKeySymbol = this.keys.filter((key) => (key.symbol === pressed || key.keyCode === pressed))[0].symbol;

		//console.log(pressed);

		if (["+", "-", "x", "/"].includes(pressed)) {
			if (this.state.clean) {
				return pressed === "-"
					? {
							result: this.state.result.includes(pressed)
								? this.state.result.replace(pressed, "0")
								: pressed,
							concat: true,
					  }
					: {
							num1: Number(this.state.result),
							operator: pressed,
							concat: false,
							clean: true,
					  };
			} else {
				return this.state.operator !== ""
					? this.state.clean
						? pressed === "-"
							? {
									result: this.state.result.includes(pressed)
										? this.state.result.replace(pressed, "0")
										: pressed,
									concat: true,
							  }
							: {
									operator: pressed,
							  }
						: {
								num1: Number(this.state.result),
								operator: pressed,
								concat: false,
								clean: true,
						  }
					: {
							num1: Number(this.state.result),
							operator: pressed,
							concat: false,
							clean: true,
					  };
			}
		} else if (pressed === ".") {
			if (this.state.dotPermit && !this.state.result.includes(".")) {
				return {
					result: this.state.result + pressed,
					concat: true,
				};
			} else if (
				!this.state.dotPermit &&
				!this.state.result.includes(".")
			) {
				return {
					result: "0.",
					concat: true,
					clean: false,
				};
			}
		} else if (!this.state.operator && !isNaN(Number(pressed))) {
			if (!this.state.concat) {
				return {
					result: pressed,
					concat: pressed === "0" ? false : true,
					clean: false,
				};
			} else {
				return {
					result: this.state.result + pressed,
					clean: false,
				};
			}
		} else if (this.state.operator && !isNaN(Number(pressed))) {
			if (!this.state.concat) {
				return {
					result: pressed,
					concat: true,
					clean: false,
				};
			} else {
				return {
					result: this.state.result + pressed,
					clean: false,
				};
			}
		}
	}

	operate() {
		let res;

		switch (this.state.operator) {
			case "+":
				res = Number(this.state.num1) + Number(this.state.result);
				break;
			case "-":
				res = Number(this.state.num1) - Number(this.state.result);
				break;
			case "x":
				res = Number(this.state.num1) * Number(this.state.result);
				break;
			case "/":
				res = Number(this.state.num1) / Number(this.state.result);
				break;
			default:
				res = this.state.result;
				break;
		}
		//console.log(res);
		let strResult = String(res);
		let isFloat = false;

		if (strResult.includes(".")) {
			strResult = strResult.slice(strResult.indexOf(".") + 1);
			isFloat = true;
		}

		console.log(res);
		console.log(strResult);

		this.setState((state) => ({
			result: String(
				isFloat && strResult.length > 4 ? res.toFixed(4) : res
			),
			num1: 0.0,
			num2: 0.0,
			operator: "",
			concat: false,
			dotPermit: false,
		}));

		console.log("Operation Done!!!");
	}

	clearAll() {
		this.setState((state) => ({
			result: "0",
			num1: 0.0,
			num2: 0.0,
			operator: "",
			concat: false,
			clean: true,
		}));

		console.log("Calculator Cleared!!!");
	}

	render() {
		return (
			<div id="calculator">
				<span className="header">
					f<sub>(X)</sub> = ingGGRM
				</span>
				<span className="header">JavaScript Calculator</span>
				<div id="display">{String(this.state.result)}</div>
				<div id="keys">
					{this.keys.map((key) => (
						<KeyCreator
							symbol={key.symbol}
							ident={key.id}
							actionFunction={
								key.symbol === "="
									? this.operate
									: key.symbol === "AC"
									? this.clearAll
									: this.buttonClickHandler
							}
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

	clickHandler(event) {
		this.props.actionFunction(event.target.value);
	}

	render() {
		return (
			<button
				className="key"
				id={this.props.ident}
				onClick={this.clickHandler}
				value={this.props.symbol}
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
