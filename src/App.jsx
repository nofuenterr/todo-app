import Header from "./components/Header";
import Main from "./components/Main";
import { useThemeStore } from "./stores/themeStore";
import { useEffect } from "react";

function App() {
	const dark = useThemeStore(s => s.dark)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark)
	}, [dark])

	return (
		<div className="py-12 px-6 relative grid gap-10">
			<Header />
			<Main />
			<div className="absolute top-0 left-0 bg-linear-to-r from-gradient-2-start to-gradient-2-end h-52 w-full -z-10"></div>
		</div>
	)
}

export default App;
