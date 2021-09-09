import { useEffect, useState } from 'react';
import { useFetch } from './api/useFetch';
import './App.scss';
import { Categories } from './components/Categories';
import { Mockups } from './components/Mockups';
import { useFilter } from './helpers/useFilter';

function App() {

  const [ allCategories, setAllCategories ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState();
  const [ visibleMockupData, setVisibleMockupData ] = useState();
  const { data: mockupData } = useFetch('https://5lt31zvq40.execute-api.us-east-1.amazonaws.com/dev/mockups');
  const { data: categoryData } = useFetch('https://5lt31zvq40.execute-api.us-east-1.amazonaws.com/dev/categories');
  const { data: filteredCategories } = useFilter(allCategories, categoryData)

  useEffect(() => {
    const uniqueCategories = [];
    if (mockupData) {
        mockupData.forEach((mockup) => {
            mockup.category.forEach(( category ) => {
                const strippedCategory = category.replace(/[^a-zA-Z0-9]/g, '');
                if (!uniqueCategories.includes(strippedCategory)) {
                    uniqueCategories.push(strippedCategory)
                }
            })
        })
    }

    setAllCategories(uniqueCategories);
  }, [mockupData])

  useEffect(() => {
    setVisibleMockupData(mockupData);
  }, [mockupData]);
  
  useEffect(() => {
    if (!selectedCategory) {
      setVisibleMockupData(mockupData);
      return;
    }
    const visibleArr = mockupData.filter((mockup) => mockup.category.includes(selectedCategory));
    setVisibleMockupData(visibleArr);
  }, [selectedCategory, mockupData])

  const selectCategory = (category) => {
    setSelectedCategory(category);
  }

  return (
    <div className="container">
      <Categories filteredCategories={filteredCategories} selectCategory={selectCategory} />
      <Mockups mockupData={visibleMockupData} />
    </div>
  );
}

export default App;
