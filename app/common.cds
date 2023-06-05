using challenge from '../db/data-model';

//这个file是对数据打annotation的，统一的UI设置写在里面进行重用

//annotate user.type as personTypes.type instead of a ID number
annotate challenge.Users with {
    ID     @title: 'User';
    name   @title: 'Name';
    region @title: 'Region';
    email  @title: 'Email';
    type   @title: 'Type';


}
