import {describe, expect, test} from "vitest";
import {fireEvent, renderHook} from "@testing-library/react";
import {useMousePosRef} from "./useMousePosRef";

describe('test useMousePosRef',() => {
    test('useMousePosRef work nice', () => {
        const {result, unmount} = renderHook(useMousePosRef)

        expect(result.current.current.x).toBe(0)
        expect(result.current.current.y).toBe(0)
        const {innerWidth, innerHeight} = window

        fireEvent.mouseMove(window, {
            clientX: 100,
            clientY: 100
        })
        expect(result.current.current.x).toBe(100)
        expect(result.current.current.y).toBe(100)
        expect(result.current.current.xPercent).toBe(100/innerWidth)
        expect(result.current.current.yPercent).toBe(100/innerHeight)
    })
})