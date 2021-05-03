const dcm = {}
dcm.caculHourLT =  [
    {
        totalStudent: "<=40",
        clcEng: 1.8,
        clcViet: 1.5,
        english: 1.5,
        vietnames: 1,
    },
    {
        totalStudent: "41-49",
        clcEng: 2,
        clcViet: 1.7,
        english: 2,
        vietnames: 1.1,
    },
    {
        totalStudent: "50-59",
        clcEng: 2,
        clcViet: 1.7,
        english: 2,
        vietnames: 1.2,
    },
    {
        totalStudent: "60-69",
        clcEng: 2,
        clcViet: 1.7,
        english: 2,
        vietnames: 1.3,
    },
    {
        totalStudent: "70-79",
        clcEng: 2,
        clcViet: 1.7,
        english: 2,
        vietnames: 1.4,
    },
    {
        totalStudent: ">80",
        clcEng: 2,
        clcViet: 1.7,
        english: 2,
        vietnames: 1.5,
    }
]

dcm.caculHourLTAfter =  [
    {
        totalStudent: "<=20",
        clcViet: 1.5,
    },
    {
        totalStudent: "21-30",
        clcViet: 1.6,
    },
    {
        totalStudent: "31-40",
        clcViet: 1.7,
    },
    {
        totalStudent: "41-50",
        clcViet: 1.8,
    },
    {
        totalStudent: ">51",
        clcViet: 1.9,
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
        hourTh: 0.85,
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