import { IUserRepository } from '../../domain/user.repository'; // Importe a interface do repositório
import { User } from '../../domain/user.entity'; // Importe a entidade do usuário
import { LoginDto } from 'src/presentations/dto/login.dto';

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: LoginDto): Promise<any> {
    const user = new User(data.nick_name, data.email, data.password);
    
    return await this.userRepository.register(user);
  }
}