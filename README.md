# Serverless TODO Application

In this project, I deployed a serverless TODO application on AWS, leveraging the powerful features of AWS Lambda, API Gateway, DynamoDB, and S3 for storage and CloudFront for content delivery.

## Overview

This application allows users to create, update, delete, and fetch TODO items. Each TODO item can optionally have an attachment image. The application ensures that each user only has access to their own TODO items.

### Technologies Used

- **AWS Lambda**: For running the backend logic without provisioning or managing servers.
- **API Gateway**: For creating, publishing, maintaining, monitoring, and securing RESTful APIs.
- **DynamoDB**: For storing TODO items in a scalable and highly available NoSQL database.
- **S3**: For storing attachment images.
- **CloudFront**: For delivering content with low latency and high transfer speeds.
- **Auth0**: For authentication and authorization.
- **React**: For building the frontend application.

## Project Steps

### Backend

1. **Creating Lambda Functions**: Implemented Lambda functions for creating, updating, deleting, and fetching TODO items. These functions interact with DynamoDB and S3.
2. **Configuring API Gateway**: Set up API Gateway to expose the Lambda functions as RESTful APIs.
3. **Setting Up DynamoDB**: Created a DynamoDB table to store TODO items with appropriate indexes.
4. **Configuring S3**: Set up an S3 bucket to store attachment images and configured bucket policies and CORS settings.
5. **Deploying with Serverless Framework**: Used the Serverless Framework to deploy the backend infrastructure.

### Frontend

1. **Setting Up React Application**: Created a React application to interact with the backend APIs.
2. **Implementing Authentication**: Integrated Auth0 for user authentication and authorization.
3. **Connecting to Backend**: Configured the React application to interact with the deployed backend APIs.
4. **Deploying Frontend**: Deployed the React application to an S3 bucket and configured CloudFront for content delivery.

## Conclusion

Deploying my serverless TODO application on AWS using Lambda, API Gateway, DynamoDB, S3, and CloudFront has been a rewarding experience. The combination of these AWS services has helped me deliver a scalable, reliable, and performant application to users worldwide.

A walkthrough can be found in the `WALKTHROUGH.md` file.
