// utils/comparison.js
export const getComparisonList = () => {
    const list = localStorage.getItem('comparisonList');
    return list ? JSON.parse(list) : [];
  };
  
  export const saveComparisonList = (list) => {
    localStorage.setItem('comparisonList', JSON.stringify(list));
  };