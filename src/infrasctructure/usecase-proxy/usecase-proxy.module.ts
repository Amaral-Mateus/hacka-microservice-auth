import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositorySequelize } from '../repositories/user.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { RegisterUseCase } from 'src/aplication/use-cases/register.use-case';
import { LoginUseCase } from 'src/aplication/use-cases/login.use-case';
import { RepositoriesModule } from '../repositories/repositorie.module';
@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //USER
  static REGISTER_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static LOGIN_USER_USE_CASE = 'createUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.REGISTER_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new RegisterUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.LOGIN_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new LoginUseCase(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.REGISTER_USERS_USE_CASE,
        UsecaseProxyModule.LOGIN_USER_USE_CASE,
      ],
    };
  }
}
