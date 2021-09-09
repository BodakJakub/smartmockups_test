import { useEffect, useState } from "react"

export const useFilter = (strippedCategoriesArr, categoriesArr) => {
    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        if (!strippedCategoriesArr.length || !categoriesArr.length) return;

        const returnedArr = [];

        const recursiveFind = (categories) => {
            categories.forEach((category) => {
                if (strippedCategoriesArr.includes(category.slug.replace(/[^a-zA-Z0-9]/g, ''))) {

                    let shouldAdd = true;
                    returnedArr.forEach((arrItem) => {
                        if (arrItem.slug.replace(/[^a-zA-Z0-9]/g, '') === category.slug.replace(/[^a-zA-Z0-9]/g, '')) {
                            shouldAdd = false
                        }
                    })
                    if (shouldAdd) {
                        returnedArr.push(category);
                    }
                }

                if (category.children) {
                    recursiveFind(category.children)
                };

                return;

            })
        }

        recursiveFind(categoriesArr)
        setData(returnedArr)

        
        
    }, [strippedCategoriesArr, categoriesArr])

    return { data };
}
