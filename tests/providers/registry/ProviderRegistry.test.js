import test from "node:test";
import assert from "node:assert/strict";

import { ProviderRegistry } from "../../../src/providers/registry/ProviderRegistry.js";


test("register() stores a provider", () => {
    const registry = new ProviderRegistry();

    const provider = {
        hash() {},
        verify() {},
    };

    registry.register("password", provider);

    assert.equal(
        registry.has("password"),
        true
    );
});


test("get() returns the registered provider", () => {
    const registry = new ProviderRegistry();

    const provider = {
        hash() {},
        verify() {},
    };

    registry.register("password", provider);

    const result = registry.get("password");

    assert.equal(result, provider);
});


test("has() returns false for unregistered provider", () => {
    const registry = new ProviderRegistry();

    assert.equal(
        registry.has("password"),
        false
    );
});


test("get() throws when provider is not registered", () => {
    const registry = new ProviderRegistry();

    assert.throws(
        () => registry.get("password"),
        /not registered/
    );
});


test("register() rejects missing provider name", () => {
    const registry = new ProviderRegistry();

    const provider = {
        hash() {},
        verify() {},
    };

    assert.throws(
        () => registry.register(null, provider),
        /name is required/
    );
});


test("register() rejects missing provider", () => {
    const registry = new ProviderRegistry();

    assert.throws(
        () => registry.register("password", null),
        /required/
    );
});


test("register() supports method chaining", () => {
    const registry = new ProviderRegistry();

    const passwordProvider = {
        hash() {},
        verify() {},
    };

    const tokenProvider = {
        sign() {},
        verify() {},
    };

    const result = registry
        .register("password", passwordProvider)
        .register("token", tokenProvider);

    assert.equal(result, registry);

    assert.equal(
        registry.get("password"),
        passwordProvider
    );

    assert.equal(
        registry.get("token"),
        tokenProvider
    );
});