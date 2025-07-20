import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { RepositoryService } from '~/repositories/services/repository.service';

@Controller('repositories')
export class RepositoryController {
    constructor(private readonly repositoryService: RepositoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAll() {
        return await this.repositoryService.getList();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Body() createRepositoryDto: { fullName: string }) {
        return await this.repositoryService.createOne(createRepositoryDto.fullName);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/')
    async update(@Body() { fullName }: { fullName: string }) {
        return await this.repositoryService.updateOne(fullName);
    }
}
