import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
	dark: boolean;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			dark: false,
			toggleTheme: () =>
				set(() => ({
					dark: !get().dark,
				})),
		}),
		{
			name: 'theme-storage',
		}
	)
);
