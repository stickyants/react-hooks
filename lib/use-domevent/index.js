"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useDOMEvent(ref, eventType, callback, opts = undefined) {
    react_1.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const eventCallback = (e) => callback(e);
        ref.current.addEventListener(eventType, eventCallback);
        return () => {
            ref.current.removeEventListener(eventType, eventCallback);
        };
    }, [ref.current]);
}
exports.useDOMEvent = useDOMEvent;
