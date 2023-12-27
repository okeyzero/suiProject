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
