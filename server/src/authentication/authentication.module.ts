import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authenticationProviders } from './authentication.providers';
import { AuthenticationController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: configService.get('APP_EXPIRES_TIME') },
        secret: configService.get<string>('APP_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [...authenticationProviders],
})
export class AuthenticationModule {}
