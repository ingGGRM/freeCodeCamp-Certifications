import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { marked } from 'marked'; // Imported marked library propperly

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "# Hello",
		};

		this.inputHandler = this.inputHandler.bind(this);
	}

	inputHandler(event) {
		this.setState({
			input: event.target.value
		});
	}

	render() {
		return (
			<div className="App">
				<textarea id="editor" value={this.state.input} onChange={this.inputHandler}></textarea>
				<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input)}}>
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
