# Walkthrough of Serverless TODO Application

## Overview

This walkthrough provides a detailed explanation of how to set up and deploy a serverless TODO application using AWS services and the Serverless Framework.

## Prerequisites

- AWS Account
- Auth0 Account
- Node.js and npm installed
- Serverless Framework installed

## Steps

### Backend

1. **Set Up Serverless Framework**:

   - Install the Serverless Framework globally:
     ```sh
     npm install -g serverless
     ```
   - Create a new Serverless service:
     ```sh
     serverless create --template aws-nodejs-typescript --path backend
     cd backend
     ```

2. **Implement Lambda Functions**:

   - Create Lambda functions for creating, updating, deleting, and fetching TODO items in [http](backend/src/lambda/http/).
   - Implement the business logic in [todos.ts](backend/src/helpers/todos.ts).
   - Use [todosAcess.ts](backend/src/helpers/todosAcess.ts) for interacting with DynamoDB.
   - Use [attachmentUtils.ts](backend/src/helpers/attachmentUtils.ts) for generating S3 signed URLs.

3. **Configure API Gateway**:

   - Define the API Gateway endpoints in [serverless.yml](backend/serverless.yml).
   - Set up the custom authorizer in [auth0Authorizer.ts](backend/src/lambda/auth/auth0Authorizer.ts).

4. **Set Up DynamoDB**:

   - Define the DynamoDB table and indexes in [serverless.yml](backend/serverless.yml).

5. **Configure S3**:

   - Set up an S3 bucket for storing attachment images in [serverless.yml](backend/serverless.yml).
   - Configure bucket policies and CORS settings.

6. **Deploy Backend**:
   - Deploy the backend using the Serverless Framework:
     ```sh
     serverless deploy -v
     ```

### Frontend

1. **Set Up React Application**:

   - Create a new React application:
     ```sh
     npx create-react-app client --template typescript
     cd client
     ```

2. **Implement Authentication**:

   - Integrate Auth0 for authentication in [Auth.js](client/src/auth/Auth.js).
   - Configure Auth0 settings in [config.ts](client/src/config.ts).

3. **Connect to Backend**:

   - Implement API calls to the backend in [todos-api.ts](client/src/api/todos-api.ts).
   - Use React components in [components](client/src/components) to interact with the backend APIs.

4. **Deploy Frontend**:
   - Build the React application:
     ```sh
     npm run build
     ```
   - Deploy the build output to an S3 bucket and configure CloudFront for content delivery.

## Conclusion

By following these steps, you can successfully deploy a serverless TODO application on AWS. The combination of AWS services and the Serverless Framework provides a scalable, reliable, and performant solution for building serverless applications.
