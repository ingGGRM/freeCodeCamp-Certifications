import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div id="drum-machine">
				<h1>This is the begining</h1>
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
