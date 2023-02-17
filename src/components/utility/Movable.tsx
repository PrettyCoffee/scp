import { useEffect, useId } from "react"

import { DndContext, Modifier, useDraggable } from "@dnd-kit/core"
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"

import { DisabledProp, Position, globalCursor } from "~/components/base"

const createSnapModifier =
  (gridSize: number): Modifier =>
  ({ transform }) => ({
    ...transform,
    x: Math.round(transform.x / gridSize) * gridSize,
    y: Math.round(transform.y / gridSize) * gridSize,
  })

interface MovableState {
  draggableProps: object
  buttonProps: object
  transform: { x: number; y: number }
  isDragging: boolean
}

interface DraggableProps extends DisabledProp {
  children: (movable: MovableState) => JSX.Element
}

const DraggableItem = ({ disabled, children }: DraggableProps) => {
  const id = useId()
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
    id,
    disabled,
  })

  useEffect(() => {
    if (isDragging) globalCursor.apply("grabbing")
    else globalCursor.reset()
  }, [isDragging])

  const draggableProps = {
    ref: setNodeRef,
  }

  const buttonProps = {
    ref: setActivatorNodeRef,
    ...listeners,
    ...attributes,
  }

  const movable: MovableState = {
    draggableProps,
    buttonProps,
    transform: {
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
    },
    isDragging,
  }

  return children(movable)
}

export interface MovableProps extends DraggableProps {
  snapSize: number
  onMoveStart?: () => void
  onMoveEnd?: (change: Position) => void
}

export const Movable = ({
  snapSize,
  onMoveEnd,
  onMoveStart,
  ...draggable
}: MovableProps) => {
  const modifiers = [
    restrictToWindowEdges,
    restrictToParentElement,
    createSnapModifier(snapSize),
  ]

  return (
    <DndContext
      onDragStart={onMoveStart}
      onDragEnd={({ delta }) => onMoveEnd?.(delta)}
      modifiers={modifiers}
    >
      <DraggableItem {...draggable} />
    </DndContext>
  )
}
