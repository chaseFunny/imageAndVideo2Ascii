import Link from 'next/link';
import { ThemeChanger } from './theme';

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<div className="flex gap-6 md:gap-10">
					<Link className="flex items-center space-x-2" href="/">
						<span className="inline-block font-bold">ASCII 字符生成器</span>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<Link
						href="/show"
						className="hover:text-foreground/80 text-foreground/60"
					>
						作品集
					</Link>
					<Link
						href="/about"
						className="hover:text-foreground/80 text-foreground/60"
					>
						关于
					</Link>
					<ThemeChanger />
				</div>
			</div>
		</header>
	);
}
