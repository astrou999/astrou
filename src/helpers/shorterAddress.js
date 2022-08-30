const shorterAddress = (value) => {

    return value.substr(0,5) + "***" + value.substr(-5)
}

module.exports = shorterAddress;