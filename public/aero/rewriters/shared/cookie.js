if (typeof $aero === "undefined")
    var $aero = {};

$aero.rewriteGetCookie = (cookie, fullPart) => {
    cookie.replace(/(?<=path\=).*(?= )/g, match => match.split(fullPart).pop());
}
$aero.rewriteSetCookie = (cookie, fullPart) => {
    cookie.replace(/(?<=path\=).*(?= )/g, fullPart + "$&");
}

export default $aero;