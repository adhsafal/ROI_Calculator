import React from 'react'
import { Controller } from 'react-hook-form'


const CustomSelect = ({ name, control, options }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) =>
                <select onChange={onChange} value={value} >
                    {options.map((item, index) =>
                        <option key={index} value={item.value}>{item.label}</option>)}
                </select>
            }

        />
    )
}

export default CustomSelect