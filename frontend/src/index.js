import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NotificationProvider from "./context/NotificationProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
	<BrowserRouter>
		<NotificationProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</NotificationProvider>
	</BrowserRouter>
);
