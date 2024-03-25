import { LoginDto } from 'src/presentations/dto/login.dto';
export interface IUserRepository {
  login(data: LoginDto): Promise<String>;
  register(data: LoginDto): Promise<String>;
}
