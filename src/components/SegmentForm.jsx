import React, { useEffect, useState } from 'react'
import { Header } from './Header'

const SegmentForm = () => {
    const [showModal, setshowModal] = useState(false)
    const [segment, setsegment] = useState({ "segment_name": "", "schema": [] })
    const [showOptions, setshowOptions] = useState(null)
    const [schemaValue, setschemaValue] = useState({ "value": "", "Label": "" })

    const [schemaList, setschemaList] = useState([{ "value": 'first_name', "Label": 'First Name' }, { "value": 'last_name', "Label": 'Last Name' }, { "value": 'gender', "Label": 'Gender' }, { "value": 'age', "Label": 'Age' }, { "value": 'account_name', "Label": 'Account Name' }, { "value": 'city', "Label": 'City' }, { "value": 'state', "Label": 'State' }])
    const handleChange = (key) => {
        let newArr = segment;
        // newArr.segment_name = segment.schema; 

        setsegment({
            segment_name: key,
            schema: newArr.schema
        })
    }

    useEffect(() => {

    }, [segment])

    const handletoggle = (key) => {
        setshowModal(!showModal)
    }

    const handleSubmit = () => {
        console.log(segment)
    }

    const handleDropDown = (key) => {
        if (showOptions === key) {
            return setshowOptions(null);
        }
        setshowOptions(key)
    }

    const handleSubmitSchema = (value, label) => {
        setschemaValue({
            value: value, Label: label
        })
        setshowOptions(false)
    }

    const addNewSchema = () => {
        let newarr = segment;
        newarr['schema'].push({ 'value': schemaValue.value, 'Label': schemaValue.Label })
        setsegment(newarr)
    }


    return (
        <div className='segment-form'>
            <div className='add-segment-btn'>
                <button onClick={() => handletoggle("show-modal")}>Save segment</button>
            </div>

            <div className={`modal ${showModal ? 'is-visible' : ''}`}>
                <div className='add-new-segment'>
                    <div className='add-new-segment-form'>
                        <div className='header'>
                            <div className='header-left'>
                                <span className='header-icon' onClick={() => setshowModal(false)}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </span>
                                <span>Saving Segment</span>
                            </div>
                        </div>

                        <div className='new-segment-container'>
                            <div className='row1'>
                                <label>Enter the Name of the Segment</label>
                                <input className='new-segment-text' type="text" placeholder='Name of the segment' onChange={(e) => handleChange(e.target.value)} />
                                <p>To save your segment, you need to add the schemas to build the query</p>
                                <div className='traits'>
                                    <div className='user-traits'>
                                        <span className='icon'></span>
                                        <span>-User Traits</span>
                                    </div>
                                    <div className='group-traits'>
                                        <span className='icon red'></span>
                                        <span>-Group Traits</span>
                                    </div>
                                </div>
                            </div>
                            <div className='row2'>
                                <ul className='added'>
                                    {segment.schema.map((item, index) => (
                                        <div className='dropdown'>
                                            <div className='dropdown-label' onClick={() => handleDropDown(index)}>
                                                <span>{item.Label}</span>
                                                <button onClick={() => handleDropDown(index)} className={`dropbtn ${showOptions}`}>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                </button>
                                            </div>
                                            <div className={`dropdown-options ${showOptions === index ? 'is-visible' : ''}`} >
                                                {
                                                    schemaList.map((item, index) => (
                                                        <option value={item.value} onClick={(e) => handleSubmitSchema(e.target.value, item.Label)}>{item.Label}</option>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    ))

                                    }


                                </ul>

                                <div className='dropdown'>
                                    <div className='dropdown-label' onClick={() => handleDropDown("schema")}>
                                        <span>{schemaValue.value ? schemaValue.Label : 'Add schema to segment'}</span>
                                        <button onClick={() => handleDropDown("schema")} className={`dropbtn ${showOptions}`}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </button>
                                    </div>
                                    <div className={`dropdown-options ${showOptions ? 'is-visible' : ''}`} >
                                        {
                                            schemaList.map((item, index) => (
                                                <option value={item.value} onClick={(e) => handleSubmitSchema(e.target.value, item.Label)}>{item.Label}</option>
                                            ))
                                        }
                                    </div>
                                </div>
                                <button className='btn-add-new btn' onClick={() => addNewSchema()}>+ Add new schema</button>
                            </div>
                            <div className='row3 btn-container'>
                                <button className='btn-save btn' onClick={handleSubmit}>Save the Segment</button>
                                <button className='btn-cancel btn' onClick={() => setshowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SegmentForm