# 16.2 C4 Diagrams

This appendix provides a consolidated view of the C4 (Context, Container, Component, Code) model diagrams for the WhatsApp Multiagent System.

## C1: System Context Diagram

```mermaid
flowchart TD
    A["End User"] -- "Interacts via WhatsApp" --> B["WhatsApp Multiagent System"]
    B -- "Sends/Receives Messages" --> C["WhatsApp Business API"]
    B -- "Utilizes Infrastructure & AI" --> D["Amazon Web Services (AWS)"]
    D -- "Provides" --> Bedrock["Amazon Bedrock"]
    D -- "Provides" --> Lambda["AWS Lambda"]
    D -- "Provides" --> APIGateway["API Gateway"]
    D -- "Provides" --> S3["Amazon S3"]
    D -- "Provides" --> Database["AWS Databases e.g., RDS/DynamoDB"]
    D -- "Provides" --> Transcribe["Amazon Transcribe"]
    B -- "Integrates with (Optional/Domain Specific)" --> E["Third-Party APIs e.g., CRM, Booking"]
    F["Business Administrator"] -.-> B

    subgraph "External Systems"
        C
        E
    end

    subgraph "Cloud Platform"
        D
        Bedrock
        Lambda
        APIGateway
        S3
        Database
        Transcribe
    end

    style B fill:#28a745,stroke:#333,stroke-width:2px,color:#fff
    style A fill:#007bff,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#6c757d,stroke:#333,stroke-width:2px,color:#fff
```

## C2: Container Diagram

```mermaid
flowchart TD
    A["End User"] -- "HTTPS (WhatsApp Protocol)" --> C["WhatsApp Business API"]

    subgraph "WhatsApp Multiagent System (Hosted on AWS)"
        direction LR
        C -- "Webhook (HTTPS)" --> GW["WhatsApp Gateway Service"]
        GW -- "Invokes (HTTPS/Internal)" --> AOS["Agent Orchestration Service"]
        AOS -- "Interacts with (AWS SDK)" --> SupervisorAgent["Supervisor Agent (Bedrock)"]
        AOS -- "Interacts with (AWS SDK)" --> DomainAgent1["Domain Agent 1 (Bedrock)"]
        AOS -- "Interacts with (AWS SDK)" --> DomainAgentN["Domain Agent N (Bedrock)"]
        SupervisorAgent -- "Uses" --> KB["Knowledge Base (S3 + Bedrock KB)"]
        DomainAgent1 -- "Uses" --> KB
        DomainAgentN -- "Uses" --> KB
        DomainAgent1 -- "Action: Calls (HTTPS)" --> ExtAPI1["Third-Party API 1"]
        AOS -- "Stores/Retrieves Data (DB Protocol)" --> DB["Application Database (RDS/DynamoDB)"]
        AOS -- "Caches Data (Redis Protocol)" --> Cache["Caching Service (ElastiCache for Redis)"]
        AOS -- "Processes Voice (AWS SDK)" --> VTT["Voice-to-Text Service (Transcribe)"]
        GW -- "Sends Messages" --> C

        style GW fill:#6f42c1,stroke:#333,stroke-width:2px,color:#fff
        style AOS fill:#6f42c1,stroke:#333,stroke-width:2px,color:#fff
        style SupervisorAgent fill:#fd7e14,stroke:#333,stroke-width:2px,color:#fff
        style DomainAgent1 fill:#fd7e14,stroke:#333,stroke-width:2px,color:#fff
        style DomainAgentN fill:#fd7e14,stroke:#333,stroke-width:2px,color:#fff
        style KB fill:#20c997,stroke:#333,stroke-width:2px,color:#fff
        style DB fill:#20c997,stroke:#333,stroke-width:2px,color:#fff
        style Cache fill:#20c997,stroke:#333,stroke-width:2px,color:#fff
        style VTT fill:#ffc107,stroke:#333,stroke-width:2px,color:#000
    end

    ExtAPI1 -- "Response" --> DomainAgent1
```

## C3: Component Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        WhatsApp["WhatsApp\nUser Interface\n(External)"]
    end
    
    subgraph "API Gateway Layer"
        APIGW["AWS API Gateway\nWebhook Endpoint"]
    end
    
    subgraph "WhatsApp Interface Layer"
        MsgReceiver["Message Receiver\nLambda"]
        MsgSender["Message Sender\nLambda"]
        WebhookHandler["Webhook Handler\nLambda"]
    end
    
    subgraph "Orchestration Layer"
        SessionMgr["Session Manager"]
        Router["Routing Engine"]
        AgentInvoker["Agent Invoker"]
        KBQuerier["Knowledge Base Querier"]
        APIIntegrator["API Integrator"]
        RespFormatter["Response Formatter"]
    end
    
    subgraph "AI/Agent Layer (Amazon Bedrock)"
        SupervisorAgent["Supervisor Agent\n(Bedrock Agent)"]
        CSAgent["Customer Service Agent\n(Domain Agent)"]
        FAQAgent["FAQ Agent\n(Domain Agent)"]
        KnowledgeBases["Knowledge Bases\n(Bedrock KB)"]
    end
    
    subgraph "Data Layer"
        ConvoStore["Conversation Store\n(DynamoDB)"]
        SessionStore["Session Store\n(Redis/DynamoDB)"]
        KBStorage["Knowledge Base Storage\n(S3)"]
        UserStore["User Profile Store\n(Optional - DynamoDB)"]
    end
    
    subgraph "Supporting Services"
        IAMMgr["IAM Manager"]
        CloudWatchLogger["CloudWatch Logger"]
        Transcribe["Transcribe Service\n(Optional)"]
    end
    
    %% Interface Layer Connections
    WhatsApp --> APIGW
    APIGW --> WebhookHandler
    WebhookHandler --> MsgReceiver
    MsgSender --> WhatsApp
    
    %% Orchestration Layer Connections
    MsgReceiver --> SessionMgr
    SessionMgr --> Router
    Router --> AgentInvoker
    AgentInvoker --> SupervisorAgent
    SupervisorAgent --> CSAgent
    SupervisorAgent --> FAQAgent
    CSAgent --> KBQuerier
    FAQAgent --> KBQuerier
    KBQuerier --> KnowledgeBases
    CSAgent --> APIIntegrator
    Router --> RespFormatter
    RespFormatter --> MsgSender
    
    %% Data Layer Connections
    SessionMgr --> SessionStore
    SessionMgr --> ConvoStore
    KBQuerier --> KBStorage
    Router --> UserStore
    
    %% Supporting Services Connections
    MsgReceiver --> CloudWatchLogger
    MsgSender --> CloudWatchLogger
    Router --> CloudWatchLogger
    MsgReceiver --> Transcribe
```

## C4: Sequence Diagram (Message Processing Flow)

```mermaid
sequenceDiagram
    actor User
    participant WhatsApp as WhatsApp Platform
    participant APIGW as API Gateway
    participant Gateway as WhatsApp Gateway Lambda
    participant Orchestrator as Agent Orchestration Lambda
    participant Supervisor as Supervisor Agent (Bedrock)
    participant Domain as Domain Agent (Bedrock)
    participant KB as Knowledge Base
    participant DB as Database (DynamoDB/RDS)

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

## C4: Deployment Diagram

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "API Layer"
            apigateway["API Gateway\nWhatsApp Webhook Endpoint"]
        end
        
        subgraph "Compute Layer"
            webhook["Lambda: Webhook Handler"]
            orchestrator["Lambda: Orchestration Engine"]
            msgSender["Lambda: Message Sender"]
            voiceProcessor["Lambda: Voice Processor"]
        end
        
        subgraph "AI Services"
            bedrock["Amazon Bedrock\nFoundation Models"]
            bedrockAgents["Bedrock Agents\n- Supervisor Agent\n- Domain Agents"]
            bedrockKB["Bedrock Knowledge Bases"]
            transcribe["Amazon Transcribe"]
        end
        
        subgraph "Data Layer"
            dynamoDB["DynamoDB\n- Sessions\n- Conversations"]
            s3["S3\n- KB Documents\n- Voice Notes"]
            redis["ElastiCache (Redis)\n- Active Sessions\n- Response Cache"]
        end
        
        subgraph "Monitoring & Security"
            cloudwatch["CloudWatch\nMetrics & Logs"]
            iam["IAM\nRoles & Policies"]
            secretsmgr["Secrets Manager\nAPI Keys"]
            waf["AWS WAF"]
        end
    end
    
    subgraph "External"
        whatsapp["WhatsApp Business API"]
        thirdPartyAPIs["3rd Party APIs"]
    end
    
    %% Connections
    whatsapp -- "HTTPS" --> waf
    waf -- "Filtered Traffic" --> apigateway
    apigateway -- "Triggers" --> webhook
    webhook -- "Invokes" --> orchestrator
    orchestrator -- "Invokes" --> msgSender
    orchestrator -- "Invokes" --> voiceProcessor
    voiceProcessor -- "Uses" --> transcribe
    
    orchestrator -- "Invokes" --> bedrockAgents
    bedrockAgents -- "Uses" --> bedrock
    bedrockAgents -- "Queries" --> bedrockKB
    bedrockKB -- "Stores Documents in" --> s3
    
    orchestrator -- "Reads/Writes" --> dynamoDB
    orchestrator -- "Caches in" --> redis
    
    msgSender -- "Sends Messages" --> whatsapp
    bedrockAgents -- "May Call" --> thirdPartyAPIs
    
    %% Monitoring & Security Connections
    webhook -- "Logs to" --> cloudwatch
    orchestrator -- "Logs to" --> cloudwatch
    msgSender -- "Logs to" --> cloudwatch
    orchestrator -- "Uses" --> secretsmgr
    
    %% IAM Connections
    iam -.- webhook
    iam -.- orchestrator
    iam -.- msgSender
    iam -.- voiceProcessor
    iam -.- bedrock
    iam -.- s3
    iam -.- dynamoDB
```

These diagrams provide multiple views of the WhatsApp Multiagent System at different levels of abstraction, following the C4 model approach:

1. **Context Level (C1)**: Shows the system as a whole and its relationships with users and external systems
2. **Container Level (C2)**: Reveals the high-level technology choices and how responsibilities are distributed
3. **Component Level (C3)**: Shows how containers are composed of components and their interactions
4. **Runtime View**: Illustrates the message processing flow as a sequence diagram
5. **Deployment View**: Shows how the software is mapped to infrastructure

Together, these diagrams provide a comprehensive architectural view of the WhatsApp Multiagent System POC.
