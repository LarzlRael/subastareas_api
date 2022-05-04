import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { MailModule } from '../mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { RolsService } from './rols/rols.service';
import { RolRepository } from './rols/entities/rol.repository';
import { DevicesService } from '../devices/devices.service';
import { DeviceRepository } from '../devices/device.repository';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
    TypeOrmModule.forFeature([
      UsersRepository,
      RolRepository,
      DeviceRepository,
    ]),
  ],
  providers: [AuthService, JwtStrategy, RolsService, DevicesService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
