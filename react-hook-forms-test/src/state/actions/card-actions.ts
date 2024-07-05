import { FormValues } from "../../App";

export const saveFormData = (data: FormValues) => ({
    type: 'SAVE_FORM_DATA',
    payload: data,
});
