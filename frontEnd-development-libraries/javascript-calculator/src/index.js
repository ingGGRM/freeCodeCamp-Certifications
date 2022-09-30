import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.keys = [
			{symbol: '7', id:'seven'},
			{symbol: '8', id:'eight'},
			{symbol: '9', id:'nine'},
			{symbol: 'AC', id:'clear'},
			{symbol: '4', id:'four'},
			{symbol: '5', id:'five'},
			{symbol: '6', id:'six'},
			{symbol: 'X', id:'multiply'},
			{symbol: '/', id:'divide'},
			{symbol: '1', id:'one'},
			{symbol: '2', id:'two'},
			{symbol: '3', id:'three'},
			{symbol: '+', id:'add'},
			{symbol: '-', id:'substract'},
			{symbol: '0', id:'zero'},
			{symbol: '.', id:'decimal'},
			{symbol: '=', id:'equals'},
		];

		this.state = {
			result: '0',
			noData: true
		};

		this.displayHandler = this.displayHandler.bind(this);
	}

	displayHandler(data) {
		this.setState(state => ({
			result: (this.state.noData) ? data : this.state.result + data
		}));
	}

	render() {
		return (
			<div id="calculator">
				<spam className="header" >fx = ingGGRM</spam>
				<spam className="header" >JavaScript Calculator</spam>
				<div id="display" >{this.state.result}</div>
				<div id="keys">
					{this.keys.map(key => (
					<KeyCreator key={key} writeToDisplay={this.displayHandler} />
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

	}

	render() {
		return <button></button>
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
