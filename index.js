// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const employee = {};
    employee.firstName = firstName;
    employee.familyName = familyName;
    employee.title = title;
    employee.payPerHour = payPerHour;
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
]

function createEmployeeRecords(twoRows){
    const employee = twoRows.map(createEmployeeRecord)
    return employee;
}
function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1],10),
        date: dateStamp.split(" ")[0],
    })
    return employee;
}

function createTimeOutEvent(employee, dateStamp){
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1],10),
        date: dateStamp.split(" ")[0],
    })
    return employee;
}


let hoursWorkedOnDate = function(employee, dateForm){
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === dateForm
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === dateForm
    })
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked;
};

const wagesEarnedOnDate = (employee,dateForm) => {
    let amountOwedOnDate = hoursWorkedOnDate(employee,dateForm);
    let amountOwed = amountOwedOnDate * employee.payPerHour;
    return parseFloat(amountOwed.toString());
};

function allWagesFor(employee){
    let datesWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    return datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
}

function findEmployeeByFirstName(fromEmployeesArray, firstName){
    return fromEmployeesArray.find(function(rec){
        return rec.firstName === firstName
    })
}
const calculatePayroll = (arrayOfEmployeeRecords) =>{
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
