# 7.1 Container Diagram

*   **Web App**: Next.js/React.js with Shadcn/Tailwind CSS, hosted on AWS Amplify.
*   **API Service**: Fastify Node.js, hosted on AWS ECS, handles requests.
*   **Database**: PostgreSQL on AWS RDS, stores form data and feedback.
*   **File Storage**: AWS S3 for uploaded files and PDFs.
*   **Processing Service**: AWS Lambda for file processing and PDF generation.
*   **Authentication Service**: AWS Cognito for user authentication.
*   **LLM Service**: Gemini 2.5 API for summarization, with fallbacks.
