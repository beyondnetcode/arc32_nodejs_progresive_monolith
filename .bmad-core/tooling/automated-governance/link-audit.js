
const fs = require('fs');
const path = require('path');

const BASE_DIR = 'd:/Users/aarroyo/personal/sources/arc32_nodejs_progresive_monolith/arc-corporate-ws';
const TARGET_DIRS = [
    'corporate-standards',
    'corporate-standards-es',
    'corporate-sdlc',
    'corporate-sdlc-es'
];

const results = [];

function scanDir(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.md')) {
            checkLinksInFile(fullPath);
        }
    }
}

function checkLinksInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Regex matching standard markdown links like [label](path)
    // Group 2 grabs the path part
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lineNum = 0;
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        let lineMatch;
        while ((lineMatch = regex.exec(line)) !== null) {
            let linkPath = lineMatch[2];
            // Ignore web URLs, anchors within same file, and mailto
            if (linkPath.startsWith('http') || linkPath.startsWith('#') || linkPath.startsWith('mailto')) {
                continue;
            }
            
            // Clean anchor component from path part
            const anchorIndex = linkPath.indexOf('#');
            if (anchorIndex !== -1) {
                linkPath = linkPath.substring(0, anchorIndex);
            }

            // If the path is now empty, it means it was just a link to an anchor in another file, 
            // wait, if it was file.md#anchor we still need file.md. If it was just #anchor it's already ignored.
            if (linkPath.length === 0) continue;

            const dirOfFile = path.dirname(filePath);
            // Resolve absolute path of the referenced file
            const resolvedPath = path.resolve(dirOfFile, linkPath);

            if (!fs.existsSync(resolvedPath)) {
                results.push({
                    file: filePath.replace(BASE_DIR, ''),
                    line: index + 1,
                    brokenLink: linkPath,
                    fullLink: lineMatch[0]
                });
            }
        }
    });
}

TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(BASE_DIR, dir);
    if (fs.existsSync(dirPath)) {
        scanDir(dirPath);
    }
});

// Also include the specified root files
const rootFiles = ['../README.md', '../MASTER_INDEX.md', '../MASTER_INDEX.es.md', '../reference-blueprint.md', '../reference-blueprint.es.md'];
rootFiles.forEach(relFile => {
    const p = path.resolve(BASE_DIR, relFile);
    if (fs.existsSync(p)) {
        checkLinksInFile(p);
    }
});

console.log(JSON.stringify(results, null, 2));
console.log("TOTAL BROKEN LINKS FOUND: ", results.length);
