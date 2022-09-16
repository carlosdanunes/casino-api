import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }
}
