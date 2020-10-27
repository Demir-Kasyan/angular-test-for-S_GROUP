export interface FieldValue{
    id: number,
    form_id: number,
    form_field_id: number,
    type: string,
    value: string | number | Date,
    created_at: string,
    updated_at: string
}
