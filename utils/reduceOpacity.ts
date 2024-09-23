export const reduceOpacity = (hslaString: string, newOpacity: number) => {
    return hslaString.replace(/[\d.]+\)$/g, `${newOpacity})`);
};