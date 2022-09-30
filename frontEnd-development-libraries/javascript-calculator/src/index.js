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
			num: '0',
			operator: ''			
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(data) {
		this.setState(state => ({
			result: data
		}));
	}

	render() {
		return (
			<div id="calculator">
				<span className="header" >fx = ingGGRM</span>
				<span className="header" >JavaScript Calculator</span>
				<div id="display" >{this.state.result}</div>
				<div id="keys">
					{this.keys.map(key => (
					<KeyCreator symbol={key.symbol} ident={key.id} stateChanger={this.clickHandler} />
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
		return <button className="key" id={this.props.ident} onClick={this.clickHandler} >{this.props.symbol}</button>
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
