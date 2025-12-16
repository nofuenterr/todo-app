import { GitHubLogoIcon } from "@radix-ui/react-icons"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="grid place-content-center pb-4 text-purple-800 dark:text-gray-600 mt-auto">
      <a href="https://github.com/nofuenterr" target='_blank' className="flex gap-2 justify-center cursor-pointer">
        <GitHubLogoIcon width={20} height={20} />
        Developed by RR Nofuente
      </a>
      <p className="text-center">&copy; Copyright {currentYear} RR Nofuente. All rights reserved.</p>
    </footer>
  )
}