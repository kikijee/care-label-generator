'use client';
import React, { memo, useCallback, useState } from 'react';

export const Draggable = memo(function (props: {
  children: React.ReactNode;
  position: { x: number; y: number };
}) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(props.position);

  const startDrag = useCallback(() => {
    setDragging(true);
  }, []);

  const stopDrag = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrag = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) {
        const parentRect = e.currentTarget.parentElement!.getBoundingClientRect();
        const childRect = e.currentTarget.getBoundingClientRect();

        const newX = Math.max(
          0,
          Math.min(position.x + e.movementX, parentRect.width - childRect.width)
        );
        const newY = Math.max(
          0,
          Math.min(position.y + e.movementY, parentRect.height - childRect.height)
        );

        setPosition({ x: newX, y: newY });
      }
    },
    [dragging, position]
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseMove={handleDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag} // Stop dragging if the mouse leaves the component
    >
      <div
        className="handle"
        onMouseDown={startDrag}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </div>
    </div>
  );
});
