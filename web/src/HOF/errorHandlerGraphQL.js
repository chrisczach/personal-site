import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';

const ErrorHandlerGraphQL = Component => ({ errors, ...props }) => {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  return <Component {...props} />;
};

export default ErrorHandlerGraphQL;
