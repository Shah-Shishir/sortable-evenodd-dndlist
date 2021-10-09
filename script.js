const numberList = document.querySelector("#number-list");
const evenList = document.querySelector("#even-list");
const oddList = document.querySelector("#odd-list");
const evenEmpty = document.querySelector("#even-empty");
const oddEmpty = document.querySelector("#odd-empty");
const toast = document.querySelector(".toast");
const toastText = document.querySelector(".toast-text");
const bottomLine = document.querySelector(".bottom-line");

function initialize() {
  for (let i = 1; i <= 20; i++) {
    const li = document.createElement("li");
    li.id = li.innerText = i;
    li.setAttribute("draggable", "true");
    li.addEventListener("dragstart", drag);
    numberList.appendChild(li);
  }
  document.addEventListener("dragover", allowDrop);
  document.addEventListener("drop", drop);
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  const data = event.dataTransfer.getData("text");
  const element = document.getElementById(data);
  const elemId = event.target.children[2]?.id;
  const value = +element.innerText;

  if (elemId === "even-list") {
    if (value % 2 === 0) {
      hide(evenEmpty);
      const children = sortByValues(evenList.children, element);
      evenList.replaceChildren(...evenList.children, ...children);
    } else {
      const warningHtml = `${value} can't be added on even list.`;
      setUpToast(warningHtml);
    }
  } else {
    if (value % 2 === 1) {
      hide(oddEmpty);
      const children = sortByValues(oddList.children, element);
      oddList.replaceChildren(...oddList.children, ...children);
    } else {
      const warningHtml = `${value} can't be added on odd list.`;
      setUpToast(warningHtml);
    }
  }
}

function setUpToast(html) {
  if (!toast.classList.contains("d-block")) {
    toast.classList.add("d-block");
  }

  if (!numberList.classList.contains("no-pointer")) {
    numberList.classList.add("no-pointer");
  }

  toastText.innerHTML = html;

  let totalWidth = 100;

  const toastInterval = setInterval(() => {
    totalWidth -= 1;
    bottomLine.style.width = totalWidth + "%";
    if (totalWidth === 0) {
      dismissToast();
      clearInterval(toastInterval);
    }
  }, 50);
}

function dismissToast() {
  if (toast.classList.contains("d-block")) {
    toast.classList.remove("d-block");
  }
  if (numberList.classList.contains("no-pointer")) {
    numberList.classList.remove("no-pointer");
  }
}

function hide(elem) {
  if (!elem.classList.contains("hide")) {
    elem.classList.add("hide");
  }
}

function sortByValues(children, elem) {
  children = Array.from(children);
  children.push(elem);
  children.sort(
    (childOne, childTwo) => childOne.innerText - childTwo.innerText
  );
  return children;
}

initialize();
