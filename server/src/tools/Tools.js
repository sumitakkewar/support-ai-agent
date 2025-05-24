export const tools = [{
  name: "customerReportTool",
  description: "Submit a customer report with description, sentiment, and user ID",
  parameters: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "Description of the customer report"
      },
      sentiment: {
        type: "string",
        description: "Sentiment of the customer report"
      },
      userId: {
        type: "string",
        description: "ID of the user submitting the report"
      }
    },
    required: ["description", "sentiment"]
  }
},
{
  name: "getTicketStatusTool",
  description: "Get the current status of a ticket",
  parameters: {
    type: "object",
    properties: {
      ticketId: {
        type: "string",
        description: "ID of the ticket to check status for"
      },
      userId: {
        type: "string",
        description: "ID of the user requesting the status"
      }
    },
    required: ["ticketId"]
  }
}]; 