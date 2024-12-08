import type { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: '关于'
};

export default function AboutPage() {
	return (
		<div className="container p-2 sm:p-10">
			<div className="mx-auto max-w-3xl space-y-8">
				{/* 标题部分 */}
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">
						关于 ASCII 字符生成器
					</h1>
					<p className="text-muted-foreground">
						一个简单而强大的工具，将您的图片和视频转换为富有艺术感的 ASCII
						字符艺术
					</p>
				</div>

				{/* 项目介绍 */}
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">项目简介</h2>
					<div className="prose dark:prose-invert max-w-none">
						<p>
							ASCII 字符生成器是一个网页工具，能够将普通的图片和视频转换为由
							ASCII 字符组成的艺术作品。
							无论是创建复古风格的图片，还是制作独特的视频效果，这个工具都能满足您的需求。
						</p>
					</div>
				</div>

				{/* 工作原理 */}
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">工作原理</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="rounded-lg border p-4">
							<h3 className="mb-2 font-medium">图片转换原理</h3>
							<p className="text-sm text-muted-foreground">
								1. 图片灰度处理：将彩色图片转换为灰度图像
								<br />
								2. 像素映射：根据像素亮度值选择对应的 ASCII 字符
								<br />
								3. 字符替换：使用不同密度的 ASCII 字符表示不同的明暗程度
								<br />
								4. 优化处理：调整字符间距和行距以获得最佳显示效果
							</p>
						</div>
						<div className="rounded-lg border p-4">
							<h3 className="mb-2 font-medium">视频转换流程</h3>
							<p className="text-sm text-muted-foreground">
								1. 视频帧提取：将视频分解为连续的图片帧
								<br />
								2. 逐帧转换：对每一帧应用 ASCII 转换算法
								<br />
								3. 实时渲染：保持适当的帧率进行动态显示
								<br />
								4. 性能优化：使用 Web Workers 实现流畅播放
							</p>
						</div>
					</div>
				</div>

				{/* ASCII 字符映射说明 */}
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">ASCII 字符映射</h2>
					<div className="rounded-lg border p-4">
						<p className="text-sm text-muted-foreground">
							从暗到亮的 ASCII 字符序列：
							<br />
							<code className="text-base">#&$*o!; </code>
							<p className="text-base">最后空白的就是空格哦！ </p>
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							字符的选择基于其在等宽字体下的视觉密度，确保最终效果的视觉连续性和艺术性。
						</p>
					</div>
				</div>

				{/* 使用提示 */}
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">使用提示</h2>
					<div className="prose dark:prose-invert max-w-none">
						<ul>
							<li>选择清晰的原始图片或视频以获得最佳效果</li>
							<li>可以调整输出的字符密度来控制细节层次</li>
							<li>对比度较高的图片通常能获得更好的转换效果</li>
							<li>建议使用等宽字体查看生成的 ASCII 艺术</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
