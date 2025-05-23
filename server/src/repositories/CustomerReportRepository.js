import CustomerReport from "../model/CustomerReport.js";
import BaseRepository from "./BaseRepository.js";

export class CustomerReportRepository extends BaseRepository {
    constructor() {
        super(CustomerReport);
    }
}