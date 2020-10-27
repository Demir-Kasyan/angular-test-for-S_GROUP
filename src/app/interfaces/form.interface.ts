import { FieldValue } from './field.interface';

export interface Form {
    id: number,
    user_id: number,
    type: string,
    form_field_values: FieldValue[],
    value: string | number | Date,
    created_at: string,
    updated_at: string  
}