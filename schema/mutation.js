const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");

const Department = mongoose.model("department");
const Employee = mongoose.model("employee");

const DepartmentType = require("./department_type");
const EmployeeType = require("./employee_type");
const UserType = require("./user_type");
const AuthServices = require("../services/auth");

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
    signup: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(obj, { email, password }, req) {
        return AuthServices.signup({ email, password, req });
      },
    },
    login: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(obj, { email, password }, req) {
        return AuthServices.login({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(obj, args, req) {
        const { user } = req.raw;
        req.raw.logout(function (err) {
          if (err) {
            throw new Error(err);
          }
        });
        return user;
      },
    },
  },
});

module.exports = mutation;
