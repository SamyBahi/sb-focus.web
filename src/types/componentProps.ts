import { PropsWithChildren } from "react";
import { To } from "react-router-dom";

export interface addTaskProps {
  properties: {
    myDay?: boolean;
    important?: boolean;
    listId?: string;
  };
}

export interface taskSectionProps {
  title: string;
  url: string;
  myDay?: boolean;
  important?: boolean;
  dueDate?: string;
  draggable: boolean;
}

export interface baseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export interface taskCardProps {
  task: {
    title: String;
    completed: boolean;
    important: boolean;
    dueDate?: string;
    id: string;
    index: number;
  };
}

export interface buttonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface listItemProps extends PropsWithChildren {
  link: To;
}
