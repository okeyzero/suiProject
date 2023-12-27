# @suchipi/femver

> Lightweight alternative to semver, supporting absolute versions only

The [semver npm package](https://www.npmjs.com/package/semver) is big, weighing in at 88.2 kB (with one dependency, weighing 53.9 kB).

It's big because it has a lot of features, like:

- Matching versions against ranges and patterns
- Coercing vague versions into semver strings
- Identifying the minimum/maximum version of a range
- Cleaning version-like strings into semver strings

These features are great; they're what power npm and let us specify version ranges in our `package.json`s.

However, if you only need to compare two version strings, like so:

```js
const semver = require("semver");

semver.gte(process.version, "8.0.0");
```

Then pulling in all of semver is a little unnecessary.

That's where `@suchipi/femver` comes in; it's a lightweight alternative to `semver`, which _only_ supports comparing absolute versions (eg `1.2.0`, not `>= 1.0.0`).

## API

```ts
/**
 * Reports whether `version` is a valid (absolute) semantic version string.
 */
export function isValid(version: string): boolean;

/**
 * Parses `version` into an object containing major, minor, and patch properties.
 */
export function parse(version: string): {
  major: number;
  minor: number;
  patch: number;
};

/**
 * Returns whether `firstVersion` is less than `secondVersion`.
 */
export function lt(firstVersion: string, secondVersion: string): boolean;

/**
 * Returns whether `firstVersion` is less than or equal to `secondVersion`.
 */
export function lte(firstVersion: string, secondVersion: string): boolean;

/**
 * Returns whether `firstVersion` is greater than `secondVersion`.
 */
export function gt(firstVersion: string, secondVersion: string): boolean;

/**
 * Returns whether `firstVersion` is greater than or equal to `secondVersion`.
 */
export function gte(firstVersion: string, secondVersion: string): boolean;

/**
 * Returns whether `firstVersion` is equal to `secondVersion`.
 */
export function eq(firstVersion: string, secondVersion: string): boolean;
```

## Example

```js
const femver = require("@suchipi/femver");
// or:
// import * as femver from "@suchipi/femver";

femver.gte(process.version, "8.0.0");
```

## License

MIT
