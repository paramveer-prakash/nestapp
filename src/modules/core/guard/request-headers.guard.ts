import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiLogger } from "../logging/apilogger";
import { INVALID_HEADER_ACCEPT } from "../exception/exception-constants";

@Injectable()
export class RequestHeadersGuard implements CanActivate {

  constructor(private readonly apilogger: ApiLogger){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const acceptHeader = request.headers.accept;
    if(acceptHeader == undefined || acceptHeader == 'application/json'){
      return true;
    }
    this.apilogger.error("Unsupported header [ Accept: "+acceptHeader+" ] in request [ "+request.url+" ]",null);
    throw new HttpException(INVALID_HEADER_ACCEPT,HttpStatus.NOT_ACCEPTABLE);
  }
}