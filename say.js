// 导入 执行系统指令的函数
var exec = require('child_process').exec; 

// 控制 ev3 的函数 
var ev3dev = require('ev3dev-lang');

var touchSensor = new ev3dev.TouchSensor();

if(!touchSensor.connected) {
    console.error("No touchSensor.");
    process.exit(1);
}

// 监听触摸传感器
setInterval(function() {
    var touchValue =  touchSensor.getValue(0);
    console.log( touchValue )
    if ( touchValue == 1 ){
        exec( "sh ../saySomething.sh", 
            { encoding: 'utf8' } ,
            function( err , stdout , stderr ){
        
            // 如果出错
            if(err) {
                console.log('exec err:'+stderr);
            } else {
        
                console.log(stdout);
        
            }
        });
    }
}, 10);

// 执行指令 
// https://nodejs.org/docs/latest-v0.10.x/api/child_process.html#child_process_child_process_exec_command_options_callback

