var difference_id;
var limits;
var bitString;
var bitCounter;

//MULTIMEDIJA

difference_id = ['00', '01', '10', '11'];
limits = [2, 6, 14, 30];


function addLeadingZeros(binNum, numberOfBits){
    while(binNum.length < numberOfBits){
        binNum = "0" + binNum;
    }
    return binNum;
}

function getDifferences(numbers){
    var differences = [];
    for(var i = 0; i < numbers.length; i++){
        if( i === 0){
            differences.push(numbers[i])
        }
        else{
            differences.push(numbers[i] - numbers[i-1])
        }
    }
    return differences;
}

function codeFirstValue(num){
    let binOutput = "";
    if(Math.abs(num) > 511){
        throw new Error('Absolute value of first number can not be higher than 511');
    }
    if(num < 0){
        binOutput += "1"
    }
    else {
        binOutput += "0"
    }
    return binOutput + addLeadingZeros((num >>> 0).toString(2), 9);
}

function codeRepeat(num){
    let binOutput = '';
    while(num > 15){
        binOutput += "01" + (15 >>> 0).toString(2);
        num = num - 15;
    }
    binOutput += "01" + addLeadingZeros((num >>> 0).toString(2), 4);
    return binOutput;
}

function codeDifferences(num){
    if(Math.abs(num) < 1){
        throw new Error("code_difference() can not code number 0, use code_repeat() ");
    }
    if(Math.abs(num) > 30) {
        throw new Error("code_difference() can not code numbers higher then 30, use code_absolute_value()");
    }

    let binOutput = "00";
    for(let j = 0; j < limits.length; j++){
        if(Math.abs(num) <= limits[j]){
            binOutput += difference_id[j];
            if(num < 0){
                binOutput += addLeadingZeros((num + limits[j] >>> 0).toString(2), j+2)
            }
            else{
                binOutput += addLeadingZeros((Math.abs(num) +1 >>> 0).toString(2), j+2)
            }
            break;
        }
    }
    return binOutput;
}

function absuluteDifferences(num){
    if(Math.abs(num) < 31){
        throw new Error("Absolute difference can only code numbers higher than 30");
    }
    if(Math.abs(num) > 511) {
        throw new Error("Absolute difference can not be higher than 511");
    }
    let binOutput = '10';
    if( num >= 0){
        binOutput += '0';
    }
    else{
        binOutput += '1';
    }
    binOutput += addLeadingZeros((Math.abs(num) >>> 0).toString(2), 9);
    return binOutput;
}




// ///////////////////////////////////////////////////////////////////////////

function getBits(num){
    let bitStr = bitString.substring(bitCounter, bitCounter+num);
    bitCounter += num;
    return bitStr;
}

function decodeFirstValue(bitStr){
    let num = parseInt(bitStr.substring(1), 2);
    if(bitStr[0] === '1'){
        num = num * (-1);
    }
    return num;
}

function decodeDifference(bitStr){
    if(bitStr.substring(0,2) !== "00"){
        throw new Error("decode_difference() should start with bits 00");
    }
    let numberOfBits = bitStr.substring(2, 4);
    for(let j = 0; j < limits.length; j++){
        if(numberOfBits === difference_id[j]){
            if(bitStr.substring(4)[0] === '0'){
                return parseInt(bitStr.substring(4), 2) - limits[j];
            }
            else{
              //  console.log(bitStr.substring(4));
                return parseInt(bitStr.substring(4), 2) - 1;
            }
        }
    }
}

function decodeRepeat(bitStr){
    return parseInt(bitStr, 2)
}

function decodeAbsoluteValue(bitStr){
    let sign = bitStr[0];
    let num = parseInt(bitStr.substring(1), 2);
    if(sign === '1'){
        num = num * (-1);
    }
    return num;
}

/////////////////////////////////////////////////////////////
module.exports = {

    getDifferences: getDifferences,
    codeDifferences : codeDifferences,
    codeRepeat: codeRepeat,
    absuluteDifferences: absuluteDifferences,
    codeFirstValue: codeFirstValue,

    decodeDifference: decodeDifference,
    decodeRepeat: decodeRepeat,
    decodeAbsoluteValue: decodeAbsoluteValue,
    decodeFirstValue: decodeFirstValue,

    code: function (numbers) {
        let differences = getDifferences(numbers);
        let input_bits = "";
        input_bits += codeFirstValue(differences[0]);
        let i = 1;
        while (i < differences.length) {
            if (differences[i] === 0) {
                let st = 1;
                for (var j = i + 1; j < differences.length; j++) {
                    if (differences[j] === 0) {
                        st++;
                        i++;
                    }
                    else {
                        break;
                    }
                }
                input_bits += codeRepeat(st);
            }
            else if (Math.abs(differences[i]) <= 30) {
                input_bits += codeDifferences(differences[i]);
            }
            else {
                input_bits += absuluteDifferences(differences[i]);
            }
            i++;
        }

        input_bits += "11";
        return input_bits;
    },

    decode: function (bitsString) {
        bitCounter = 0;
        bitString = bitsString;
        let differences = [];
        let first = decodeFirstValue(getBits(10));
        differences.push(first)

        let decodeType = getBits(2);
        while (decodeType !== '11') {
            if (decodeType === '00') {
                let numberOfBits = getBits(2);
                for (let j = 0; j < limits.length; j++) {
                    if (numberOfBits === difference_id[j]) {
                        let numStr = getBits(j + 2);
                        differences.push(decodeDifference(decodeType + numberOfBits + numStr))
                    }
                }
            }
            else if (decodeType === '01') {
                let numbers = decodeRepeat(getBits(4));
                for (let j = 0; j < numbers; j++) {
                    differences.push(0);
                }
            }
            else if (decodeType === '10') {
                differences.push(decodeAbsoluteValue(getBits(10)));
            }

            decodeType = getBits(2);
        }

        let numbers = [];
        numbers.push(differences[0]);
        for (let j = 1; j < differences.length; j++) {
            numbers.push(numbers[j - 1] + differences[j]);
        }


        return numbers;
    },
};

