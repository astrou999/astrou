const formatTime = (value) => {
    
    let unix_timestamp = value
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var fullDate = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = fullDate.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + fullDate.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + fullDate.getSeconds();

    let listDate = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var days = listDate[fullDate.getDay()]
    var date = fullDate.getDate()
    var month = fullDate.getMonth() + 1
    var year = fullDate.getFullYear()

    // Will display time in 10:30:23 format
    var formattedTime = days + ", " + date + "/" + month + "/" + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
}

module.exports = formatTime;