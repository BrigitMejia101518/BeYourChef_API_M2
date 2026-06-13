import { isSafe } from "./password";
import { describe, it, expect } from "vitest";


describe("isSafe", () => {
    it("devuelve true si la contraseña tiene 6 caracteres o mas", () => {

        const password = "123456";

        const result = isSafe(password);

        expect(result).toBe(true);

    });
    
});
