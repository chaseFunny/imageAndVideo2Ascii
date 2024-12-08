import { ShowItem } from '@/types/show';
const baseUrl = 'https://file-1304565468.cos.ap-nanjing.myqcloud.com/';
export const showList: ShowItem[] = [
	{
		id: 1,
		title: '小黑子',
		description: '来源于网络的蔡徐坤舞蹈视频',
		path: baseUrl + 'xiaoheizi.mp4',
		type: 'video'
	},
	{
		id: 2,
		title: '青海摇',
		description: '来源于网络的青海摇舞蹈视频',
		path: baseUrl + 'qinghaiyao.mp4',
		type: 'video'
	},
	{
		id: 3,
		title: '体育冠军吴柳芳',
		description: '秋去冬来 月如风 -吴柳芳舞蹈视频',
		path: baseUrl + 'wuliufang.mp4',
		type: 'video'
	},
	{
		id: 4,
		title: '海绵宝宝',
		description: '动漫海绵宝宝中的主角',
		path: baseUrl + 'haimianbaobao.webp',
		type: 'image'
	},
	{
		id: 5,
		title: '派大星',
		description: '动漫海绵宝宝中的配角',
		path: baseUrl + 'haimianbaobao.webp',
		type: 'image'
	},
	{
		id: 6,
		title: '孙悟空',
		description: '动漫西游记中的主角',
		path: baseUrl + 'sunwukong.webp',
		type: 'image'
	},
	{
		id: 7,
		title: '我的头像',
		description: '网站作者的个人头像',
		path: baseUrl + 'luckySnail.webp',
		type: 'image'
	}
];
