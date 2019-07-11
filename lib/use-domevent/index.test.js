"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const index_1 = require("./index");
describe('useDOMEvent', () => {
    test('should register event correctly', () => {
        const el = document.createElement('div');
        const callback = jest.fn(() => { });
        const ref = {
            current: el,
        };
        const { result } = react_hooks_1.renderHook(() => index_1.useDOMEvent(ref, 'click', callback));
        el.dispatchEvent(new Event('click'));
    });
});
