const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const EmployeeType = require('./employee_type');
const Department = mongoose.model('department');

const DepartmentType = new GraphQLObjectType({
  name:  'DepartmentType',
  fields: () => ({
    id: { type: GraphQLID },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    //Every department can have several employee
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(obj) {
        return Department.findEmployees(obj.id);
      }
    }
  })
});

module.exports = DepartmentType;
