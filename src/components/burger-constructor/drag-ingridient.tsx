import { useRef, FC, ReactElement } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveIngredient } from "../../services/reducers/constructor-reducer";
import type { Identifier } from "dnd-core";

interface DragItemProps {
  id: string;
  index: number;
  children?: ReactElement;
}

interface DragObject {
  id: string;
  index: number;
}

interface CollectedProps {
  handlerId: Identifier | null;
}

export const DragIngridient: FC<DragItemProps> = ({ id, index, children }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragObject, undefined, CollectedProps>({
    accept: "ingredientsChangePos",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
<<<<<<< Updated upstream:src/components/burger-constructor/drag-ingridient.jsx
      // Здесь какая то ошибка
=======
>>>>>>> Stashed changes:src/components/burger-constructor/drag-ingridient.tsx
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragChangePos] = useDrag({
    type: "ingredientsChangePos",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.1 : 1;

  dragChangePos(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {children}
    </div>
  );
};
