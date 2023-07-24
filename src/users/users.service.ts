import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){};

    async findOneByUserName(userName: string): Promise<UserDto | undefined>{
        const user = await this.usersRepository.findOneBy({userName});
        try {
            return user;
        } catch (error) {
            console.log(error);
        };
    };
};
