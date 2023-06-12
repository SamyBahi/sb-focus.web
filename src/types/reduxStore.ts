import { Action } from "@reduxjs/toolkit";

export interface taskState {
  tasks: {
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
    dueDate?: Date;
    note?: String;
  }[];
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

export interface updateIndexAction extends Action {
  payload: {
    id: string;
    newIndex: number;
  };
}

export interface actionWithId extends Action {
  payload: {
    id: string;
  };
}
