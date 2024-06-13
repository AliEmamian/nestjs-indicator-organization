import * as dotenv from 'dotenv';
dotenv.config();

import { NestExpressApplication } from '@nestjs/platform-express';
import {  NestFactory } from '@nestjs/core';
import {  ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';
import { server } from './config/server.config';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { dbEnvironmentValidation } from './config/database.config';
import { versioningConfig } from './config/versioning.config';
import { logger } from '@shared/utils/logger';

async function bootstrap() {
  // Environment Configuration & Validation
  dbEnvironmentValidation();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalInterceptors(new DataBaseErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.use(logger)
  // Logging config

  // Versioning config
  versioningConfig(app);

  await app.listen(server.port, server.ip);
  console.log('project start on:',server.ip,":",server.port)
}



bootstrap();
