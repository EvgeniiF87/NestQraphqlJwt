import { UserEntity } from 'src/user/entities/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, () => {
  const user = new UserEntity();
  return user;
});
