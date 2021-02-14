function selectFromArray(arr, query){
    let toReturn = []
    for(let val of arr){
        toReturn.push(val[query])
    }
    return toReturn
}

//-----COLORS-----
let colorIndex = 0
const COLORS = ['#3D348B44' , '#7678ed44', '#f7b80144', '#f1870144', '#f35b0444']
function getColor(){
    colorIndex++
    if(colorIndex == COLORS.length + 1)
    colorIndex = 1
    return COLORS[colorIndex - 1]
}

//-----DATES-----
//options moze biti years, months, days, hours, minutes
function getTime(date){
    let newDate = new Date(date)
    return newDate.toLocaleString()
}

function updateDate(date, newDate, newTime){
    console.log('New time: ', newTime)
    console.log('New date: ', newDate)
    if(newDate){
        date.setUTCFullYear(newDate.getUTCFullYear())
        date.setUTCMonth(newDate.getUTCMonth())
        date.setUTCDate(newDate.getUTCDate())
    }
    if(newTime){
        date.setHours(newTime.getHours())
        date.setMinutes(newTime.getMinutes())
    }
}

function getTodayAtMidnight(){
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
}

exports.selectFromArray = selectFromArray
exports.getColor = getColor
exports.getTime = getTime
exports.updateDate = updateDate
exports.getTodayAtMidnight = getTodayAtMidnight