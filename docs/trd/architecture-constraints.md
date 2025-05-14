# 2 Architecture Constraints

This section outlines the constraints that shape the architecture of the WhatsApp Multiagent System.

*   **Technology Stack (POC Focus):**
    *   **Backend:** Node.js (Monorepo approach for POC).
    *   **Cloud Provider:** Amazon Web Services (AWS) is mandated. Specific services like Bedrock, Lambda/EC2, API Gateway, S3, and IAM are expected.
    *   **AI Services:** Amazon Bedrock agents are central to the AI capabilities.
    *   **Database:** Choice of database (e.g., PostgreSQL, DynamoDB on AWS) should support scalability and the nature of conversational data. (To be finalized, but assume an AWS managed service).
    *   **Caching:** Redis for caching (Basic implementation in Phase 2).
*   **Integration Points:**
    *   **WhatsApp Business API:** The system must integrate with the official WhatsApp Business API.
    *   **Third-Party APIs:** Limited to essential APIs for POC domain agent functionality.
*   **Timeline:**
    *   **Proof of Concept (POC):** Must be delivered by the end of September. This imposes significant constraints on the complexity and scope of initial features.
    *   **Phased Delivery:** Development will follow the phased approach outlined in the PRD timeline.
*   **Security & Compliance (Foundational for POC):**
    *   Secure storage of credentials (e.g., AWS Secrets Manager, KMS).
    *   Encrypted communication (HTTPS).
    *   Basic WAF setup (Phase 3).
    *   Alignment with GDPR principles from the design phase (Phase 3).
*   **Development Process:**
    *   **CI/CD:** Basic CI/CD pipeline with GitHub Actions (Phase 4).
    *   **Version Control:** GitHub.
*   **Operational Constraints (POC):**
    *   **Monitoring:** Basic CloudWatch monitoring (Phase 4).
    *   **Scalability:** Architecture must be designed for future scalability, but POC will focus on core functionality over high-load performance.
    *   **Reliability:** Core messaging and agent interaction should be reliable during business hours for the POC.
*   **Budget:** While not explicitly detailed, AWS service selection should be cost-conscious, favoring serverless or managed services where appropriate to reduce operational overhead for the POC.
*   **Documentation:**
    *   Technical documentation will use Vitepress.
    *   Architectural diagrams will follow C4 model principles where applicable.
