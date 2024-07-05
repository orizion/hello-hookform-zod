import { createAction, createReducer } from "@reduxjs/toolkit";
import {z} from "zod";

export const PersonSchema = z.object({
    name: z.string().max(30,{message: "Name too long, please shorten it"}),
    email: z.string().email("Please use an email that has the following form: name@domain.com"),
  });
  
  export const PersonsFormSchema = PersonSchema.array();

  export const RemarkItemSchema = z.object({
    checked: z.boolean(),
    text: z.string(),
    severity: z.enum(["high", "low"]),
});
  export const EntireFormSchema = z.object({
    persons: PersonsFormSchema,
    remarkItems: z.object({
      high: RemarkItemSchema.array(),
      low: RemarkItemSchema.array(),
    })
  });
  
  export type EntireFormState = z.infer<typeof EntireFormSchema>;
  export type RemarkItem = z.infer<typeof RemarkItemSchema>;

export interface AppState {
    formData: EntireFormState,
};

const initialState: AppState = {
    formData: {
        persons: [],
        remarkItems: {
          high: [],
          low: []
        }
    },
};

export const saveCardFormAction = createAction<EntireFormState>("cardForm/save");

export const saveCardFormReducer = createReducer(initialState,
    (builder) => {
        builder.addCase(saveCardFormAction, (state, action) => {state.formData = action.payload})
    });