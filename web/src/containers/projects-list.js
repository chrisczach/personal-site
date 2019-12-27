import React from 'react';
import ProjectGrid from '../components/project-grid';

const ProjectsList = ({ projectNodes }) => {
  const projects = projectNodes.map(flattenTech);
  // const techList = getFlatTechList(projects);
  return (
    <>
      {/* <div>{JSON.stringify(techList.map(({ title }) => title))}</div> */}
      <ProjectGrid {...{ projects }} />
    </>
  );
};

// const getFlatTechList = projects =>
//   Object.values(
//     flatDeep(projects
//       .map(({ techList }) => techList.map(({ tech }) => tech)),2)
//       .reduce((a, c) => {
//         const next = { ...a };
//         next[c.id] = c;
//         return next;
//       }, {}),
//   ).sort(({ title: a }, { title: b }) =>
//     a.toLowerCase() < b.toLowerCase() ? -1 : 0,
//   );

const flattenTech = ({ techList: original, ...rest }) => ({
  ...rest,
  techList: flatDeep(original),
});

const flatDeep = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        [],
      )
    : arr.slice();
};

export default ProjectsList;
