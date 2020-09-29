const fetch = require('node-fetch');
// Find how to make this call with proper cookies so we can stop doing this manually
fetch('https://www.amazon.com/gp/product/features/aloha-ppd/udp-ajax-handler/attach-render-desktop.html', {
	'headers': {
		'accept': '*/*',
		'accept-language': 'en-US,en;q=0.9,la;q=0.8',
		'content-type': 'application/x-www-form-urlencoded',
		'downlink': '10',
		'ect': '4g',
		'rtt': '50',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'x-requested-with': 'XMLHttpRequest',
		'cookie': 'session-id=144-7835610-8339923; ubid-main=133-5459129-7097100; s_fid=480E62796E9B9F4E-1AFD08EB5D8D5CDF; s_vn=1632543803402%26vn%3D1; regStatus=pre-register; skin=noskin; s_cc=true; s_nr=1601345219341-Repeat; s_vnum=2033345219342%26vn%3D1; s_dslv=1601345219343; s_sq=%5B%5BB%5D%5D; s_ppv=100; session-token=fW0rstm2tU1CfcSvFfgLiZ6It/HiaAFvSWHkF/zVu54PWQsHXVnMSnumdhJq7m2oncoc+Bjq/9WVZ1jUsyUPwfGiJ49DkKthsCEPvDnIPO8nOwwVuYvbR56p/lneWHwbLh033MLy6u6H5gwFZmrLq99vcVO4CW3Ehjxi2iG/WNkuqdb5hLNtftkuJnXB9brCQ9+sMEuGjB+Clz62Ya1bSVqeC8bUFCcEd5R5RcZ1nbAbcIF1V2rOBm3IPvN3C4pu6BXpPqKAhmcchaR3umUB2BlVr8bsz1vc; x-main=NCTRSjT641wBQTCw3M3W2gDH26Cqg3B1; at-main=Atza|IwEBIAi5sIib2nw_H0zIM8xEToONHlWMXXjtCCLSS5YQ86KYh475Zam6x10eqi6Oshs7ZrjqtAzPwsitXkLrrqTlF04YMCU-N3s5Yrxc8pfj8uHmlSnLBDQ0wfCkozvZe10ODdOyGt9r5JXTxbVCtpF5Ly6A2qJqtiBqnXA9PVz4UDPHiKAN9gI4KdJdPWNwcpAKNjGHjrmMWDDIS1d8GgtNSbZX; sess-at-main="wdnct4zSD3QWQUXNuM4i9MSjGoUNHym6pVhCsXc3beo="; sst-main=Sst1|PQEI3FRlZF5AV1Ej4nrZUDvSCQ-F82BDP12JVn-Jc7sBs3q2ohrLaXmU48JfS4RB49ZIoe5Tb7yME_AGYOJp75CBVhrvbi8TCjNm0wYHNp_Sdh08USFW8tFuKvebuorbwZ8LR_JhRxjn8HYv7SxfAqOTZq0aaBJIOcftJsoT54-whiRHkW52Nhh2tVCJoBDHm-twnfI1Z5hXav4oIuEo_MN0N7Gv-leFyy8PmwHoKipax3yexFl5gzIPfcfA-CYfnm_Cb4es1j0RwkFKSRwGe7A2Kmib8qfJdavp4b9pgi-kHZ8; lc-main=en_US; session-id-time=2082787201l; i18n-prefs=USD; csm-hit=tb:YENDS1GP2SZQTXAP5W33+s-SHK0K44K2AYFK467W26X|1601350050810&t:1601350050810&adb:adblk_no'
	},
	'referrer': 'https://www.amazon.com/Kodak-Portra-Professional-Exposures-Negative/dp/B004FNRTGG/ref=pd_ys_c_rfy_rp_m_all_1?_encoding=UTF8&pd_rd_i=B004FNRTGG&pd_rd_r=V3GW1920ADQNYX33A5BM&pd_rd_w=cj6cN&pd_rd_wg=70z7R&pf_rd_p=0e5f1ae1-de88-4b7c-b919-fceb22deee35&pf_rd_r=V3GW1920ADQNYX33A5BM&psc=1&refRID=PQ5TS5GXPY7P3Q831EVE',
	'referrerPolicy': 'strict-origin-when-cross-origin',
	'body': 'attachAccessoryAsinList=%5BB07BSFJLGV%5D&marketplaceId=ATVPDKIKX0DER&asin=B004FNRTGG&deviceType=desktop',
	'method': 'POST',
	'mode': 'cors'
}).then(x => console.log(x));