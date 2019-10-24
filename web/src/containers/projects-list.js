import React from 'react';
import ProjectGrid from '../components/project-grid';

const ProjectsList = ({ projectNodes }) => {
  const projects = projectNodes.map(flattenTech);
  const techList = getFlatTechList(projects);
  return (
    <>
      <div>{JSON.stringify(techList.map(({ title }) => title))}</div>
      <ProjectGrid {...{ projects }} />
    </>
  );
};

const getFlatTechList = projects =>
  Object.values(
    projects
      .map(({ techList }) => techList.map(({ tech }) => tech))
      .flat(2)
      .reduce((a, c) => {
        const next = { ...a };
        next[c.id] = c;
        return next;
      }, {}),
  ).sort(({ title: a }, { title: b }) =>
    a.toLowerCase() < b.toLowerCase() ? -1 : 0,
  );

const flattenTech = ({ techList: original, ...rest }) => ({
  ...rest,
  techList: original.flat(),
});

export default ProjectsList;
