import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Calculator = () => {

    const [opens, setOpens] = useState()
    const [clicks, setClicks] = useState()
    const [conversions, setConversions] = useState()
    const [revenue, setRevenue] = useState()
    const [profit, setProfit] = useState()
    const [breakEven, setBreakEven] = useState()
    const [roi, setRoi] = useState()

    const [curr, setCurr] = useState('$')



    const options = [
        {
            label: '$ USD',
            value: 'USD'
        },
        {
            label: '£ Pound',
            value: 'Pound'
        },
        {
            label: '€ Euros',
            value: 'Euro'
        }
    ]

    const defaultValues = {
        currency: '',
        volume: 10000,
        cost: 1600,
        openRate: 30,
        clickRate: 12,
        conversionRate: 52.66,
        averageConversionValue: 15

        // currency: '',
        // volume: '',
        // cost: '',
        // openRate: '',
        // clickRate: '',
        // conversionRate: '',
        // averageConversionValue: ''
    }

    const schema = yup.object({
        volume: yup.number().required('Volume is required').min(0, 'Must be greater than 0.').typeError('Must be greater than 0'),
        cost: yup.number().typeError('Cost is required').min(0, 'Must be greater than 0.').required('Cost is required'),
        openRate: yup.number().typeError('Open Rate is required').min(0, 'Must be greater than or equal to 0 or less than or equal to 100').max(100, 'Must be greater than or equal to 0 or less than or equal to 100').required(),
        clickRate: yup.number().typeError('Click Rate is required').min(0, 'Must be greater than or equal to 0 or less than or equal to 100').max(100, 'Must be greater than or equal to 0 or less than or equal to 100').required(),
        conversionRate: yup.number().typeError('Conversion Rate is required').min(0, 'Must be greater than or equal to 0 or less than or equal to 100').max(100, 'Must be greater than or equal to 0 or less than or equal to 100').required(),
        averageConversionValue: yup.number().min(0, 'Must be greater than 0.').typeError('Net Conversion value is required').required(),
    }).required();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema), defaultValues
    })

    // useEffect(() => {
    //     onSubmit()
    // }, [])



    const onSubmit = (values) => {
        if (values.currency === "Pound") {
            setCurr("£")
        }

        else if (values.currency === "Euro") {
            setCurr("€")
        }

        else (
            setCurr('$')
        )

        const resultOpens = (values.openRate * values.volume) / 100;
        setOpens(resultOpens)

        const resultClicks = (values.clickRate / 100) * resultOpens;
        setClicks(resultClicks)

        const resultConversions = (values.conversionRate * resultClicks) / 100;
        setConversions(resultConversions)

        const resultRevenue = resultConversions * values.averageConversionValue;
        setRevenue(resultRevenue)

        const resultProfit = resultRevenue - values.cost;
        setProfit(resultProfit)

        const resultBreakEven = values.cost / values.averageConversionValue;
        setBreakEven(resultBreakEven)

        const resultRoi = (resultProfit / values.cost) * 100;
        setRoi(resultRoi)

    }

    return (
        <>

            <div className="formSection">
                <div className="topSection">
                    <h1>Email Marketing ROI Calculator</h1>
                    <p className='topPara'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
                        lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent.</p>
                </div>
                <div className="container">
                    <div className="col-md-10 offset-md-1">
                        <div className="formContainer">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="calculatorColumn">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="currency">
                                                <h4>Currency</h4>
                                                <p>Choose the currency you'd like to use to calculate your email marketing ROI</p>
                                                <CustomSelect control={control} name='currency' options={options} />
                                            </div>
                                            <div className="emailVolume">
                                                <h4>Email Send Volume*</h4>
                                                <p>Enter the total number of subscribers that your email marketing campaign is sent to.</p>
                                                <CustomInput control={control} name='volume' />
                                                <p className='errorMessage'>{errors.volume?.message}</p>
                                            </div>
                                            <div className="emailCampaignCost">
                                                <h4>Cost of Email Marketing Campaign*</h4>
                                                <p>Enter the cost for sending this single campaign.
                                                    (Divide your monthly cost by the total campaigns
                                                    sent per month.)</p>
                                                <CustomInput placeholder={curr} control={control} type='number' name='cost' />
                                                <p className='errorMessage'>{errors.cost?.message}</p>
                                            </div>
                                            <div className="openRate">
                                                <h4>Open Rate*</h4>
                                                <p>Enter the percentage of people, on average, that open
                                                    your emails</p>
                                                <CustomInput control={control} placeholder='%' type='number' name='openRate' />
                                                <p className='errorMessage'>{errors.openRate?.message}</p>
                                            </div>
                                            <div className="clickRate">
                                                <h4>Click-Through Rate*</h4>
                                                <p>Enter the percentage of subscribers who
                                                    clicked through your email campaign call to action.</p>
                                                <CustomInput control={control} placeholder='%' type='number' name='clickRate' />
                                                <p className='errorMessage'>{errors.clickRate?.message}</p>
                                            </div>
                                            <div className="conversionRate">
                                                <h4>Conversion Rate*</h4>
                                                <p>Enter the percentage of people, on average, that click
                                                    on links in your email</p>
                                                <CustomInput control={control} placeholder='%' type='number' name='conversionRate' />
                                                <p className='errorMessage'>{errors.conversionRate?.message}</p>
                                            </div>
                                            <div className="averageConversionValue">
                                                <h4>Average Value of a conversion*</h4>
                                                <p>Enter the average spend per customer (ASC)
                                                    (or average order value as it’s known in Google Analytics).</p>
                                                <CustomInput control={control} type='number' name='averageConversionValue' />
                                                <p className='errorMessage'>{errors.averageConversionValue?.message}</p>
                                            </div>
                                            <button type='submit'>Calculate ROI</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="resultColumn">
                                        <div className="resultsSection">
                                            <h4>Results</h4>
                                        </div>
                                        <div className="totalOpens">
                                            <p>Total Opens</p>
                                            <p className='res'>{opens}</p>
                                        </div>
                                        <div className="totalOpens">
                                            <p>Total Clicks</p>
                                            <p className='res'>{clicks}</p>
                                        </div>
                                        <div className="totalOpens">
                                            <p>Total Conversions</p>
                                            <p className='res'>{conversions}</p>
                                        </div><div className="totalOpens">
                                            <p>Total Revenue</p>
                                            <p className='res'>{revenue}</p>
                                        </div>
                                        <div className="totalOpens">
                                            <p>Total Profit</p>
                                            <p className='res'>{profit}</p>
                                        </div>
                                        <div className="totalOpens">
                                            <p>Conversion to Break Even</p>
                                            <p className='res'>{breakEven}</p>
                                        </div>
                                        <div className="totalOpens conversions">
                                            <p>Number of Conversions</p>
                                            <p className='res'>{conversions}</p>
                                        </div>
                                        <div className="ROI">
                                            <p>ROI (%)</p>
                                            <p className='res'>{roi}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculator