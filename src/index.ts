import { existsSync } from "fs";
import consola from "consola";
import path from "path";
import * as cp from "child_process";

export function detectPackageManager(cwd?: string) {
  if (!cwd) cwd = process.cwd();
  var isYarn = checkForYarn(cwd);
  var isNpm = checkForNpm(cwd);
  var isPnpm = checkForPnpm(cwd);
  // Add pnpm Support
  if (isNpm) {
    consola.info("Detected package manager: npm");
    return "npm";
  } else if (isYarn) {
    consola.info("Detected package manager: yarn");
    return "yarn";
  } else if (isPnpm) {
    consola.info("Detected package manager: pnpm");
    return "pnpm";
  } else {
    consola.error("Can't detect any package manager");
  }
}

export function installPackage(
  packageNames: string,
  packageManager?: string,
  cwd?: string
) {
  if (!cwd) cwd = process.cwd();
  if (!packageNames) return consola.error("No package name provided");
  if (!packageManager) {
    packageManager = detectPackageManager(cwd);
  }
  if (packageManager === "yarn") {
    try {
      let cmd = `yarn add ${packageNames}`;
      consola.info("Installing dependencies...");
      cp.execSync(cmd, {
        cwd,
      });
      consola.success("Installed dependencies :)");
    } catch (error) {
      consola.error(error);
    }
  } else if (packageManager === "npm") {
    try {
      let cmd = `npm install ${packageNames}`;
      consola.info("Installing dependencies...");
      cp.execSync(cmd, {
        cwd,
      });
      consola.success("Installed dependencies :)");
    } catch (error) {
      consola.error(error);
    }
  } else if (packageManager === 'pnpm') {
    try {
      let cmd = `pnpm add ${packageNames}`;
      consola.info("Installing dependencies...");
      cp.execSync(cmd, {
        cwd,
      });
      consola.success("Installed dependencies :)");
    } catch (error) {
      consola.error(error);
    }
  } else {
    consola.error("Cant find a package manager to install this package");
  }
}

function checkForNpm(cwd?: string): boolean {
  if (doesFileExist("package-lock.json", cwd)) {
    return true;
  } else {
    return false;
  }
}

function checkForYarn(cwd?: string): boolean {
  if (doesFileExist("yarn.lock", cwd)) {
    return true;
  } else {
    return false;
  }
}

function checkForPnpm(cwd?:string): boolean {
  if (doesFileExist("pnpm-lock.yaml", cwd)) {
    return true;
  } else {
    return false;
  }
}

function doesFileExist(fileName: string, cwd?: string) {
  if (!cwd) {
    cwd = process.cwd();
  }
  var filePath = path.join(cwd, fileName);
  return existsSync(filePath);
}
