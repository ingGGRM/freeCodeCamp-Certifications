import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
let marked = require("marked"); //import marked library

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
				<textarea id="editor" value={this.state.input} onChange={this.inputHandler}></textarea>
				<div id="preview">
					{/*
					dangerouslySetInnerHTML={{
                  __html: marked(this.state.input),
				  }}
				*/}
				</div>
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
