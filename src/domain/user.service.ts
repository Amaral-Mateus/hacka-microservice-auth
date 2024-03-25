import { LoginDto } from "src/presentations/dto/login.dto";

export interface IUserService {
  login(LoginDto): Promise<void>;
  register(LoginDto): Promise<void>;
}