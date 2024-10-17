import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const index = ({ project }: Props) => {
  return (
    <div className="">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default index;
