import { aeroPrefix } from "../config.js";

function surround(path) {
    return `<script src="${path}.js"></script>`;
}

export default (cats, noCats) => {
    var ret = "\n";
    
    for (const cat in cats) {
        console.log(cat);
        ret += cats[cat].map(file => surround(`${aeroPrefix + cat}/${file}`)).join("\n") + "\n"
    }    
    
    ret += noCats.map(file => surround(aeroPrefix + file)).join("\n") + "\n";

    console.log(ret);

    return ret;
};