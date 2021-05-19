const dcm = require("./doccumentHour");
const  caculHour= dcm.caculHourLT 
const  caculHourAfter= dcm.caculHourLTAfter 


// get hour tkb tron dh
function getHourItemLythuyet(item, numberLecturer) {
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
        score = caculHour[caculIndex].clcEng * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].clcViet * item.total_student 
      }
      break;

    case "nvcl":
      if (item.language) {
        score = caculHour[caculIndex].english * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].vietnames * item.total_student 
      }
      break;

    case "thuong":
      if (item.language) {
        score = caculHour[caculIndex].english * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHour[caculIndex].vietnames * item.total_student 
      }
      break;
  
    default:
      break;
  }

  return score
  //  + getHourItemTuhoc(item)/numberLecturer
    
}

// get hour tkb sau dh
function getHourItemLythuyetAfter(item, numberLecturer) {
  let caculIndex 
  let score = 0
  if (item.total_student>51) {
    caculIndex = 4
  } else if (item.total_student>40) {
    caculIndex = 3
  } else if (item.total_student>30) {
    caculIndex = 2
  } else if (item.total_student>20) {
    caculIndex = 1
  } else {
    caculIndex = 0
  }

  switch (item.job) {
    case "clc":
      // language: 1 => tieng anh 
      if (item.language) {
        score = caculHourAfter[caculIndex].clcEng * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHourAfter[caculIndex].clcViet * item.total_student 
      }
      break;

    case "nvcl":
      if (item.language) {
        score = caculHourAfter[caculIndex].english * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHourAfter[caculIndex].vietnames * item.total_student 
      }
      break;

    case "thuong":
      if (item.language) {
        score = caculHourAfter[caculIndex].english * item.total_student 
        // nhan voi so h cua hoc phan do
      } else {
        score = caculHourAfter[caculIndex].vietnames * item.total_student 
      }
      break;
  
    default:
      break;
  }

  return score 
  // + getHourItemTuhoc(item)/numberLecturer
    
}

function getHourItemThuchanh(item, numberLecturer) {
  let score = item.total_student
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
  let score = item.total_student
 return score*0.3    
}

// get hour kltn
function getHourItemThesis(item) {
  let hour = 12
  if (item.language) {
    hour *= 2
  } else {
    hour *= 1.5
  }
  if (item.nvcl) {
    hour *= 2
  }
  return hour 
}

function getHourItem(item, type, name, numberLecturer = 1) {
  switch (name) {
    case 'tkb trong dh':
      switch (type) {
        case 0:
          return getHourItemLythuyet(item,numberLecturer)
          break;
        
        case 1:
          // thuc hanh
          return getHourItemThuchanh(item, numberLecturer)
          break;
      
        default:
          break;
      }
      break;

      case 'tkb sau dh':
        switch (type) {
          case 0:
            return getHourItemLythuyetAfter(item,numberLecturer)
            break;
          
          case 1:
            // thuc hanh
            return getHourItemThuchanh(item, numberLecturer)
            break;
        
          default:
            break;
        }
        break;

      case 'kltn':
        return getHourItemThesis(item,numberLecturer)
        break;
    default:
      break;
  }
}

module.exports =  getHourItem