# Scope

## In Scope (POC - End of September)

*   **WhatsApp Business Account Integration:** Allow companies to register/connect their WhatsApp Business accounts.
*   **Basic Multiagent Architecture:**
    *   Implementation of a supervisor agent.
    *   Implementation of at least three coordinator for distinct business subsets (e.g., Customer Support, Sales Inquiry).
*   **Conversational AI Core:**
    *   Ability for the AI to understand natural language queries.
    *   Ability for the AI to ask clarifying questions to gather more information.
    *   Basic tool/agent selection logic and routing by the supervisor agent.
    *   Conversation history and session management
*   **Core Communication Features:**
    *   Text-based conversations.
    *   Conversion of voice notes to text or text.
*   **Infrastructure Setup (Phase 1 Focus):**
    *   Basic infrastructure setup on AWS.
    *   Integration with WhatsApp Business API.
    *   CI/CD pipelines
    *   Initial setup and integration of Bedrock agents.
*   **Knowledge Base (Basic - Phase 2 Start):**
    *   Integration of at least one simple knowledge base for a domain agent.

## Out of Scope (POC - End of September)

*   **Full-Scale 3rd Party API Integrations:** Extensive integrations with multiple complex third-party APIs (beyond what's needed for basic Bedrock agent functionality or a simple demo).
*   **Advanced Guardrails and Complex Flows:** Sophisticated, multi-step conversational flows and comprehensive guardrail implementation.
*   **Image and Document Processing:** Full capabilities for analyzing and extracting information from various image and document types (beyond simple reception).
*   **Advanced Security Measures (Full WAF, GDPR Deep Dive):** While security is a consideration, full WAF implementation and exhaustive GDPR compliance measures are for later phases.
*   **Comprehensive Redis Caching:** Full-scale caching implementation for all components.
*   **Extensive Pilot Program and CloudWatch Monitoring:** Large-scale pilot and detailed CloudWatch monitoring dashboards.
*   **Advanced Agent Accuracy Testing:** Rigorous and comprehensive testing of agent accuracy across a wide range of scenarios.
*   **Support for Multiple Languages (unless explicitly stated for a specific domain agent).**
*   **User Interface for Configuration:** A dedicated UI for companies to configure agents, knowledge bases, etc.