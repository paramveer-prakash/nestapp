import Joi from '@hapi/joi';
import { Controller, Get, HttpStatus, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RequestHeadersGuard } from '../../core/guard/request-headers.guard';
import { UserRepositories } from '../../ext-services/scmservice/model/userrepositories';
import { UserService } from '../service/user.service';

const schema = { headers: { 'Accept': 'application/json'} };
@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':username/repositories')
    @ApiResponse({ status: HttpStatus.OK, type: UserRepositories })
    @UseGuards(RequestHeadersGuard)
    getUserRepositories(@Param('username') username:string): any {
        return this.userService.getUserRepositories(username);
    }
}
