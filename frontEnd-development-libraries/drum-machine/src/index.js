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

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayMsg: "Drum Machine by ingGGRM"
		};

		this.sounds = [
			{name: "Heater 1", sound: new Audio(heater1), keySymbol: 'Q', keyCode: 81},
			{name: "Heater 2", sound: new Audio(heater2), keySymbol: 'W', keyCode: 87},
			{name: "Heater 3", sound: new Audio(heater3), keySymbol: 'E', keyCode: 69},
			{name: "Heater 4", sound: new Audio(heater4), keySymbol: 'A', keyCode: 65},
			{name: "Heater 5", sound: new Audio(heater5), keySymbol: 'S', keyCode: 83},
			{name: "Kick", sound: new Audio(kick), keySymbol: 'D', keyCode: 68},
			{name: "Plates 1", sound: new Audio(plates_1), keySymbol: 'Z', keyCode: 90},
			{name: "Plates 2", sound: new Audio(plates_2), keySymbol: 'X', keyCode: 88},
			{name: "Plates 3", sound: new Audio(plates_3), keySymbol: 'C', keyCode: 67},
		];

		this.keyPressHandler = this.keyPressHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	keyPressHandler = (event) => {
		console.log(event.keyCode);
		this.sounds.forEach(snd => {
			if(snd.keyCode == event.keyCode) {
				console.log(`Playing: ${snd.name}`);
				snd.sound.currentTime = 0;
				snd.sound.play();
				return;
			}
		});
	}

	clickHandler(key) {
		console.log("You've Clicked It!!!");
	}

	render() {
		return (
			<div id="drum-machine" onKeyDown={this.keyPressHandler} tabIndex="-1" >
				<h1>This is the begining</h1>
				<div id="pad-container"></div>
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
