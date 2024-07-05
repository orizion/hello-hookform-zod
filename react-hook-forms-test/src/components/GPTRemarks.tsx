import React, { useState } from 'react';
import './Remarks.css';
import '../css/utilities/_flow.css';
import { RemarkItem } from '../state/reducers/card-reducers';
import { Controller, useFormContext } from 'react-hook-form';


export interface RemarksProps {
  topItems: RemarkItem[];
  bottomItems: RemarkItem[];
};

const GPTRemarks: React.FC<RemarksProps> = ({ topItems, bottomItems }) => {
  const {register, control, watch} = useFormContext();

//problem was in the name of the controller, it needs to match the item path in the state
//and in case of lists we need to add the [] brackets around the index, like this: [${index}]
const renderList = (items: RemarkItem[], severity: string) => (
  <>
    <div className={`remarks__title remarks__title--${severity}`}>
      <span className="remarks__title-number">{items.length}</span> {severity}
    </div>
    <ul className="remarks__list">
      {items.map((item, index) => (
        <li key={index} className="remarks__list-item">
          <Controller
            name={`remarkItems.${severity}.[${index}].checked`}
            control={control}
            defaultValue={item.checked}
            render={({ field }) => (
              <input
                type="checkbox"
                id={`item-${severity}-${index}`}
                className="remarks__checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <label
            htmlFor={`item-${severity}-${index}`}
            className={`remarks__label ${watch(`remarkItems.${severity}.[${index}].checked`) ? 'remarks__label--checked' : ''}`}
          >
            {item.text}
          </label>
        </li>
      ))}
    </ul>
  </>
);

  return (
    <div className="remarks flow">
      <h2 className="remarks__heading">Remarks</h2>
      <div className="remarks__section">
        {renderList(topItems, 'high')}
      </div>
      <div className="remarks__section">
        {renderList(bottomItems, 'low')}
      </div>
    </div>
  );
};

export default GPTRemarks;
