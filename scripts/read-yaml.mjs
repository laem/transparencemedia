import yaml from "js-yaml"
import fs from "fs"

export function readYaml(path) {
  try {
    const content = yaml.load(fs.readFileSync(path, "utf8"))
    return content
  } catch (e) {
    console.log(e)
  }
}
