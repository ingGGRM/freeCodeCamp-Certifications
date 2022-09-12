import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let author = '';
let quote = '';

const JSX = <div id="quote-box">
				<h2 className="text"><li className="fas fa-quote-left"></li>{quote}</h2>
				<h4 className="author">{author}</h4>
				<div className="btn-row">
					<button className="btn-twitter"><li className="fab fa-twitter"></li></button>
					<button className="btn-new-quote">Get New Quote</button>
				</div>
			</div>;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		//this.getQuote = this.getQuote.bind(this);
	}

	render() {
		return (
			JSX
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
