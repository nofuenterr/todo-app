import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useThemeStore } from './stores/themeStore';
import { useEffect } from 'react';

function App() {
	const dark = useThemeStore((s) => s.dark);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark);
	}, [dark]);

	return (
		<div className="relative h-dvh px-6 pt-12">
			<div className="mx-auto flex h-full max-w-xl flex-col gap-10">
				<Header />
				<Main />
				<Footer />
			</div>
			<div className="from-gradient-2-start to-gradient-2-end absolute top-0 left-0 -z-10 h-52 w-full bg-linear-to-r mix-blend-hard-light"></div>
			<div className="absolute top-0 left-0 -z-20 h-52 w-full bg-[url('/src/assets/images/Bitmap.jpg')] bg-cover bg-center bg-no-repeat"></div>
		</div>
	);
}

export default App;
