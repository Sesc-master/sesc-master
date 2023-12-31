const RAW_NUM_MASKS = [
    [
        [
            "0011111000",
            "0111111110",
            "0111111110",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "1110001111",
            "0111111111",
            " 111111110",
            "0011111100"
        ],
        [
            "0000011",
            "0000111",
            "0011111",
            "1111111",
            "1111111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111",
            "0001111"
        ],
        [
            "001111100",
            "011111110",
            "111111111",
            "111001111",
            "111001111",
            "111001111",
            "111001111",
            "000011111",
            "000011110",
            "000111110",
            "000111100",
            "000111100",
            "001111000",
            "001111000",
            "011110000",
            "011110000",
            "111111111",
            "111111111",
            "111111111"
        ],
        [
            "0011111100",
            "0111111110",
            "1111111111",
            "1111001111",
            "1111001111",
            "1111001111",
            "0000001111",
            "0001111110",
            "0001111100",
            "0001111111",
            "0000001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111111111",
            "0111111110",
            "0011111100"
        ],
        [
            "00001111110",
            "00001111110",
            "00011111110",
            "00011111110",
            "00011111110",
            "00111011110",
            "00111011110",
            "00111011110",
            "01110011110",
            "01110011110",
            "01110011110",
            "11100011110",
            "11111111111",
            "11111111111",
            "11111111111",
            "11111111111",
            "00000011110",
            "00000011110",
            "00000011110"
        ],
        [
            "1111111111",
            "1111111111",
            "1111111111",
            "1111000000",
            "1111000000",
            "1111011100",
            "1111111110",
            "1111111111",
            "1111001111",
            "1111001111",
            "0000001111",
            "0000001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111111111",
            "0111111110",
            "0011111100"
        ],
        [
            "0011111100",
            "0111111110",
            "0111111111",
            "1111001111",
            "1111001111",
            "1111000000",
            "1111011100",
            "1111111110",
            "1111111111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "0111111111",
            "0111111110",
            "0011111100"
        ],
        [
            "11111111",
            "11111111",
            "11111111",
            "00001111",
            "00001111",
            "00001111",
            "00001110",
            "00001110",
            "00011110",
            "00011110",
            "00011110",
            "00011100",
            "00111100",
            "00111100",
            "00111100",
            "00111100",
            "00111000",
            "01111000",
            "01111000"
        ],
        [
            "0011111100",
            "0111111110",
            "1111111111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "0111111110",
            "0011111100",
            "0111111110",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111111111",
            "0111111110",
            "0011111100"
        ],
        [
            "0011111100",
            "0111111110",
            "1111111111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111001111",
            "1111111111",
            "0111111111",
            "0011101111",
            "0000001111",
            "1111001111",
            "1111001111",
            "1111111110",
            "0111111110",
            "0011111000"
        ]
    ],
    [
        [
            "000000001111000",
            "000000111111110",
            "000001110000110",
            "000011000000011",
            "000110000000011",
            "001100000000011",
            "011100000000011",
            "011000000000011",
            "111000000000110",
            "110000000000110",
            "110000000001110",
            "110000000001100",
            "110000000011000",
            "110000000111000",
            "011000011110000",
            "011111111000000",
            "000111110000000"
        ],
        [
            "00000111",
            "00001111",
            "00011110",
            "00010110",
            "00001100",
            "00001100",
            "00011000",
            "00011000",
            "00110000",
            "00110000",
            "00110000",
            "01100000",
            "01100000",
            "01100000",
            "11000000",
            "11000000",
            "11000000"
        ],
        [
            "00000011111000",
            "00001111111110",
            "00011100000110",
            "00011000000011",
            "00000000000011",
            "00000000000011",
            "00000000000011",
            "00000000000110",
            "00000000001110",
            "00000000011100",
            "00000001110000",
            "00000111100000",
            "00001110000000",
            "00111100000000",
            "01110000000000",
            "11111111110000",
            "11111111111110",
            "00000000011110"
        ],
        [
            "000000111111000",
            "000011111111110",
            "000111100000111",
            "000110000000011",
            "000000000000011",
            "000000000000011",
            "000000000001110",
            "000000111111000",
            "000000111111000",
            "000000000011100",
            "000000000001100",
            "000000000001100",
            "110000000001100",
            "111000000011100",
            "111100000111000",
            "001111111110000",
            "000111111000000"
        ],
        [
            "00000011000001",
            "00000110000011",
            "00001100000010",
            "00011000000110",
            "00111000000110",
            "00110000001100",
            "01100000001100",
            "01100000001000",
            "11000000011000",
            "11111111111111",
            "11111111111111",
            "00000000110000",
            "00000000110000",
            "00000000100000",
            "00000001100000",
            "00000001100000",
            "00000001100000"
        ],
        [
            "0000001111111111",
            "0000011111111111",
            "0000111000000000",
            "0000110000000000",
            "0000110000000000",
            "0001110000000000",
            "0001101111100000",
            "0001111111111000",
            "0001110000011000",
            "0000000000001100",
            "0000000000001100",
            "0000000000001100",
            "1100000000001100",
            "1110000000011000",
            "1111000001111000",
            "0111111111100000",
            "0001111110000000"
        ],
        [
            "000000001111100",
            "000000111111110",
            "000011110000111",
            "000111000000011",
            "000110000000000",
            "001100000000000",
            "011001111100000",
            "011111111111000",
            "111110000011000",
            "111000000001100",
            "110000000001100",
            "110000000001100",
            "110000000001100",
            "111000000011000",
            "011100001110000",
            "001111111100000",
            "000111110000000"
        ],
        [
            "1111111111111",
            "1111111111111",
            "0000000001110",
            "0000000011100",
            "0000000111000",
            "0000000110000",
            "0000001100000",
            "0000011100000",
            "0000111000000",
            "0000110000000",
            "0001100000000",
            "0011100000000",
            "0011000000000",
            "0111000000000",
            "1110000000000",
            "1100000000000",
            "1100000000000"
        ],
        [
            "0000000111110000",
            "0000011111111100",
            "0000011000001110",
            "0000110000000111",
            "0000110000011111",
            "0000110001111000",
            "0000011111100000",
            "0000011110000000",
            "0001111111000000",
            "0011100011100000",
            "0111000001110000",
            "1110000000110000",
            "1100000000110000",
            "1100000001110000",
            "1110000011100000",
            "0111111111000000",
            "0001111100000000"
        ],
        [
            "0000011111000",
            "0001111111110",
            "0011100000110",
            "0011000000011",
            "0110000000011",
            "0110000000011",
            "0110000000011",
            "0110000000111",
            "0011000011110",
            "0011111111110",
            "0000111100110",
            "0000000001100",
            "0000000011000",
            "0000000111000",
            "0000011110000",
            "1111111000000",
            "1111110000000"
        ]
    ]
];

export default RAW_NUM_MASKS;