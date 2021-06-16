//const inp = [1, 2, 3, 4, 5, 6, 7];
const inp = [3, 7, 5, 4, 6, 2, 1];
//const inp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//const inp = Array.from(Array((2 ** 6) - 1)).map((itm, idx) => idx + 1);

const getHeight = (heapArr) => {
  return Math.floor(Math.log2(heapArr.length) + 1);
}

const getChildrenIdx = (idx, heapArr) => {
  const children = [];
  if (heapArr.length >= (idx * 2 + 2)) {
    children.push(idx * 2 + 1);
  }
  if (heapArr.length >= (idx * 2) + 3) {
    children.push((idx * 2) + 2);
  }
  return children;
}

const getChildren = (idx, heapArr) => {
  return getChildrenIdx(idx, heapArr).map((itm) => inp[itm]);
}

const getNodeLevel = (idx, heapArr) => {

}

const getWidth = (height, nodeWidth, minIndent) => {
  const maxNumLeaves = (2 ** (height - 1));
  return maxNumLeaves * nodeWidth + (maxNumLeaves - 1) * minIndent;
}


const printEdges = (width, leftPad, number, indent) => {
  for (let k = 0; k < ((width / 2) - 1); k++) {
    //console.log(indent);
    const block = ''.padStart(leftPad - k, " ") + '/' + ''.padStart((k * 2) + 1, " ") + '\\';
    const level = Array.from(Array(number)).map((itm) => block + ''.padStart(indent - k - 1, " "));
    console.log(level.join(''));
  }
}

const getNodesOnLevel = (lvl, heapArr) => {
  return heapArr.slice(2 ** lvl - 1, 2 ** (lvl + 1) - 1);
}

const printHeap = (heapArr) => {
  const height = getHeight(heapArr);
  const nodeWidth = 3;
  const minIndent = 1;
  const width = getWidth(height, nodeWidth, minIndent);
  for (let i = 0; i < height; i++) {
    const indent = getWidth(height - i, nodeWidth, minIndent) + minIndent;
    const leftPad = (width - (((indent * ((2 ** i) - 1)) - 1) + nodeWidth)) / 2;
    const str = getNodesOnLevel(i, inp).reduce((acc, itm, idx) => acc += itm + ''.padStart((indent - itm.toString().length), " "), '');
    console.log(''.padStart(leftPad + 1, " ") + str);
    printEdges(getWidth(height - i - 1, nodeWidth, minIndent), leftPad, (2 ** i), getWidth(height - i - 1, nodeWidth, minIndent) + minIndent);
  }

}

const maxHeapifyNode = (idx, heapArr) => {
  let childrenIdx = getChildrenIdx(idx, heapArr);
  let maxChildIdx = childrenIdx[0];
  for (let childIdx of childrenIdx) {
    if (heapArr[childIdx] > heapArr[maxChildIdx]) {
      maxChildIdx = childIdx;
    }
  }
  if(heapArr[maxChildIdx] > heapArr[idx]) {
    let temp = heapArr[maxChildIdx];
    heapArr[maxChildIdx] = heapArr[idx];
    heapArr[idx] = temp;
    maxHeapifyNode(maxChildIdx, heapArr);
  }

  return heapArr;
}

printHeap(inp);
maxHeapifyNode(0, inp);
printHeap(inp);