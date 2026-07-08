import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ListClientsQueryDto } from './dto/list-clients-query.dto';
import { ClientStatus } from './enums/client-status.enum';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientsRepository) { }

  // TODO (candidato): implementar regras
  async create(dto: CreateClientDto) {
    const emailExists = await this.repository.findByEmail(dto.email);
    if (emailExists) {
      throw new ConflictException('Email já cadastrado !');
    }
    const documentoExists = await this.repository.findByDocumento(dto.documento);
    if (documentoExists) {
      throw new ConflictException('Documento já cadastrado');
    }
    return this.repository.create(dto);
  }

  async findAll(query: ListClientsQueryDto) {
    return this.repository.findMany(query);
  }

  async findOne(id: string) {
    const client = await this.repository.findById(id);
    if (!client) {
      throw new NotFoundException(' Cliente não encontrado')
    }
    return client;
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.repository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    if (client.status === ClientStatus.INACTIVE) {
      throw new ForbiddenException('Cliente inativo não pode ser editado');
    }
    if (dto.email) {
      const emailExists = await this.repository.findByEmail(dto.email);
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Email já cadastrado');
      }
    }
    if (dto.documento) {
      const documentoExists = await this.repository.findByDocumento(dto.documento);
      if (documentoExists && documentoExists.id !== id) {
        throw new ConflictException('documento já cadastrado');
      }
    }
    return this.repository.update(id, dto);

  }

  async remove(id: string) {
    const client = await this.repository.findById(id);
    if (!client) {
      throw new NotFoundException(' Cliente não encontrado');
    }
    return this.repository.softDelete(id);
  }
}