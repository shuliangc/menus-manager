import { useMemo, createContext, useContext } from "react";
import { Button } from "@otakus/design";
import { DragOutlined } from "@otakus/icons";
import { useSortable } from "@dnd-kit/sortable";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { CSS } from "@dnd-kit/utilities";

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = createContext<RowContextProps>({});

type RowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  "data-row-key": string;
};

export const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<DragOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

export default function SortableRow({ children, ...props }: RowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: props["data-row-key"] });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {children}
      </tr>
    </RowContext.Provider>
  );
}
