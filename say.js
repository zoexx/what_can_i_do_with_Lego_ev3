// 导入 执行系统指令的函数
var exec = require('child_process').exec; 

// 需要执行的指令
var cmdStr = 'fortune';

// 转换为语音文件的函数
// var transfer = require('./tencent_openai/transformTextIntoVoice.js').transformTextIntoVoice

// 控制 ev3 的函数 
var ev3dev = require('ev3dev-lang');

var soundSensor = new ev3dev.SoundSensor();

if(!soundSensor.connected) {
    console.error("No soundSensor.");
    process.exit(1);
}

console.log( 'soundSensor.commands' , soundSensor.commands );

console.log( 'soundSensor.soundPressure' , soundSensor.soundPressure );
console.log( 'soundSensor.soundPressureLow' , soundSensor.soundPressureLow );

// 执行指令 
// https://nodejs.org/docs/latest-v0.10.x/api/child_process.html#child_process_child_process_exec_command_options_callback

// exec(cmdStr, 
//     { encoding: 'utf8' } ,
//     function( err , stdout , stderr ){

//     // 如果出错
//     if(err) {
//         console.log('exec err:'+stderr);
//     } else {

//         console.log(stdout);
//         var fortuneWords = stdout;

//         transfer( fortuneWords , 
//             function( voiceFilePath ){
//                 // 调用成功
//                 cosnole.log('voiceFilePath=>' , voiceFilePath );

//             },function(){
//                 // 调用失败 可以让ev3 做一点什么动作
//                 console.log('☹');
//         })

//     }
// });