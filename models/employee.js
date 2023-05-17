const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: 'department'
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  mobile: {
    type: String,
  },
  age: {
    type: Number,
  },
});

EmployeeSchema.statics.edit = function(id, firstName, lastName, address, mobile, age) {
  const Employee = mongoose.model('employee');

  return Employee.findById(id)
    .then(employee => {
      employee.firstName=firstName;
      employee.lastName=lastName;
      employee.address=address;
      employee.mobile=mobile;
      employee.age=age;
      return employee.save();
    })
}

mongoose.model('employee', EmployeeSchema);
