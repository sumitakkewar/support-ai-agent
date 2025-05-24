import { CustomerReportRepository } from "../../repositories/CustomerReportRepository.js";

class LoggerService {
    constructor() {
        this.customerReportRepository = new CustomerReportRepository();
    }

    async saveCustomerReport({ description, sentiment, userId }) {
        if (!description || !userId) {
            throw new Error('Description and userId are required');
        }

        const customerReport = await this.customerReportRepository.create({
            description,
            sentiment,
            userId
        });

        return customerReport._id
    }

    async getTicketStatus({ ticketId, userId }) {
        if (!ticketId || !userId) {
            throw new Error('TicketId and userId are required');
        }

        const ticket = await this.customerReportRepository.findById(ticketId);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        if (ticket.userId.toString() !== userId.toString()) {
            throw new Error('Unauthorized access to ticket');
        }

        return ticket.status || 'pending';
    }
}

export default new LoggerService();