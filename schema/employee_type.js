const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Employee = mongoose.model('employee');

const EmployeeType = new GraphQLObjectType({
  name:  'EmployeeType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
    mobile: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    department: {
      type: require('./department_type'),
      resolve(obj) {
        return Employee.findById(obj).populate('department')
          .then(employee => {
            console.log(employee)
            return employee.department
          });
      }
    }
  })
});

module.exports = EmployeeType;
