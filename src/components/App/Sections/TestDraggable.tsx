import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "../../UI/SortableItem";

const TestDraggable = () => {
  const [languages, setLanguages] = useState(["js", "py", "ts"]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("salut");
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="w-full flex flex-1 flex-col p-5 items-center">
        <h1>Salut !</h1>
        <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
        >
          {languages.map((language) => (
            <SortableItem key={language} id={language} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default TestDraggable;
