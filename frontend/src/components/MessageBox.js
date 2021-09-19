import React from 'react';
export default function MessageBox(props) {
    return (
        <div>
            <i className={`alert alert-${props.variant}` || 'info'}>{props.children}</i>

        </div>
    )
}