'use client';
import { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner } from 'matter-js'
import React from 'react';

export default function AirFriction() {
  React.useEffect(() => {
    // Engine (fizika dvigateli) va World yaratish
    const engine = Engine.create()
    const world = engine.world;
    // Endi bizda fizika qonunlariga bo‘ysunadigan dunyo bor

    // Canvas chizish
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        showVelocity: true
      }
    })

    Render.run(render);

    const runner = Runner.create()
    Runner.run(runner, engine)

    Composite.add(world, [
      // falling blocks
      Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
      Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.001 }),
      Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.001 }),

      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ])

    // Bodies.rectangle(400, 100, 400,   1, { isStatic: true }),
                     //  x    y  width height 

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });
  }, [])

  return <></>;
}
