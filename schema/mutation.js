const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Department = mongoose.model("department");
const Employee = mongoose.model("employee");
const DepartmentType = require("./department_type");
const EmployeeType = require("./employee_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDepartment: {
      type: DepartmentType,
      args: {
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
      },
      resolve(obj, { name, description }) {
        return new Department({ name, description }).save();
      },
    },
    addEmployeeToDepartment: {
      type: DepartmentType,
      args: {
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
        departmentId: { type: GraphQLID },
      },
      resolve(
        obj,
        { firstName, lastName, address, mobile, age, departmentId }
      ) {
        return Department.addEmployee(
          departmentId,
          firstName,
          lastName,
          address,
          mobile,
          age
        );
      },
    },
    editEmployee: {
      type: EmployeeType,
      args: {
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
      },
      resolve(obj, { id, firstName, lastName, address, mobile, age }) {
        return Employee.edit(id, firstName, lastName, address, mobile, age);
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(obj, { id }) {
        return Employee.findOneAndRemove(id);
      },
    },
    deleteDepartment: {
      type: DepartmentType,
      args: { id: { type: GraphQLID } },
      resolve(obj, { id }) {
        return Department.findOneAndRemove(id);
      },
    },
  },
});

module.exports = mutation;
