function selectFromArray(arr, query){
    let toReturn = []
    for(let val of arr){
        toReturn.push(val[query])
    }
    return toReturn
}

//-----COLORS-----
let colorIndex = 0
const COLORS = ['#3D348B' , '#7678ed', '#f7b801', '#f18701', '#f35b04']
function getColor(){
    colorIndex++
    if(colorIndex == COLORS.length + 1)
    colorIndex = 1
    return COLORS[colorIndex - 1]
}

//-----DATES-----
//options moze biti years, months, days, hours, minutes
function getTime(date, options){
    let toReturn = ''
    switch(options){
        case 'hours': {
            toReturn += date.getUTCHours() +
                ':' + date.getUTCMinutes()
            return toReturn
        }
        default: return null
    }

}

exports.selectFromArray = selectFromArray
exports.getColor = getColor
exports.getTime = getTime