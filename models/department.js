const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {type: String },
  description: {type: String},
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'employee'
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'employee'
  }]
});


DepartmentSchema.statics.findEmployees = function(id) {
  return this.findById(id)
    .populate('employees')
    .then(department => department.employees);
}

DepartmentSchema.statics.addEmployee = function(id, firstName, lastName, address, mobile, age) {
  const Employee = mongoose.model('employee');

  return this.findById(id)
    .then(department => {
      const employee = new Employee({ firstName, lastName, address, mobile, age, department })
      department.employees.push(employee)
      return Promise.all([employee.save(), department.save()])
        .then(([employee, department]) => department);
    });
}

mongoose.model('department', DepartmentSchema);
