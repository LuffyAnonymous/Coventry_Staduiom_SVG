const ts = require('typescript');
const fs = require('fs');

const code = fs.readFileSync('./components/grounds/Coventry.ts', 'utf-8');
const result = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
});

const mod = { exports: {} };
const fn = new Function('exports', 'require', result.outputText);
fn(mod.exports, require);

const array = mod.exports.COVENTRY_CITY_GROUND;

let output = `import { SeatSection } from "../StadiumMap2D";\n\nexport const COVENTRY_CITY_GROUND: SeatSection[] = [\n`;

array.forEach((item, index) => {
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Keep old ID if we want, but Arsenal used UUIDs. Let's use UUIDs for seat blocks, 
    // but the Arsenal format also had UUIDs.
    item.id = generateUUID();
    
    // Reorder keys
    const ordered = {};
    const keyOrder = ["type", "fill", "stroke", "strokeWidth", "d", "textX", "textY", "textColor", "fontSize", "textRotation", "id", "name", "shape_class", "g_parent_class", "g_parent_data_id"];
    
    keyOrder.forEach(k => {
        if (item[k] !== undefined) {
            ordered[k] = item[k];
        }
    });
    
    // Add any remaining keys
    Object.keys(item).forEach(k => {
        if (ordered[k] === undefined) {
            ordered[k] = item[k];
        }
    });
    
    let objStr = JSON.stringify(ordered, null, 2);
    // Indent by 2 spaces
    objStr = objStr.split('\n').map((line, i) => i === 0 ? '  ' + line : '  ' + line).join('\n');
    
    output += objStr;
    if (index < array.length - 1) {
        output += ',\n';
    } else {
        output += '\n';
    }
});

output += '];\n';

fs.writeFileSync('./components/grounds/Coventry.ts', output);
console.log("Done");
