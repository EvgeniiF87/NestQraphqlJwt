import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
// import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(createShortCommentInput: CreateCommentInput) {
    return await this.commentRepository.save({ ...createShortCommentInput });
  }

  findAll() {
    return `This action returns all shortComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortComment`;
  }

  // async update(id: number, updateShortCommentInput: UpdateCommentInput) {
  //   return `This action updates a #${id} shortComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} shortComment`;
  // }
}
