# 8.1 Message Processing Flow

This section details the primary runtime interaction flow for the WhatsApp Multiagent System: processing a user's text message and generating an appropriate response.

## Basic Text Message Processing

### Initial Flow

1. **User sends a message on WhatsApp**:
   * A user types and sends a text message to a WhatsApp Business number registered with our system.

2. **WhatsApp Business API forwards webhook event**:
   * The WhatsApp Business API sends a webhook notification to our system's API Gateway endpoint.
   * The webhook includes the message content, user identifier (WhatsApp number), timestamp, and other metadata.

3. **API Gateway triggers WhatsApp Gateway Lambda**:
   * The API Gateway validates the webhook request and triggers the WhatsApp Gateway Lambda function.
   * The Gateway Lambda authenticates the request using WhatsApp's verification protocol.

4. **WhatsApp Gateway Lambda processes the message**:
   * The Lambda parses the incoming message data.
   * It extracts the message text, sender information, and relevant metadata.
   * It forwards the processed information to the Agent Orchestration Lambda.

5. **Agent Orchestration Lambda manages the session**:
   * The Lambda checks if an active session exists for this user in the Session Store (DynamoDB/Redis).
   * If no session exists, it creates a new session.
   * If a session exists, it retrieves the session context (previous messages, current state).

### Agent Processing

6. **Agent Orchestration Lambda invokes the Supervisor Agent**:
   * The Lambda constructs a request for the Amazon Bedrock Supervisor Agent.
   * The request includes the user's message and session context.
   * It invokes the Supervisor Agent through the AWS SDK.

7. **Supervisor Agent analyzes the message**:
   * The Bedrock Supervisor Agent processes the message to determine intent.
   * Based on the intent and session context, it makes a routing decision.

### Routing Decision

8. **Supervisor Agent determines next steps**:
   * **If clarification is needed**:
     * The Supervisor Agent generates a clarifying question.
     * This is returned to the Agent Orchestration Lambda.
     * The Lambda updates the session state to reflect that clarification is in progress.
     * The response is forwarded through the WhatsApp Gateway Lambda to the user.
     * The flow pauses until the user responds with clarification.

   * **If the intent is clear**:
     * The Supervisor Agent identifies the appropriate Domain Agent to handle the request.
     * It returns this routing decision to the Agent Orchestration Lambda.

### Domain Agent Handling

9. **Agent Orchestration Lambda invokes the Domain Agent**:
   * The Lambda constructs a request for the selected Domain Agent.
   * The request includes the user's message, session context, and any extracted parameters from the Supervisor Agent.
   * It invokes the Domain Agent through the AWS SDK.

10. **Domain Agent processes the request**:
    * If required, the Domain Agent queries its associated Knowledge Base (via Bedrock Knowledge Base feature).
    * It may execute actions/tools defined in its configuration (e.g., API calls).
    * It generates a response based on the query results and its capabilities.
    * The response is returned to the Agent Orchestration Lambda.

### Response Handling

11. **Agent Orchestration Lambda processes the response**:
    * The Lambda updates the session state in the Session Store with the new interaction.
    * It logs the complete interaction in the Conversation Store (DynamoDB).
    * It formats the response for WhatsApp (text, potentially quick replies or media in future phases).
    * It forwards the formatted response to the WhatsApp Gateway Lambda.

12. **WhatsApp Gateway Lambda sends the response**:
    * The Lambda calls the WhatsApp Business API to send the response to the user.
    * It handles any errors or status updates from the WhatsApp API.

13. **User receives the response**:
    * The user sees the agent's response on their WhatsApp interface.
    * The conversation can continue with another message from the user.

## Special Considerations

* **Error Handling**: At each step, errors are caught, logged, and appropriate fallback responses are generated.
* **Timeouts**: Lambda functions have configurable timeouts. Long-running operations may need to be designed with asynchronous patterns.
* **Rate Limiting**: The system respects WhatsApp's and Amazon Bedrock's rate limits.
* **Session Expiry**: Inactive sessions may time out after a configurable period.

This flow represents the core interaction pattern for the WhatsApp Multiagent System POC. Other flows (e.g., voice note processing) will follow similar patterns with additional steps specific to their requirements.
