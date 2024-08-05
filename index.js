const fs = require('fs');
const path = require('path');

// Read the JSON file and parse its content
const data = fs.readFileSync('./assets/pincode.json', 'utf-8');
const pincode = JSON.parse(data);

// Ensure the _posts directory exists
const postsDir = './_posts';
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir);
}

// Generate and write markdown files for each item in the pincode array
pincode.slice(0, 1).forEach(item => {
    const slugifiedFilename = slugify(`2024-08-05-${item.officename}-${item.districtname}`);
    const filePath = path.join(postsDir, `${slugifiedFilename}.md`);
    fs.writeFileSync(filePath, Content(item));
});

function slugify(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function Content(data) {
    const { officename, pincode, officetype, deliverystatus, divisionname, regionname, circlename, taluk, districtname, statename, telephone, relatedsuboffice, relatedheadoffice, longitude, latitude } = data;

    return `---
title: ${officename}
officename: ${officename}
pincode: ${pincode}
officetype: ${officetype}
deliverystatus: ${deliverystatus}
divisionname: ${divisionname}
regionname: ${regionname}
circlename: ${circlename}
taluk: ${taluk}
districtname: ${districtname}
statename: ${statename}
telephone: ${telephone}
relatedsuboffice: ${relatedsuboffice}
relatedheadoffice: ${relatedheadoffice}
longitude: ${longitude}
latitude: ${latitude}
---
`;
}
