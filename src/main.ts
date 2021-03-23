import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { INestApplication } from '@nestjs/common';
import { ApiLogger } from './modules/core/logging/apilogger';
import * as csurf from 'csurf';
import { ApiExceptionFilter } from './modules/core/exception/api-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log','error', 'warn','debug'],
  });
  app.setGlobalPrefix('api');
  
  //setup logger
  app.useLogger(app.get(ApiLogger));

  //setup swagger
  setupSwagger(app);

  //setup security
  setupSecurity(app);

  //setup exception filter
  setupExceptionFilters(app);

  await app.listen(3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NestApp API')
    .setDescription('NestApp integration with Source Code Managment APIs')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync("./swagger.yaml", yaml.safeDump(document))

  SwaggerModule.setup('api', app, document);
}

function setupSecurity(app: INestApplication) {
  app.enableCors();
  //app.use(csurf());
}

function setupExceptionFilters(app: INestApplication) {
  app.useGlobalFilters(new ApiExceptionFilter());
}

