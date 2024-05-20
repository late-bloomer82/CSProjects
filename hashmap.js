// function createHashMap() {
//   const bucketsArray = [];
//   return {
//     hash(key) {
//       let hashCode = 0;

//       const primeNumber = 31;
//       for (let i = 0; i < key.length; i++) {
//         hashCode = primeNumber * hashCode + key.charCodeAt(i);
//       }

//       return hashCode;
//     },
//     set(key, value) {
//       bucketsArray[this.has(key)] = [];
//       bucketsArray[this.hash(key)].push({ key: key, value: value });
//     },

//     get(key) {
//       const bucket = bucketsArray[this.hash(key)];
//       if (bucket) {
//         return bucket.value;
//       } else {
//         return null;
//       }
//     },

//     has(key) {
//       const bucket = bucketsArray[this.hash(key)];
//       if (bucket) {
//         return true;
//       } else {
//         return false;
//       }
//     },

//     remove(key) {
//       const bucket = bucketsArray[this.hash(key)];
//       const bucketindex = this.has(key);
//       if (bucket) {
//         bucketsArray.splice(bucketindex, 1);
//         return true;
//       } else {
//         return false;
//       }
//     },
//     length() {
//       let numberOfKeys = 0;
//       bucketsArray.forEach((element) => {
//         const elementNumberOfKeys = element.length;
//         numberOfKeys += elementNumberOfKeys;
//       });
//       return numberOfKeys;
//     },
//     clear() {
//       bucketsArray.length = 0;
//     },
//     keys() {
//       const keysArray = [];
//       bucketsArray.forEach((element) => {
//         for (let i = 0; i < element.length; i++) {
//           const keyValuePair = element[i];
//           keysArray.push(keyValuePair.key);
//         }
//       });
//       return keysArray;
//     },
//     values() {
//       const valuesArray = [];
//       bucketsArray.forEach((element) => {
//         for (let i = 0; i < element.length; i++) {
//           const keyValuePair = element[i];
//           valuesArray.push(keyValuePair.value);
//         }
//       });
//       return valuesArray;
//     },
//     entries() {
//       const entries = [];
//       bucketsArray.forEach((element) => {
//         for (let i = 0; i < element.length; i++) {
//           entries.push(element[i]);
//         }
//       });
//       return entries;
//     },
//   };
// }

function createHashMap() {
  const bucketsArray = [];
  return {
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        // Apply modulo to prevent large numbers
        hashCode = hashCode % bucketsArray.length;
      }
      return hashCode;
    },
    set(key, value) {
      const index = this.hash(key);
      if (!bucketsArray[index]) {
        bucketsArray[index] = [];
      }
      for (let i = 0; i < bucketsArray[index].length; i++) {
        if (bucketsArray[index][i].key === key) {
          bucketsArray[index][i].value = value;
          return;
        }
      }
      bucketsArray[index].push({ key, value });
    },
    get(key) {
      const index = this.hash(key);
      const bucket = bucketsArray[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
            return bucket[i].value;
          }
        }
      }
      return null;
    },
    has(key) {
      const index = this.hash(key);
      const bucket = bucketsArray[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
            return true;
          }
        }
      }
      return false;
    },
    remove(key) {
      const index = this.hash(key);
      const bucket = bucketsArray[index];
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
            bucket.splice(i, 1);
            return true;
          }
        }
      }
      return false;
    },
    length() {
      let numberOfKeys = 0;
      bucketsArray.forEach((element) => {
        numberOfKeys += element.length;
      });
      return numberOfKeys;
    },
    clear() {
      bucketsArray.length = 0;
    },
    keys() {
      const keysArray = [];
      bucketsArray.forEach((element) => {
        element.forEach((keyValuePair) => {
          keysArray.push(keyValuePair.key);
        });
      });
      return keysArray;
    },
    values() {
      const valuesArray = [];
      bucketsArray.forEach((element) => {
        element.forEach((keyValuePair) => {
          valuesArray.push(keyValuePair.value);
        });
      });
      return valuesArray;
    },
    entries() {
      const entriesArray = [];
      bucketsArray.forEach((element) => {
        element.forEach((keyValuePair) => {
          entriesArray.push([keyValuePair.key, keyValuePair.value]);
        });
      });
      return entriesArray;
    },
  };
}
