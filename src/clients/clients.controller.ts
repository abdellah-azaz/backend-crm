import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ClientsService } from './clients.service';
  import { CreateClientDto } from './dto/create-client.dto';
  import { UpdateClientDto } from './dto/update-client.dto';
  
  @Controller('clients')
  export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
  
    // POST /clients - Créer un client
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createClientDto: CreateClientDto) {
      return this.clientsService.create(createClientDto);
    }
  
    // GET /clients - Récupérer tous les clients
    @Get()
    findAll() {
      return this.clientsService.findAll();
    }
  
    // GET /clients/search?q=keyword - Rechercher des clients
    @Get('search')
    search(@Query('q') keyword: string) {
      return this.clientsService.search(keyword);
    }
  
    // GET /clients/:id - Récupérer un client par ID
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.clientsService.findOne(id);
    }
  
    // PATCH /clients/:id - Mettre à jour un client
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
      return this.clientsService.update(id, updateClientDto);
    }
  
    // DELETE /clients/:id - Supprimer un client
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
      return this.clientsService.remove(id);
    }
  }