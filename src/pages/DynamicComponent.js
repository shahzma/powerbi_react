import React from 'react';

const DynamicComponent = (componentName) => {
  const component = React.lazy(() => import(`./${componentName}`)); // dynamically import the component using React.lazy() and template literals

  return component;
};

export default DynamicComponent;
