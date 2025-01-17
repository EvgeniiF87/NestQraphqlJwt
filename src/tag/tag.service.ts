import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { ILike, Repository } from 'typeorm';
import { RequestTags } from './dto/request-tags.input';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly TagRepository: Repository<TagEntity>,
  ) {}

  async create(createTagInput: CreateTagInput) {
    return await this.TagRepository.save({ ...createTagInput });
  }

  async findAll(params?: RequestTags) {
    return await this.TagRepository.find({
      where: { name: params?.name && ILike(`%${params?.name}%`) },
    });
  }

  async findOne(id: number) {
    return await this.TagRepository.findOneBy({ id });
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    await this.TagRepository.update({ id }, { ...updateTagInput });

    return this.findOne(id);
  }

  async remove(id: number) {
    const isExist = await this.TagRepository.findOneBy({ id });

    if (!isExist)
      return { message: `тег с id: ${id} не найден`, status: 'error' };

    if (isExist) {
      await this.TagRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `тег с id: ${id} успешно удалён`,
          status: 'success',
        };
      } else {
        return { message: `тег с id: ${id} не удалён`, status: 'error' };
      }
    }
  }
}
