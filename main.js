const defaultOptions = {
  easing: "easeInOutElastic(1, .8)",
  duration: 1000,
  autoplay: false,
};

anime({
  targets: ".course-link img",
  translateX: 7,
  easing: "easeInOutQuad",
  direction: "alternate",
  duration: 1000,
  loop: true,
});

const playAnimation = (id) => {
  const animateWidth = anime({
    targets: `#${id}`,
    width: ["100%", "200%"],
    color: ["#c33241", "#fff"],
    ...defaultOptions,
    duration: 100,
  });

  const animateTop = anime({
    targets: `#${id} .card-top`,
    marginLeft: [800, 0],
    ...defaultOptions,
    begin: () => {
      disableClick();
    },
    complete: () => {
      enableClick();
    },
  });
  const animateMiddle = anime({
    targets: `#${id} .card-middle`,
    marginLeft: [800, 0],
    ...defaultOptions,
  });

  const animateDetails = anime({
    targets: `#${id} .detail`,
    rotate: [-90, 0],
    width: ["220px", "310px"],
    marginTop: [-170, 0],
    marginLeft: [-110, 0],
    ...defaultOptions,
  });
  const animateBg = anime({
    targets: `#${id} .bg`,
    scale: [1, 0],
    translateX: ["400px", "400px"],
    translateY: ["-400px", "-400px"],
    ...defaultOptions,
    easing: "easeInOutQuad",
    duration: 800,
  });
  return [animateBg, animateWidth, animateTop, animateMiddle, animateDetails];
};

const card1 = document.querySelector("#card-1");
const card2 = document.querySelector("#card-2");
const card3 = document.querySelector("#card-3");

const cardList = [card1, card2, card3];

const animation1 = playAnimation("card-1");
const animation2 = playAnimation("card-2");
const animation3 = playAnimation("card-3");

let activeAnimation = 0;
const animationList = [animation1, animation2, animation3];

function run(number) {
  return (event) => {
    runAnimation(number);
  };
}

card1.onclick = run(0);
card2.onclick = run(1);
card3.onclick = run(2);

function runAnimation(number) {
  if (activeAnimation !== number) {
    animationList[activeAnimation].forEach((item) => {
      item.direction = "reverse";
      item.play();
    });
    cardList[activeAnimation].classList.remove("active");
    cardList[number].classList.add("active");
    animationList[number].forEach((item) => {
      item.direction = "normal";
      item.play();
    });
  }

  activeAnimation = number;
}

animation1.forEach((item) => {
  item.play();
});

function disableClick() {
  cardList.forEach((card) => {
    card.onclick = null;
  });
}

function enableClick() {
  cardList.forEach((card, index) => {
    card.onclick = run(index);
  });
}
