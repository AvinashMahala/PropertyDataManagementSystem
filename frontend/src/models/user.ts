export interface User{
    username: string,
    email: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string,
    is_active: boolean,
    is_verified: boolean,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    communication_preferences: string,
    
}