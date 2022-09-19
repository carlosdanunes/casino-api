import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserEntity } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';
import { ForgotPasswordDto, RegisterDto } from './auth.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: [{ email: login }, { username: login }],
    });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (user.is_deleted) {
        return { error: true, message: 'User is banned' };
      }

      if (user && isValid) {
        return this.login(user);
      }
    }
    return { error: true, message: 'Incorrect email or password' };
  }

  async login(user: User) {
    return new UserEntity({
      ...user,
      access_token: this.jwtService.sign({ sub: user.id }),
    });
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return { error: true, message: 'Email already in use' };
    }

    return new UserEntity(
      await this.userService.addUser(username, email, password),
    );
  }

  async resetPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { userId, userData } = forgotPasswordDto;

    const user = await this.usersRepository.findOne({
      where: { email: userData.email },
    });
    if (user) {
      return await this.userService.updateUser(userId, userData);
    }
    return { error: true, message: 'User with this email not found.' };
  }
}
