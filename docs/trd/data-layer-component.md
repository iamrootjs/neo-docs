# Data Layer Component Level

The data layer for the WhatsApp Multiagent System POC will leverage various AWS services to store and manage different types of data. These components are accessed by the back-end (Orchestration Layer) components.

## Core Data Components (AWS Services)

*   **Conversation Store**
    *   **Responsibilities:** Persistently store conversation history, including user messages, agent responses, timestamps, and relevant metadata (e.g., session IDs, user identifiers if applicable).
    *   **Technology Choice (POC):** Amazon DynamoDB (NoSQL)
        *   **Justification:** Scalability, flexible schema suitable for conversation logs, serverless, pay-per-use, good integration with AWS Lambda. Potentially Amazon RDS (e.g., PostgreSQL) if complex relational queries on conversation data become a strong requirement beyond the POC.
    *   **Key Data Attributes:** `SessionID`, `Timestamp`, `UserID` (e.g., WhatsApp number), `Sender` (User/Agent), `MessageType`, `MessageContent`, `AgentID` (if multiple agents).
    *   **Accessed by:** Session Manager, Orchestration Engine (for logging and context retrieval).

*   **Session Store**
    *   **Responsibilities:** Store active user session data for quick retrieval during a conversation. This includes conversation state, temporary variables, and user context.
    *   **Technology Choice (POC):** Amazon ElastiCache (e.g., Redis) or Amazon DynamoDB with TTL (Time To Live).
        *   **Justification for ElastiCache (Redis):** In-memory data store providing very low latency access, ideal for session management. TTL can automatically expire old sessions.
        *   **Justification for DynamoDB with TTL:** Simpler to manage if already using DynamoDB for Conversation Store, serverless, and TTL feature handles session expiry. Performance might be slightly lower than ElastiCache for very high-throughput scenarios but likely sufficient for POC.
    *   **Key Data Attributes:** `SessionID` (Primary Key), `StateVariables`, `LastInteractionTime`, `UserID`.
    *   **Accessed by:** Session Manager, Orchestration Engine.

*   **Knowledge Base Storage**
    *   **Responsibilities:** Store the source documents and data that Amazon Bedrock Knowledge Bases will use to answer queries.
    *   **Technology Choice (POC):** Amazon S3 (Simple Storage Service)
        *   **Justification:** Durable, scalable, cost-effective object storage. Natively integrates with Amazon Bedrock for creating and managing knowledge bases.
    *   **Key Data Attributes:** Document files (PDF, TXT, DOCX, HTML, etc.) organized by knowledge base topic or agent.
    *   **Accessed by:** Amazon Bedrock (during knowledge base creation and updates), potentially administrative scripts for uploading/managing documents.

*   **User Profile Store (Optional for POC - Low Priority)**
    *   **Responsibilities:** Store user-specific preferences, history, or profile information if the system requires personalization beyond basic session management.
    *   **Technology Choice (If implemented):** Amazon RDS (e.g., PostgreSQL) or Amazon DynamoDB.
        *   **Justification:** RDS for structured user profiles with potential relational needs. DynamoDB for a more flexible schema.
    *   **Key Data Attributes:** `UserID` (e.g., WhatsApp number), `Preferences`, `InteractionHistorySummary`.
    *   **Accessed by:** Orchestration Engine (for personalization).

## Supporting Data Management Aspects

*   **Data Backup and Recovery:**
    *   **DynamoDB:** Point-in-Time Recovery (PITR) and on-demand backups.
    *   **RDS:** Automated backups and manual snapshots.
    *   **S3:** Versioning and cross-region replication (if needed for higher durability).
    *   **ElastiCache (Redis):** Snapshots for backup, though session data is often transient and can be rebuilt or lost with less impact than persistent stores.
*   **Data Security:**
    *   Encryption at rest (using AWS KMS for DynamoDB, RDS, S3).
    *   Encryption in transit (TLS/SSL for all communications).
    *   IAM roles and policies for fine-grained access control to data services.
*   **Data Retention Policies:** To be defined based on business and regulatory requirements (e.g., how long to keep conversation logs).

For the POC, the primary focus will be on setting up and integrating the Conversation Store (DynamoDB) and Session Store (DynamoDB with TTL or ElastiCache), along with S3 for Bedrock Knowledge Bases. The User Profile Store is considered optional and may be deferred.
