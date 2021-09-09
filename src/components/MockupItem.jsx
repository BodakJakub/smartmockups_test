import React, { useEffect, useState } from 'react';
import Animated from "react-mount-animation";

export const MockupItem = ({thumb, title}) => {

    // just to setup some animation
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <>
        {
            // eslint-disable-next-line react/jsx-pascal-case
            <Animated.div
                className="mockup__item"
                show={isMounted}
                mountAnim={`
                    0% {opacity: 0}
                    100% {opacity: 1}
                `}
            >
                <img className="mockup__img" src={thumb} alt={title} />
                <span className="mockup__text">{title}</span>
            </Animated.div>
        }
        </>
    )
}
