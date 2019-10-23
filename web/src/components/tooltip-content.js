import React from 'react';

const TooltipContent = ({ title, description, fluid }) => {
  return (
    <div>
      {title} {description}
    </div>
  );
};

export default TooltipContent;
