const ObjectGet = require('lodash.get');
const ObjectSet = require('lodash.set');
const { Macroable } = require('@ostro/support/macro');

const kConfig = Symbol('config');

class Config extends Macroable {
    /**
     * Internal configuration storage symbol.
     */
    [kConfig]: Record<string, any>;

    /**
     * Create a new configuration repository instance.
     *
     * @param $items Initial configuration items.
     */
    constructor($items: Record<string, any> = {}) {
        super();
        Object.defineProperty(this, kConfig, {
            value: $items,
            writable: true,
        });
    }

    /**
     * Get the specified configuration value.
     *
     * @param configPath The key or dot-notated path.
     * @param defaultValue The default fallback value.
     * @returns The resolved configuration value.
     */
    get<T = any>(configPath: string, defaultValue: T | null = null): T | null {
        return ObjectGet(this[kConfig], configPath, defaultValue);
    }

    /**
     * Set a given configuration value.
     *
     * @param key The key or dot-notated path.
     * @param value The value to store.
     * @returns The updated storage object.
     */
    set(key: string, value: any): any {
        return ObjectSet(this[kConfig], key, value);
    }

    /**
     * Proxy getter handler.
     *
     * @param target The config repository target.
     * @param method The property name to read.
     * @returns The resolved value.
     */
    __get(target: Config, method: string): any {
        return target.get(method);
    }

    /**
     * Proxy setter handler.
     *
     * @param target The config repository target.
     * @param key The property key to write.
     * @param value The value to store.
     * @returns The result of setting the value.
     */
    __set(target: Config, key: string, value: any): any {
        return target.set(key, value);
    }
}

module.exports = Config;
