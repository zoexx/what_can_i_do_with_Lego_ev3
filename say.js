// 导入 执行系统指令的函数
var exec = require('child_process').exec; 

// 控制 ev3 的函数 
var ev3dev = require('ev3dev-lang');

var touchSensor = new ev3dev.TouchSensor();

if(!touchSensor.connected) {
    console.error("No touchSensor.");
    process.exit(1);
}

console.log("Try to press the touch sensor ...");

// 监听触摸传感器
setInterval(function() {
    var touchValue =  touchSensor.getValue(0);
    if ( touchValue == 1 ){
        console.log("Here we go!");
        saysomething();
    }
}, 10);


function saysomething() {
    doExec( "fortune" , function( words ){
        console.log( words );
        // display or print the words
        doExec( 'espeak "'+words+'" -s 100 --stdout | aplay' )

    })
}


function doExec( command , callback ) {
    exec( command , { encoding:'utf8'}, function( err , stdout , stder ){
        // 如果出错
        if(err) {
            console.log('exec err:'+stderr);
        } else {
            callback && callback( stdout )
        }
    }) 
}

// 执行指令 
// https://nodejs.org/docs/latest-v0.10.x/api/child_process.html#child_process_child_process_exec_command_options_callback

