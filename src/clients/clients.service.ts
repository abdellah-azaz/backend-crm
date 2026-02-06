import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './shemas/client.shema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  // Créer un nouveau client
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  // Récupérer tous les clients
  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  // Récupérer un client par son ID
  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }
    return client;
  }

  // Récupérer un client par email
  async findByEmail(email: string): Promise<Client | null> {
    return this.clientModel.findOne({ email }).exec();
  }

  // Mettre à jour un client
  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
    
    if (!updatedClient) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }
    
    return updatedClient;
  }

  // Supprimer un client
  async remove(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    
    if (!deletedClient) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }
    
    return deletedClient;
  }

  // Rechercher des clients
  async search(keyword: string): Promise<Client[]> {
    return this.clientModel.find({
      $or: [
        { firstName: { $regex: keyword, $options: 'i' } },
        { lastName: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
      ],
    }).exec();
  }
}