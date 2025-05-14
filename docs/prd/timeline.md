# Timeline

## Project Goal: Deliver a Proof of Concept (POC) by End of September

### Next Steps (0-2 Weeks from May 14, 2025)

*   **Repository Setup:**
    *   Create GitHub Repositories.
*   **Initial Development Setup:**
    *   Backend (Node.js - Monorepo for now).
    *   Initial Infrastructure Setup on AWS (Cloud Account).
    *   Basic CI/CD Pipelines.
    *   WhatsApp Business Account Setup.
*   **Documentation:**
    *   Project Documentation site (Vitepress).
    *   Product Requirement Document (PRD):
        *   Functional and Non-functional requirements.
        *   User Stories.
        *   Etc.
    *   Technical Requirement Document (TRD - Arc42 & C4):
        *   Solution Strategy.
        *   Database Design.
        *   Deployment Strategy.
        *   Runtime Views.
        *   Etc.

### Phase 1: Infrastructure and Core Agent Setup (Target: End of July)
*   **Week 1-2:**
    *   Detailed planning and finalization of AWS service selection (EC2/Lambda, API Gateway, S3, IAM).
    *   Setup initial AWS account structure and networking.
    *   Provision development and testing environments.
*   **Week 3-4:**
    *   Integrate WhatsApp Business API (Sandbox/Test Account).
    *   Develop basic message handling (receiving and sending messages).
*   **Week 5-6:**
    *   Set up Amazon Bedrock.
    *   Develop and test the initial Supervisor Agent logic (basic routing).
    *   Develop and test two basic Domain Agents with placeholder functionalities.
*   **Week 7-8:**
    *   Integrate Supervisor and Domain Agents.
    *   Implement basic voice-to-text conversion.
    *   Internal testing and bug fixing of core infrastructure.

### Phase 2: Knowledge Base, Basic API Integration, and Caching (Target: End of August)
*   **Week 9-10:**
    *   Design and implement schema/structure for a simple knowledge base.
    *   Integrate the first knowledge base with one Domain Agent.
    *   Populate the knowledge base with initial data for POC scenarios.
*   **Week 11-12:**
    *   Identify and integrate one simple third-party API relevant to a Domain Agent's function (e.g., weather API, simple lookup service).
    *   Implement basic Redis caching for frequently accessed data or Bedrock responses.
*   **Week 13-14:**
    *   Refine agent interactions based on knowledge base and API capabilities.
    *   Testing of Phase 1 and Phase 2 functionalities together.

### Phase 3: Security Foundations, GDPR Considerations, and Agent Accuracy Testing (Target: Mid-September)
*   **Week 15:**
    *   Review and implement foundational security best practices (IAM roles, security groups, data encryption at rest/transit).
    *   Initial WAF setup and configuration (basic rules).
    *   Review GDPR requirements and ensure POC design aligns with key principles (data minimization, consent considerations where applicable).
*   **Week 16:**
    *   Develop initial test cases for agent accuracy.
    *   Conduct initial accuracy testing and iterate on agent prompts/logic.
    *   Focus on reliability and error handling within the POC scope.

### Phase 4: CI/CD Setup (Basic), Pilot Prep, and Monitoring (Target: End of September)
*   **Week 17:**
    *   Set up basic CI/CD pipeline with GitHub Actions (e.g., automated build and deploy to test environment).
    *   Prepare a small, internal pilot or demo scenario.
*   **Week 18:**
    *   Set up basic CloudWatch dashboards for monitoring key metrics (e.g., message volume, API errors, Bedrock usage for POC).
    *   Conduct internal pilot/demo.
    *   Gather feedback and make final adjustments for POC delivery.
*   **End of September: POC Completion and Review**

## Post-POC (Indicative - To be planned in detail later)
*   Full-scale 3rd party API integrations.
*   Advanced conversational flows and guardrails.
*   Comprehensive image and document processing.
*   Full WAF implementation and in-depth GDPR compliance processes.
*   Extensive Redis caching optimization.
*   Mature CI/CD pipeline with automated testing suites.
*   Broader pilot programs and detailed CloudWatch monitoring and alerting.
*   Rigorous agent accuracy testing and continuous improvement cycles.
*   Development of user interface for business account management and configuration.