function isValid(versionString) {
  return /^\d+\.\d+\.\d+$/.test(versionString);
}

function parse(versionString) {
  if (!isValid(versionString)) {
    throw new Error("Invalid semver version: " + versionString);
  }

  const [major, minor, patch] = versionString
    .split(".")
    .map((part) => parseInt(part, 10));
  return { major, minor, patch };
}

function lt(firstVersionString, secondVersionString) {
  const ver1 = parse(firstVersionString);
  const ver2 = parse(secondVersionString);

  if (ver1.major !== ver2.major) {
    return ver1.major < ver2.major;
  }

  if (ver1.minor !== ver2.minor) {
    return ver1.minor < ver2.minor;
  }

  if (ver1.patch !== ver2.patch) {
    return ver1.patch < ver2.patch;
  }

  return false;
}

function lte(firstVersionString, secondVersionString) {
  const ver1 = parse(firstVersionString);
  const ver2 = parse(secondVersionString);

  if (ver1.major !== ver2.major) {
    return ver1.major <= ver2.major;
  }

  if (ver1.minor !== ver2.minor) {
    return ver1.minor <= ver2.minor;
  }

  if (ver1.patch !== ver2.patch) {
    return ver1.patch <= ver2.patch;
  }

  return true;
}

function gt(firstVersionString, secondVersionString) {
  const ver1 = parse(firstVersionString);
  const ver2 = parse(secondVersionString);

  if (ver1.major !== ver2.major) {
    return ver1.major > ver2.major;
  }

  if (ver1.minor !== ver2.minor) {
    return ver1.minor > ver2.minor;
  }

  if (ver1.patch !== ver2.patch) {
    return ver1.patch > ver2.patch;
  }

  return false;
}

function gte(firstVersionString, secondVersionString) {
  const ver1 = parse(firstVersionString);
  const ver2 = parse(secondVersionString);

  if (ver1.major !== ver2.major) {
    return ver1.major >= ver2.major;
  }

  if (ver1.minor !== ver2.minor) {
    return ver1.minor >= ver2.minor;
  }

  if (ver1.patch !== ver2.patch) {
    return ver1.patch >= ver2.patch;
  }

  return true;
}

function eq(firstVersionString, secondVersionString) {
  parse(firstVersionString);
  parse(secondVersionString);

  return firstVersionString === secondVersionString;
}

module.exports = {
  isValid,
  parse,
  lt,
  lte,
  gt,
  gte,
  eq,
};
