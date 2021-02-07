export default class UserSchema{
    static schema = {
        name: 'User',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', index: true},
            nome: 'string',
            email: 'string',
            senha: 'string',
            isConnected: 'bool'

        }
    }
}