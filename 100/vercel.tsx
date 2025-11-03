'use client';
import React from 'react'
import { Engine, Bodies, Composite, Render, Runner, Mouse, MouseConstraint, Composites, Common } from 'matter-js';

export default function Vercel() {
  React.useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: document.body,
      engine,
      options: {
        width: 800,
        height: 600,
        showAngleIndicator: false,
        background: '#000000', // Qora fon
        wireframes: false // Ranglarni ko'rsatish uchun
      }
    })

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // To'rt tarafga devorlar (ko'rinmas)
    Composite.add(world, [
      Bodies.rectangle(400, 600, 1200, 50, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(400, 0, 1200, 50, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(0, 300, 50, 1200, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(800, 300, 50, 1200, { isStatic: true, render: { visible: false } })
    ]);

    // Vercel stilidagi uchburchaklar - turli o'lchamda
    const triangles = Composites.stack(50, 50, 10, 8, 10, 10, function (x: number, y: number) {
      const size = 30;
      return Bodies.polygon(x, y, 3, size, {
        restitution: 0.6,
        friction: 0.1,
        angle: Math.PI / 2,
        render: {
          fillStyle: '#ffffff' // Oq uchburchaklar
        }
      });
    });

    Composite.add(world, triangles);

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
    render.mouse = mouse;
  }, [])

  return <></>
}
