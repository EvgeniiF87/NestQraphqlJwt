import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { VisitorService } from './visitor.service';
import { VisitorEntity } from './entities/visitor.entity';
import { CreateVisitorInput } from './dto/create-visitor.input';

@Resolver(() => VisitorEntity)
export class VisitorResolver {
  constructor(private readonly visitorService: VisitorService) {}

  @Mutation(() => VisitorEntity)
  createVisitor(
    @Args('createVisitorInput') createVisitorInput: CreateVisitorInput,
  ) {
    return this.visitorService.create(createVisitorInput);
  }

  @Mutation(() => VisitorEntity)
  removeVisitor(@Args('id', { type: () => Int }) id: number) {
    return this.visitorService.remove(id);
  }
}
