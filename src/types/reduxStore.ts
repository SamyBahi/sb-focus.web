import { Action } from "@reduxjs/toolkit";

export interface task {
  _id: String;
  title: String;
  myDay: boolean;
  important: boolean;
  completed: boolean;
  index: {
    myDay: number;
    list: number;
  };
  userId: String;
  steps?: [];
  files?: [];
  createdAt: any;
  updatedAt: any;
  __V: number;
  listId?: String;
  dueDate?: string | null;
  note?: String;
}

export interface taskState {
  tasks: task[];
  currentList: string;
  currentTasks: task[];
}

export interface menuState {
  showLeftMenu: boolean;
  showRightMenu: boolean;
}

export interface setTasksAction extends Action {
  payload: taskState["tasks"];
}

export interface addTaskAction extends Action {
  payload: {
    _id: String;
    title: String;
    myDay: boolean;
    important: boolean;
    completed: boolean;
    index: {
      myDay: number;
      list: number;
    };
    userId: String;
    steps: [];
    files: [];
    createdAt: any;
    updatedAt: any;
    __V: number;
  };
}

export interface updateCurrentListAction extends Action {
  payload: string;
}

export interface updateIndexAction extends Action {
  payload: {
    id: string;
    newIndex: number;
  };
}
export interface updateTitleAction extends Action {
  payload: {
    id: string;
    newTitle: string;
  };
}

export interface updateTaskMyDayAction extends Action {
  payload: {
    id: string;
    myDay: boolean;
  };
}

export interface updateTaskDueDateAction extends Action {
  payload: {
    id: string;
    dueDate: string | null;
  };
}

export interface actionWithId extends Action {
  payload: {
    id: string;
  };
}
