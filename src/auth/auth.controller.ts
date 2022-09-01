import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  UserExistGuard,
  UserAdminGuard,
  UserNotExistsGuard,
} from '../users/users.guard';
import { RegisterDto, LoginDto, ForgotPasswordDto } from './auth.dto';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @Public()
  // @UseGuards(UserExistGuard)
  @Post('/register')
  async addUser(@Body() registerDto: RegisterDto) {
    const res = await this.authService.register(registerDto);

    return res;
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Forgot password',
  })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/forgotPassword')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.resetPassword(forgotPasswordDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login Admin' })
  @Public()
  @UseGuards(UserAdminGuard)
  @Post('/login/admin')
  async loginAdmin(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }
}
