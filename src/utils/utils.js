const fs = require('fs');
const path = require('path');
const moment = require("jalali-moment");
moment.locale('fa');


const uploadImage = async (format, base64) => {
    const fileName = `${Date.now()}.${format}`;

    const dirPath = path.join(__dirname, `/../../public/images/${fileName}`);
    console.log(dirPath)
    
    fs.writeFileSync(dirPath, base64, 'base64');
    return fileName;
}

const getToday = () => {
    return moment(new Date());
}



const calculateStartDate = (date) => {
    const today = getToday();
    const date1 = moment(date);
    const seconds = today.diff(date1, 'seconds');

    let myVerb = "";
    let diffTime = Math.floor(seconds / 60);
    if (diffTime === 0)
        myVerb = 'لحظاتی پیش';
    else if (diffTime < 60)
        myVerb = 'دقیقه پیش';
    else if (diffTime < 1440 && diffTime >= 60) {
        myVerb = 'ساعت پیش';
        diffTime = Math.floor(diffTime / 60);
    } else if (diffTime >= 1440 && diffTime < 43200) {
        myVerb = "روز پیش";
        diffTime = Math.floor(diffTime / 1440);
    } else if (diffTime >= 43200) {
        myVerb = "ماه پیش";
        diffTime = Math.floor(diffTime / 43200);
    }

    if (diffTime === 0)
        return myVerb;

    return `${diffTime} ${myVerb}`;
}

module.exports = {
    uploadImage,
    calculateStartDate
}