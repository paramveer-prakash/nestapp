import { Injectable, Logger, LoggerService } from "@nestjs/common";

@Injectable()
export class ApiLogger extends Logger implements LoggerService{

    error(message: string, trace: string) {
        super.error(message, trace);
    }

    log(message: string, trace: string) {
        super.error(message, trace);
    }
}
