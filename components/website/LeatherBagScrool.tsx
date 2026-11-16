"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 284;

export default function LeatherBagScroll() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;

        if (!section || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let active = true;
        let currentFrame = 0;

        const images: HTMLImageElement[] = [];

       const renderFrame = (index: number) => {
    const image = images[index];

    if (
        !active ||
        !image?.complete ||
        !image.naturalWidth
    ) {
        return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Premium dark espresso background
    const bgColor = "#241b16";

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Keep the complete product and table visible
    const scale = Math.min(
        width / image.naturalWidth,
        height / image.naturalHeight
    );

    // Slightly enlarge the image without excessive cropping
    const zoom = 1.03;

    const imageWidth = image.naturalWidth * scale * zoom;
    const imageHeight = image.naturalHeight * scale * zoom;

    const x = (width - imageWidth) / 2;
    const y = (height - imageHeight) / 2;

    ctx.drawImage(
        image,
        x,
        y,
        imageWidth,
        imageHeight
    );

    // Blend the left edge into the page background
    const fadeWidth = 200 * dpr;

    const leftGradient = ctx.createLinearGradient(
        x,
        0,
        x + fadeWidth,
        0
    );

    leftGradient.addColorStop(0, bgColor);
    leftGradient.addColorStop(1, "rgba(36, 27, 22, 0)");

    ctx.fillStyle = leftGradient;
    ctx.fillRect(x, 0, fadeWidth, height);

    // Blend the right edge into the page background
    const rightGradient = ctx.createLinearGradient(
        x + imageWidth - fadeWidth,
        0,
        x + imageWidth,
        0
    );

    rightGradient.addColorStop(0, "rgba(36, 27, 22, 0)");
    rightGradient.addColorStop(1, bgColor);

    ctx.fillStyle = rightGradient;
    ctx.fillRect(
        x + imageWidth - fadeWidth,
        0,
        fadeWidth,
        height
    );
};

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);

            renderFrame(currentFrame);
        };

        // Load image sequence.
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const image = new Image();

            image.onload = () => {
                if (i === currentFrame) {
                    renderFrame(currentFrame);
                }
            };

            image.src = `/images/leather/1/frame_${String(i + 1).padStart(5, "0")}.jpg`;

            images.push(image);
        }

        resizeCanvas();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(canvas);

        const frameState = { frame: 0 };

        const tween = gsap.to(frameState, {
            frame: TOTAL_FRAMES - 1,
            ease: "none",

            onUpdate: () => {
                const currentFrame = Math.round(frameState.frame);
                renderFrame(currentFrame);
            },

            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
            },
        });
        return () => {
            active = false;

            tween.scrollTrigger?.kill();
            tween.kill();

            resizeObserver.disconnect();

            images.forEach((image) => {
                image.onload = null;
            });
        };
    }, []);

    return (
        <section
    ref={sectionRef}
    className="relative h-screen min-h-125 w-full overflow-hidden bg-[#241b16]"
>
    <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-label="Leather backpack animation"
        role="img"
    />
</section>
    );
}