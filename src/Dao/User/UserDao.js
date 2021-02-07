export default class UserDao{
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