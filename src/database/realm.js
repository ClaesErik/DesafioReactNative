import Realm from 'realm';
import UserSchema from '../Schema/User/UserSchema';

export default function getRealm(){
    return Realm.open({
        schema: [UserSchema]
    })
}