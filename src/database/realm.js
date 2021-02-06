import Realm from 'realm';
import UserDao from '../Dao/User/UserDao';

export default function getRealm(){
    return Realm.open({
        schema: [UserDao]
    })
}