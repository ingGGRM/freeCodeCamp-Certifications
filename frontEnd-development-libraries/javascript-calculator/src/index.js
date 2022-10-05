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
			{ symbol: "-", id: "subtract", keyCode: 109 },
			{ symbol: "0", id: "zero", keyCode: 96 },
			{ symbol: ".", id: "decimal", keyCode: 110 },
			{ symbol: "=", id: "equals", keyCode: 13 },
		];

		this.state = {
			screenData: "0",
			num1: 0.0,
			num2: 0.0,
			operator: "",
			negative: false,
			concat: false,
			dotPermit: true,
			clean: true,
			changeOp: false,
			canNeg: true,
		};

		this.keypressHandler = this.keypressHandler.bind(this);
		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.computeNumbers = this.computeNumbers.bind(this);
		this.computeFunctions = this.computeFunctions.bind(this);
		this.clearAll = this.clearAll.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keypressHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keypressHandler);
	}

	keypressHandler(e) {
		if (e.keyCode === 13) {
			this.operate();
		} else {
			let dt = [];

			try {
				dt = this.keys.filter((key) => key.keyCode === e.keyCode)[0]
					.symbol;
			} catch (err) {
				console.log("Unsupported Key!!!");
			}
			if (dt.length > 0) {
				this.setState((state) =>
					["+", "-", "x", "/", "="]
						? this.computeFunctions(dt)
						: this.computeNumbers(dt)
				);
			}
		}
	}

	buttonClickHandler(event) {
		this.setState((state) =>
			["+", "-", "x", "/", "="].includes(event)
				? this.computeFunctions(event)
				: this.computeNumbers(event)
		);
	}

	computeNumbers(pressed) {
		console.log("Numbers");

		if (this.state.dotPermit && pressed === ".") {
			return {
				screenData: !this.state.clean
					? this.state.screenData + pressed
					: "0.",
				dotPermit: false,
				concat: true,
				changeOp: false,
				canNeg: false,
			};
		} else if (!this.state.dotPermit && pressed === ".") {
			return {};
		} else if (this.state.screenData !== "0" && this.state.concat) {
			return {
				screenData: this.state.screenData + pressed,
				changeOp: false,
				canNeg: false,
				clean: false,
			};
		} else {
			return {
				screenData: pressed,
				concat: true,
				changeOp: false,
				canNeg: false,
				clean: false,
			};
		}
	}

	computeFunctions(pressed) {
		console.log("Functions");

		if (((pressed === "-" && ['+', 'x', '/'].includes(this.state.operator)) || (pressed === "-")) && this.state.canNeg) {
			console.log(this.state)
			return {
				screenData: this.state.negative ? '0' : '-',
				concat: this.state.negative ? false : true,
				negative: !this.state.negative,
			};
		} else if (this.state.operator === "" || this.state.changeOp) {
			return {
				num1: this.state.changeOp
					? this.state.num1
					: Number(this.state.screenData),
				operator: pressed,
				negative: false,
				concat: false,
				dotPermit: true,
				clean: true,
				changeOp: true,
				canNeg: true,
			};
		} else {
			let result = this.operate(
				this.state.num1,
				Number(this.state.screenData),
				this.state.operator
			);
			let strResult = String(result).includes(".")
				? String(result).slice(String(result).indexOf(".") + 1)
				: "";

			return {
				screenData:
					strResult.length > 4
						? String(result.toFixed(4))
						: String(result),
				num1: result,
				num2: Number(this.state.screenData),
				operator: pressed,
				negative: false,
				concat: false,
				dotPermit: true,
				clean: true,
				changeOp: true,
				canNeg: pressed === '-' ? false : true,
			};
		}
	}

	operate(x, y, op) {
		console.log(x, op, y);
		let result;

		switch (op) {
			case "+":
				result = x + y;
				break;
			case "-":
				result = x - y;
				break;
			case "x":
				result = x * y;
				break;
			case "/":
				result = x / y;
				break;
			default:
				result = y;
				break;
		}

		console.log(result);
		return result;
	}

	clearAll() {
		this.setState((state) => ({
			screenData: "0",
			num1: 0.0,
			num2: 0.0,
			operator: "",
			negative: false,
			concat: false,
			dotPermit: true,
			clean: true,
			canNeg: true,
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
				<div id="display">{String(this.state.screenData)}</div>
				<div id="keys">
					{this.keys.map((key) => (
						<KeyCreator
							symbol={key.symbol}
							ident={key.id}
							actionFunction={
								key.symbol === "AC"
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
