import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserModel } from 'src/infrasctructure/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrasctructure/usecase-proxy/usecase-proxy.module';
@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
