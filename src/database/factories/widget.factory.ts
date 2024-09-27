import { WidgetEntity } from 'src/widget/entities/widget.entity';
import { define } from 'typeorm-seeding';

define(WidgetEntity, () => {
  const widget = new WidgetEntity();
  return widget;
});
