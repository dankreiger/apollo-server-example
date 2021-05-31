import { GraphQLScalarType, Kind } from 'graphql';
import { InvalidDataTypeError } from '../errors/InvalidDataTypeError';

const errorMessage = (value: any) =>
  `Invalid hard-coded Date value (not an integer): AST ${JSON.stringify(
    value,
    null,
    4
  )}`;

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return new Date(value).getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    throw new InvalidDataTypeError(errorMessage(ast));
  },
});

export default {
  errorMessage,
  scalar: dateScalar,
};
