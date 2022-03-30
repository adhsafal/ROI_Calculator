import React from 'react'
import { Controller } from 'react-hook-form'

const CustomInput = ({ control, name, type = "text", placeholder }) => {
    return (
        <Controller
            name={name}
            type={type}
            control={control}
            render={({ field: { value, onChange } }) => <input onChange={onChange} placeholder={placeholder} value={value} type={type} />} />
    )
}

export default CustomInput