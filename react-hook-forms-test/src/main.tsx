import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'
import { EntireFormState, RemarkItem } from './state/reducers/card-reducers.ts'
import GPTRemarks, { RemarksProps } from './components/GPTRemarks.tsx'

const saveFormData = (data: EntireFormState) => console.table(data)

const remarkProps: RemarkItem[] = [
      
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
   ];


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store ={store}>
        <App saveFormData={saveFormData} remarks={remarkProps}/>
     </Provider>
  </React.StrictMode>,
)
