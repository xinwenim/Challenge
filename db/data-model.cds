namespace challenge;

entity Users {
  //key dbKey  : UUID    @(Core.Computed: true);
  ID     : String;
  name   : String;
  region : String;
  email  : String;
  type   : Association to PersonTypes;
}

entity Blogs {
  key dbKey     : UUID @(Core.Computed: true);
      title     : String(20);
      content   : LargeString;
      status    : Integer; // 0 open 1 closed
      likes     : Integer;
      dislikes  : Integer;
      favorites : Integer;
      createdAt : DateTime;
      createdBy : Association to Users;
      Anonymous : Boolean; // 0: yes 1:no
      replys    : Association to many Replys
                    on replys.blog = $self;
}

entity Replys {
  key ID        : UUID @(Core.Computed: true);
      content   : LargeString;
      likes     : Integer;
      dislikes  : Integer;
      deleted   : Boolean; // 0 yes  1 no
      createdAt : DateTime;
      createdBy : Association to Users;
      blog      : Association to Blogs;
}

entity Measures {
  key ID            : UUID @(Core.Computed: true);
      createdAt     : DateTime;
      mind_pressure : Integer;
      mind_sleep    : Integer;
      mind_mood     : Integer;
      sports_time   : Integer;
      sports_height : Decimal;
      sports_weight : Decimal;
      food_junkfood : Boolean; //0 yes 1 no
      food_fruits   : Boolean; //0 yes 1 no
      food_water    : Boolean; //0 yes 1 no
      owner         : Association to Users;
}

entity PersonTypes {
  key ID          : Integer; //类型存成一个数字 0 1 2 3 4...分别对应一个类型
      type        : String; //intj infj...
      description : String;
}
