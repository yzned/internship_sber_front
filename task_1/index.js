import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
    const decoded = [];
    const uniqueIds = new Set();
  
    encoded.forEach(data => {
      const decodedData = { groupId: data.groupId };
      for (const key in data) {
        if (key.endsWith("Id") && key !== "groupId") {
          const value = data[key];
          if (translations[value]) {
            decodedData[key.replace("Id", "")] = translations[value];
          } else {
            decodedData[key] = value;
          }
          uniqueIds.add(value);
        } else {
          decodedData[key] = data[key];
        }
      }
      decoded.push(decodedData);
    });
  
    console.log("Unique IDs:", Array.from(uniqueIds));
    return decoded;
  }

const decodedData = decodeFields(encoded, translations);
console.log(decodedData);

