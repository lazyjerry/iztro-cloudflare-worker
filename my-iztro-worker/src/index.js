/**
 * index.js
 */
import { astro } from 'iztro';
import { usageHtml } from './usage.js';

export default {
	async fetch(request, env, ctx) {
		const { searchParams } = new URL(request.url);
		const date = searchParams.get('date'); // 生日，格式：'2000-8-16'
		const time = searchParams.get('time'); // 出生時間，格式：'2'（對應凌晨1-3點）
		const gender = searchParams.get('gender'); // 性別，'男' 或 '女'
		const isSolar = searchParams.get('isSolar'); // 是否為陽曆生日，'true' 或 'false'
		const lang = searchParams.get('lang') || 'zh-TW'; // 語言，預設 'zh-TW'

		const ipAddress = request.headers.get("cf-connecting-ip");
		if (!ipAddress) {
			return new Response('無法識別客戶端IP。', { status: 400 });
		}
		const { success } = await env.MY_RATE_LIMITER.limit({ key: ipAddress });
		if (!success) {
			// 如果超過速率限制，返回 429 錯誤
			return new Response('請求過多，請稍後再試。', { status: 429 });
		}

		// 檢查是否缺少必要的查詢參數
		if (!date || !time || !gender || !isSolar) {
			return new Response(usageHtml, {
				headers: { 'Content-Type': 'text/html; charset=UTF-8' },
			});
		}

		try {
			const isSolarBool = isSolar.toLowerCase() === 'true';
			const astrolabe = isSolarBool ?
				astro.bySolar(date, parseInt(time), gender, true, lang) :
				astro.byLunar(date, parseInt(time), gender, false, true, lang);

			return new Response(JSON.stringify(astrolabe), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			return new Response(`錯誤: ${error.message}`, { status: 500 });
		}
	},
};
