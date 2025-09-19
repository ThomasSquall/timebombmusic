import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import type { ListItemProps } from "@mui/material";
import { SidebarItemBranch } from "./SidebarItemBranch";
import SidebarItemLeaf from "./SidebarItemLeaf";

interface SidebarItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  chip?: ReactNode;
  depth: number;
  icon?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const {
    active,
    children,
    chip,
    depth,
    icon,
    info,
    open,
    path,
    title,
    ...other
  } = props;

  // Branch
  if (children) {
    return (
      <SidebarItemBranch
        depth={depth}
        active={active}
        children={children}
        icon={icon}
        open={open}
        title={title}
        {...other}
      />
    );
  }

  // Leaf
  return (
    <SidebarItemLeaf
      depth={depth}
      active={active}
      icon={icon}
      title={title}
      info={info}
      path={path}
      chip={chip}
    />
  );
};

SidebarItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SidebarItem.defaultProps = {
  active: false,
  open: false,
};
