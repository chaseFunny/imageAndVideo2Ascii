/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		domains: [
			'blog-1304565468.cos.ap-shanghai.myqcloud.com',
			'github.com',
			'file-1304565468.cos.ap-nanjing.myqcloud.com'
		]
	}
};

export default nextConfig;
