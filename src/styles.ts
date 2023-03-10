export const baseClass = "inline-block whitespace-nowrap rounded-[0.27rem] px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none";
export const first = `${baseClass} bg-blue-100`;
export const second = `${baseClass} bg-amber-100`;
export const third = `${baseClass} bg-teal-100`;
export const fourth = `${baseClass} bg-red-100`;

export function selectClass(type: string) {
    if(type === "Просто") return first;
    
    if(type === "Можно отложить") return second;

    if(type === "Как можно скорее") return third;

    if(type === "Супер срочно") return fourth;

    return `${baseClass} + bg-gray-200`;
}