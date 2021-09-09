import React from 'react';

// gets all className objects and joins all the ones that resolve into true
const getClassNames = (classNamesArray) => {
    const returnArr = [];
    classNamesArray.forEach((classNameObj) => {
        Object.keys(classNameObj).forEach((key) => {
            if (classNameObj[key]) returnArr.push(key);
        })
    })

    return returnArr.join(' ');
}

export const CategoryItem = ({className, slug, title, onClick}) => {

    const handleClick = () => {
        onClick(slug)
    }



    return (
        <span
            className={
                getClassNames([ {'category__item': true}, {[className]: !!className} ])
            }
            onClick={handleClick}>
            {title}
        </span>
    )
}
