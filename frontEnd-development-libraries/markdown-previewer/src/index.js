import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ""
		};

		this.inputHandler = this.inputHandler.bind(this);
	}

	inputHandler(event) {
		this.setState(state => ({
			input: event.target.value
		}));
	}

	render() {
		return (
			<div className="App">
				<textarea id="editor" onChange={this.inputHandler}></textarea>
				<div id="preview">{this.state.input}</div>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
