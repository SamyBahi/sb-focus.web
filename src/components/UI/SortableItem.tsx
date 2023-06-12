import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        id="task-card"
        className="flex h-12 bg-white mt-2 rounded-md drop-shadow-lg transition-all"
      >
        <p>{props.id}</p>
      </div>
    </div>
  );
};
export default SortableItem;
