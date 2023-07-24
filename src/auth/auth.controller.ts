import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserBase } from 'src/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){};

    @Post('register-user')
    registerUser(
        @Body() payload: UserBase
    ){
        const user = this.authService.signUp(payload);
        return user
    };

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(
        @Request() req
        ){
        return this.authService.login(req.user);
    };
};
