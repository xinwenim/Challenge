using challenge from '../db/data-model';

@path: 'service/challenge'
service challengeService {
    entity Users         as projection on challenge.Users;
    entity Personalities as projection on challenge.PersonTypes;
    entity Blogs         as projection on challenge.Blogs;
    entity Replys        as projection on challenge.Replys;
    entity Measures      as projection on challenge.Measures;
}
