import { useRef, useEffect } from "react";

// Su dung de lay gia tri preVious State
export const usePrevious = <T>(value: T) => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
