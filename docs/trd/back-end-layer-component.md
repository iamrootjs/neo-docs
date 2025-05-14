# Back-end Layer Component Level (Orchestration & AI Integration)

The back-end layer for the WhatsApp Multiagent System POC is primarily composed of serverless functions (AWS Lambda) and AI services (Amazon Bedrock), forming the core orchestration and intelligence of the system.

## Core Back-end Components (AWS Lambda)

These components represent logical groupings of functionality within AWS Lambda functions, triggered by API Gateway (for WhatsApp webhooks) or other AWS services.

*   **WhatsApp Webhook Handler (`whatsapp-webhook-lambda`)**
    *   **Responsibilities:**
        *   Authenticates incoming webhook requests from the WhatsApp Business API.
        *   Parses incoming messages (text, media, status updates).
        *   Initiates or retrieves user session from the Session Manager.
        *   Passes the user message and session context to the Routing Engine.
    *   **Interfaces:** Interacts with API Gateway, Session Manager, Routing Engine.
    *   **Technologies:** Node.js/Python, AWS Lambda.

*   **Orchestration Engine (`orchestration-lambda`)** (This could be a single Lambda or broken down further, potentially using AWS Step Functions for complex flows)
    *   **Session Manager Component:**
        *   **Responsibilities:** Create, retrieve, update, and delete user conversation sessions. Manage session state (e.g., current intent, context variables).
        *   **Interfaces:** Interacts with Conversation Store (DynamoDB/RDS) and Session Store (ElastiCache/DynamoDB).
        *   **Technologies:** Node.js/Python within the Lambda.
    *   **Routing Engine Component:**
        *   **Responsibilities:** Based on session state, user input, and predefined rules, determine which Bedrock Agent or internal logic to invoke.
        *   **Interfaces:** Interacts with Agent Invoker, Knowledge Base Querier.
        *   **Technologies:** Node.js/Python within the Lambda.
    *   **Agent Invoker Component:**
        *   **Responsibilities:** Construct requests for Amazon Bedrock agents. Invoke Bedrock agents and handle their responses. Manage retries or fallbacks if an agent fails.
        *   **Interfaces:** Interacts with Amazon Bedrock (Agents).
        *   **Technologies:** AWS SDK (Bedrock client) in Node.js/Python.
    *   **Knowledge Base Querier Component:**
        *   **Responsibilities:** Construct queries for Amazon Bedrock Knowledge Bases. Retrieve and process information from knowledge bases.
        *   **Interfaces:** Interacts with Amazon Bedrock (Knowledge Bases).
        *   **Technologies:** AWS SDK (Bedrock client) in Node.js/Python.
    *   **API Integrator Component (Future for POC, or basic implementation):**
        *   **Responsibilities:** Connect to and fetch data from pre-approved 3rd party APIs. Handle authentication and data transformation for these APIs.
        *   **Interfaces:** External 3rd party APIs.
        *   **Technologies:** HTTP client libraries in Node.js/Python.
    *   **Response Formatter Component:**
        *   **Responsibilities:** Take the raw output from Bedrock agents or other components and format it into a WhatsApp-compatible message (text, quick replies, media).
        *   **Interfaces:** Interacts with Message Sender.
        *   **Technologies:** Node.js/Python within the Lambda.

*   **WhatsApp Message Sender (`message-sender-lambda`)** (Could be part of `whatsapp-webhook-lambda` or a separate function for decoupling)
    *   **Responsibilities:**
        *   Receives formatted messages destined for the user.
        *   Calls the WhatsApp Business API to send the message.
        *   Handles API responses and potential errors from WhatsApp.
    *   **Interfaces:** Interacts with the WhatsApp Business API.
    *   **Technologies:** Node.js/Python, AWS Lambda, WhatsApp Business API client.

## AI Layer Components (Amazon Bedrock)

These are not traditional back-end components but are crucial to the system's intelligence. They are managed and invoked by the Orchestration Engine.

*   **Customer Service Agent (Bedrock Agent)**
    *   **Responsibilities:** Understand and respond to general customer service inquiries. Utilizes a specific LLM and prompt configuration within Bedrock.
    *   **Interfaces:** Invoked by the Agent Invoker component.
    *   **Technologies:** Amazon Bedrock Agent, underlying LLM.

*   **FAQ Agent (Bedrock Agent + Knowledge Base)**
    *   **Responsibilities:** Answer questions based on a curated set of documents (FAQs, product information) stored in a Bedrock Knowledge Base.
    *   **Interfaces:** Invoked by the Agent Invoker and utilizes a Bedrock Knowledge Base (queried by the Knowledge Base Querier).
    *   **Technologies:** Amazon Bedrock Agent, Bedrock Knowledge Base, underlying LLM, S3 (for knowledge base documents).

## Supporting AWS Services (acting as Back-end infrastructure)

*   **API Gateway:** Manages the HTTP endpoint for WhatsApp webhooks, handles request validation, and triggers the `whatsapp-webhook-lambda`.
*   **IAM:** Manages fine-grained permissions for Lambda functions and other AWS services.
*   **CloudWatch:** Provides logging, monitoring, and alarms for all Lambda functions and Bedrock activity.
*   **AWS Step Functions (Optional for POC):** Can be used to orchestrate more complex, multi-step workflows involving multiple Lambda functions and Bedrock calls, providing better error handling and state management than a single large Lambda function.

This component view focuses on the logical separation of concerns within the serverless back-end. The actual deployment might involve multiple Lambda functions, each potentially containing one or more of these logical components.
