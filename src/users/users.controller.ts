import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserNotExistsGuard } from './users.guard';
import { Public } from '../decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @ApiOperation({ summary: 'check user existring' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean })
  @Get('/exist')
  async checkUser(@Query('username') username: string) {
    return await this.userService.userExists(username);
  }

  @ApiOperation({ summary: 'Get users count' })
  @Get('/count')
  async getUsersCount() {
    return await this.userService.getUsersCount();
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Get single users' })
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.userService.getSingleUser(userId);
  }

  @Public()
  @ApiOperation({ summary: `Get single user by username` })
  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getSingleUserByUsername(username);
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Update user' })
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.userService.updateUser(userId, updateUserDto, image);
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Update password' })
  @Patch('/password/:id')
  async updatePassword(
    @Param('id') userId: string,
    @Body() body: { password: string },
  ) {
    return await this.userService.updatePassword(userId, body.password);
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Ban User' })
  @Patch('ban/:id')
  async banUser(
    @Param('id') userId: string,
    @Body()
    body: {
      ban_message: string;
      deleted_till: Date;
    },
  ) {
    return await this.userService.banUser(
      userId,
      body.ban_message,
      body.deleted_till,
    );
  }

  @UseGuards(UserNotExistsGuard)
  @ApiOperation({ summary: 'Unban User' })
  @Patch('unban/:id')
  async unbanUser(@Param('id') userId: string) {
    return await this.userService.unbanUser(userId);
  }

  @ApiOperation({ summary: 'Search user' })
  @Post('/search')
  async searchUser(@Body() body: { searchParam: string }) {
    return await this.userService.searchUser(body.searchParam);
  }
}
