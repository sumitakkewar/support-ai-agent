import { toolFunctionMap } from "./customerTools.js";

export async function executeToolCall(toolCall, userId) {
    if (!toolCall) return null;

    const { name, arguments: argsString } = toolCall.function || toolCall;
    const args = JSON.parse(argsString);

    const toolFn = toolFunctionMap[name];
    if (!toolFn) throw new Error(`No tool function found for ${name}`);

    return await toolFn({ ...args, userId });
}
