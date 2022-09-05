function convertToRoman(num) {
    let roman = "";
    let vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

    for (let i = 0; i < vals.length; i++) {
        let n = parseInt(num / vals[i]);
        num -= n * vals[i];
        while (n > 0) {
            roman += roms[i];
            n--;
        }
    }

    return roman;
}

console.log(convertToRoman(1993));