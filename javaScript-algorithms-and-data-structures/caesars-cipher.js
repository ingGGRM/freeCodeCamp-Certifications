function rot13(str) {
    const alpha = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    let msg = "";

    for (let i = 0; i < str.length; i++) {
        if (alpha.includes(str[i])) {
            msg += alpha[getPos(alpha, str[i])];
        } else {
            msg += str[i];
        }
    }

    return msg;
}

function getPos(alphabet, word) {
    let pos = alphabet.indexOf(word);
    if ((pos + 13) > (alphabet.length - 1)) {
        return 13 - (alphabet.length - pos);
    } else {
        return pos + 13;
    }
}

console.log(rot13("SERR PBQR PNZC"));