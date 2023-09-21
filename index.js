const unOrderNumbers = [];
const numberList = [];

function start(e) {
  generateFourUniqueRandomNumbers();
  $("#" + e).css("display", "none");

  $(".player").each(function (i) {
    $("#player" + (i + 1)).text("#####");
    $(this).prop("disabled", false);
    $(this).css("display", "block");
  });
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
      element.attr('value','1000');      
      break;
    case sortedNumbers[1]:
      element.attr("id", "mantri");
      element.addClass(e);
      element.attr('value','800');
      break;
    case sortedNumbers[2]:
      element.addClass("sipahi");
      btnFind.addClass("findChor");
      btnFind.addClass("sipahiBtn");
      btnFind.attr("chor", false);
      element.attr('value','500');
      break;
    case sortedNumbers[3]:
      element.addClass("chor");
      btnFind.addClass("findChor");
      btnFind.addClass("chorBtn");
      btnFind.attr("chor", true);
      element.attr('value','0');
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
  mantir.attr("id", mantir.attr("class").split(' ')[1]);
//   var class = $('.module').attr('class');
// var st = class.split(' ');
// var firstClass = st[0];

  mantir.addClass('playerText');
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
      $("#message").text("Bach Gya Bhai");
      removeClass();
    } else {
      $("#" + player).text("Sipahi");
      $(".chor").text("Chor");
      $(".sipahiBtn").css("display", "none");
      $(".chorBtn").css("display", "none");
      $("#message").text("Tu Fass Gya");
      $("#exchange-message").text("Mantri ab tujhe : 0 : melega or Chor tujhe : 800 : milenge");
      $('.playerText').each(function(i){
        // console.log($(this).text())
        if(($(this).text()) === "Mantri")
        {
          $(this).attr('value', '0');
          $(".chor").attr('value', '800');
        }
        

      })

      removeClass();
    }

    $("#message").css("display", "block");
    $("#exchange-message").css("display", "block");
    setTimeout(() => {
      $("#message").css("display", "none");
      $("#exchange-message").css("display", "none");
    }, 3000);
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
  let player1 = $("#player1").attr('value');
  let player2 = $("#player2").attr('value');
  let player3 = $("#player3").attr('value');
  let player4 = $("#player4").attr('value');

  let trWithTd = `<tr>
  <td>${player1}</td>
  <td>${player2}</td>
  <td>${player3}</td>
  <td>${player4}</td>
</tr>`;

  $("#t-body").append(trWithTd);
}
