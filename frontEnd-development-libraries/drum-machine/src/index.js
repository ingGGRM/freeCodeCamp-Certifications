import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//*****************************************/
import plates_1 from "./sounds/Kick_n_Hat.mp3";
import plates_2 from "./sounds/Cev_H2.mp3";
import plates_3 from "./sounds/Dsc_Oh.mp3";
import kick from "./sounds/RP4_KICK_1.mp3";
import heater1 from "./sounds/Heater-1.mp3";
import heater2 from "./sounds/Heater-2.mp3";
import heater3 from "./sounds/Heater-3.mp3";
import heater4 from "./sounds/Heater-4_1.mp3";
import heater5 from "./sounds/Heater-6.mp3";
//*****************************************/

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {};

		this.sounds = {
			
		};

		this.playSound = this.playSound.bind(this);
	}

	playSound(key) {
		console.log("You've Clicked It!!!");

	}

	render() {

		return (
			<div id="drum-machine">
				<h1>This is the begining</h1>
				<div id="pad-container">
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
