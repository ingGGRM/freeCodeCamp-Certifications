import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**********************************************************************************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";

const arrowDown = <FontAwesomeIcon icon={faArrowAltCircleDown} pointerEvents="none" />;
const arrowUp = <FontAwesomeIcon icon={faArrowAltCircleUp} pointerEvents="none" />;
/**********************************************************************************************/

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 5,
			session: 25,
			counter: 0,
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(event) {
		console.log(event.target.value);
	}

	render() {
		return (
			<div>
				<label id="title">25+5 Clock</label>
				<div id="settings-panel">
					<div id="break-panel">
						<label id="break-label">
							Break Length:
							<span id="break-length">{` ${this.state.break}`}</span>
						</label>
						<button id="break-decrement" onClick={this.clickHandler} value="breakDown">{arrowDown}</button>
						<button id="break-increment" onClick={this.clickHandler} value="breakUp">{arrowUp}</button>
					</div>
					<div id="session-panel">
						<label id="session-label">
							Session Length:
							<span id="session-length">{` ${this.state.session}`}</span>
							<button id="session-decrement" onClick={this.clickHandler} value="sessionDown">{arrowDown}</button>
							<button id="session-increment" onClick={this.clickHandler} value="sessionUp">{arrowUp}</button>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
