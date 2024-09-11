let arr = [];
let speed = 100;  // Sorting speed in milliseconds

// Function to randomize the array and generate new bars
function randomizeArray() {
    arr = [];
    const container = document.getElementById("array-container");
    container.innerHTML = '';  // Clear previous bars

    const colors = ['#ff6f61', '#ffb88c', '#ff8a5b', '#ffcc99', '#6a0572', '#f7797d', '#ffcc00', '#ff8a80', '#7986cb', '#ffeb3b'];

    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 200) + 20;  // Random height for bars
        arr.push(value);

        // Create bar container to hold both the number and the bar
        const barContainer = document.createElement("div");
        barContainer.classList.add('bar-container');

        // Create a span for the number above the bar
        const barValue = document.createElement("span");
        barValue.classList.add('bar-value');
        barValue.innerText = value;

        // Create the bar
        const bar = document.createElement("div");
        bar.classList.add('bar');
        bar.style.height = `${value}px`;

        // Apply random colors to each bar
        bar.style.backgroundColor = colors[i % colors.length];

        // Append the number and the bar to the container
        barContainer.appendChild(barValue);
        barContainer.appendChild(bar);
        container.appendChild(barContainer);
    }
}

// Bubble Sort Algorithm with Visualization
function bubbleSort() {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');
    let len = arr.length;
    let i = 0, j = 0;

    function swap() {
        if (j < len - i - 1) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                bars[j].style.height = `${arr[j]}px`;
                bars[j + 1].style.height = `${arr[j + 1]}px`;

                values[j].innerText = arr[j];
                values[j + 1].innerText = arr[j + 1];
            }
            j++;
            setTimeout(swap, speed);
        } else {
            j = 0;
            i++;
            if (i < len - 1) setTimeout(swap, speed);
        }
    }
    swap();
}

// Insertion Sort Algorithm with Visualization
function insertionSort() {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');
    let i = 1, j = 0;

    function insert() {
        if (i < arr.length) {
            let key = arr[i];
            j = i - 1;

            function innerLoop() {
                if (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    bars[j + 1].style.height = `${arr[j]}px`;
                    values[j + 1].innerText = arr[j];
                    j--;
                    setTimeout(innerLoop, speed);
                } else {
                    arr[j + 1] = key;
                    bars[j + 1].style.height = `${key}px`;
                    values[j + 1].innerText = key;
                    i++;
                    setTimeout(insert, speed);
                }
            }
            innerLoop();
        }
    }
    insert();
}

// Selection Sort Algorithm with Visualization
function selectionSort() {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');
    let i = 0;

    function sort() {
        if (i < arr.length - 1) {
            let minIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                bars[i].style.height = `${arr[i]}px`;
                bars[minIndex].style.height = `${arr[minIndex]}px`;

                values[i].innerText = arr[i];
                values[minIndex].innerText = arr[minIndex];
            }

            i++;
            setTimeout(sort, speed);
        }
    }
    sort();
}

// Quick Sort Algorithm with Visualization
function quickSort(start = 0, end = arr.length - 1) {
    if (start < end) {
        let index = partition(start, end);
        quickSort(start, index - 1);
        quickSort(index + 1, end);
    }
}

function partition(start, end) {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');
    let pivot = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[pivotIndex].style.height = `${arr[pivotIndex]}px`;

            values[i].innerText = arr[i];
            values[pivotIndex].innerText = arr[pivotIndex];

            pivotIndex++;
        }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    bars[pivotIndex].style.height = `${arr[pivotIndex]}px`;
    bars[end].style.height = `${arr[end]}px`;

    values[pivotIndex].innerText = arr[pivotIndex];
    values[end].innerText = arr[end];

    return pivotIndex;
}

// Merge Sort Algorithm with Visualization
function mergeSortWrapper() {
    mergeSort(0, arr.length - 1);
}

function mergeSort(start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid + 1, end);
        merge(start, mid, end);
    }
}

function merge(start, mid, end) {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');
    let tempArray = [];
    let i = start, j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            tempArray.push(arr[i++]);
        } else {
            tempArray.push(arr[j++]);
        }
    }

    while (i <= mid) tempArray.push(arr[i++]);
    while (j <= end) tempArray.push(arr[j++]);

    for (let k = start; k <= end; k++) {
        arr[k] = tempArray[k - start];
        bars[k].style.height = `${arr[k]}px`;
        values[k].innerText = arr[k];
    }
}

// Heap Sort Algorithm with Visualization
function heapSort() {
    let bars = document.getElementsByClassName('bar');
    let values = document.getElementsByClassName('bar-value');

    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[largest].style.height = `${arr[largest]}px`;

            values[i].innerText = arr[i];
            values[largest].innerText = arr[largest];

            heapify(n, largest);
        }
    }

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        bars[0].style.height = `${arr[0]}px`;
        bars[i].style.height = `${arr[i]}px`;

        values[0].innerText = arr[0];
        values[i].innerText = arr[i];

        heapify(i, 0);
    }
}

// Initialize array and bars
randomizeArray();

