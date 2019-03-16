const pkgJson = require("../../package.json");
export const _package = {
    version: pkgJson.version
};

document.getElementById("dsd-version").innerText = _package.version;
import './ui/mount';
