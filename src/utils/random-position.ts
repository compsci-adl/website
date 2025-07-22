export const randomPosition = () => {
    const minOffsetX = 8;
    const minOffsetY = -18;
    const maxOffsetX = window.innerWidth / 16 - 35;
    const maxOffsetY = window.innerHeight / 16 - 48;

    const x = Math.random() * (maxOffsetX - minOffsetX) + minOffsetX;
    const y = Math.random() * (maxOffsetY - minOffsetY) + minOffsetY;
    const rotate = Math.random() * 30 - 15;

    return { x, y, rotate };
};
