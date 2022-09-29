import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//************SOUND FILES IMPORTING*************//
import plates_1 from "./sounds/Kick_n_Hat.mp3";
import plates_2 from "./sounds/Cev_H2.mp3";
import plates_3 from "./sounds/Dsc_Oh.mp3";
import kick from "./sounds/RP4_KICK_1.mp3";
import heater1 from "./sounds/Heater-1.mp3";
import heater2 from "./sounds/Heater-2.mp3";
import heater3 from "./sounds/Heater-3.mp3";
import heater4 from "./sounds/Heater-4_1.mp3";
import heater5 from "./sounds/Heater-6.mp3";
//**********************************************//

class DrumPad extends React.Component {
	constructor(props) {
		super(props);

		this.keyPressHandler = this.keyPressHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.player = this.player.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keyPressHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler(e) {
		if ([65, 67, 68, 69, 81, 83, 87, 88, 90].includes(e.keyCode)) {
			this.player(
				document.getElementById(String.fromCharCode(e.keyCode)),
				this.props.soundData.name
			);
		}
	}

	clickHandler(event) {
		console.log(event.target.value);
		this.player(
			document.getElementById(String.fromCharCode(event.target.value)),
			this.props.soundData.name
		);
	}

	player(snd, text) {
		console.log(`Playing: ${text}`);

		this.props.stateChanger(text);

		snd.currentTime = 0;
		snd.play();
	}

	render() {
		console.log(this.props.soundData);
		return (
			<button
				className="drum-pad"
				id={this.props.soundData.ident}
				onClick={this.clickHandler}
				value={this.props.soundData.keyCode}
			>
				{this.props.soundData.keySymbol}
				<audio
					src={this.props.soundData.sound}
					id={this.props.soundData.keySymbol}
					className="clip"
				></audio>
			</button>
		);
	}
}
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayMsg: "Drum Machine by ingGGRM",
		};

		this.soundsData = [
			{
				name: "Heater 1",
				sound: heater1,
				keySymbol: "Q",
				keyCode: 81,
				ident: "heaterSoft",
			},
			{
				name: "Heater 2",
				sound: heater2,
				keySymbol: "W",
				keyCode: 87,
				ident: "heaterMedium",
			},
			{
				name: "Heater 3",
				sound: heater3,
				keySymbol: "E",
				keyCode: 69,
				ident: "heaterHard",
			},
			{
				name: "Heater 4",
				sound: heater4,
				keySymbol: "A",
				keyCode: 65,
				ident: "heaterHarder",
			},
			{
				name: "Heater 5",
				sound: heater5,
				keySymbol: "S",
				keyCode: 83,
				ident: "heaterHardest",
			},
			{
				name: "Kick",
				sound: kick,
				keySymbol: "D",
				keyCode: 68,
				ident: "simpleKick",
			},
			{
				name: "Plates 1",
				sound: plates_1,
				keySymbol: "Z",
				keyCode: 90,
				ident: "platesSoft",
			},
			{
				name: "Plates 2",
				sound: plates_2,
				keySymbol: "X",
				keyCode: 88,
				ident: "platesMedium",
			},
			{
				name: "Plates 3",
				sound: plates_3,
				keySymbol: "C",
				keyCode: 67,
				ident: "platesHard",
			},
		];

		this.stateChanger = this.stateChanger.bind(this);
	}

	stateChanger(text) {
		this.setState((state) => ({
			displayMsg: `Playing: ${text}`,
		}));
	}

	render() {
		return (
			<div id="drum-machine">
				<h1 id="title">This is the begining</h1>
				<div id="side-panel">
					<div id="display">{this.state.displayMsg}</div>
				</div>
				<div id="pad-container">
					{this.soundsData.map((soundData) => (
						<DrumPad
							soundData={soundData}
							stateChanger={this.stateChanger}
						></DrumPad>
					))}
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
