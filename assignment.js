// Problem 1.

let dataSet = [
    [1, 2, 0],
    [0, 1, 1],
    [5, 6, 5],
  ];
  
  function normalizeMatrix(matrix) {
    let n = matrix.length; // no of rows
    let m = matrix[0].length; //no of columns
    let zeroElements = [];
  
    let mean = [];
  
    for (let i = 0; i < m; i++) {
      let meanIdx = 0;
      let noOfNonZeroElements = 0;
      for (let j = 0; j < n; j++) {
        meanIdx += matrix[j][i];
        if (matrix[j][i] == 0) {
          zeroElements.push({x: j, y: i});
        } else {
          noOfNonZeroElements++;
        }
      }
      mean.push(meanIdx / noOfNonZeroElements);
    }
  
    let matrix2 = JSON.parse(JSON.stringify(matrix));
  
    zeroElements.forEach(x => {
      matrix2[x.x][x.y] = mean[x.y];
    });
  
    let sds = [];
  
    for (let i = 0; i < m; i++) {
      let sdSum = 0;
      for (let j = 0; j < n; j++) {
        sdSum += Math.pow(parseFloat(mean[i] - matrix2[j][i]), 2);
      }
      sdSum = Math.sqrt(sdSum / n);
      sds.push(sdSum);
    }
  
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        matrix2[j][i] = (matrix2[j][i] - mean[i]) / sds[i];
      }
    }
  
    return matrix2;
  }
  
  console.log(normalizeMatrix(dataSet));
  
  function expectV2(actual) {
    return {
      toBe: function (expected) {
        let n = expected.length; // no of rows
        let m = expected[0].length; //no of columns
  
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            if (Math.round(expected[j][i], 4) != Math.round(actual[j][i], 4)) {
              return `Test Failed`;
            }
          }
        }
        return `Test Passed`;
      },
    };
  }
  
  console.log(
    expectV2(normalizeMatrix(dataSet)).toBe([
      [-1.224744871391589, -0.4629100498862757, 0],
      [0, -0.9258200997725514, -1.22374487],
      [1.224744871391589, 1.38873015, 1.22474487]
    ])
  );
  
  // Problem 2
  
  let dummyData = [
      {
          "id": "1",
          "agent": "Radulf Katlego",
          "unit": "#3",
          "description": "This luxurious studio apartment is in the heart of downtown.",
          "num_bedrooms": 1
      },
      {
          "id": "2",
          "agent": "Kelemen Konrad",
          "unit": "#36",
          "description": "We have a 1-bedroom available on the third floor.",
          "num_bedrooms": 1
      },
      {
          "id": "3",
          "agent": "Ton Jett",
          "unit": "#12",
          "description": "Beautiful 1-bedroom apartment with nearby yoga studio.",
          "num_bedrooms": 1
      },
      {
          "id": "4",
          "agent": "Fishel Salman",
          "unit": "#13",
          "description": "Beautiful studio with a nearby art studio.",
          "num_bedrooms": 1
      }
  ]
  
  function findNoOfRooms(dummyData){
      let stackOfKeyWords = [];
  
      let owrKeyWords = {"studio" : true, "1-bedroom" : true, "yoga": true, "dance": true, "art": true};
      let problemKeyWords = {
          "yoga" : true,
          "dance": true,
          "art": true
      }
  
      let noOfRooms = [];
  
      dummyData.forEach(roomDetail =>{
          stackOfKeyWords = [];
  
          roomDetail["description"].split(" ").forEach(word => {
              if(owrKeyWords[word]){
                  if(stackOfKeyWords.length == 0){
                      stackOfKeyWords.push(word);
                  }
                  else{
                      let topOfStack =  stackOfKeyWords.pop();
                      if(problemKeyWords[topOfStack] && !problemKeyWords[word]){
                          //do nothing
                      }
                      else if(problemKeyWords[topOfStack] && problemKeyWords[word]){
                          stackOfKeyWords.push(word);
                      }
                      else{
                          stackOfKeyWords.push(topOfStack);
                          stackOfKeyWords.push(word);
                      }
                  }
              }
          })
  
          if(stackOfKeyWords.includes("1-bedroom")){
              noOfRooms.push(1);
          }
          else if(stackOfKeyWords.includes("studio")){
              noOfRooms.push(0);
          }
          else{
              noOfRooms.push(roomDetail["num_bedrooms"]);
          }
      })
  
      return noOfRooms;
  }
  
  function expect(actual){
     return {
         toBe: function(expected) {
          let acc = true
          actual.forEach((x, i, arr) => { acc = (acc && actual[i] == expected[i]) });
          return `Test ${acc ? 'Passed' : 'Failed'}`
        }
     }
  }
  
  console.log(expect(findNoOfRooms(dummyData)).toBe([0,1,1,0]))
  