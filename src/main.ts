import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

async function bootstrap() {
  const port = configService.get('PORT');
  const app = await NestFactory.create(AppModule);
  await app.listen(port || 3000);
  console.log(`Server listen to localhost:${port}`);
}
bootstrap();
