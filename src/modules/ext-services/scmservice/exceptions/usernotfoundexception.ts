import { HttpException, HttpStatus } from "@nestjs/common";
import { USER_NOT_FOUND } from "../constants/scm.constants";

export class UserNotFoundException extends HttpException {

  constructor() {
    super(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}