import React from 'react'
import { MockupItem } from './MockupItem'

export const Mockups = ({mockupData}) => {
    return (
        <div className="mockup">
            {
                mockupData && mockupData.map(({id, title, thumb}) => (
                    <MockupItem key={`mockup-id-${id}`} thumb={thumb} title={title} />
                ))
            }
        </div>
    )
}
