const sh = require("shelljs");
const YAML = require("js-yaml");
(async() => {
    function exportYaml(src, dest) {
        let yaml = sh.cat(src);
        let object = YAML.load(yaml);
        let json = JSON.stringify(object, null, 2);
        sh.echo(json).to(dest);
    }

    exportYaml("app/content/profiles.yaml", "../mod/src/main/resources/profiles.json");
    exportYaml("app/content/weights.yaml", "../mod/src/main/resources/weights.json");
})();
