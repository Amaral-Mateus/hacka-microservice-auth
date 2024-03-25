import { UserModel } from '../models/user.model';
import { IUserRepository } from '../../domain/user.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from 'src/presentations/dto/login.dto';
import { RegisterDto } from 'src/presentations/dto/register.dto';
import { BcryptService } from '../services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepositorySequelize implements IUserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto): Promise<any> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);
    const hashedUser = {
      nick_name: user.nick_name,
      email: user.email,
      password: hashedPassword,
    };
    const newUser = await this.userModel.create(hashedUser);

    user.password = newUser.password;
    user.email = newUser.email;
    user.nick_name = newUser.nick_name;
    return { nick_name: newUser.nick_name };
  }

  async login(user: LoginDto): Promise<any> {
    const userModel = await this.userModel.findByPk(user.nick_name);
    const hashedPassword = await this.bcryptService.hashPassword(user.password);

    if (
      !this.bcryptService.comparePasswords(userModel.password, hashedPassword)
    ) {
      throw new NotFoundException('Usuário não encontrado ou senha incorreta.');
    }

    const payload = { sub: user.nick_name };

    console.log(this.jwtService.signAsync(payload));
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
