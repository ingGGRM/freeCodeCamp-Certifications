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
		<FontAwesomeIcon
			icon={faArrowAltCircleDown}
			pointerEvents="none"
			color="green"
		/>
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
			seconds: 0,
			sessionTime: true,
			running: false,
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.setState({
			seconds: this.state.sessionTime
				? this.state.session * 60
				: this.state.break * 60,
		});

		const timer = setInterval(() => {
			if (this.state.running) {
				let updtedVal = this.state.seconds - 1;
				if (this.state.sessionTime && updtedVal >= 0) {
					this.setState((state) => ({
						seconds: updtedVal,
					}));
				} else if(updtedVal < 0) {
					updtedVal = (this.state.sessionTime) ? (this.state.break * 60) - 1 : (this.state.session * 60) - 1;
					this.setState((state) => ({
						seconds: updtedVal,
						sessionTime: !this.state.sessionTime,
					}));
				} else if(!this.state.sessionTime && updtedVal >= 0) {
					this.setState((state) => ({
						seconds: updtedVal,
					}));
				}
			}
		}, 70);
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
			seconds:
				event.target.value === "reset"
					? this.state.session * 60
					: event.target.value === "sessionUp" || event.target.value === "sessionDown"
					? updSession * 60 : this.state.seconds,
			running:
				event.target.value === "play"
					? !this.state.running
					: this.state.running,
		}));
	}

	getTimerValue(seconds) {
		let min = Math.floor(seconds / 60),
			sec = seconds % 60;

		let str = `${min < 10 ? "0" + min : min} : ${
			sec < 10 ? "0" + sec : sec
		}`;

		return str;
	}

	render() {
		return (
			<div id="container" className="container-fluid">
				<div id="title">25+5 Clock</div>
				<div id="settings-panel">
					<div id="break-panel">
						<label id="break-label">Break Length:</label>
						<div className="control">
							<button
								id="break-decrement"
								onClick={this.clickHandler}
								value="breakDown"
								className="btn btn-secondary"
							>
								{icons.arrowDown}
							</button>
							<label id="break-length">{` ${this.state.break}`}</label>
							<button
								id="break-increment"
								onClick={this.clickHandler}
								value="breakUp"
								className="btn btn-secondary"
							>
								{icons.arrowUp}
							</button>
						</div>
					</div>
					<div id="session-panel">
						<label id="session-label">Session Length:</label>
						<div className="control">
							<button
								id="session-decrement"
								onClick={this.clickHandler}
								value="sessionDown"
								className="btn btn-secondary"
							>
								{icons.arrowDown}
							</button>
							<label id="session-length">{` ${this.state.session}`}</label>
							<button
								id="session-increment"
								onClick={this.clickHandler}
								value="sessionUp"
								className="btn btn-secondary"
							>
								{icons.arrowUp}
							</button>
						</div>
					</div>
				</div>
				<div id="display">
					<label id="timer-label">Session</label>
					<label id="time-left">
						{this.getTimerValue(this.state.seconds)}
					</label>
				</div>
				<div id="control-panel">
					<label>
						<button
							id="start_stop"
							className="btn btn-primary"
							onClick={this.clickHandler}
							value="play"
						>
							{icons.play}
						</button>
						start
					</label>
					<label>
						<button
							id="reset"
							className="btn btn-warning"
							onClick={this.clickHandler}
							value="reset"
						>
							{icons.reset}
						</button>
						reset
					</label>
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
