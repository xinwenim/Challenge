using challenge from '../db/data-model';

//这个file是对数据打annotation的，统一的UI设置写在里面进行重用

//annotate user.type as personTypes.type instead of a ID number
annotate challenge.Users with {
    ID          @(
        UI.Hidden,
        Common: {Text: ID}
    );
    ID     @title: 'User';
    name   @title: 'Name';
    region @title: 'Region';
    email  @title: 'Email';
    type   @(Common: {
        Text           : type.type,
        TextArrangement: #TextOnly,
    })

}

//this annotation hides IDs for personTypes from displaying, since that information is useless, only a label in db
annotate challenge.PersonTypes with {
    ID          @(
        UI.Hidden,
    );
    type        @title: 'Type';
    description @title: 'Description';
}

annotate challenge.Blogs with {
    dbKey     @(
        UI.Hidden,
        Common: {Text: ID}
    );
    title     @title: 'Title';
    content   @title: 'Content';
    status    @title: 'Status';
    likes     @title: 'Likes';
    dislikes  @title: 'Dislikes';
    favorites @title: 'Favorites';
    createdAt @title: 'Posted At';
    createdBy @title: 'Posted By';
};

annotate challenge.Replys with {
    dbKey     @(
        UI.Hidden,
        Common: {Text: ID}
    );
    content   @title: 'Content';
    likes     @title: 'Likes';
    dislikes  @title: 'Dislikes';
    createdAt @title: 'Replied At';
    createdBy @title: 'Replied By';
};

annotate challenge.Measures with {
    dbKey         @(
        UI.Hidden,
        Common: {Text: ID}
    );
    createdAt     @title: 'Created At';
    mind_pressure @title: 'Pressure';
    mind_sleep    @title: 'Sleep';
    mind_mood     @title: 'Mood';
    sports_time   @title: 'SportsTime';
    sports_height @Title: 'Height';
    sports_weight @title: 'Weight';
    food_junkfood @title: 'Junkfood';
    food_fruits   @title: 'Fruits/Vegetables';
    food_water    @title: 'Water';
};
