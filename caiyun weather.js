/*************************************

项目名称：彩云天气
脚本作者：Pika
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
# VIP信息
^https?:\/\/(biz|wrapper|starplucker)\.(cyapi|caiyunapp)\.(cn|com)\/(.+\/(user\?app_name|activity\?app_name|visitors|operation\/banners)|p\/v\d\/(vip_info|user_info)) url script-response-body http://guizhe.pkq7.cn/caiyuntianqi.js
# SVIP地图-48小时预报
^https?:\/\/(api|wrapper)\.(cyapi|caiyunapp)\.(cn|com)\/v\d\/(satellite|nafp\/origin_images) url script-request-header http://guizhe.pkq7.cn/caiyuntianqi.js

[mitm]
hostname = *.cyapi.cn, *.caiyunapp.com

*************************************/


const pkq1 = {};
const pkq2 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const adUrl = /(activity\?app_name|operation\/banners)/;
const vipUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/vip_info/;
const userUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/v\d\/user\?app_name/;
const infoUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/user_info/;

if (typeof $response == "undefined") {
  pkq1.headers = $request.headers;
  pkq1.headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps';
} else {
  switch (true) {
    case adUrl.test(url):
      pkq2.status = "ok";
      pkq2.activities = [{"items":[{}]}];
      pkq2.data = [];
      break;
    case vipUrl.test(url):
      pkq2 = {  ...pkq2,  vip: {    "expires_time" : "4092599349",    "is_auto_renewal" : true  },  trial_svip: {    ...pkq2.trial_svip,    "received_time" : "1666666666",    "expires_time" : "4092599349",    "is_recharge_vip" : true  },  svip: {    "expires_time" : "4092599349",    "is_auto_renewal" : true  }};
      break;
    case userUrl.test(url):
      pkq2.result = { ...pkq2.result,  is_vip: true,  vip_expired_at: 4092599349,  svip_given: 9999,  is_xy_vip: true,  xy_svip_expire: 4092599349,  wt: {  ...pkq2.result.wt,  vip: {  ...pkq2.result.wt.vip,  "expired_at" : 0,  "enabled" : true,  "svip_apple_expired_at" : 4092599349,  "is_auto_renewal" : true,  "svip_expired_at" : 4092599349    },    svip_given: 9999,  },  is_phone_verified: true,  vip_take_effect: 1,  is_primary: true,  xy_vip_expire: 4092599349,  svip_expired_at: 4092599349,  svip_take_effect: 1,  vip_type: "s",  phone_num: "13145200000",  name: "皮卡秋Store",  avatar: "https://pkq7.cn/wp-content/uploads/2023/11/tx.jpg",  bound_status: {  ...pkq2.result.bound_status,  caiyun: {  ...pkq2.result.bound_status.caiyun,  "username" : "皮卡秋Store",  "is_bound" : true}}};
      break;
    case infoUrl.test(url):
      pkq2["reg_days"] = 99999;
      pkq2["name"] = "皮卡秋Store";
      pkq2["avatar"] = "https://pkq7.cn/wp-content/uploads/2023/11/tx.jpg";
      break;
    }
  pkq1.body = JSON.stringify(pkq2);
}

$done(pkq1);
