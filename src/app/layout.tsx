import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import ThemeProviders from '@/components/theme-providers';
import siteMetadata from '@/data/siteMetadata';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next/types';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.title}`
	},
	description: siteMetadata.description
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProviders
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProviders>
			</body>
		</html>
	);
}
