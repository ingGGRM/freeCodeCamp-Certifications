function palindrome(str) {
    let unwanted = /[\W_]/g;
    let original = str.replace(unwanted, '').toLowerCase();
    let reversed = "";
    for (let i = original.length - 1; i >= 0; i--) {
        reversed += original[i];
    }

    return original === reversed;
}

palindrome("eye");