import { User } from './user.interface';

export interface SignInInfo {
    user: User,
    access_token: string,
    expires_in: number,
    refresh_in: number,
    token_type: string
}
