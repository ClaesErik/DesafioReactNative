import Realm, { User } from 'realm';
import UserSchema from '../Dao/User/UserSchema';

export default function getRealm(){
    return Realm.open({
        schema: [UserSchema]
    })
}