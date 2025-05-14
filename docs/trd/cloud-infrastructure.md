# 16.4 Cloud Infrastructure

This document details the AWS cloud infrastructure required for the WhatsApp Multiagent System POC, with a focus on the serverless architecture and managed services.

## Serverless Architecture Overview

The WhatsApp Multiagent System leverages AWS's serverless and managed services to minimize operational overhead while maintaining scalability, reliability, and security. This architecture enables the team to focus on developing core business logic rather than managing infrastructure.

### Key Benefits of Serverless for the POC

- **Reduced Operational Complexity**: Minimal server management with AWS-managed services
- **Cost Efficiency**: Pay-per-use model ideal for the POC phase and early adoption
- **Auto-scaling**: Automatic handling of varying message volumes
- **Faster Development**: Focus on business logic rather than infrastructure management
- **Future Extensibility**: Easy to enhance with additional capabilities post-POC

## Core AWS Services

### Compute Services

- **AWS Lambda**
  - Primary compute service for all backend functionality
  - Functions:
    - `whatsapp-webhook-handler`: Receives and validates incoming webhook events from WhatsApp
    - `message-orchestrator`: Manages message routing, session handling, and agent invocation
    - `message-sender`: Handles sending messages back to WhatsApp
    - `voice-processor`: Processes voice notes (using Amazon Transcribe)
    - `knowledge-base-manager`: Manages document uploads and updates to Bedrock Knowledge Bases
  - Configuration:
    - Memory: 256MB-1GB depending on function complexity
    - Timeout: 30 seconds for synchronous functions, 15 minutes for asynchronous processing
    - Runtime: Node.js 18+ (TypeScript transpiled to JavaScript)

### API and Integration

- **Amazon API Gateway**
  - REST API endpoints for WhatsApp webhook integration
  - WebSocket API (potential future enhancement for admin interfaces)
  - Configuration:
    - Rate limiting: Configured to handle WhatsApp's webhook volumes
    - Authentication: API key for webhook validation
    - CORS: Configured for potential future admin UI

### AI Services

- **Amazon Bedrock**
  - Foundation Models:
    - Claude Sonnet or equivalent for agent capabilities
  - Bedrock Agents:
    - Supervisor Agent: Handles initial user intent classification
    - Domain Agents: Specialized for specific business functions
  - Bedrock Knowledge Bases:
    - Connected to S3 buckets storing business knowledge documents
    - Vector database for semantic search capabilities

### Data Storage

- **Amazon DynamoDB**
  - Tables:
    - `conversations`: Stores message history with TTL
    - `sessions`: Manages active conversation sessions with TTL
    - `user-profiles`: Basic user information (optional for POC)
  - Configuration:
    - On-demand capacity for POC
    - Global secondary indexes for efficient querying

- **Amazon S3**
  - Buckets:
    - `kb-documents`: Knowledge base documents
    - `voice-notes`: Temporary storage for voice notes
    - `system-logs`: Storage for system logs (CloudWatch export)
  - Configuration:
    - Server-side encryption
    - Lifecycle policies for temporary files

- **Amazon ElastiCache (Redis)**
  - Use cases:
    - Session caching for active conversations
    - API response caching for third-party integrations
    - Response caching for common queries
  - Configuration:
    - Serverless caching for POC

### Messaging and Queue Services

- **Amazon SQS**
  - Use cases:
    - Message processing queue for WhatsApp messages
    - Asynchronous voice note processing
    - Knowledge base update queue
  - Configuration:
    - Standard queues for general processing
    - FIFO queues where message order is critical

### Monitoring and Logging

- **Amazon CloudWatch**
  - Metrics:
    - Lambda invocations, errors, and duration
    - API Gateway request counts and latencies
    - DynamoDB consumed capacity
    - Bedrock usage and performance
  - Logs:
    - Structured logging from all Lambda functions
    - Custom metric filters for error tracking
  - Alarms:
    - Error rate thresholds
    - Latency thresholds for user-facing operations

## Network Infrastructure

- **VPC Configuration**
  - Lambda functions deployed in VPC for ElastiCache access
  - NAT Gateway for outbound internet access from VPC
  - Security Groups restricting access between components

## Security Components

- **AWS Identity and Access Management (IAM)**
  - Role-based access control for all services
  - Least privilege principle applied to all service roles
  - Resource policies on S3 buckets

- **AWS Secrets Manager**
  - Storage for:
    - WhatsApp API credentials
    - Third-party API keys
    - Database credentials (if applicable)

- **AWS Web Application Firewall (WAF)**
  - Basic configuration for POC:
    - Rate limiting
    - IP blacklisting
    - Common attack pattern prevention

## Deployment Architecture Diagram

```
┌──────────────────┐         ┌───────────────┐         ┌──────────────────┐
│                  │         │               │         │                  │
│  WhatsApp User   ├────────►│  WhatsApp     ├────────►│  API Gateway     │
│                  │         │  Business API │         │                  │
└──────────────────┘         └───────────────┘         └──────────┬───────┘
                                                                  │
                                                                  ▼
┌──────────────────┐         ┌───────────────┐         ┌──────────────────┐
│                  │         │               │         │                  │
│  CloudWatch      │◄────────┤  Lambda       │◄────────┤  Webhook         │
│  Logs & Metrics  │         │  Functions    │         │  Handler Lambda  │
│                  │         │               │         │                  │
└──────────────────┘         └───────┬───────┘         └──────────────────┘
                                     │
                                     ▼
┌──────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│              │   │               │   │               │   │               │
│  DynamoDB    │◄──┤ Orchestrator  ├───┤  Bedrock      │◄──┤  S3           │
│  Tables      │   │ Lambda        │   │  Agents       │   │  Knowledge    │
│              │   │               │   │               │   │  Base         │
└──────────────┘   └───────┬───────┘   └───────────────┘   └───────────────┘
                           │
                           ▼
                   ┌───────────────┐    
                   │               │    
                   │  Redis Cache  │    
                   │  (Optional)   │    
                   │               │    
                   └───────────────┘    
```

## Cost Optimization for POC

For the POC phase, several cost optimization strategies will be employed:

1. **Lambda Provisioned Concurrency**: Limited use, only for critical functions
2. **DynamoDB On-Demand Pricing**: Avoiding over-provisioning while ensuring scalability
3. **CloudWatch Log Retention**: Setting appropriate retention periods
4. **Development/Testing Resources**: Automatic shutdown during non-working hours
5. **AWS Budgets**: Setting up alerts and budget thresholds
6. **Resource Tagging**: Implementing tagging strategy for cost allocation

## Infrastructure as Code Strategy

For the POC phase, a combination of manual configuration and basic IaC will be used:

1. **Initial Setup**: Basic AWS resources created manually through AWS Console
2. **Lambda Deployment**: Automated through GitHub Actions CI/CD
3. **Environment Configuration**: Managed through AWS Parameter Store
4. **Future State**: Full AWS CDK or CloudFormation implementation planned post-POC

## CI/CD Pipeline

The CI/CD pipeline for the WhatsApp Multiagent System will be implemented using GitHub Actions:

1. **Source Control**: GitHub repository with branch protection rules
2. **Build Process**:
   - Pull requests trigger linting, type checking, and unit tests
   - Main branch commits trigger full build and test suite
3. **Deployment Process**:
   - Automated deployment to development environment on successful main branch builds
   - Manual approval gate for production deployments
4. **Pipeline Components**:
   - TypeScript compilation
   - Unit and integration tests
   - Lambda function packaging
   - Infrastructure updates via AWS SDK or IaC
   - Post-deployment smoke tests

This cloud infrastructure design prioritizes serverless architecture to minimize operational overhead while providing the necessary components for a functional POC. The architecture can scale to handle production workloads with appropriate adjustments to provisioned capacity and enhanced security measures.

