

export type CardFormValues = {
    FirstName: string,
    LastName: string,
    options: number
};

export type RegisterableComponent = {
    register: any,
    name: string,
}

export const CardForm = ({ register, name, ...rest }: RegisterableComponent) => {
    
    return (
        <>
            <input {...register(name)} {...rest}/>
            <input name="lastName" />
            <select name="options">
                <option value={1}>Test Option</option>
                <option value={2}>Test Option 2</option>
            </select>
        </>
    );
}