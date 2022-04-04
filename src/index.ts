import { existsSync } from "fs";
import consola from "consola";
import path from "path";
import * as cp from "child_process";

const packageManagers = {
  yarn: {
    installCmd: "add",
    file: "yarn.lock",
  },
  npm: {
    installCmd: "install",
    file: "package-lock.json",
  },
  pnpm: {
    installCmd: "install",
    file: "pnpm-lock.yaml",
  },
};

export function detectPackageManager(cwd?: string): "npm" | "yarn" | "pnpm" {
  if (!cwd) cwd = process.cwd();
  let pkgMgr = getPkgMgr(cwd);
  if (pkgMgr != "none") {
    consola.info(`Detected package manager: ${pkgMgr}`);
    return pkgMgr;
  } else {
    consola.warn("Can't detect a package manager, auto fallback to: 'npm'");
    return "npm";
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
  try {
    //@ts-ignore
    let cmd = `${packageManager} ${packageManagers[packageManager].installCmd} ${packageNames}`;
    consola.info("Installing dependencies...");
    cp.execSync(cmd, {
      cwd,
    });
    consola.success("Installed dependencies :)");
  } catch (error) {
    consola.error(error);
  }
}

function getPkgMgr(cwd?: string): "npm" | "yarn" | "pnpm" | "none" {
  let keys = Object.keys(packageManagers);
  keys.forEach((x, i) => {
    //@ts-ignore
    if (doesFileExist(packageManagers[x].file)) {
      return x;
    }
  });
  return "none";
}

function doesFileExist(fileName: string, cwd?: string) {
  if (!cwd) cwd = process.cwd();
  var filePath = path.join(cwd, fileName);
  return existsSync(filePath);
}
