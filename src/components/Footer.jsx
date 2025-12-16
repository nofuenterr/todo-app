import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto grid place-content-center pb-4 text-purple-800 dark:text-gray-600">
			<a
				href="https://github.com/nofuenterr"
				target="_blank"
				className="flex cursor-pointer justify-center gap-2"
			>
				<GitHubLogoIcon width={20} height={20} />
				Developed by RR Nofuente
			</a>
			<p className="text-center">
				&copy; Copyright {currentYear} RR Nofuente. All rights reserved.
			</p>
		</footer>
	);
}
