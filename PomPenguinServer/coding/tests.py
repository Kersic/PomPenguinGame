import coding
import unittest


class TestCompressFunctions(unittest.TestCase):

    def test_racunaja_razlik(self):
        input_numbers = [55, 53, 53, 53, 53, 53, 10, 10, 11, 11, 11, 11]
        differences = coding.get_differences(input_numbers)
        self.assertEqual(differences, [55, -2, 0, 0, 0, 0, -43, 0, 1, 0, 0, 0])
        input_numbers = [-100, -102, -105, -115, -140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 200, 140, 130]
        differences = coding.get_differences(input_numbers)
        self.assertEqual(differences, [-100, -2, -3, -10, -25, 280, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, -60, -10])

    def test_kodiranja_razlik(self):
        self.assertRaises(ValueError, coding.code_difference, 0)
        self.assertRaises(ValueError, coding.code_difference, 31)
        # 2 bits
        result = coding.code_difference(-1)
        self.assertEqual(result, '000001')
        result = coding.code_difference(1)
        self.assertEqual(result, '000010')
        result = coding.code_difference(-2)
        self.assertEqual(result, '000000')
        result = coding.code_difference(2)
        self.assertEqual(result, '000011')

        # 3 bits
        result = coding.code_difference(-3)
        self.assertEqual(result, '0001011')
        result = coding.code_difference(3)
        self.assertEqual(result, '0001100')
        result = coding.code_difference(-6)
        self.assertEqual(result, '0001000')
        result = coding.code_difference(6)
        self.assertEqual(result, '0001111')

        # 4 bits
        result = coding.code_difference(-7)
        self.assertEqual(result, '00100111')
        result = coding.code_difference(7)
        self.assertEqual(result, '00101000')
        result = coding.code_difference(-14)
        self.assertEqual(result, '00100000')
        result = coding.code_difference(14)
        self.assertEqual(result, '00101111')

        # 5 bits
        result = coding.code_difference(-15)
        self.assertEqual(result, '001101111')
        result = coding.code_difference(15)
        self.assertEqual(result, '001110000')
        result = coding.code_difference(-30)
        self.assertEqual(result, '001100000')
        result = coding.code_difference(30)
        self.assertEqual(result, '001111111')

    def test_kodiranja_ponovitev(self):
        result = coding.code_repeat(1)
        self.assertEqual(result, '010001')
        result = coding.code_repeat(15)
        self.assertEqual(result, '011111')
        result = coding.code_repeat(16)
        self.assertEqual(result, '011111010001')
        result = coding.code_repeat(31)
        self.assertEqual(result, '011111011111010001')

    def test_kodiranja_absolutne_vrednosti(self):
        self.assertRaises(ValueError, coding.code_absolute_difference, 30)
        self.assertRaises(ValueError, coding.code_absolute_difference, 512)
        result = coding.code_absolute_difference(31)
        self.assertEqual(result, '100000011111')
        result = coding.code_absolute_difference(-43)
        self.assertEqual(result, '101000101011')
        result = coding.code_absolute_difference(-511)
        self.assertEqual(result, '101111111111')

    def test_kodiranja_prve_vrednosti(self):
        self.assertRaises(ValueError, coding.code_first_value, -512)
        result = coding.code_first_value(0)
        self.assertEqual(result, '0000000000')
        result = coding.code_first_value(10)
        self.assertEqual(result, '0000001010')
        result = coding.code_first_value(-10)
        self.assertEqual(result, '1000001010')


class TestDecompressFunctions(unittest.TestCase):
    def test_dekodiranja_razlik(self):
        self.assertRaises(ValueError, coding.decode_difference, '100001')
        # 2 bits
        result = coding.decode_difference('000001')
        self.assertEqual(result, -1)
        result = coding.decode_difference('000010')
        self.assertEqual(result, 1)
        result = coding.decode_difference('000000')
        self.assertEqual(result, -2)
        result = coding.decode_difference('000011')
        self.assertEqual(result, 2)

        # 3 bits
        result = coding.decode_difference('0001011')
        self.assertEqual(result, -3)
        result = coding.decode_difference('0001100')
        self.assertEqual(result, 3)
        result = coding.decode_difference('0001000')
        self.assertEqual(result, -6)
        result = coding.decode_difference('0001111')
        self.assertEqual(result, 6)

        # 4 bits
        result = coding.decode_difference('00100111')
        self.assertEqual(result, -7)
        result = coding.decode_difference('00101000')
        self.assertEqual(result, 7)
        result = coding.decode_difference('00100000')
        self.assertEqual(result, -14)
        result = coding.decode_difference('00101111')
        self.assertEqual(result, 14)

        # 5 bits
        result = coding.decode_difference('001101111')
        self.assertEqual(result, -15)
        result = coding.decode_difference('001110000')
        self.assertEqual(result, 15)
        result = coding.decode_difference('001100000')
        self.assertEqual(result, -30)
        result = coding.decode_difference('001111111')
        self.assertEqual(result, 30)

    def test_dekodiranja_ponovitev(self):
        self.assertRaises(ValueError, coding.decode_repeat, '110001')
        result = coding.decode_repeat('010001')
        self.assertEqual(result, 1)
        result = coding.decode_repeat('011111')
        self.assertEqual(result, 15)

    def test_dekodiranja_absolutne_vrednosti(self):
        self.assertRaises(ValueError, coding.decode_absolute_value, '000000011111')
        result = coding.decode_absolute_value('100000011111')
        self.assertEqual(result, 31)
        result = coding.decode_absolute_value('101000101011')
        self.assertEqual(result, -43)
        result = coding.decode_absolute_value('101111111111')
        self.assertEqual(result, -511)

    def test_dekodiranja_prve_vrednosti(self):
        result = coding.decode_first_value('0000000000')
        self.assertEqual(result, 0)
        result = coding.decode_first_value('0000001010')
        self.assertEqual(result, 10)
        result = coding.decode_first_value('1000001010')
        self.assertEqual(result, -10)


class CompleteTest(unittest.TestCase):
    def test_kodiranja_primer1(self):
        coding.set_input_numbers([55, 53, 53, 53, 53, 53, 10, 10, 11, 11, 11, 11])
        result = coding.code()
        self.assertEqual(result, '000011011100000001010010100010101101000100001001001111')

    def test_kodiranja_primer2(self):
        coding.set_input_numbers([-100, 100, 102, 105, 115, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 200, 140, 130])
        result = coding.code()
        self.assertEqual(result, "10011001001000110010000000110001100001010110011110100111111000001111001010001111000010010011")

    def test_dekodiranja_primer1(self):
        coding.set_bit_string('000011011100000001010010100010101101000100001001001111')
        numbers = coding.decode()
        self.assertEqual(numbers, [55, 53, 53, 53, 53, 53, 10, 10, 11, 11, 11, 11])

    def test_dekodiranja_primer2(self):
        coding.set_bit_string('100110010010001100100000001100011000010101100111101001111110000011110010100011110000100100110000')
        numbers = coding.decode()
        self.assertEqual(numbers, [-100, 100, 102, 105, 115, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 200, 140, 130])


if __name__ == '__main__':
    unittest.main()
