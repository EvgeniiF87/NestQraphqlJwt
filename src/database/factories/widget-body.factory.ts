import { WidgetBodyEntity } from 'src/widget_body/entities/widget_body.entity';
import { define } from 'typeorm-seeding';

define(WidgetBodyEntity, () => {
  const wBody = new WidgetBodyEntity();
  return wBody;
});
