import { Controller, Post, Get, Body, Param, Patch, ParseIntPipe, Query, Request, UsePipes, ValidationPipe, ForbiddenException } from "@nestjs/common";
import { Debounce } from "src/utils/debounce.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { PostResponseDto } from "./response.dto";
import { ResponsesService } from "./responses.service";

@Controller('responses')
export class ResponsesController {
    constructor(private readonly responseService: ResponsesService){}

    @Post(':id/:userName')
    @UsePipes(ValidationPipe)
    @Debounce(500)
    postResponse(@Request() req, @Param('id', ParseIntPipe) id: number, @Param('userName') userName: string, @Body() responseDto: PostResponseDto) {
        if(req.admin.userName!=userName){
            throw new ForbiddenException('You are not allowed to post a response on behalf of another admin.')
        }
        return this.responseService.postResponse(id, userName, responseDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getResponses(@Query() paginationDto: PaginationDto) {
        return this.responseService.getResponses(paginationDto);
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.responseService.getResponse(id);
    }

    @Patch(':id')
    updateStatus(@Param('id', ParseIntPipe) id: number) {
        return this.responseService.updateStatus(id);
    }
}