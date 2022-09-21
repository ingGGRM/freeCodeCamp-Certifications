import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { marked } from 'marked'; // Imported marked library propperly

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
		};

		this.inputHandler = this.inputHandler.bind(this);
	}

	inputHandler(event) {
		this.setState({
			input: event.target.value
		});
	}

	render() {
		const editorPlaceholder = "Hello and Welcome to the Markdown Interpreter\n\n\n" +
						"made by: ingGGRM\n\n\n" +
						"for the FreeCodeCamp Community\n\n\n" + 
						"JUST TYPE SOME MARKDOWN TEXT HERE";
		const editorStyle = {textAlign: (this.state.input === "") ? "center" : "left"}

		return (
			<div className="App">
				<div id="input-container">
					<textarea id="editor" style ={editorStyle} value={this.state.input} onChange={this.inputHandler} placeholder={editorPlaceholder}></textarea>
				</div>
				<div id="output-container">PREVIEW
					<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input)}}></div>
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
