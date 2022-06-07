import React, { useEffect, useState } from 'react'

const SegmentForm = () => {
    const [showModal, setshowModal] = useState(false)
    const [segment, setsegment] = useState({ "segment_name": "", "schema": [] })
    const [showOptions, setshowOptions] = useState(null)
    const [schemaValue, setschemaValue] = useState({ "value": "reset", "Label": "Add schema to segment" })
    const [showError, setshowError] = useState(false)
    const [schemaList, setschemaList] = useState([{ "value": 'first_name', "Label": 'First Name' }, { "value": 'last_name', "Label": 'Last Name' }, { "value": 'gender', "Label": 'Gender' }, { "value": 'age', "Label": 'Age' }, { "value": 'account_name', "Label": 'Account Name' }, { "value": 'city', "Label": 'City' }, { "value": 'state', "Label": 'State' }])

    const [removeCurrent, setremoveCurrent] = useState({ "value": "", "Label": "" })

    const handleChange = (key) => {
        let newArr = segment;

        setsegment({
            segment_name: key,
            schema: newArr.schema
        })
    }
    const handletoggle = (key) => {
        setshowModal(!showModal)
    }

    const handleSubmit = async () => {
        let headers = new Headers();

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

        console.log(segment)
        const url = "https://webhook.site/e4556e5e-abbd-4d53-b199-c3e5c4d103f7";

        await fetch(url, {
            method: "POST",
            body: segment,
            headers: headers
        })
            .then((response) => response.json())
            .then((data) => console.log("File has been sent Successfully", data));
    }

    const handleDropDown = async (value, label, index) => {
        removeCurrent.value = value;
        removeCurrent.Label = label;
        setremoveCurrent(removeCurrent)

        if (showOptions === index) {
            return setshowOptions(null);
        }
        setshowOptions(index)
    }

    const handleSubmitSchema = (value, label) => {
        setschemaValue({
            value: value, Label: label
        })
        setshowOptions(false)
    }

    const handleUpdateSchema = (value, label, index) => {
        let newarr = segment;
        newarr.schema[index].value = value;
        newarr.schema[index].Label = label;
        setsegment(newarr)
        setshowOptions(false)


        var allItems = schemaList;
        allItems.push({ 'value': removeCurrent.value, 'Label': removeCurrent.Label })
        allItems.splice(allItems.findIndex(item => item.value === value), 1)
        setschemaList(allItems)
    }
    const addNewSchema = (value, label) => {
        if (value == 'reset') {
            setshowError(true)
        } else {
            setshowError(false)
            let newarr = segment;
            newarr['schema'].push({ 'value': schemaValue.value, 'Label': schemaValue.Label })
            setsegment(newarr)
            handleDropDown();

            let initial = ({ "value": "reset", "Label": "Add schema to segment" })
            setschemaValue(initial)
            let allItems = schemaList;
            allItems.splice(allItems.findIndex(item => item.value === value), 1)
        }
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
                                            <div>
                                                <div className='dropdown-label' onClick={() => handleDropDown(item.value, item.Label, index)}>
                                                    <span>{item.Label}</span>
                                                    <button onClick={() => handleDropDown(item.value, item.label, index)} className={`dropbtn ${showOptions === index ? 'is-visible' : ''}`}>
                                                        <i className="fa-solid fa-chevron-left"></i>
                                                    </button>
                                                </div>
                                                <div className='checkbox'>
                                                    <input type="checkbox" />
                                                </div>

                                            </div>
                                            <div className={`dropdown-options ${showOptions === index ? 'is-visible' : ''}`} >
                                                {
                                                    schemaList.map((item, key) => (
                                                        <option value={item.value} onClick={(e) => handleUpdateSchema(e.target.value, item.Label, index)}>{item.Label}</option>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))

                                    }


                                </ul>

                                <div className='dropdown'>
                                    <div className='dropdown-label' onClick={() => handleDropDown(schemaValue.value, schemaValue.Label, "schema")}>
                                        <span>{schemaValue.Label}</span>
                                        <button onClick={() => handleDropDown(schemaValue.value, schemaValue.Label, "schema")} className={`dropbtn ${showOptions === 'schema' ? 'is-visible' : ''}`}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </button>
                                    </div>
                                    <div className={`dropdown-options ${showOptions === 'schema' ? 'is-visible' : ''}`} >
                                        {
                                            schemaList.map((item, index) => (
                                                <option value={item.value} onClick={(e) => handleSubmitSchema(e.target.value, item.Label)}>{item.Label}</option>
                                            ))
                                        }
                                    </div>
                                </div>
                                <button className='btn-add-new btn' onClick={() => addNewSchema(schemaValue.value, schemaValue.Label)}>+ Add new schema</button>
                                <span style={{ color: 'red', display: showError ? 'block' : 'none' }}>Select Schema from Dropdown List</span>
                                <div style={{marginTop: '10px'}}>
                                    <button className='btn-save btn' onClick={handleSubmit}>Save the Segment</button>
                                    <button className='btn-cancel btn' onClick={() => setshowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SegmentForm