import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { TagEntity } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import RemoveResponse from 'src/response/remove-response';
import { RequestTags } from './dto/request-tags.input';

@Resolver(() => TagEntity)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => TagEntity)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => [TagEntity], { name: 'tags' })
  findAll(@Args('params', { nullable: true }) params?: RequestTags) {
    return this.tagService.findAll(params);
  }

  @Query(() => TagEntity, { name: 'tag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Mutation(() => TagEntity)
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => RemoveResponse)
  removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.remove(id);
  }
}
