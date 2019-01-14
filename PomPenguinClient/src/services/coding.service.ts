import {Injectable} from '@angular/core'

// MULTIMEDIJA

@Injectable()
export class Coding{

  difference_id:any;
  limits:any;
  bitString:any;
  bitCounter:any;

  constructor(){
    this.difference_id = ['00', '01', '10', '11'];
    this.limits = [2, 6, 14, 30];
  }

  addLeadingZeros(binNum, numberOfBits){
    while(binNum.length < numberOfBits){
      binNum = "0" + binNum;
    }
    return binNum;
  }

  getDifferences(numbers){
    var differences = [];
    for(var i = 0; i < numbers.length; i++){
      if( i == 0){
        differences.push(numbers[i])
      }
      else{
        differences.push(numbers[i] - numbers[i-1])
      }
    }
    return differences;
  }

  codeFirstValue(num){
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
    return binOutput + this.addLeadingZeros((num >>> 0).toString(2), 9);
  }

  codeRepeat(num){
    let binOutput = '';
    while(num > 15){
      binOutput += "01" + (15 >>> 0).toString(2);
      num = num - 15;
    }
    binOutput += "01" + this.addLeadingZeros((num >>> 0).toString(2), 4);
    return binOutput;
  }

  codeDifferences(num){
    if(Math.abs(num) < 1){
      throw new Error("code_difference() can not code number 0, use code_repeat() ");
    }
    if(Math.abs(num) > 30) {
      throw new Error("code_difference() can not code numbers higher then 30, use code_absolute_value()");
    }

    let binOutput = "00";
    for(let j = 0; j < this.limits.length; j++){
      if(Math.abs(num) <= this.limits[j]){
        binOutput += this.difference_id[j];
        if(num < 0){
          binOutput += this.addLeadingZeros((num + this.limits[j] >>> 0).toString(2), j+2)
        }
        else{
          binOutput += this.addLeadingZeros((Math.abs(num) +1 >>> 0).toString(2), j+2)
        }
        break;
      }
    }
    return binOutput;
  }

  absuluteDifferences(num){
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
    binOutput += this.addLeadingZeros((Math.abs(num) >>> 0).toString(2), 9);
    return binOutput;
  }


  code(numbers){
    let differences = this.getDifferences(numbers);
    let input_bits = "";
    input_bits += this.codeFirstValue(differences[0]);
    let i = 1;
    while (i < differences.length){
      if( differences[i] == 0){
          let st = 1;
          for(var j = i+1; j < differences.length; j++){
            if(differences[j] == 0){
              st++;
              i++;
            }
            else{
              break;
            }
          }
          input_bits += this.codeRepeat(st);
      }
      else if( Math.abs(differences[i]) <= 30){
         input_bits += this.codeDifferences(differences[i]);
      }
      else{
        input_bits += this.absuluteDifferences(differences[i]);
      }
      i++;
    }

    input_bits += "11";
    return input_bits;
  }

  // ///////////////////////////////////////////////////////////////////////////

  getBits(num){
    let bitStr = this.bitString.substring(this.bitCounter, this.bitCounter+num);
    this.bitCounter += num;
    return bitStr;
  }

  decodeFirstValue(bitStr){
    let num = parseInt(bitStr.substring(1), 2);
    if(bitStr[0] == '1'){
      num = num * (-1);
    }
    return num;
  }

  decodeDifference(bitStr){
    if(bitStr.substring(0,2) != "00"){
      throw new Error("decode_difference() should start with bits 00");
    }
    let numberOfBits = bitStr.substring(2, 4);
    for(let j = 0; j < this.limits.length; j++){
      if(numberOfBits == this.difference_id[j]){
        if(bitStr.substring(4)[0] == '0'){
          return parseInt(bitStr.substring(4), 2) - this.limits[j];
        }
        else{
          //console.log(bitStr.substring(4));
          return parseInt(bitStr.substring(4), 2) - 1;
        }
      }
    }
  }

  decodeRepeat(bitStr){
    return parseInt(bitStr, 2)
  }

  decodeAbsoluteValue(bitStr){
    let sign = bitStr[0];
    let num = parseInt(bitStr.substring(1), 2);
    if(sign == '1'){
      num = num * (-1);
    }
    return num;
  }


  decode(bitsString){
    this.bitCounter = 0;
    this.bitString = bitsString;
    let differences = [];
    let first = this.decodeFirstValue(this.getBits(10));
    differences.push(first)

    let decodeType =this.getBits(2);
    while(decodeType != '11'){
      if(decodeType == '00'){
        let numberOfBits = this.getBits(2);
        for(let j = 0; j < this.limits.length; j++){
          if(numberOfBits == this.difference_id[j]){
            let numStr = this.getBits(j+2);
            differences.push(this.decodeDifference(decodeType+ numberOfBits + numStr))
          }
        }
      }
      else if(decodeType == '01'){
        let numbers = this.decodeRepeat(this.getBits(4));
        for(let j =0; j < numbers; j++){
          differences.push(0);
        }
      }
      else if(decodeType == '10'){
          differences.push(this.decodeAbsoluteValue(this.getBits(10)));
      }

      decodeType = this.getBits(2);
    }

    let numbers = [];
    numbers.push(differences[0]);
    for(let j = 1; j < differences.length; j++){
      numbers.push(numbers[j-1] + differences[j]);
    }


    return numbers;
  }

}
