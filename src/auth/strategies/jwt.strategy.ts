import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { TokenPayload } from 'src/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwt_secret,
        });
    };

    async validate(payload: TokenPayload){
        return {
            userId: payload.sub,
            username: payload.username,
        };
    };
};