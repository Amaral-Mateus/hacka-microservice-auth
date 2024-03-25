import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UserRepositorySequelize } from './user.repository.impl.sequelize';
import { BcryptService } from '../services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    JwtModule.register({
      global: true,
      secret: 'MateusAmaral',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserRepositorySequelize, BcryptService],
  exports: [UserRepositorySequelize, BcryptService],
})
export class RepositoriesModule {}
