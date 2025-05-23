import LoggerService from "../services/fraud/LoggerService.js";

export const customerReportTools = [
    {
        type: "function",
        function: {
            name: "customerReportTool",
            description: "Report a valid fraud case to backend for review.",
            parameters: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        description: "Detailed user description of fraud."
                    },
                    sentiment: {
                        type: "string",
                        enum: ["angry", "worried", "neutral"],
                        description: "Sentiment of user"
                    },
                    userId: {
                        type: "string",
                        description: "User ID reporting the fraud"
                    }
                },
                required: ["description", "sentiment", "userId"]
            }
        }
    }
];


export const toolFunctionMap = {
    customerReportTool: async ({ description, sentiment, userId }) => {
        await LoggerService.saveCustomerReport({ description, sentiment, userId });
        return 'Fraud report submitted successfully.';
    }
};

