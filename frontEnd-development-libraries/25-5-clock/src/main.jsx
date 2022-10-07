import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**********************************************************************************************/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

const arrowDown = <FontAwesomeIcon icon={faAngleDoubleDown} />
const arrowUp = <FontAwesomeIcon icon={faAngleDoubleUp} />
/**********************************************************************************************/

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				{arrowDown}{arrowUp}
			</div>
		);
	}
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
