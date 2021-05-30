const dcm = require("./doccumentHour");
const  caculHour= dcm.caculHourLT 

// get hour tkb
function getHourItemLythuyet(item) {
  let caculIndex 
  let score = 0
  if (item.total_student>120) {
    caculIndex = 5 
  } else if (item.total_student>100) {
    caculIndex = 4 
  } else if (item.total_student>80) {
    caculIndex = 3 
  } else if (item.total_student>60) {
    caculIndex = 2 
  } else if (item.total_student>40) {
    caculIndex = 1
  } else {
    caculIndex = 0
  }

  switch (item.job) {
    case "clc":
      // language: 1 => tieng anh 
      if (item.language) {
        score = caculHour[caculIndex].clcEng *  30
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].clcViet * 30 
      }
      break;

    case "nvcl":
      if (item.language) {
        score = caculHour[caculIndex].english * 30 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].vietnames * 30 
      }
      break;

    case "thuong":
      if (item.language) {
        score = caculHour[caculIndex].english * 30 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].vietnames * 30 
      }
      break;
  
    default:
      break;
  }

  return score 
    
}

function getHourItemThuchanh(item, numberLecturer) {
  let score = 20
  if (item.total_student<=30) {
    if (numberLecturer===2) {
      score *= 0.5
    } else {
      score *= 0.75
    }
  } else {
    if (numberLecturer===2) {
      score *= 0.55
    } else {
      score *= 0.8
    }
  }
 return score
    
}

function getHourItemTuhoc(item) {
  let score = 10
 return score*0.3    
}

// get hour kltn
function getHourItemThesis(item, numberLecturer, check = 1) {
  let hour = 15
  if (item.language) {
    hour *= 2
  } else {
    hour *= 1.5
  }
  if (item.nvcl) {
    hour *= 2
  }
  if ( numberLecturer == 1) {
    return hour
  } else  if(check == 1 ){
    return hour*2/3
  } else return hour*1/3
  
}

// get hour datn
function getHourItemProject(item, numberLecturer, check = 1) {
  let hour = 18
  if (item.language) {
    hour *= 2
  } else {
    hour *= 1.5
  }
  if (item.nvcl) {
    hour *= 2
  }
  if ( numberLecturer == 1) {
    return hour
  } else  if(check == 1 ){
    return hour*2/3
  } else return hour*1/3
  
}

// get hour lvts
function getHourItemPhdThesis(item, numberLecturer, check = 1) {
  let hour = 30
  if (item.language) {
    hour *= 2
  } else {
    hour *= 1.5
  }
  if (item.nvcl) {
    hour *= 2
  }
  if ( numberLecturer == 1) {
    return hour
  } else  if(check == 1 ){
    return hour*2/3
  } else return hour*1/3
  
}

// get hour lats
function getHourItemDissertation(item, numberLecturer, check = 1) {
  let hour = 50
  if ( numberLecturer == 1) {
    return hour
  } else  if(check == 1 ){
    return hour*2/3
  } else return hour*1/3
  
}

function getHourItem(item, type, name, numberLecturer = 1, check = 1) {
  switch (name) {
    case 'tkb':
      switch (type) {
        case 0:
          return getHourItemLythuyet(item, numberLecturer)
          break;
        
        case 1:
          // thuc hanh
          return getHourItemThuchanh(item, numberLecturer)
          break;
    
        case 2:
          // tu hoc
          return getHourItemTuhoc(item)
          break;
      
        default:
          break;
      }
      break;

      case 'kltn':
        return getHourItemThesis(item, numberLecturer, check)
        break;
      case 'datn':
        return getHourItemProject(item, numberLecturer)
        break;
      case 'lvts':
        return getHourItemPhdThesis(item, numberLecturer)
        break;
      case 'lats':
        return getHourItemDissertation(item, numberLecturer)
        break;
      case 'cvht':
        return 0.75
        break;

      case 'tttd':
      return 2.5
    break;
    default:
      break;
  }
}

module.exports =  getHourItem