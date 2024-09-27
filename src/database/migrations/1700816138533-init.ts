import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700816138533 implements MigrationInterface {
  name = 'Init1700816138533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cost_options" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_4cb3833238b922bc3ff72dd295d" UNIQUE ("name"), CONSTRAINT "PK_fe5a43015776ec4d3c1ef68d85d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_place_tags" ("id" SERIAL NOT NULL, "eventId" integer, "placeId" integer, "tagsId" integer NOT NULL, CONSTRAINT "PK_d87d6ffda74f013d492043d06b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "placeId" integer, "eventId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "info" ("id" SERIAL NOT NULL, "adress" character varying, "metro" character varying, "time_from" character varying, "time_to" character varying, "phone" character varying, "call_back" boolean NOT NULL DEFAULT false, "site" character varying, "social" character varying, "longitude" character varying, "latitude" character varying, "placeId" integer, "eventId" integer, CONSTRAINT "REL_5c2ac9f4e14f4ae4255e340474" UNIQUE ("placeId"), CONSTRAINT "REL_4af2db6db1ae08828edbd4e111" UNIQUE ("eventId"), CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" SERIAL NOT NULL, "eventId" integer, "placeId" integer, "userId" integer, "stars" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "short_ratings" ("id" SERIAL NOT NULL, "shortId" integer NOT NULL, "like" integer NOT NULL DEFAULT '0', "dislike" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_21c2cded0c8524ec68d33e1d741" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shorts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "path" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "eventId" integer, "placeId" integer, "userId" integer NOT NULL, CONSTRAINT "PK_5ef2e7a99b5c20e3de786724972" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "shortId" integer, "eventId" integer, "placeId" integer, "comment" character varying NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statistics" ("id" SERIAL NOT NULL, "day" character varying NOT NULL, "views" integer NOT NULL, "currentDay" TIMESTAMP NOT NULL, "eventId" integer NOT NULL, "userId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "visitors" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "eventId" integer NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_d0fd6e34a516c2bb3bbec71abde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "geo" character varying, "avatar" character varying, "roleId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."widgets_type_enum" AS ENUM('static_collections', 'dynamic_collections', 'create_event', 'create_place', 'go', 'map', 'client')`,
    );
    await queryRunner.query(
      `CREATE TABLE "widgets" ("id" SERIAL NOT NULL, "type" "public"."widgets_type_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "sort" integer NOT NULL, "title" character varying, CONSTRAINT "PK_da23136dbcfc91424451e24b725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "widget_body" ("id" SERIAL NOT NULL, "widgetId" integer NOT NULL, "eventId" integer, "placeId" integer, CONSTRAINT "PK_5a44f7a77c9dfb3852c57e82887" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "places" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "views" integer DEFAULT '0', "like" integer DEFAULT '0', "dislike" integer DEFAULT '0', "preview" character varying, "publish" boolean NOT NULL DEFAULT true, "existTimeStart" TIMESTAMP, "existTimeEnd" TIMESTAMP, "whenStartToShow" TIMESTAMP, "categry" character varying NOT NULL DEFAULT 'places', "direction" "public"."places_direction_enum" NOT NULL, "userId" integer NOT NULL, "cityId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_place_cost_options" ("id" SERIAL NOT NULL, "eventId" integer, "placeId" integer, "costOptionId" integer NOT NULL, "price" character varying NOT NULL DEFAULT 'бесплатно', CONSTRAINT "PK_057ed8ded8e59087fbfc87c074b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "views" integer DEFAULT '0', "like" integer DEFAULT '0', "dislike" integer DEFAULT '0', "preview" character varying, "publish" boolean NOT NULL DEFAULT true, "existTimeStart" TIMESTAMP, "existTimeEnd" TIMESTAMP, "whenStartToShow" TIMESTAMP, "recommendation" boolean NOT NULL DEFAULT false, "categry" character varying NOT NULL DEFAULT 'events', "direction" "public"."events_direction_enum" NOT NULL, "userId" integer NOT NULL, "cityId" integer NOT NULL, "placeId" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "region" character varying NOT NULL, "name" character varying NOT NULL, "time_zons" character varying NOT NULL, "utc" integer NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "expire" TIMESTAMP NOT NULL, "refresh_token" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_0c478cc17483f806181ae99d037" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_4d66b9f8cb2b5bc160fb0cb8408" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_6829b2187a29d64c27387bf43b1" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_3c42a2cf494dbc553dceb2db656" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_6a583d8235697646ab49f93fd54" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_5c2ac9f4e14f4ae4255e340474a" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_4af2db6db1ae08828edbd4e111d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_41252d5d41cf87cff353e628c92" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_041bcfa27c32f8abb8c68bc5f3f" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "short_ratings" ADD CONSTRAINT "FK_4668d3f8c8f11a4884cf220fb4f" FOREIGN KEY ("shortId") REFERENCES "shorts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" ADD CONSTRAINT "FK_e6a98ab730fa6d737c5e63c442b" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" ADD CONSTRAINT "FK_b53180bd8cce901c32088bf27a4" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" ADD CONSTRAINT "FK_7af569091c6b21d3ba08b496d3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_502c8ec7aac2080354e15820620" FOREIGN KEY ("shortId") REFERENCES "shorts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_555f90935f4c6d26c351af601fc" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_b372e6b47d9bde525b742a4eaef" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_2cab1adc88382bbc7038335c9df" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_c9989a8e8506743633ba5e0aed0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "visitors" ADD CONSTRAINT "FK_d304d8c2a659134be8eb3fdf266" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "visitors" ADD CONSTRAINT "FK_84530da3e0c8f0dc88a2665c0fe" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" ADD CONSTRAINT "FK_975b7113d0b8a4e4b5d2d3640b6" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" ADD CONSTRAINT "FK_6f5323519cba7ca53b9b78c7e5c" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" ADD CONSTRAINT "FK_7ad14de605eeaf5b38ebd67bac0" FOREIGN KEY ("widgetId") REFERENCES "widgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "FK_41f795cb1cf769256b87e548aa2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "FK_f548129f350a5ed88401d583c8b" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_cac3dc66dbf33d47d9978a4e04a" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_4d8f9136743763b47a06a589c93" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_c2c2572431731fbc30270753da7" FOREIGN KEY ("costOptionId") REFERENCES "cost_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_359b48411878a60ae7df2d5f25e" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_359b48411878a60ae7df2d5f25e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_c2c2572431731fbc30270753da7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_4d8f9136743763b47a06a589c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_cac3dc66dbf33d47d9978a4e04a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" DROP CONSTRAINT "FK_f548129f350a5ed88401d583c8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" DROP CONSTRAINT "FK_41f795cb1cf769256b87e548aa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" DROP CONSTRAINT "FK_7ad14de605eeaf5b38ebd67bac0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" DROP CONSTRAINT "FK_6f5323519cba7ca53b9b78c7e5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "widget_body" DROP CONSTRAINT "FK_975b7113d0b8a4e4b5d2d3640b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "visitors" DROP CONSTRAINT "FK_84530da3e0c8f0dc88a2665c0fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "visitors" DROP CONSTRAINT "FK_d304d8c2a659134be8eb3fdf266"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_c9989a8e8506743633ba5e0aed0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_2cab1adc88382bbc7038335c9df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_b372e6b47d9bde525b742a4eaef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_555f90935f4c6d26c351af601fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_502c8ec7aac2080354e15820620"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" DROP CONSTRAINT "FK_7af569091c6b21d3ba08b496d3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" DROP CONSTRAINT "FK_b53180bd8cce901c32088bf27a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shorts" DROP CONSTRAINT "FK_e6a98ab730fa6d737c5e63c442b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "short_ratings" DROP CONSTRAINT "FK_4668d3f8c8f11a4884cf220fb4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_041bcfa27c32f8abb8c68bc5f3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_41252d5d41cf87cff353e628c92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_4af2db6db1ae08828edbd4e111d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_5c2ac9f4e14f4ae4255e340474a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_6a583d8235697646ab49f93fd54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_3c42a2cf494dbc553dceb2db656"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_6829b2187a29d64c27387bf43b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_4d66b9f8cb2b5bc160fb0cb8408"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_0c478cc17483f806181ae99d037"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "event_place_cost_options"`);
    await queryRunner.query(`DROP TABLE "places"`);
    await queryRunner.query(`DROP TABLE "widget_body"`);
    await queryRunner.query(`DROP TABLE "widgets"`);
    await queryRunner.query(`DROP TYPE "public"."widgets_type_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "visitors"`);
    await queryRunner.query(`DROP TABLE "statistics"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "shorts"`);
    await queryRunner.query(`DROP TABLE "short_ratings"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(`DROP TABLE "info"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "event_place_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "cost_options"`);
  }
}
