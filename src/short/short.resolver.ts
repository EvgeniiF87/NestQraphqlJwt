import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShortService } from './short.service';
import { ShortEntity } from './entities/short.entity';
import { CreateShortInput } from './dto/create-short.input';
import { UpdateShortInput } from './dto/update-short.input';

@Resolver(() => ShortEntity)
export class ShortResolver {
  constructor(private readonly shortService: ShortService) {}

  @Mutation(() => ShortEntity)
  createShort(@Args('createShortInput') createShortInput: CreateShortInput) {
    return this.shortService.create(createShortInput);
  }

  @Query(() => [ShortEntity], { name: 'short' })
  findAll() {
    return this.shortService.findAll();
  }

  @Query(() => ShortEntity, { name: 'short' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shortService.findOne(id);
  }

  @Mutation(() => ShortEntity)
  updateShort(@Args('updateShortInput') updateShortInput: UpdateShortInput) {
    return this.shortService.update(updateShortInput.id, updateShortInput);
  }

  @Mutation(() => ShortEntity)
  removeShort(@Args('id', { type: () => Int }) id: number) {
    return this.shortService.remove(id);
  }
}
