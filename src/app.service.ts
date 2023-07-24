import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProfile(user: any): Object {
    return {
      profile: {
        greeting: 'Hello!!',
        Id: `Your userId is ${user.userId}`,
        name: `Your username is: ${user.username}`,
      },
    };
  };
};
