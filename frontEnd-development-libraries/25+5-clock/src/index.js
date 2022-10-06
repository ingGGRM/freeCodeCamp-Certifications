import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from 'react-fontawesome'
import "./index.css";

const upIcon = <FontAwesomeIcon icon={FontAwesomeIcon.faCoffee} />
const downIcon = <FontAwesomeIcon icon={FontAwesomeIcon.faCoffee} />

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 5,
			session: 25,
		};

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(event) {
		console.log(event.target);
		const sound = document.getElementById("sound");
		sound.currentTime = 0;
		!sound.paused ? sound.pause() : sound.play();
	}

	render() {
		return (
			<div>
				<h1 id="title">25 + 5 Clock</h1>
				<div id="settings">
					<div id="break-settings">
						<label id="break-label">
							Break Length:
							<span id="break-length">{this.state.break}</span>
						</label>
						<button
							id="break-decrement"
							onClick={this.clickHandler}
						>
							{downIcon}
						</button>
						<button
							id="break-increment"
							onClick={this.clickHandler}
						>
							{upIcon}
						</button>
					</div>
					<div id="session-settings">
						<label id="session-label">
							Session Length:
							<span id="session-length">
								{this.state.session}
							</span>
						</label>
						<button
							id="session-decrement"
							onClick={this.clickHandler}
						>
							{downIcon}
						</button>
						<button
							id="session-increment"
							onClick={this.clickHandler}
						>
							{upIcon}
						</button>
					</div>
				</div>

				<audio
					id="sound"
					src="https://www.orangefreesounds.com/wp-content/uploads/2018/06/Cool-alarm-tone-notification-sound.mp3?_=1"
				></audio>
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
