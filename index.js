const unOrderNumbers = [];
const numberList = [];
let playTime = 1;
const players = {
  player1: 0,
  player2: 0,
  player3: 0,
  player4: 0,
};

function gameRules(){
  $(".notes").css('display', 'block');
  setTimeout(() => {
  $(".notes").css('display', 'none');
  }, 10000);
}

function start(e) {
  if (playTime <= 5) {
    $("#" + e).text("Start");

    generateFourUniqueRandomNumbers();
    $("#" + e).css("display", "none");

    $(".player").each(function (i) {
      $("#player" + (i + 1)).text("#####");
      $(this).prop("disabled", false);
      $(this).css("display", "block");
    });
    $("#message").text("Pick Up Your Player");
    setTimeout(() => {
      $("#message").css("display", "none");
    }, 5000);
    if (playTime === 5) {
      $("#" + e).text("Check Winner");
    }
    playTime = playTime + 1;
  } else {
    location.reload();
    const sortable = Object.entries(players)
      .sort(([, a], [, b]) => a - b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    console.log(sortable);

    const keys = Object.keys(sortable);

    if (keys.length >= 2) {
      const secondLastKey = keys[keys.length - 2];
      const lastKey = keys[keys.length - 1];

      const secondLastName = sortable[secondLastKey];
      const lastName = sortable[lastKey];

      if (secondLastName === lastName)
        alert("The winner is " + secondLastKey + " and " + lastKey);
      else alert("The winner is " + lastKey);
      // console.log("Second-to-last name:", secondLastKey, secondLastName);
      // console.log("Last name:", lastKey, lastName);
    }

    playTime = 1;
    $("#t-body").html("");
    $("#" + e).text("Start");
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

function generateFourUniqueRandomNumbers() {
  while (numberList.length < 4) {
    const randomNumber = generateRandomNumber();
    if (!numberList.includes(randomNumber)) {
      numberList.push(randomNumber);
      unOrderNumbers.push(randomNumber);
    }
  }
  return numberList;
}

function pickup(e, button) {
  let btn = e + "btn";
  let element = $("#" + e);
  let btnElement = $("#" + btn);
  let btnFind = $("#" + e + "btnFind");

  $(btnElement).css("display", "none");

  // console.log("numberList ", numberList);
  // console.log("un1 ", unOrderNumbers);

  const sortedNumbers = numberList.slice().sort((a, b) => b - a);
  let number = unOrderNumbers.pop();

  switch (number) {
    case sortedNumbers[0]:
      element.text("Raja");
      element.attr("value", "1000");
      break;
    case sortedNumbers[1]:
      element.attr("id", "mantri");
      element.addClass(e);
      element.attr("value", "800");
      break;
    case sortedNumbers[2]:
      element.addClass("sipahi");
      btnFind.addClass("findChor");
      btnFind.addClass("sipahiBtn");
      btnFind.attr("chor", false);
      element.attr("value", "500");
      break;
    case sortedNumbers[3]:
      element.addClass("chor");
      btnFind.addClass("findChor");
      btnFind.addClass("chorBtn");
      btnFind.attr("chor", true);
      element.attr("value", "0");
      break;
    default:
      break;
  }

  if (unOrderNumbers.length === 0) {
    numberList.length = 0;
    $("#findMantri").css("display", "block");
  }
}

function findMantri() {
  let mantir = $("#mantri");
  mantir.text("Mantri");
  mantir.attr("id", mantir.attr("class").split(" ")[1]);

  mantir.addClass("playerText");
  // mantir.removeAttr("class");

  $("#findMantri").css("display", "none");
  $(".findChor").each(function () {
    $(this).css("display", "block");
  });
}

function findChor(player) {
  $(".findChor").each(function () {
    let isChor = $(this).attr("chor");
    let playerId = $(this).attr("id");
    let isPlayer = playerId.includes(player);

    if (
      (isChor == "true" && isPlayer == true) ||
      (isChor == "false" && isPlayer == false)
    ) {
      $("#" + player).text("Chor");
      $(".sipahi").text("Sipahi");
      $(".sipahiBtn").css("display", "none");
      $(".chorBtn").css("display", "none");
      $("#message").text("Mantri bach gya chor pakda gya.");
      removeClass();
    } else {
      $("#" + player).text("Sipahi");
      $(".chor").text("Chor");
      $(".sipahiBtn").css("display", "none");
      $(".chorBtn").css("display", "none");
      $("#message").text("Mantri Fass Gya");
    
      $(".playerText").each(function (i) {
        if ($(this).text() === "Mantri") {
          $(this).attr("value", "0");
          $(".chor").attr("value", "800");
        }
      });

      removeClass();
    }

    $("#message").css("display", "block");
    $("#exchange-message").css("display", "block");
    setTimeout(() => {
      $("#message").css("display", "none");
     
    }, 5000);
    addTrInTableBody();
    $("#start").css("display", "block");
    return false;
  });
}

function removeClass() {
  $(".findChor").each(function () {
    $(this).removeClass("findChor");
  });
  $(".chorBtn").removeClass("chorBtn");
  $(".sipahiBtn").removeClass("sipahiBtn");
  $(".chor").removeClass("chor");
  $(".sipahi").removeClass("sipahi");
  $("#playerText").removeAttr("class");
}

function addTrInTableBody() {
  let player1 = $("#player1").attr("value");
  let player2 = $("#player2").attr("value");
  let player3 = $("#player3").attr("value");
  let player4 = $("#player4").attr("value");

  players.player1 = players.player1 + parseInt(player1);
  players.player2 = players.player2 + parseInt(player2);
  players.player3 = players.player3 + parseInt(player3);
  players.player4 = players.player4 + parseInt(player4);

  let trWithTd = `<tr>
  <td>${player1}</td>
  <td>${player2}</td>
  <td>${player3}</td>
  <td>${player4}</td>
</tr>`;

  $("#t-body").append(trWithTd);
}
