if (typeof $aero === "undefined")
    var $aero = {};

/**
 * Deep property check scoping
 * @param {string} script - The script to be rewritten
 * @return {string} - The rewritten script
 */
$aero.scope = script => {
    let rewrittenScript = script
        .replace(/location/g, "$aero.location")
        //.replace(/(?<=(?<!.)(?:window|document).)location/g, "$aero.location")
        .replace(/document\.domain/g, "$aero.document.domain")
        .replace(/document\.URL/g, "$aero.document.URL")
        .replace(/eval/g, "$aero.eval")
        .replace(/(?<=(?<!\.)(?:self|this|globalThis|window|document)\[)(.*?)(?=\])/g, "$aero.check($1)");

    if ($aero.debug.scoping)
        console.log(`Scoping script\n${script}\n->\n${rewrittenScript}`);

    return rewrittenScript;
}

$aero.unscope = script => {
    return script;
}

export default $aero.scope;