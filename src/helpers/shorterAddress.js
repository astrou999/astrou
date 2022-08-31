const shorterAddress = (value) => {
    if(value && value.length > 10){
        return value.substr(0,5) + "***" + value.substr(-5)
    } else {
        return value
    }
}

module.exports = shorterAddress;