<!-- filepath: c:\Users\christiaan.nagel\neo\docs\trd\building-block-view.md -->
# 7 Building Block View

This section describes the high-level architecture of the WhatsApp Multiagent System using the C4 model's concepts of System Context, Containers, and Components.

## 7.1 System Context (Level 1)

*This will be detailed in `context-level.md`.*

The WhatsApp Multiagent System interacts with:
*   **End Users:** Interacting via the WhatsApp mobile/desktop application.
*   **Business Administrators:** (Future) Interacting via a web interface to configure their accounts and agents.
*   **WhatsApp Business API:** The gateway for all message exchanges with the WhatsApp platform.
*   **Amazon Web Services (AWS):** The cloud platform providing all underlying infrastructure and AI services (Bedrock, Lambda, API Gateway, S3, Databases, etc.).
*   **Third-Party APIs:** External services that Domain Agents might interact with (e.g., weather APIs, CRM systems, booking platforms - specific APIs are TBD based on domain agent needs).

## 7.2 Containers (Level 2)

*This will be detailed in `container-level.md`.*

The primary "containers" (deployable and runnable units) within the WhatsApp Multiagent System on AWS are:

*   **WhatsApp Gateway Service (Node.js Application):**
    *   Receives incoming messages from the WhatsApp Business API (via webhook).
    *   Sends outgoing messages to the WhatsApp Business API.
    *   Handles initial message validation and routing to the Agent Orchestration Service.
    *   Manages WhatsApp API credentials securely.
    *   Likely deployed on AWS Lambda + API Gateway or a lightweight EC2/ECS service.
*   **Agent Orchestration Service (Node.js Application):**
    *   Core backend logic.
    *   Manages conversation state and history.
    *   Interfaces with Amazon Bedrock to invoke the Supervisor Agent.
    *   Receives instructions from the Supervisor Agent (e.g., route to Domain Agent, ask clarifying question).
    *   Interfaces with Amazon Bedrock to invoke Domain Agents.
    *   Manages interactions with Knowledge Bases (via Bedrock Agents).
    *   Manages interactions with Third-Party APIs (potentially via Bedrock Agent actions or directly).
    *   Likely deployed on AWS Lambda or EC2/ECS.
*   **Amazon Bedrock Agents (Managed Service):**
    *   **Supervisor Agent:** The primary decision-making AI.
    *   **Domain Agents:** Specialized AIs for specific tasks/business areas.
    *   These are configured within Bedrock and invoked by the Agent Orchestration Service. They are not separate deployable containers in the traditional sense but are key logical blocks.
*   **Knowledge Base Store (e.g., Amazon S3 + Bedrock Knowledge Base):**
    *   Stores documents and data used by Bedrock Agents for RAG.
*   **Application Database (e.g., Amazon RDS PostgreSQL or DynamoDB):**
    *   Stores business account information, agent configurations, conversation logs, user session data.
*   **Caching Service (e.g., Amazon ElastiCache for Redis):**
    *   Stores session state, frequently accessed configurations, and cached Bedrock responses.
*   **Voice-to-Text Service (e.g., Amazon Transcribe or Bedrock capability):**
    *   Converts voice notes from users into text.

## 7.3 Components (Level 3)

*This will be detailed in component-specific markdown files (e.g., `back-end-layer-component.md`).*

Examples of components within the above containers:

*   **WhatsApp Gateway Service Components:**
    *   Webhook Handler
    *   Message Parser
    *   Message Formatter
    *   WhatsApp API Client
*   **Agent Orchestration Service Components:**
    *   Conversation Manager (State, History)
    *   Supervisor Agent Invoker
    *   Domain Agent Invoker
    *   Knowledge Base Interface
    *   Third-Party API Integration Module
    *   Voice-to-Text Processor
    *   Security/Auth Module (for internal APIs if any)
*   **Bedrock Agent Components (Logical within Bedrock):**
    *   Action Groups (Tools the agent can use)
    *   Knowledge Base Associations
    *   Prompt Configurations

This building block view provides a hierarchical decomposition of the system, which will be further elaborated in subsequent C4 model diagrams and detailed component descriptions.
