import { User } from "../models/Model";

export class AuthService {
    public async login(userName: string, password: string): Promise< User | undefined> {
        if (userName === 'user' && password === 'password'){
            return ({
                userName: userName,
                email: 'some@email.com'
            })
        } 
        return undefined
    }
}