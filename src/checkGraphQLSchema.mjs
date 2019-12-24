import { GraphQLSchema, validateSchema } from 'graphql'
import { createHttpError } from './createHttpError.mjs'

/**
 * Validates a GraphQL schema.
 * @kind function
 * @name checkGraphQLSchema
 * @param {GraphQLSchema} schema GraphQL schema.
 * @param {string} errorMessagePrefix Error message prefix.
 * @ignore
 */
export const checkGraphQLSchema = (schema, errorMessagePrefix) => {
  if (!(schema instanceof GraphQLSchema))
    throw createHttpError(
      `${errorMessagePrefix} GraphQL schema must be a \`GraphQLSchema\` instance.`
    )

  const schemaValidationErrors = validateSchema(schema)

  if (schemaValidationErrors.length)
    throw createHttpError(
      `${errorMessagePrefix} has GraphQL schema validation errors.`,
      { graphqlErrors: schemaValidationErrors }
    )
}
