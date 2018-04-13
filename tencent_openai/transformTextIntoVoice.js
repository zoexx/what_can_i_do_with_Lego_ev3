var http = require('http');
var auth = require('./auth.js');
var env = require('node-env-file');

// 注入环境变量
env('../.env')

console.log( 'process.env.TENCENT_ID => ', process.env.TENCENT_ID )
console.log( 'process.env.TENCENT_KEY => ', process.env.TENCENT_KEY )

var appid = process.env.TENCENT_ID;
var secret_key = process.env.TENCENT_KEY;

var auth_key = auth.genSign(appid, secret_key, Math.ceil(Date.now() / 1000 + 3600));

// 文字转换语音 https://openai.qq.com/docs/nlp_tts

// speed 语速控制：slower slow normal fast faster,默认normal
// 取值	说明
// slower	0.6倍
// slow	0.8倍
// normal	1倍
// fast	1.2倍
// faster	1.5倍

// mode说明：
// 取值	说明
// Woman	女声
// Man	男声
// XidaoGongzi	喜道公子
// Daji	王者荣耀妲己
// Onishang	哦尼桑



exports.transformTextIntoVoice = function( text , callback , errCallback ){

    var body = JSON.stringify({
        base: {
            appid: appid,
            auth_key: auth_key,
            cmds: ['NlpTts']
        },
        media : text || 'hello' ,
        params: {
            speed : 'normal' , 
            mode : 'Daji' ,
        }
    });
    
    var request = new http.request({
        hostname: "openai.qq.com",
        port: 80,
        path: "/api/json/ai/GetMultiAI",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }},
        function(res){
          res.setEncoding('utf8');
          res.on('data', function (chunk) {

              console.log('Response:\n' + chunk);
              var data = JSON.parse( chunk );

              // 判断接口返回的内容
              if ( data.base.ret == 0 ){
                  // 调用成功
                  // 调用指令也有可能失败
                  var NlpTtsRes = data.cmd_rsps.NlpTts ;

                  if ( NlpTtsRes.base.ret == 0 ){

                        callback( NlpTtsRes.data.voice_url );

                  }else{

                        console.log('NlpTtsRes response err:', data.base.msg );
                        // 调用失败
                        errCallback();
                  }

              }else{

                  console.log('api response err:', data.base.msg );
                  // 调用失败
                  errCallback();
              }

        });
    });
    request.end(body);
}
