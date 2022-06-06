import React from 'react'

export const Header = (props) => {
    return (
        <div className='header'>
            <div className='header-left'>
                <span className='header-icon'>
                    <i className="fa-solid fa-chevron-left"></i>
                </span>
                <span>{props.heading}</span>
            </div>
        </div>
    )
}
