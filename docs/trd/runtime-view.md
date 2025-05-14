# 8 Runtime View

The runtime view illustrates key scenarios and interactions between components during system operation. For the WhatsApp Multiagent System, we'll focus on the primary interaction flows between users, the WhatsApp API, and our backend services.

## Key Scenarios

1. **Basic Text Message Processing**: User sends a text message and receives a response.
2. **Voice Note Processing**: User sends a voice note, which is converted to text and processed.
3. **Session Management**: How user context is maintained across a conversation.
4. **Domain Agent Selection**: How the supervisor agent routes queries to specialized domain agents.
5. **Knowledge Base Query**: How agents retrieve information from knowledge bases.

Below is a high-level sequence diagram for text message processing. Specific scenarios are detailed in separate documents.

```mermaid
sequenceDiagram
    actor User
    participant WhatsApp as WhatsApp_Platform
    participant APIGW as API_Gateway
    participant Gateway as WhatsApp_Gateway_Lambda
    participant Orchestrator as Agent_Orchestration_Lambda
    participant Supervisor as Supervisor_Agent_Bedrock
    participant Domain as Domain_Agent_Bedrock
    participant KB as Knowledge_Base
    participant DB as Database_DynamoDB_RDS

    User->>WhatsApp: Sends text message
    WhatsApp->>APIGW: Webhook notification
    APIGW->>Gateway: Triggers Lambda
    Gateway->>Orchestrator: Forwards processed message
    Orchestrator->>DB: Retrieve/Create session
    Orchestrator->>Supervisor: Send message with context
    Supervisor->>Supervisor: Analyze intent
    alt Intent requires clarification
        Supervisor-->>Orchestrator: Request clarification
        Orchestrator-->>Gateway: Format response
        Gateway-->>WhatsApp: Send clarification question
        WhatsApp-->>User: Display question
    else Intent clear - Route to Domain Agent
        Supervisor-->>Orchestrator: Route to Domain Agent
        Orchestrator->>Domain: Send message with context
        Domain->>KB: Query Knowledge Base
        KB-->>Domain: Return relevant information
        Domain-->>Orchestrator: Generate response
        Orchestrator->>DB: Update session
        Orchestrator-->>Gateway: Format response
        Gateway-->>WhatsApp: Send response message
        WhatsApp-->>User: Display response
    end
```

The diagram above represents a simplified view of the message processing flow. In practice, there would be additional error handling, retries, and potentially more complex interactions between components.
