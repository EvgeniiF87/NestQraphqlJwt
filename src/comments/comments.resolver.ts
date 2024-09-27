import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
// import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(private readonly shortCommentsService: CommentsService) {}

  @Mutation(() => CommentEntity)
  createComment(
    @Args('createCommentInput')
    createCommentInput: CreateCommentInput,
  ) {
    return this.shortCommentsService.create(createCommentInput);
  }

  @Query(() => [CommentEntity], { name: 'comments' })
  findAll() {
    return this.shortCommentsService.findAll();
  }

  @Query(() => CommentEntity, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shortCommentsService.findOne(id);
  }

  // @Mutation(() => CommentEntity)
  // updateComment(
  //   @Args('updateCommentInput')
  //   updateCommentInput: UpdateCommentInput,
  // ) {
  //   return this.shortCommentsService.update(
  //     updateCommentInput.id,
  //     updateCommentInput,
  //   );
  // }

  // @Mutation(() => CommentEntity)
  // removeComment(@Args('id', { type: () => Int }) id: number) {
  //   return this.shortCommentsService.remove(id);
  // }
}
