import React from "react";

import Delete from "../../assets/icons/trash.png";
import Edit from "../../assets/icons/edit.png";

const icons = {
  delete: Delete,
  edit: Edit,
};

const Icon = ({ name, size }) => {
  return (
    <img src={icons[name]} height={size} width={size} alt={`icon-${name}`} />
  );
};

export default Icon;
