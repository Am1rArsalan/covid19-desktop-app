import React from 'react'


export default function (props) {
    return (
        <a
            className='brand'
            href={props.linkToSource}
        >
            {props.firstName} <br />  {props.lastName}
        </a>
    )
}
