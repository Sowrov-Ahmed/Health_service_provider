import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserUpdateDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/index')
  getIndex(): any {
    return this.userService.getIndex();
  }
  @Get('/search/:id')
  getUserById(@Param() id: number): any {
    return this.userService.getUserById(id);
  }

  @Get('/searchbyname')
  getUserbyName(@Query() qry: UserDTO): string {
    return this.userService.getUserByName(qry);
  }

  @Post('/registation')
  @UsePipes(new ValidationPipe())
  registation(@Body() data: UserDTO): string {
    console.log(data);
    return this.userService.registation(data);
  }

  @Put('/updateuser')
  //@UsePipes(new ValidationPipe())
  updateUser(@Body() data: UserUpdateDTO): object {
    return this.userService.updateUser(data);
  }
  @Put('/updateuser/:id')
  @UsePipes(new ValidationPipe())
  updateUserbyID(@Param() id: number, @Body() data: UserDTO): object {
    return this.userService.updateUserById(id, data);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
    console.log(myfileobj);
    return { message: 'file uploaded' };
  }
}
