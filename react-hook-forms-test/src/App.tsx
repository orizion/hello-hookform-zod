import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';
import { EntireFormSchema, EntireFormState, RemarkItem, RemarkItemSchema, saveCardFormAction } from './state/reducers/card-reducers';
import { zodResolver } from '@hookform/resolvers/zod';
import GPTRemarks, { RemarksProps } from './components/GPTRemarks';

interface Props {
  saveFormData: (data: EntireFormState) => void;
  remarks?: RemarkItem[]
}

function someApiFunc() {
  return [
      
    {
       checked: true,
       text: "Obvious error",
       severity: "low",
    },
    {
       checked: false,
       text: "Not so obvious error",
       severity: "low",
    },
    {
       checked: true,
       text: "Obvious error",
       severity: "high",
    },
    {
       checked: false,
       text: "Not so obvious error",
       severity: "low",
    },
    {
       checked: true,
       text: "Obvious error",
       severity: "low",
    },
    {
       checked: false,
       text: "Not so obvious error",
       severity: "high",
    },
    {
       checked: true,
       text: "Obvious error",
       severity: "low",
    },
 ];;
}

const App: React.FC<Props> = ({saveFormData, remarks}: Props) => {
  // Use the FormValues type with useForm
  const asyncRemarks: unknown = someApiFunc();

  const result = RemarkItemSchema.array().safeParse(asyncRemarks);
  if(!result.success) {
    console.error(result.error);
  } else {
    console.log("we got valid data", result.data);
  }

  const highSeverityRemarks = remarks?.filter(remark => remark.severity === "high") ?? [];
  const lowSeverityRemarks = remarks?.filter(remark => remark.severity === "low") ?? [];

  const methods = useForm<EntireFormState>({
    resolver: zodResolver(EntireFormSchema),
    defaultValues: {
      persons: [
        {
          name: "",
          email: "",
        },
      ],
      remarkItems: {
        high: highSeverityRemarks,
        low: lowSeverityRemarks,
      },
    }
  });
  const { register, control, handleSubmit, watch, formState: {errors} } = methods;
  // Use the useFieldArray hook with the control from useForm
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'persons'
  });

  const formData = watch();

  useEffect(() => {
    //saveFormData(formData); // Dispatch action to update Redux store
  }, [formData, saveFormData]);

  // Define the submit handler type
  const onSubmit: SubmitHandler<EntireFormState> = (data) => console.log(data, errors);


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`persons.${index}.name`)} placeholder="Name" />
            <span> {errors.persons?.[index]?.name?.message} </span>
            <input {...register(`persons.${index}.email`)} placeholder="Email" />
            <span> {errors.persons?.[index]?.email?.message} </span>

            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
      
        <button type="button" onClick={() => append({ name: '', email: '' })}>Add Person</button>
        
        <GPTRemarks topItems={methods.watch('remarkItems.high')} bottomItems={methods.watch('remarkItems.low')}/>

        <input type="submit" />
      </form>
    </FormProvider>
    
  );
}

const mapDispatchToProps = {
  saveCardFormAction,
};

export default connect(null, mapDispatchToProps)(App);
