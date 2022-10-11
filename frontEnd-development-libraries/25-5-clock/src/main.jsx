import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**********************************************************************************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";

const icons = {
	arrowDown: <FontAwesomeIcon icon={faArrowDown} pointerEvents="none" />,
	arrowUp: <FontAwesomeIcon icon={faArrowUp} pointerEvents="none" />,
	play: <FontAwesomeIcon icon={faPlay} pointerEvents="none" />,
	pause: <FontAwesomeIcon icon={faPause} pointerEvents="none" />,
	reset: <FontAwesomeIcon icon={faStop} pointerEvents="none" />,
};

const sounds = {
	cockerel: "https://kukuklok.com/audio/cock.mp3",
	clock: "https://kukuklok.com/audio/clock.mp3",
	military: "https://kukuklok.com/audio/military.mp3",
	electronic: "https://kukuklok.com/audio/electronic.mp3",
	guitar: "https://kukuklok.com/audio/guitar.mp3",
	alien: "https://kukuklok.com/audio/alien.mp3",
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
			paused: false,
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.setState({
			seconds: this.state.sessionTime
				? this.state.session * 60
				: this.state.break * 60,
		});

		this.timer = null;
	}

	startStopAlarm(str) {
		let alarm = document.getElementById("beep");
		alarm.currentTime = 0;
		if (str === "play" && this.state.sessionTime) {
			alarm.play();
		} else {
			alarm.load();
		}
	}

	clickHandler(event) {
		console.log(event.target.value);

		let updBreak = this.state.break,
			updSession = this.state.session;

		switch (event.target.value) {
			case "breakDown":
				if (!this.state.running) {
					updBreak =
						this.state.break === 1
							? this.state.break
							: this.state.break - 1;
				}
				break;
			case "breakUp":
				if (!this.state.running) {
					updBreak =
						this.state.break === 60
							? this.state.break
							: this.state.break + 1;
				}
				break;
			case "sessionDown":
				if (!this.state.running) {
					updSession =
						this.state.session === 1
							? this.state.session
							: this.state.session - 1;
				}
				break;
			case "sessionUp":
				if (!this.state.running) {
					updSession =
						this.state.session === 60
							? this.state.session
							: this.state.session + 1;
				}
				break;
			case "play":
				if (!this.state.running) {
					this.timer = setInterval(() => {
						let updtedVal = this.state.seconds - 1;

						if (this.state.paused) updtedVal -= 1;

						if (this.state.sessionTime && updtedVal >= 0) {
							this.setState((state) => ({
								seconds: updtedVal,
								paused: false,
							}));
						} else if (updtedVal < 0) {
							this.startStopAlarm("play");
							updtedVal = this.state.sessionTime
								? this.state.break * 60
								: this.state.session * 60;
							this.setState((state) => ({
								seconds: updtedVal,
								sessionTime: !this.state.sessionTime,
								paused: false,
							}));
						} else if (!this.state.sessionTime && updtedVal >= 0) {
							this.setState((state) => ({
								seconds: updtedVal,
								paused: false,
							}));
						}
					}, 1000);
				} else {
					clearInterval(this.timer);
				}
				break;
			case "reset":
				clearInterval(this.timer);
				this.startStopAlarm("reset");
				break;
			default:
				break;
		}

		if (!this.state.running) {
			this.setState((state) => ({
				break: event.target.value === "reset" ? 5 : updBreak,
				session: event.target.value === "reset" ? 25 : updSession,
				seconds:
					event.target.value === "reset"
						? 25 * 60
						: event.target.value === "sessionUp" ||
						  event.target.value === "sessionDown"
						? updSession * 60
						: this.state.seconds,
				running:
					event.target.value === "play"
						? !this.state.running
						: this.state.running,
				paused:
					event.target.value === "play" && this.state.running
						? true
						: false,
			}));
		} else {
			this.setState((state) => ({
				break: event.target.value === "reset" ? 5 : this.state.break,
				session:
					event.target.value === "reset" ? 25 : this.state.session,
				seconds:
					event.target.value === "reset"
						? 25 * 60
						: this.state.seconds,
				running:
					event.target.value === "play" ||
					event.target.value === "reset"
						? !this.state.running
						: this.state.running,
				sessionTime:
					event.target.value === "reset"
						? true
						: this.state.sessionTime,
				paused:
					event.target.value === "play" ? true : this.state.paused,
			}));
		}
	}

	getTimerValue(seconds) {
		let min = Math.floor(seconds / 60),
			sec = seconds % 60;

		let str = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;

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
					<label id="timer-label">
						{this.state.sessionTime ? "Session" : "Break"}
					</label>
					<label id="time-left">
						{this.getTimerValue(this.state.seconds)}
					</label>
					<audio id="beep" src={sounds.guitar}></audio>
				</div>
				<div id="control-panel">
					<label>
						<button
							id="start_stop"
							className="btn btn-primary"
							onClick={this.clickHandler}
							value="play"
						>
							{!this.state.running ? icons.play : icons.pause}
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
