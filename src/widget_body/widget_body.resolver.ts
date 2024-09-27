import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { WidgetBodyService } from './widget_body.service';
import { WidgetBodyEntity } from './entities/widget_body.entity';
import { CreateWidgetBodyInput } from './dto/create-widget_body.input';
import { UpdateWidgetBodyInput } from './dto/update-widget_body.input';

@Resolver(() => WidgetBodyEntity)
export class WidgetBodyResolver {
  constructor(private readonly widgetBodyService: WidgetBodyService) {}

  @Mutation(() => WidgetBodyEntity)
  createWidgetBody(
    @Args('createWidgetBodyInput') createWidgetBodyInput: CreateWidgetBodyInput,
  ) {
    return this.widgetBodyService.create(createWidgetBodyInput);
  }

  @Mutation(() => WidgetBodyEntity)
  updateWidgetBody(
    @Args('updateWidgetBodyInput') updateWidgetBodyInput: UpdateWidgetBodyInput,
  ) {
    return this.widgetBodyService.update(
      updateWidgetBodyInput.id,
      updateWidgetBodyInput,
    );
  }
}
