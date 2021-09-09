import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import { useResize } from '../helpers/useResize';
import { CategoryItem } from './CategoryItem';

const getChunk = (windowWidth, totalLength) => (
    windowWidth === 'xs' || windowWidth === 'sm' ? totalLength :
        windowWidth === 'md' || windowWidth === 'lg' ? 4 : 
            3
)

export const Categories = ({ filteredCategories, selectCategory }) => {

    const [columnCategories, setColumnCategories] = useState([]);
    const windowWidth = useResize();

    useEffect(() => {
        const slipArray = [];
        let i,j, temporary, chunk = getChunk(windowWidth, filteredCategories.length)
        for (i = 0,j = filteredCategories.length; i < j; i += chunk) {
            // take care of that All items at the begginning
            if (i === 0) {
                temporary = filteredCategories.slice(i, i + (chunk - 1));
                slipArray.push(temporary);
            } else {
                temporary = filteredCategories.slice(i, i + chunk);
                slipArray.push(temporary);
            }
        }

        setColumnCategories(slipArray);

    }, [filteredCategories, windowWidth]);

    const onClick = (category) => {
        selectCategory(category)
    }

    return (
        <div className="category">
            {columnCategories.map((categoriesForColumn, i) => (
                <div className="category__column">
                    {i === 0 && <CategoryItem className="category__item--all" onClick={onClick} title={'All items'} slug={false} />}
                    {categoriesForColumn.map(({title, slug}, i) => (
                            <CategoryItem onClick={onClick} key={`${slug}-${i}`} title={title} slug={slug} />
                        )
                    )}
                </div>
            ))}
        </div>
    )
}
