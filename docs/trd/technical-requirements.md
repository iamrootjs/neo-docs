# 10 Technical Requirements

This section details the specific technical requirements derived from the functional and non-functional requirements outlined in the PRD.

## 10.1 Core Platform and Services
*   **TR1.1 Backend Language/Runtime:** Node.js (LTS version).
*   **TR1.2 AI Service:** Amazon Bedrock Agents.
    *   TR1.2.1 Must support integration with foundation models available in Bedrock.
    *   TR1.2.2 Must allow for the definition of actions (tools) that agents can invoke (e.g., calling internal logic, third-party APIs).
    *   TR1.2.3 Must support knowledge base integration for retrieval augmented generation (RAG).
*   **TR1.3 WhatsApp Integration:** Via WhatsApp Business API.
    *   TR1.3.1 System must be able to receive incoming messages (text, voice notes) via webhooks.
    *   TR1.3.2 System must be able to send outgoing messages (text) via the API.
*   **TR1.4 Compute:** AWS Lambda for serverless request processing and agent orchestration where suitable; Amazon EC2/ECS for potentially longer-running processes or supervisor agent if Lambda is not optimal. (POC will prioritize Lambda for cost and simplicity where feasible).
*   **TR1.5 API Gateway:** Amazon API Gateway to manage and secure endpoints for WhatsApp webhooks and potentially internal service communication.
*   **TR1.6 Database:**
    *   TR1.6.1 Must store company registration details and WhatsApp Business Account credentials securely.
    *   TR1.6.2 Must store agent configurations (supervisor, domain agents).
    *   TR1.6.3 Must store conversation history (user, agent, timestamps, session IDs).
    *   TR1.6.4 Choice of database (e.g., Amazon RDS PostgreSQL, Amazon DynamoDB) must support efficient querying of conversation history and relational data for configurations. (To be finalized based on detailed data modeling).
*   **TR1.7 Caching:** Amazon ElastiCache for Redis (for Phase 2).
    *   TR1.7.1 Cache Bedrock responses where appropriate.
    *   TR1.7.2 Cache frequently accessed configuration data.
    *   TR1.7.3 Cache user session information.
*   **TR1.8 Storage:** Amazon S3 for:
    *   TR1.8.1 Storing knowledge base documents/files.
    *   TR1.8.2 Potentially storing voice note files before transcription (if not handled directly by WhatsApp/Bedrock).
    *   TR1.8.3 Storing logs (application logs, access logs).

## 10.2 Agent Capabilities
*   **TR2.1 Supervisor Agent Logic:**
    *   TR2.1.1 Must be able to parse incoming user messages.
    *   TR2.1.2 Must be able to identify user intent (basic for POC).
    *   TR2.1.3 Must be able to route to the correct domain agent or invoke a general capability.
    *   TR2.1.4 Must be able to ask clarifying questions if intent is unclear or more information is needed.
*   **TR2.2 Domain Agent Logic:**
    *   TR2.2.1 Must be able to access its configured knowledge base.
    *   TR2.2.2 Must be able to invoke its configured tools/APIs (basic for POC).
    *   TR2.2.3 Must maintain context within a session.
*   **TR2.3 Voice-to-Text:** System must integrate a service (e.g., Amazon Transcribe or Bedrock-native capability) to convert user voice notes into text for processing by agents.

## 10.3 Security
*   **TR3.1 Credential Management:** Securely store and manage WhatsApp Business API keys and other sensitive credentials using AWS Secrets Manager.
*   **TR3.2 Data Encryption:**
    *   TR3.2.1 Data at rest (database, S3) must be encrypted (e.g., using AWS KMS).
    *   TR3.2.2 Data in transit (API calls, communication between services) must be encrypted using HTTPS/TLS.
*   **TR3.3 Access Control:** Implement least privilege access using AWS IAM roles for all AWS resources and services.
*   **TR3.4 WAF:** Basic AWS WAF setup for API Gateway endpoints (Phase 3).
*   **TR3.5 Input Validation:** All inputs from external sources (WhatsApp, APIs) must be validated.

## 10.4 Development and Operations
*   **TR4.1 Version Control:** Git, hosted on GitHub.
*   **TR4.2 CI/CD:** Basic automated build and deployment pipeline using GitHub Actions (Phase 4 POC target).
    *   TR4.2.1 Pipeline should deploy to a dedicated test environment.
*   **TR4.3 Logging:** Comprehensive logging for requests, agent interactions, errors, and important system events. Logs should be stored in Amazon CloudWatch Logs.
*   **TR4.4 Monitoring:** Basic monitoring dashboards in Amazon CloudWatch for key metrics (e.g., message volume, API error rates, Lambda invocations/errors, Bedrock usage) (Phase 4 POC target).
*   **TR4.5 Modularity:** Code should be organized in a modular fashion to facilitate maintainability and independent updates of components (e.g., different agents, core services).

## 10.5 Performance (POC Targets)
*   **TR5.1 Response Time:** System should acknowledge and provide an initial response (or clarifying question) to user messages within 3-5 seconds for typical text-based interactions. Voice note processing may take longer.
*   **TR5.2 Concurrent Users:** While not a primary focus for POC, the architecture should not have inherent bottlenecks preventing future scaling. Initial AWS resource sizing should handle a small number of concurrent test users.

## 10.6 Reliability (POC Targets)
*   **TR6.1 Core Availability:** Core messaging and agent interaction functionalities should be available during defined business hours for testing and demos.
*   **TR6.2 Error Handling:** Implement robust error handling and reporting for API failures, agent errors, and unexpected issues.

This list will be refined as detailed design progresses.
