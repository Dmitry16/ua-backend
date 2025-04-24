import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // example accessing a config value
  constructor(private readonly configService: ConfigService) {
    const dbName = this.configService.get<string>('DB_NAME');
    console.log('Database Host:', dbName);
  }
  getHello(): string {
    console.log
    return 'Ola World!';
  }
}
