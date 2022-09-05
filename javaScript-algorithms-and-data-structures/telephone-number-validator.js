function telephoneCheck(str) {
    /*
    555-555-5555
   (555)555-5555
   (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555
    */
    //let format = /(^\d{10}$)/;
    let format = /^1? ?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

    return Boolean(str.match(format));
}

console.log(telephoneCheck("1 555555 5555"));
console.log(telephoneCheck("1 (757) 622-7382"));