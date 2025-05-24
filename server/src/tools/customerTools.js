import LoggerService from "../services/fraud/LoggerService.js";

export const toolFunctionMap = {
    customerReportTool: async ({ description, sentiment, userId }) => {
        const reportId = await LoggerService.saveCustomerReport({ description, sentiment, userId });
        return `Fraud: ${reportId} report submitted successfully.`;
    },
    getTicketStatusTool: async ({ ticketId, userId }) => {
        const status = await LoggerService.getTicketStatus({ ticketId, userId });
        return `Ticket ${ticketId} status: ${status}`;
    }
};

