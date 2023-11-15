const numMask = [
    [
        [
            [248, 510, 510, 911, 911, 911, 911, 911, 911, 911, 911, 911, 911, 911, 911, 911, 511, 510, 252],
            [3, 7, 31, 127, 127, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
            [124, 254, 511, 463, 463, 463, 463, 31, 30, 62, 60, 60, 120, 120, 240, 240, 511, 511, 511],
            [252, 510, 1023, 975, 975, 975, 15, 126, 124, 127, 15, 975, 975, 975, 975, 975, 1023, 510, 252],
            [126, 126, 254, 254, 254, 478, 478, 478, 926, 926, 926, 1822, 2047, 2047, 2047, 2047, 30, 30, 30],
            [1023, 1023, 1023, 960, 960, 988, 1022, 1023, 975, 975, 15, 15, 975, 975, 975, 975, 1023, 510, 252],
            [252, 510, 511, 975, 975, 960, 988, 1022, 1023, 975, 975, 975, 975, 975, 975, 975, 511, 510, 252],
            [255, 255, 255, 15, 15, 15, 14, 14, 30, 30, 30, 28, 60, 60, 60, 60, 56, 120, 120],
            [252, 510, 1023, 975, 975, 975, 975, 510, 252, 510, 975, 975, 975, 975, 975, 975, 1023, 510, 252],
            [252, 510, 1023, 975, 975, 975, 975, 975, 975, 975, 1023, 511, 239, 15, 975, 975, 1022, 510, 248]
        ],
        [10, 7, 9, 10, 11, 10, 10, 8, 10, 10]
    ],
    [
        [
            [120, 510, 902, 1539, 3075, 6147, 14339, 12291, 28678, 24582, 24590, 24588, 24600, 24632, 12528, 16320, 3968],
            [7, 15, 30, 22, 12, 12, 24, 24, 48, 48, 48, 96, 96, 96, 192, 192, 192],
            [248, 1022, 1798, 1539, 3, 3, 3, 6, 14, 28, 112, 480, 896, 3840, 7168, 16368, 16382, 30],
            [504, 2046, 3847, 3075, 3, 3, 14, 504, 504, 28, 12, 12, 24588, 28700, 30776, 8176, 4032],
            [193, 387, 770, 1542, 3590, 3084, 6156, 6152, 12312, 16383, 16383, 48, 48, 32, 96, 96, 96],
            [1023, 2047, 3584, 3072, 3072, 7168, 7136, 8184, 7192, 12, 12, 12, 49164, 57368, 61560, 32736, 8064],
            [124, 510, 1927, 3587, 3072, 6144, 13280, 16376, 31768, 28684, 24588, 24588, 24588, 28696, 14448, 8160, 3968],
            [8191, 8191, 14, 28, 56, 48, 96, 224, 448, 384, 768, 1792, 1536, 3584, 7168, 6144, 6144],
            [496, 2044, 1550, 3079, 3103, 3192, 2016, 1920, 8128, 14560, 28784, 57392, 49200, 49264, 57568, 32704, 7936],
            [248, 1022, 1798, 1539, 3075, 3075, 3075, 3079, 1566, 2046, 486, 12, 24, 56, 240, 8128, 8064]
        ],
        [15, 8, 14, 15, 14, 16, 15, 13, 16, 13]
    ]
].map(m => ((f, l) => f.map((a, i) => a.map(b => b.toString(2).padStart(l[i], "0"))))(...m));

// console.log('debug', 'Masks has been generated');

export const Resolve = async (uri) => {
    return new Promise((resolve, reject) => {
        let img = window.document.createElement("img");
        img.src = uri;

        //let ctx = document.getElementById("#ctx");
        let canvas = window.document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        img.onload = () => {
            ctx.drawImage(img, 0, 0);


            // console.log(img.width, img.height);
            let imgData = ctx.getImageData(0, 0, img.width, img.height);
            let a = []
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (imgData.data[i] == 246) a.push(0);
                else a.push(1);
            }

            let w = img.width;
            let h = img.height;

            if (!w || !h) {
                // console.log('info', 'Failed to load bitmap dimensions');
                return null;
            }

            let id = -1;
            let flag = true;
            let nums = new Array(6).fill(null).map(() => []);

            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < h; j++) nums[i].push("");
            }

            for (let j = 0; j < w; j++) {
                let allZero = true;
                for (let i = 0; i < h; i++) {
                    if (a[i * w + j] != 0)
                        allZero = false;
                }
                if (allZero) flag = true;
                else {
                    if (flag) id++;
                    flag = false;
                    for (let i = 0; i < h; i++) nums[id][i] += a[i * w + j];
                }
            }

            for (id = 0; id < 6; id++) {
                let l = -1, r = h + 1;
                for (let i = 0; i < h; i++) {
                    let allZero = true;
                    for (let j = 0; j < nums[id][i].length; j++) {
                        if (nums[id][i][j] != 0) allZero = false;
                    }
                    if (allZero) l = i;
                    else break;
                }
                for (let i = h - 1; i >= 0; i--) {
                    let allZero = true;
                    for (let j = 0; j < nums[id][i].length; j++) {
                        if (nums[id][i][j] != 0) allZero = false;
                    }
                    if (allZero) r = i + 1;
                    else break;
                }
                nums[id] = nums[id].slice(l + 1, r - 1);
            }

            let captcha = "";

            for (id = 0; id < 6; id++) {
                for (let i = 0; i < 10; i++) {
                    if (nums[id].length == numMask[0][i].length) {
                        let equal = true;
                        for (let j = 0; j < nums[id].length; j++) {
                            if (nums[id][j] != numMask[0][i][j]) equal = false;
                        }
                        if (equal) captcha += i;
                    }
                    if (nums[id].length == numMask[1][i].length) {
                        let equal = true;
                        for (let j = 0; j < nums[id].length; j++) {
                            if (nums[id][j] != numMask[1][i][j])
                                equal = false;
                        }
                        if (equal) captcha += i;
                    }
                }
            }

            // console.log('info', 'Captcha has been resolved:', captcha);

            if (captcha.length === 6) resolve(captcha);
            else reject();
            //return captcha.length === 6 ? captcha : null;
        }
    });
};