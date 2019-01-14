import sys
call = ''
node_input_numbers = []
bit_string = ''
if len(sys.argv) > 1:
    t = 2
    call = sys.argv[1]
    if call == "code":
        while t < len(sys.argv):
            node_input_numbers.append(sys.argv[t])
            t += 1
        node_input_numbers = sys.argv[2]
    elif call == "decode":
        bit_string = sys.argv[2]


def set_input_numbers(inp):
    global node_input_numbers
    node_input_numbers = inp


def set_bit_string(inp):
    global bit_string
    bit_string = inp


difference_id = ['00', '01', '10', '11']
limits = [2, 6, 14, 30]


def to_bin(dec):
    return bin(dec).split('b')[1]


def add_leading_zeros(bin_num, number_of_bits):
    while len(bin_num) < number_of_bits:
        bin_num = '0' + bin_num
    return bin_num


def get_differences(input_numbers):
    differences = []
    for n in range(len(input_numbers)):
        if n == 0:
            differences.append(int(input_numbers[n]))
        else:
            differences.append(int(input_numbers[n]) - int(input_numbers[n - 1]))
    return differences


def code_first_value(num):
    if abs(num) > 511:
        raise ValueError("Absolute value of first number can not be higher than 511")
    if num < 0:
        bin_output = '1'
    else:
        bin_output = '0'
    return bin_output + add_leading_zeros(to_bin(num), 9)


def code_difference(num):
    if abs(num) < 1:
        raise ValueError("code_difference() can not code number 0, use code_repeat() ")
    if abs(num) > 30:
        raise ValueError("code_difference() can not code numbers higher then 30, use code_absolute_value()")
    bin_output = '00'
    for j in range(len(limits)):
        if abs(num) <= limits[j]:
            bin_output += difference_id[j]
            if num < 0:
                bin_output += add_leading_zeros(to_bin(num + limits[j]), j + 2)
            else:
                bin_output += add_leading_zeros(to_bin(abs(num) + 1), j + 2)
            break
    return bin_output


def code_difference_modified(num):
    if abs(num) < 1:
        raise ValueError("code_difference() can not code number 0, use code_repeat() ")
    if abs(num) > 30:
        raise ValueError("code_difference() can not code numbers higher then 30, use code_absolute_value()")
    bin_output = '00'
    for j in range(len(limits)):
        if abs(num) <= limits[j]:
            if num == 1:
                bin_output += '01100'
            elif num == 3:
                bin_output += '0010'
            elif num < 0:
                bin_output += difference_id[j]
                bin_output += add_leading_zeros(to_bin(num + limits[j]), j + 2)
            else:
                bin_output += difference_id[j]
                bin_output += add_leading_zeros(to_bin(abs(num) + 1), j + 2)
            break
    return bin_output


def code_repeat(num):
    bin_output = ''
    while num > 15:
        bin_output += '01' + to_bin(15)
        num = num - 15
    bin_output += '01' + add_leading_zeros(to_bin(num), 4)
    return bin_output


def code_absolute_difference(num):
    if abs(num) < 31:
        raise ValueError("Absolute difference can only code numbers higher than 30")
    if abs(num) > 511:
        raise ValueError("Absolute difference can not be higher than 511")
    bin_output = '10'
    if num >= 0:
        bin_output += '0'
    else:
        bin_output += '1'
    bin_output += add_leading_zeros(to_bin(num), 9)
    return bin_output


def code():
    input_numbers = node_input_numbers
    differences = get_differences(input_numbers)
    input_bits = ""
    input_bits += (code_first_value(differences[0]))
    i = 1
    while i < len(differences):
        if differences[i] == 0:
            st = 1
            current_position = i
            for j in range(current_position+1, len(differences)):
                if differences[j] == 0:
                    st += 1
                    i += 1
                else:
                    break
            input_bits += (code_repeat(st))
        elif abs(differences[i]) <= 30:
            input_bits += (code_difference(differences[i]))
        else:
            input_bits += (code_absolute_difference(differences[i]))
        i += 1

    input_bits += '11'
    print(input_bits)
    return input_bits


# /////////////////////////////////////////////////
def decode_first_value(bits):
    num = int(bits[1:], 2)
    if bits[0] == '1':
        num = num * -1
    return num


def decode_difference(bits):
    if bits[:2] != '00':
        raise ValueError("decode_difference() should start with bits 00")
    number_of_bits = bits[2:4]
    for j in range(len(limits)):
        if number_of_bits == difference_id[j]:
            number = bits[4:]
            if number[0] == '0':
                return int(number, 2) - limits[j]
            else:
                return int(number, 2) - 1


def decode_difference_modified(bits):
    if bits[:2] != '00':
        raise ValueError("decode_difference() should start with bits 00")
    number_of_bits = bits[2:4]
    for j in range(len(limits)):
        if number_of_bits == difference_id[j]:
            number = bits[4:]
            if number[0] == '0':
                return int(number, 2) - limits[j]
            else:
                num = int(number, 2) - 1
                if num == 3:
                    num = 1
                elif num == 1:
                    num = 3
                return num


def decode_repeat(bits):
    if bits[:2] != '01':
        raise ValueError("decode_repeat() should start with bits 01")
    num = 0
    for n in range(int(bits[2:], 2)):
        num += 1
    return num


def decode_absolute_value(bits):
    if bits[:2] != '10':
        raise ValueError("decode_repeat() should start with bits 10")
    sign = bits[2]
    num = int(bits[3:], 2)
    if sign == '1':
        num = num * -1
    return num


def get_bits(num, bit_counter):
    bit_str = bit_string[bit_counter: bit_counter+num]
    bit_counter += num
    return bit_str


def decode():
    differences = []
    bit_counter = 0
    first = decode_first_value(get_bits(10, bit_counter))
    bit_counter += 10
    differences.append(first)
    decode_type = get_bits(2, bit_counter)
    bit_counter += 2
    while decode_type != '11':
        if decode_type == '00':
            number_of_bits = get_bits(2, bit_counter)
            bit_counter += 2
            for j in range(len(limits)):
                if number_of_bits == difference_id[j]:
                    number = get_bits(j + 2, bit_counter)
                    bit_counter += j + 2
                    differences.append(decode_difference(decode_type+number_of_bits+number))
        elif decode_type == '01':
            numbers = decode_repeat(decode_type + get_bits(4, bit_counter))
            bit_counter += 4
            for n in range(numbers):
                differences.append(0)
        elif decode_type == '10':
            differences.append(decode_absolute_value(decode_type + get_bits(10, bit_counter)))
            bit_counter += 10
        decode_type = get_bits(2, bit_counter)
        bit_counter += 2

    previous = 0
    output_num = []
    for d in differences:
        output_num.append(previous + d)
        previous = previous + d
    print(output_num)
    return output_num


if call == "code":
    code()
elif call == "decode":
    decode()
