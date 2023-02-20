'use strict';

class aUrl extends globalThis.URL {
    constructor(url, base) {
        super(url || '', base);
        this.hashPrefix = ''; // hash 前缀
        this.searchSuffix = ''; // search 后缀
        let { search, hash } = this;
        // hash
        if (hash) {
            const idx = hash.indexOf('?');
            if (idx > -1) {
                this.hashPrefix = hash.slice(0, idx + 1);
                hash = hash.slice(idx + 1);
            }
        }
        // search
        if (search && search.endsWith('/')) {
            this.searchSuffix = '/';
            search = search.slice(0, -1);
        }
        this.qs = new globalThis.URLSearchParams(hash);
        this.ps = new globalThis.URLSearchParams(search);
    }
    setQueryString(name, value, replace = true) {
        if (replace)
            this.qs.set(name, value);
        else
            this.qs.append(name, value);
        this.hash = this.hashPrefix + decodeURIComponent(this.qs.toString());
        return this;
    }
    getQueryString() {
        return this.qs.toString();
    }
    setParamString(name, value, replace = true) {
        if (replace)
            this.ps.set(name, value);
        else
            this.ps.append(name, value);
        this.search = decodeURIComponent(this.ps.toString());
        return this;
    }
    getParamString() {
        return this.ps.toString();
    }
    get(name) {
        const value = this.qs.get(name) || this.qs.get(name);
        return value;
    }
    getAll(name) {
        const result = [];
        result.push(...this.qs.getAll(name));
        result.push(...this.ps.getAll(name));
        return result;
    }
    has(name) {
        return this.qs.has(name) || this.ps.has(name);
    }
    keys() {
        return [...this.qs.keys(), ...this.ps.keys()];
    }
    entries() {
        return [...this.qs.entries(), ...this.ps.entries()];
    }
    delete(name) {
        this.qs.delete(name);
        this.ps.delete(name);
        const qString = this.qs.toString();
        const pString = this.ps.toString();
        if (qString) {
            this.hash = this.hashPrefix + decodeURIComponent(qString);
        }
        else {
            this.hash = '';
        }
        if (pString) {
            this.search = decodeURIComponent(pString);
        }
        else {
            this.search = '';
        }
        return this;
    }
    forEach(callback) {
        if (callback) {
            this.qs.forEach(callback);
            this.ps.forEach(callback);
        }
    }
    toString() {
        let { hash, hashPrefix, search, searchSuffix, origin, pathname } = this;
        let finalHashPrefix = hashPrefix;
        if (finalHashPrefix) {
            finalHashPrefix = hash ? hashPrefix : hashPrefix.endsWith('?') ? hashPrefix.slice(0, hashPrefix.length - 1) : hashPrefix;
        }
        else if (hash) {
            hash = decodeURIComponent(this.qs.toString());
        }
        if (pathname.endsWith('/') && !search) {
            searchSuffix = '';
        }
        return `${origin}${pathname}${search}${search ? searchSuffix : ''}${finalHashPrefix}${hash}`;
    }
}
function CreateUrl(url, base) {
    var _a;
    const instance = new aUrl(url || ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.location) === null || _a === void 0 ? void 0 : _a.href), base);
    return instance;
}

module.exports = CreateUrl;
