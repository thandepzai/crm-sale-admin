import { debounce } from "lib/util/functions";
import { useRef } from "react";

export const useDebound = (runFirst = false) => {
    const debounceRef = useRef();
    const isRunnedFirst = useRef<boolean>(false);

    if (runFirst && !isRunnedFirst.current) {
        isRunnedFirst.current = true;
        return (callback: () => void) => debounce(debounceRef, callback, 0);
    }

    return (callback: () => void, delay: number) => debounce(debounceRef, callback, delay);
};

/*
Example use:

const throttle = useThrottle

<Input onChange={(text) => throttle(() => {do something}, 500)}/>

It only trigger change text event after stop typing 500ms
*/
