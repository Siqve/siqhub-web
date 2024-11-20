export const replaceHexInHexes = (hexes: string, newHex: string, index: number): string => {
    const hexArray = hexes.split(",");
    hexArray[index] = newHex;
    return hexArray.join(",");
};

export const appendHexToHexes = (hexes: string, newHex: string): string => {
    return hexes + "," + newHex;
};

export const moveHexLeft = (hexes: string, index: number): string => {
    const hexArray = hexes.split(",");
    const hex = hexArray[index];
    hexArray.splice(index, 1);
    hexArray.splice(index - 1, 0, hex);
    return hexArray.join(",");
};

export const moveHexRight = (hexes: string, index: number): string => {
    const hexArray = hexes.split(",");
    const hex = hexArray[index];
    hexArray.splice(index, 1);
    hexArray.splice(index + 1, 0, hex);
    return hexArray.join(",");
};

export const deleteHex = (hexes: string, index: number): string => {
    const hexArray = hexes.split(",");
    hexArray.splice(index, 1);
    return hexArray.join(",");
};
