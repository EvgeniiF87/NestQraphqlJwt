import { VisitorEntity } from 'src/visitor/entities/visitor.entity';
import { define } from 'typeorm-seeding';

define(VisitorEntity, () => {
  const visitor = new VisitorEntity();
  return visitor;
});
