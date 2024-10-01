import { useState, useEffect } from 'react';

export const MoveCircles = () => {
  type Shapes = {
    id: number;
    type: string;
    x: number;
    y: number;
  };

  const initialShapes: Shapes[] = [
    { id: 0, type: 'circle', x: 50, y: 100 },
    { id: 1, type: 'square', x: 150, y: 100 },
    { id: 2, type: 'triangle', x: 250, y: 100 },
  ];

  const [shapes, setShapes] = useState<Array<Shapes>>(initialShapes);
  const [swapShapes, setSwapShapes] = useState<Array<Shapes>>([]);
  useEffect(() => {
    if (swapShapes.length === 2) {
      const updatedShapes = [...shapes];
      const index1 = updatedShapes.findIndex((shape) => shape.id === swapShapes[0].id);
      const index2 = updatedShapes.findIndex((shape) => shape.id === swapShapes[1].id);

      // Check if both indices are valid
      if (index1 !== -1 && index2 !== -1) {
        // Swap the shapes
        [updatedShapes[index1], updatedShapes[index2]] = [
          updatedShapes[index2],
          updatedShapes[index1],
        ];

        setShapes(updatedShapes);
      } else {
        console.error('Invalid indices for swapping shapes:', index1, index2);
      }

      setSwapShapes([]); // Clear swaps after swapping
    }
  }, [swapShapes]);

  // Effect to handle shape swapping
  // useEffect(() => {
  //   if (swapShapes.length === 2) {
  //     const updatedShapes = [...shapes];
  //     const index1 = updatedShapes.findIndex((shape) => shape.id === swapShapes[0].id);
  //     const index2 = updatedShapes.findIndex((shape) => shape.id === swapShapes[1].id);

  //     // Swap the shapes

  //     [updatedShapes[index1].x, updatedShapes[index2].x] = [
  //       updatedShapes[index2].x,
  //       updatedShapes[index1].x,
  //     ];
  //     [updatedShapes[index1].y, updatedShapes[index2].y] = [
  //       updatedShapes[index2].y,
  //       updatedShapes[index1].y,
  //     ];
  //     setShapes(updatedShapes);
  //     setSwapShapes([]);
  //     console.log(updatedShapes);
  //   }
  // }, [swapShapes]);
  useEffect(() => {
    if (swapShapes.length === 2) {
      const [shape1, shape2] = swapShapes.map((swap) =>
        shapes.find((shape) => shape.id === swap.id),
      );

      if (shape1 && shape2) {
        const updatedShapes = shapes.map((shape) => {
          if (shape.id === shape1.id) {
            return { ...shape, x: shape2.x, y: shape2.y };
          } else if (shape.id === shape2.id) {
            return { ...shape, x: shape1.x, y: shape1.y };
          }
          return shape;
        });

        setShapes(updatedShapes);
        setSwapShapes([]);
        console.log(updatedShapes);
      }
    }
  }, [swapShapes, shapes]);

  // Move circles down
  const handleClick = () => {
    const updatedShapes = shapes.map((shape) =>
      shape.type === 'square' ? shape : { ...shape, y: shape.y + 100 },
    );
    setShapes(updatedShapes);
  };

  // save shapes in swap shape array on shape click
  const handleSwap = (id: number) => {
    const selectedShape = shapes.find((shape) => shape.id === id);
    if (selectedShape && swapShapes.length < 2) {
      setSwapShapes((prevSwaps) => [...prevSwaps, selectedShape]);
    }
    console.log('*******************************');
    console.log(swapShapes);
    console.log('*******************************');
  };

  return (
    <>
      <button onClick={handleClick}>Move circles down!</button>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {shapes.map((shape, idx) => (
          <div
            key={idx}
            style={{
              background: 'purple',
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              borderRadius: shape.type === 'circle' ? '50%' : '0%',
              borderLeft: shape.type === 'triangle' ? '15px solid transparent' : undefined,
              borderRight: shape.type === 'triangle' ? '15px solid transparent' : undefined,
              borderBottom: shape.type === 'triangle' ? '30px solid purple' : undefined,

              width: 30,
              height: 30,
            }}
            onClick={() => handleSwap(shape.id)}
          />
        ))}
      </div>
    </>
  );
};
