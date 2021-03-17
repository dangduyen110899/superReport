const dcm = {}
dcm.caculHourLT =  [
    {
        totalStudent: "<40",
        clcEng: 1.5,
        clcViet: 1.3,
        english: 1.5,
        vietnames: 1,
    },
    {
        totalStudent: "41-60",
        clcEng: 2,
        clcViet: 1.5,
        english: 1.7,
        vietnames: 1.1,
    },
    {
        totalStudent: "61-80",
        clcEng: 2,
        clcViet: 1.5,
        english: 2,
        vietnames: 1.2,
    },
    {
        totalStudent: "81-100",
        clcEng: 2,
        clcViet: 1.5,
        english: 2,
        vietnames: 1.3,
    },
    {
        totalStudent: "101-120",
        clcEng: 2,
        clcViet: 1.5,
        english: 2,
        vietnames: 1.4,
    },
    {
        totalStudent: ">120",
        clcEng: 2,
        clcViet: 1.5,
        english: 2,
        vietnames: 1.5,
    }
]

dcm.caculHourTH =  [
    {
        totalStudent: "<=30",
        numberLecturer: 1,
        hourTh: 0.75,
    },
    {
        totalStudent: "<=30",
        numberLecturer: 2,
        hourTh: 0.5,
    },
    {
        totalStudent: ">30",
        numberLecturer: 1,
        hourTh: 0.8,
    },
    {
        totalStudent: ">30",
        numberLecturer: 2,
        hourTh: 0.55,
    }
]

dcm.caculHourThesic =  [
    {
       hourKltn: 12,
        nvcl: 2,
        english: 2,
        vietnames: 1.5
    }
]

module.exports =  dcm