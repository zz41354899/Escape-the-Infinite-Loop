import React, { useCallback, useEffect } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function HomeParticles() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // Add pointer-events: none to the canvas to ensure it doesn't interfere with interactions
    if (container && container.canvas && container.canvas.element) {
      container.canvas.element.style.pointerEvents = "none";
    }
  }, []);

  // Cleanup function to destroy particles when component unmounts
  useEffect(() => {
    return () => {
      const container = document.getElementById("tsparticles");
      if (container) {
        // Clean up any references to avoid memory leaks
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0f172a",
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        fpsLimit: 30, // Reduced to 30 FPS for better performance
        particles: {
          color: {
            value: ["#ffffff", "#a78bfa", "#7dd3fc", "#d946ef"],
          },
          links: {
            color: "#a78bfa",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 1.5, // Slightly reduced for smoother animation
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 35, // Slightly reduced number of particles
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 0.8, // Slightly reduced for smoother animation
              opacity_min: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            anim: {
              enable: true,
              speed: 0.8, // Slightly reduced for smoother animation
              size_min: 0.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
      }}
    />
  );
} 