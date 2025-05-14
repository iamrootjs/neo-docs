# 16.1 Glossary

This glossary provides definitions for technical terms and acronyms used throughout the Technical Requirements Document (TRD) for the WhatsApp Multiagent System.

| Term | Definition |
|------|------------|
| AI | Artificial Intelligence. The simulation of human intelligence processes by machines, especially computer systems. In our context, used for natural language understanding and generation. |
| Amazon Bedrock | A fully managed service from AWS that offers foundation models from various AI companies through a unified API. Our system uses it for agent capabilities and knowledge bases. |
| API | Application Programming Interface. A set of rules that allows different software applications to communicate with each other. Our system uses APIs to interact with WhatsApp and other external services. |
| API Gateway | An AWS service that enables developers to create, publish, maintain, monitor, and secure APIs. Used in our system for handling WhatsApp webhook events. |
| AWS | Amazon Web Services. The cloud platform used for our infrastructure and services. |
| C4 Model | Context, Container, Component, Code. A modeling approach for visualizing software architecture at different levels of abstraction. Used in this documentation to describe our system architecture. |
| CDK | Cloud Development Kit. An AWS framework for defining cloud infrastructure using familiar programming languages. Planned for post-POC infrastructure as code implementation. |
| CI/CD | Continuous Integration/Continuous Deployment. Automated processes for building, testing, and deploying software. Implemented using GitHub Actions for our system. |
| CloudFormation | AWS service for infrastructure as code using JSON or YAML templates. Potential option for post-POC IaC implementation. |
| CloudWatch | AWS monitoring and observability service. Used for monitoring system metrics, logs, and setting up alarms. |
| Domain Agent | An AI agent specialized in a specific business area or function (e.g., customer support, sales). Implemented using Amazon Bedrock Agents in our architecture. |
| DynamoDB | A fully managed NoSQL database service by AWS. Used in our system for storing conversation history and session data. |
| ElastiCache | AWS service that makes it easy to set up, manage, and scale in-memory cache environments. Used optionally in our system for Redis caching. |
| Foundation Model | A large AI model trained on vast amounts of data that can be adapted for a variety of tasks. Accessed through Amazon Bedrock in our system. |
| GitHub Actions | GitHub's CI/CD service used for automating our build and deployment workflow. |
| IAM | Identity and Access Management. AWS service for securely controlling access to AWS resources. Used to implement the principle of least privilege in our system. |
| IaC | Infrastructure as Code. The practice of managing and provisioning infrastructure through code instead of manual processes. Partially implemented for POC, with plans for full implementation post-POC. |
| JWT | JSON Web Token. A compact, URL-safe means of representing claims between two parties. May be used for authenticating admin interfaces in future phases. |
| Knowledge Base | A collection of documents and information that AI agents can access to answer queries. Implemented using Amazon Bedrock Knowledge Bases in our system. |
| Lambda | AWS Lambda. A serverless compute service that runs code in response to events. The primary compute service in our architecture. |
| LLM | Large Language Model. A type of AI model trained on vast text data, capable of understanding and generating human-like text. Accessed through Amazon Bedrock in our system. |
| NLU | Natural Language Understanding. A subset of natural language processing that focuses on machine reading comprehension. A key capability of our AI agents. |
| POC | Proof of Concept. The initial implementation phase of our project, focused on demonstrating feasibility. |
| RAG | Retrieval Augmented Generation. A technique that enhances AI responses by retrieving relevant information from a knowledge base. Implemented via Amazon Bedrock Knowledge Bases. |
| Redis | An open-source, in-memory data structure store used as a database, cache, and message broker. Used optionally in our system via ElastiCache. |
| S3 | Simple Storage Service. AWS's object storage service. Used in our system for storing knowledge base documents. |
| Serverless | A cloud computing execution model where the cloud provider manages the infrastructure. Our architecture is primarily serverless, using AWS Lambda. |
| SQS | Simple Queue Service. AWS's fully managed message queuing service. Used in our system for message processing and handling asynchronous tasks. |
| Supervisor Agent | The primary AI agent that analyzes user intent and routes requests to appropriate domain agents. Implemented using Amazon Bedrock Agents in our architecture. |
| Transcribe | Amazon Transcribe. A service that converts speech to text. Used in our system for processing voice notes from WhatsApp. |
| TTL | Time To Live. A mechanism that specifies how long data should be stored before being automatically deleted. Used in DynamoDB for session management. |
| WAF | Web Application Firewall. AWS service that helps protect web applications from common web exploits. Used in our system for basic security in the POC phase. |
| WebSocket | A communication protocol that provides full-duplex communication channels over a single TCP connection. Potential for future admin interfaces. |
| WhatsApp Business API | The official API provided by Meta/WhatsApp that allows businesses to send and receive messages programmatically. The primary interface for our system's end users. |
| Webhook | A mechanism where an application can provide other applications with real-time information by sending HTTP POST requests. Used by WhatsApp to notify our system of new messages. |
