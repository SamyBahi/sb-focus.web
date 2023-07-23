import { Action } from "@reduxjs/toolkit";

// TaskSlice types
export type task = {
  _id: string;
  title: string;
  myDay: boolean;
  important: boolean;
  completed: boolean;
  index: {
    myDay: number;
    list: number;
  };
  userId: string;
  steps?: [];
  files?: [];
  createdAt: any;
  updatedAt: any;
  __V: number;
  listId?: string;
  dueDate?: string | null;
  note?: string;
};

export type taskState = {
  tasks: task[];
  currentList: string;
  currentListTitle: string;
  currentTasks: task[];
};

export interface setTasksAction extends Action {
  payload: taskState["tasks"];
}

export interface addTaskAction extends Action {
  payload: {
    _id: string;
    title: string;
    myDay: boolean;
    important: boolean;
    completed: boolean;
    index: {
      myDay: number;
      list: number;
    };
    userId: string;
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

export interface searchTaskAction extends Action {
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

export interface updateTaskNoteAction extends Action {
  payload: {
    id: string;
    newNote: string;
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

// MenusSlice types
export type menuState = {
  showLeftMenu: boolean;
};

// ListsSlices types
export type listsState = {
  baseLists: [
    {
      id: "myday";
      title: "My Day";
    },
    {
      id: "important";
      title: "Important";
    },
    {
      id: "planned";
      title: "Planned";
    },
    {
      id: "inbox";
      title: "Tasks";
    }
  ];
  customLists: list[];
};

export interface setCustomListsAction extends Action {
  payload: {
    customLists: list[];
  };
}

export interface addCustomListAction extends Action {
  payload: {
    list: list;
  };
}

export interface updateListTitleAction extends Action {
  payload: {
    id: string;
    title: string;
  };
}

export type list = {
  id: string;
  title: string;
};

//general
export interface actionWithId extends Action {
  payload: {
    id: string;
  };
}
