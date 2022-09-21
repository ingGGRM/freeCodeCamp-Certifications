import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { marked } from 'marked'; // Imported marked library propperly

const editorPlaceholder = `# Hello and Welcome to the Markdown Interpreter
**FrontEnd Development Libraries Project** _#2_

## made by: ingGGRM <img align="center" width="50" src="https://avatars.githubusercontent.com/u/61787544?v=4" style="border-radius:50%"/>

> \`for the\` [FreeCodeCamp](https://www.freecodecamp.org/) \`Community\`!
* Hello.
  * Hola.
    * Bonjour.

\`\`\`
Just type some markdown coded text here and see what happens!!!
\`\`\``;
marked.setOptions({
	breaks: true,
});
						class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: editorPlaceholder,
		};

		this.inputHandler = this.inputHandler.bind(this);
	}

	inputHandler(event) {
		this.setState({
			input: event.target.value
		});
	}

	render() {
		//const editorStyle = {textAlign: (this.state.input === "") ? "center" : "left"}

		return (
			<div className="App">
				<div id="input-container">
					<textarea id="editor" value={this.state.input} onChange={this.inputHandler}></textarea>
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
