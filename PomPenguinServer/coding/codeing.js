var spawn = require("child_process").spawn;

function codeNumbers(numbers, callback) {
    var arrayToCode = [];
    arrayToCode.push("./coding.py");
    arrayToCode.push("code");
    numbers.forEach(function(n){
        arrayToCode.push(n);
    });
    var code = spawn('python', arrayToCode);
    code.stdout.on('data', function (data) {
        return callback(data.toString())
    });
}

function decodeNumbers(bits, callback) {
    var decode = spawn('python', ["./coding.py", "decode", bits]);
    let ret = "";
    return decode.stdout.on('data', function (data) {
        return callback(data.toString())
    });

}

codeNumbers([55, 53, 53, 53, 53, 53, 10, 10, 11, 11, 11, 11], function (result){ console.log(result)});
decodeNumbers( "000011011100000001010010100010101101000100001001001111", function (result){ console.log(result)});