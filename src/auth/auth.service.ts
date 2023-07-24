import { Injectable } from '@nestjs/common';
import { TokenPayload, UserBase, UserDto } from 'src/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ){};

    async signUp(newUser: UserBase): Promise<UserDto | Object>{
        const user = await this.usersService.findOneByUserName(newUser.userName);
        if(user) {
            return {
                message: 'User already added, please create a new one'
            };
        };
        
        const hashPasswrd = await hash(newUser.password, 10);
        newUser.password = hashPasswrd;
        
        try {
            const user = this.userRepository.create(newUser);
            this.userRepository.save(user);
            const { password, ...result } = newUser;
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    async validateUser(username: string, password: string):Promise<UserDto>{
        const user = await this.usersService.findOneByUserName(username);
        if(user && await compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        };
        return null;
    };

    async login(user: UserDto){
        const payload: TokenPayload = {
            sub: user.id,
            username: user.userName
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    };
};
