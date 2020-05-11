/**
 * API接口配置文件
 */
module.exports = {
	home : {
		banner:"product/get_advertisement", // 首页banner 
		navlist:"index/navlist", // 首页导航
		juhusuan:"index/juhuasuanlist", // 首页聚划算推荐
		brand_recommend_list:'home_page/brand_recommend_list',//首页品牌推荐
		get_product_app_list:'product/get_product_app_list',//首页全部商品
		group_buy:"group_buy/list",//拼团列表
		get_activity:"home_page/get_activity",//秒杀
		category_list:"home_page/get_category_list",
	},
	category:{
		category_list:"product/get_product_category_list",//单品分类
		zhouqigou_list:"suggestionClassify/getList",//周期购分类
		taocan_list:"comboClassify/getList",//套餐分类
		suggestion_goods_list:"home_page/get_suggestion_list",//周期购列表
		combo_goods_list:"home_page/get_combo_list",//套餐列表
	},
	
	order:{
		order_list:"order/list",
		bonus_list:"bonus/select/list",
		bonus_best:"bonus/select/best",
		payment:"weixin/payment.do",
	},
	common:{
		couponlist:"index/couponlist", // 公共加载商品
		config:"config/getinfo", // 获取服务端配置
		update:"config/update", // 检测更新 
	},
	goods:{
		iteminfo:"items/goodsinfo", // 商品详情 加载 
		goodsinfo:"product/get_product_detail",
		collect_deal:"product/collect_deal"
	}
}