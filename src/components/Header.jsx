import BrandLogo from './ui/BrandLogo';
import { Toggle } from 'radix-ui';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useThemeStore } from '../stores/themeStore';

export default function Header() {
	const { dark, toggleTheme } = useThemeStore();

	return (
		<header className="flex items-center justify-between">
			<BrandLogo />
			<Toggle.Root
				onClick={toggleTheme}
				className="cursor-pointer"
				aria-label={'Toggle theme to ' + (dark ? 'light' : 'dark')}
			>
				{dark ? (
					<SunIcon className="text-white" />
				) : (
					<MoonIcon className="text-white" />
				)}
			</Toggle.Root>
		</header>
	);
}
