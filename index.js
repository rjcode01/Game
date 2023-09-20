const unOrderNumbers = [];
const numberList = [];

function start(e) {
  const randomNumbers = generateFourUniqueRandomNumbers();
  document.getElementById(e).style.display = "none";
  const players = document.querySelectorAll(".player");
  for (let i = 0; i < players.length; i++) {
    //   debugger
    document.getElementById("player" + (i + 1)).innerText = "#####";
    players[i].disabled = false;
    players[i].style.display = "block";
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10000); // Adjust the range as needed
}

function generateFourUniqueRandomNumbers() {
  while (numberList.length < 4) {
    const randomNumber = generateRandomNumber();
    if (!numberList.includes(randomNumber)) {
      numberList.push(randomNumber);
      unOrderNumbers.push(randomNumber);
    }
  }
  //   debugger
  return numberList;
}

function pickup(e, button) {
  let btn = e + "btn";
  let element = document.getElementById(e);
  let btnElement = document.getElementById(btn);
  //   document.getElementById('player1btn').disabled = true;
  //   buttonEle.style.display = 'none'
  btnElement.style.display = "none";

  console.log("numberList ", numberList);
  console.log("un1 ", unOrderNumbers);
  const sortedNumbers = numberList.slice().sort((a, b) => b - a);
  let number = unOrderNumbers.pop();
  if (sortedNumbers[0] > number) console.log("sdfsdf", element.value);
  console.log("un11 ", sortedNumbers);
  switch (number) {
    case sortedNumbers[0]:
      element.innerText = "Raja";
      // document.getElementById(e + "btnFind").classList.add("rajaBtn");
      console.log("1 for highest:", number);
      break;
    case sortedNumbers[1]:
      element.id = "mantri";
      element.className = e;
      // document.getElementById(e + "btnFind").classList.add("mantriBtn");
      element.disabled = true;
      console.log("2 for second highest:", number);
      break;
    case sortedNumbers[2]:
      element.disabled = true;
      element.classList.add("sipahi")
      document.getElementById(e + "btnFind").classList.add("findChor");

      document.getElementById(e + "btnFind").classList.add("sipahiBtn");
      document.getElementById(e + "btnFind").setAttribute("chor", false);
      console.log("3 for third highest:", number);
      break;
    case sortedNumbers[3]:
      element.disabled = true;
      element.classList.add("chor")
      document.getElementById(e + "btnFind").classList.add("findChor");
      document.getElementById(e + "btnFind").classList.add("chorBtn");

      document.getElementById(e + "btnFind").setAttribute("chor", true);
      console.log("4 for smallest:", number);
      break;
    default:
      break;
  }

  if (unOrderNumbers.length === 0) {
    numberList.length = 0;
    // document.getElementById("start").disabled = false;
    document.getElementById("start").style.display = "block";
    document.getElementById("findMantri").style.display = "block";
  }
}

function findMantri() {
  // alert('lk')
  let mantir = document.getElementById("mantri");
  mantir.innerText = "Mantri";
  mantir.id = mantir.getAttribute("class");
  mantir.removeAttribute("class");

  document.getElementById("findMantri").style.display = "none";
  let findChor = document.querySelectorAll(".findChor");
  for (let i = 0; i < findChor.length; i++) {
    findChor[i].style.display = "block";
  }
}

function findChor(player) {
  // console.log(player);
  //console.log(this.getAttribute('chor'));

  let findChor = document.querySelectorAll(".findChor");
  // let isChor = findChor.getAttribute("chor");
  // let playerId = findChor.getAttribute("id");
  // let isPlayer = playerId.includes(player);

  // console.log(isChor, isPlayer, playerId, player);

  // if (
  //   (isChor == "true" && isPlayer == true) ||
  //   (isChor == "false" && isPlayer == false)
  // ) {
  //   alert("y");
  // } else {
  //   // alert("n")
  //   document.getElementById(player).innerHTML = "Sipahi";
  //   findChor.innerHTML = "bhai tu fass gya";
  // }


  // console.log(findChor.getAttribute('chor'))
  // if(findChor.getAttribute('chor') === true)
  // {
  //   alert("d")
  //   console.log(findChor.getAttribute('id').includes(player))
  // }

  for (let i = 0; i < findChor.length; i++) {
    let isChor = findChor[i].getAttribute("chor");
    let playerId = findChor[i].getAttribute("id");
    let isPlayer = playerId.includes(player);

    // console.log(isChor, isPlayer, playerId, player);

    if (
      (isChor == "true" && isPlayer == true) ||
      (isChor == "false" && isPlayer == false)
    ) {
      document.getElementById(player).innerHTML = "Chor";
      document.querySelector(".sipahi").innerHTML = "Sipahi"
      document.querySelector(".sipahiBtn").style.display = 'none'
      document.querySelector(".chorBtn").style.display = 'none'
  removeClass();
      
    } else {
      // debugger
      document.getElementById(player).innerHTML = "Sipahi";
      document.querySelector(".sipahiBtn").style.display = 'none'
      document.querySelector(".chor").innerHTML = "Chor"
      document.querySelector(".chorBtn").style.display = 'none'
      document.querySelector("#message").innerHTML = "Mai Hu Chor or tu h chutiya"
      setTimeout(() => {
        document.querySelector("#message").style.display = 'none'
      }, 3000);
      removeClass();
      break;
    }

    // if (findChor[i].getAttribute("chor")) {
    //   console.log(findChor[1].getAttribute("id").includes(player));
    // }
  }
}

function removeClass(){
  var element = document.querySelectorAll('.findChor');
  element[0].classList.remove('findChor')
  element[1].classList.remove('findChor')
  document.querySelector('.chorBtn').classList.remove('chorBtn');
  document.querySelector('.sipahiBtn').classList.remove('sipahiBtn');
  document.querySelector('.chor').classList.remove('chor');
  document.querySelector('.sipahi').classList.remove('sipahi');
// console.log(element[0])
// console.log(element[1])
}
