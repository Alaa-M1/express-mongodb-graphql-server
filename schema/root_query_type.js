const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const DepartmentType = require('./department_type');
const EmployeeType = require('./employee_type');

////////////////////
const Employee = mongoose.model('employee');
const Department = mongoose.model('department');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    departments: {
      type: new GraphQLList(DepartmentType),
      resolve() {
        return Department.find({});
      }
    },
    department: {
      type: DepartmentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(obj, { id }) {
        return Department.findById(id);
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Employee.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
