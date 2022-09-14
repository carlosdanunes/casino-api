import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserNotExistsGuard } from './users.guard';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all users' })
  @Post()
  async getAllUsers(
    @Body()
    body: {
      cursor: number;
      take: number;
      filterBy?: string;
      order?: string;
    },
  ) {
    return await this.userService.getUsers(
      body.cursor,
      body.take,
      body.filterBy,
      body.order,
    );
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get users count' })
  @Get('/count')
  async getUsersCount() {
    return await this.userService.getUsersCount();
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Get single users' })
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.userService.getSingleUser(userId);
  }

  @ApiTags('Users')
  @Public()
  @ApiOperation({ summary: `Get single user by username` })
  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getSingleUserByUsername(username);
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Update user' })
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Update password' })
  @Patch('/password/:id')
  async updatePassword(
    @Param('id') userId: string,
    @Body() body: { password: string },
  ) {
    return await this.userService.updatePassword(userId, body.password);
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Ban User' })
  @Patch('ban/:id')
  async banUser(@Param('id') userId: string) {
    return await this.userService.banUser(userId);
  }

  @ApiTags('Users')
  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Unban User' })
  @Patch('unban/:id')
  async unbanUser(@Param('id') userId: string) {
    return await this.userService.unbanUser(userId);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Search user' })
  @Post('/search')
  async searchUser(@Body() body: { searchParam: string }) {
    return await this.userService.searchUser(body.searchParam);
  }
}
