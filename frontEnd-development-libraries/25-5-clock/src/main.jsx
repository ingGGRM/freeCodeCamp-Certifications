import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**********************************************************************************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

const icons = {
	arrowDown: (
		<FontAwesomeIcon icon={faArrowAltCircleDown} pointerEvents="none" />
	),
	arrowUp: <FontAwesomeIcon icon={faArrowAltCircleUp} pointerEvents="none" />,
	play: <FontAwesomeIcon icon={faPlay} pointerEvents="none" />,
	reset: <FontAwesomeIcon icon={faRefresh} pointerEvents="none" />,
};
/**********************************************************************************************/

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 5,
			session: 25,
			timer: "",
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.setState({ timer: `${this.state.session}:00` });
	}

	clickHandler(event) {
		console.log(event.target.value);

		let updBreak = this.state.break,
			updSession = this.state.session;

		switch (event.target.value) {
			case "breakDown":
				updBreak =
					this.state.break === 1
						? this.state.break
						: this.state.break - 1;
				break;
			case "breakUp":
				updBreak =
					this.state.break === 60
						? this.state.break
						: this.state.break + 1;
				break;
			case "sessionDown":
				updSession =
					this.state.session === 1
						? this.state.session
						: this.state.session - 1;
				break;
			case "sessionUp":
				updSession =
					this.state.session === 60
						? this.state.session
						: this.state.session + 1;
				break;
			default:
				break;
		}

		this.setState((state) => ({
			break: updBreak,
			session: updSession,
			timer: `${updSession}:00`,
		}));
	}

	render() {
		return (
			<div id="container" className="container-fluid">
				<label id="title">25+5 Clock</label>
				<div id="settings-panel">
					<div id="break-panel">
						<label id="break-label">
							Break Length:
							<span id="break-length">{` ${this.state.break}`}</span>
						</label>
						<button
							id="break-decrement"
							onClick={this.clickHandler}
							value="breakDown"
						>
							{icons.arrowDown}
						</button>
						<button
							id="break-increment"
							onClick={this.clickHandler}
							value="breakUp"
						>
							{icons.arrowUp}
						</button>
					</div>
					<div id="session-panel">
						<label id="session-label">
							Session Length:
							<span id="session-length">{` ${this.state.session}`}</span>
							<button
								id="session-decrement"
								onClick={this.clickHandler}
								value="sessionDown"
							>
								{icons.arrowDown}
							</button>
							<button
								id="session-increment"
								onClick={this.clickHandler}
								value="sessionUp"
							>
								{icons.arrowUp}
							</button>
						</label>
					</div>
				</div>
				<div id="display">
					<label id="timer-label">Session</label>
					<label id="time-left">{this.state.timer}</label>
				</div>
				<div id="control-panel">
					<button id="start_stop">{icons.play}</button>
					<button id="reset">{icons.reset}</button>
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
