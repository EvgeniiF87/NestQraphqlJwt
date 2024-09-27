import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WidgetService } from './widget.service';
import { WidgetEntity } from './entities/widget.entity';
import { CreateWidgetInput } from './dto/create-widget.input';
import { UpdateWidgetInput } from './dto/update-widget.input';
import WidgetResponse from 'src/response/widget.response';
import RemoveResponse from 'src/response/remove-response';

@Resolver(() => WidgetEntity)
export class WidgetResolver {
  constructor(private readonly widgetService: WidgetService) {}

  @Mutation(() => WidgetEntity)
  createWidget(
    @Args('createWidgetInput') createWidgetInput: CreateWidgetInput,
  ) {
    return this.widgetService.create(createWidgetInput);
  }

  @Query(() => [WidgetResponse], { name: 'widgets' })
  findAll() {
    return this.widgetService.findAll();
  }

  @Query(() => WidgetResponse, { name: 'widget' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.widgetService.findOne(id);
  }

  @Mutation(() => WidgetEntity)
  updateWidget(
    @Args('updateWidgetInput') updateWidgetInput: UpdateWidgetInput,
  ) {
    return this.widgetService.update(updateWidgetInput.id, updateWidgetInput);
  }

  @Mutation(() => RemoveResponse)
  removeWidget(@Args('id', { type: () => Int }) id: number) {
    return this.widgetService.remove(id);
  }
}
