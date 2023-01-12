export const flipper:Function = (num: number): number => {
    return Math.floor(((Math.random() * 2) * num) - num);
}

export const getRandomInRange:Function = (mn:number, mx:number): number => {
    return Math.floor(Math.random() * (mx - mn)) + mn
}

export const getRandomItem:Function = <T>(arr:T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}
