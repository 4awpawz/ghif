import util from "node:util"
import child_process from "node:child_process"

const exec = util.promisify(child_process.exec);

export async function gh(config) {
    let command = `gh issue list -L ${config.maxIssues} --state ${config.state} --json 'number,title,labels,milestone,state,assignees,url'`
    command = config.repo ? command + ` -R ${config.repo}` : command
    if (config.debug) {
        console.log("debug gh command: ", command)
        return
    }
    const { stdout } = await exec(command)
    return stdout
}
