function fibs(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    if (i === 0 || i === 1) {
      array.push(i);
    } else if (i > 1) {
      const twoPreviousNumbersSum = array[i - 2] + array[i - 1];
      array.push(twoPreviousNumbersSum);
    }
  }
  console.log(array);
}

function fibsRecursive(n, array = [0, 1]) {
  if (array.length >= n) {
    console.log(array);
    return array.slice(0, n);
  } else {
    const twoPreviousNumbersSum =
      array[array.length - 2] + array[array.length - 1];
    array.push(twoPreviousNumbersSum);

    return fibsRecursive(n, array);
  }
}

function mergeSort(numbers) {
  // Base case: If the array has 0 or 1 element, it's already sorted
  if (numbers.length <= 1) {
    return numbers;
  }

  // Split the array into two halves
  const midIndex = Math.floor(numbers.length / 2);
  const leftHalfArray = numbers.slice(0, midIndex);
  const rightHalfArray = numbers.slice(midIndex);

  // Recursively sort the two halves
  const sortedLeftHalf = mergeSort(leftHalfArray);
  const sortedRightHalf = mergeSort(rightHalfArray);

  // Merge the sorted halves
  return merge(sortedLeftHalf, sortedRightHalf);
}

// Merge function to merge two sorted arrays
function merge(leftArray, rightArray) {
  let mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements of both arrays and push the smaller one to the merged array
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      mergedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // Push remaining elements of leftArray (if any)
  while (leftIndex < leftArray.length) {
    mergedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

  // Push remaining elements of rightArray (if any)
  while (rightIndex < rightArray.length) {
    mergedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return mergedArray;
}

console.log(mergeSort([3, 4, 5, 7, 4, 4]));
