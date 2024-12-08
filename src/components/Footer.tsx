import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';

export function Footer() {
	return (
		<footer className="border-t py-6 md:py-0">
			<div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
				<div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
					<Link
						href="https://beian.miit.gov.cn/"
						target="_blank"
						className="hover:text-foreground/80 text-foreground/60"
					>
						浙ICP备2021039023号-3
					</Link>
				</div>

				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<Link
						href={siteMetadata.social.blog}
						target="_blank"
						className="hover:text-foreground/80 text-foreground/60"
					>
						博客
					</Link>
					<Link
						href={siteMetadata.social.github}
						target="_blank"
						className="hover:text-foreground/80 text-foreground/60"
					>
						GitHub
					</Link>
					<Link
						href={siteMetadata.social.twitter}
						target="_blank"
						className="hover:text-foreground/80 text-foreground/60"
					>
						Twitter
					</Link>
				</div>
			</div>
		</footer>
	);
}
