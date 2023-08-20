const DEFAULT_RESET_DELAY = 50;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function classicReset(transport, resetDelay = DEFAULT_RESET_DELAY) {
    await transport.setDTR(false);
    await transport.setRTS(true);
    await sleep(100);
    await transport.setDTR(true);
    await transport.setRTS(false);
    await sleep(resetDelay);
    await transport.setDTR(false);
}
export async function usbJTAGSerialReset(transport) {
    await transport.setRTS(false);
    await transport.setDTR(false);
    await sleep(100);
    await transport.setDTR(true);
    await transport.setRTS(false);
    await sleep(100);
    await transport.setRTS(true);
    await transport.setDTR(false);
    await transport.setRTS(true);
    await sleep(100);
    await transport.setRTS(false);
    await transport.setDTR(false);
}
export async function hardReset(transport, usingUsbOtg = false) {
    if (usingUsbOtg) {
        await sleep(200);
        await transport.setRTS(false);
        await sleep(200);
    }
    else {
        await sleep(100);
        await transport.setRTS(false);
    }
}
export function validateCustomResetStringSequence(seqStr) {
    const commands = ["D", "R", "W"];
    const commandsList = seqStr.split("|");
    for (const cmd of commandsList) {
        const code = cmd[0];
        const arg = cmd.slice(1);
        if (!commands.includes(code)) {
            return false; // Invalid command code
        }
        if (code === "D" || code === "R") {
            if (arg !== "0" && arg !== "1") {
                return false; // Invalid argument for D and R commands
            }
        }
        else if (code === "W") {
            const delay = parseInt(arg);
            if (isNaN(delay) || delay <= 0) {
                return false; // Invalid argument for W command
            }
        }
    }
    return true; // All commands are valid
}
/**
 * Custom reset strategy defined with a string.
 *
 * The sequenceString input string consists of individual commands divided by "|".
 *
 * Commands (e.g. R0) are defined by a code (R) and an argument (0).
 *
 * The commands are:
 *
 * D: setDTR - 1=True / 0=False
 *
 * R: setRTS - 1=True / 0=False
 *
 * W: Wait (time delay) - positive integer number (miliseconds)
 *
 * "D0|R1|W100|D1|R0|W50|D0" represents the classic reset strategy
 */
export async function customReset(transport, sequenceString) {
    const resetDictionary = {
        D: async (arg) => await transport.setDTR(arg),
        R: async (arg) => await transport.setRTS(arg),
        W: async (delay) => await sleep(delay),
    };
    try {
        const isValidSequence = validateCustomResetStringSequence(sequenceString);
        if (!isValidSequence) {
            return;
        }
        const cmds = sequenceString.split("|");
        for (const cmd of cmds) {
            const cmdKey = cmd[0];
            const cmdVal = cmd.slice(1);
            if (cmdKey === "W") {
                await resetDictionary["W"](Number(cmdVal));
            }
            else if (cmdKey === "D" || cmdKey === "R") {
                await resetDictionary[cmdKey](cmdVal === "1");
            }
        }
    }
    catch (error) {
        throw new Error("Invalid custom reset sequence");
    }
}
export default { classicReset, customReset, hardReset, usbJTAGSerialReset, validateCustomResetStringSequence };