import { CustomerReportRepository } from "../../repositories/CustomerReportRepository.js";

class LoggerService {
    constructor() {
        this.customerReportRepository = new CustomerReportRepository();
    }

    async saveCustomerReport({ description, sentiment, userId }) {
        if (!description || !userId) {
            throw new Error('Description and userId are required');
        }

        return await this.customerReportRepository.create({
            description,
            sentiment,
            userId
        });
    }
}

export default new LoggerService();