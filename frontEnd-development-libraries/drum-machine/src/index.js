import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.playSound = this.playSound.bind(this);
	}

	playSound(key) {
		console.log(key);
	}

	render() {
		const soundArr = [
			{file:"./sounds/RP4_KICK_1.mp3", key: 'q'},
			{file:"./sounds/Cev_H2.mp3", key: 'w'},
			{file:"./sounds/Dsc_Oh.mp3", key: 'e'},
			{file:"./sounds/Heater-6.mp3", key: 'a'},
			{file:"./sounds/Kick_n_Hat.mp3", key: 's'},
			{file:"./sounds/Heater-4_1.mp3", key: 'd'},
			{file:"./sounds/Heater-3.mp3", key: 'z'},
			{file:"./sounds/Heater-2.mp3", key: 'x'},
			{file:"./sounds/Heater-1.mp3", key: 'c'}
		];

		function soundPadGenerator(soundPad) {
			return (
				<button className="drum-pad" id={soundPad.file.slice(9,-4)} onClick={() => this.playSound(soundPad.key)} >
					{soundPad.key.toUpperCase()}
				</button>
			)
		}

		return (
			<div id="drum-machine">
				<h1>This is the begining</h1>
				<div id="pad-container">
					{soundArr.map(soundPad => soundPadGenerator(soundPad))}
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
