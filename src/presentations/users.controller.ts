import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUseCase } from 'src/aplication/use-cases/register.use-case';
import { LoginUseCase } from 'src/aplication/use-cases/login.use-case';
import { UsecaseProxyModule } from 'src/infrasctructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrasctructure/usecase-proxy/usecase-proxy';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecaseProxyModule.REGISTER_USERS_USE_CASE)
    private readonly loginUsersUseCaseProxy: UseCaseProxy<RegisterUseCase>,
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly registerUsersUseCaseProxy: UseCaseProxy<LoginUseCase>,
  ) {}

  @Post('/login')
  async register(@Body() user: LoginDto) {
    return this.registerUsersUseCaseProxy.getInstance().execute(user);
  }

  @Post('/register')
  async login(@Body() user: LoginDto) {
    return this.loginUsersUseCaseProxy.getInstance().execute(user);
  }
}
