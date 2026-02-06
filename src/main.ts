import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer la validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Enlève les propriétés non définies dans les DTOs
    forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non définies
    transform: true, // Transforme les types automatiquement
  }));
  
  // Activer CORS pour le frontend
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application démarrée sur http://localhost:${port}`);
}
bootstrap();