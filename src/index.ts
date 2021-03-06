import { existsSync } from "fs";
import consola from "consola";
import path from "path";
import * as cp from "child_process";

/*
if there are multiple lockfiles in a directory,
the package manager will get detected in the following order:
- yarn
- npm
- pnpm
*/

const packageManagers = {
  yarn: {
    installCmd: "add",
    file: "yarn.lock",
    dev: "--save-dev",
  },
  npm: {
    installCmd: "install",
    file: "package-lock.json",
    dev: "--save-dev",
  },
  pnpm: {
    installCmd: "install",
    file: "pnpm-lock.yaml",
    dev: "--dev",
  },
};

export function detectPackageManager(fallbackToNpm?: boolean, cwd?: string) {
  if (!cwd) cwd = process.cwd();
  let pkgMgr = getPkgMgr(cwd);
  if (pkgMgr != "none") {
    consola.info(`Detected package manager: ${pkgMgr}`);
    return pkgMgr;
  } else {
    if (fallbackToNpm) {
      consola.warn("Can't detect a package manager, auto fallback to: 'npm'");
      return "npm";
    }
    return "none";;
  }
}

export function installPackage(
  packageNames: string,
  devPackage?: boolean,
  fallbackToNpm?: boolean,
  packageManager?: string,
  cwd?: string
) {
  if (!cwd) cwd = process.cwd();
  if (!packageNames) return consola.error("No package name provided");
  if (!packageManager) {
    packageManager = detectPackageManager(fallbackToNpm, cwd);
    if (packageManager === "none") {
      consola.error(new Error("Can't detect a package manager, aborting. (use the 'fallbackToNpm' flag to circumvent this error.)"));
      throw new Error("Can't detect a package manager, aborting. (use the 'fallbackToNpm' flag to circumvent this error.)");
    }
  }
  try {
    //@ts-ignore This ignores typescript not liking accessing object properties by string
    let cmd = `${packageManager} ${packageManagers[packageManager].installCmd} ${devPackage ? packageManagers[packageManager].dev : ""} ${packageNames}`;
    consola.info("Installing dependencies...");
    cp.execSync(cmd, {
      cwd,
    });
    consola.success("Installed dependencies :)");
  } catch (error) {
    consola.error(error);
  }
}

function getPkgMgr(cwd?: string): string {
  let keys = Object.keys(packageManagers);
  let result = "none";
  keys.forEach((x) => {
    let exists = false;
    if(cwd){
      //@ts-ignore This ignores typescript not liking accessing object properties by string
      exists = doesFileExist(packageManagers[x].file, cwd);
    } else {
      //@ts-ignore This ignores typescript not liking accessing object properties by string
      exists = doesFileExist(packageManagers[x].file);
    }
    if (exists) {
      result = x;
    }
  });
  return result;
}

function doesFileExist(fileName: string, cwd?: string) {
  if (!cwd) cwd = process.cwd();
  var filePath = path.join(cwd, fileName);
  return existsSync(filePath);
}

