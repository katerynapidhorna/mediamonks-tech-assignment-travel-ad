(async () => {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const travelRoutesContainer = document.getElementsByClassName(
    "travel-routes"
  );
  //fetch json data

  const res = await fetch("./mm_travel_feed.json");
  const data = await res.json();

  //map data for insertion as inner html
  const render = data.map((elem, i) => {
    return `<div class="listing slide-${i}"><p>${elem[`Product_${i}_name`]}</p>
    <a class="book-now" href='${
      elem[`Product_${i}_url`]
    }' target='_blank'></a></div>`;
  });
  const allSlides = document.getElementsByClassName("listing");

  //hide all except current value
  const hideAllExceptCurrent = (currVal) => {
    for (let j = 0; j < allSlides.length; j++) {
      if (j != currVal) {
        allSlides[j].style = "opacity: 0";
      }
    }
  };

  //make current element visible
  const makeCurrentValVisible = (currVal) => {
    allSlides[currentActiveSlideIndex].style = "opacity: 1";
    allSlides[currentActiveSlideIndex].style = "transition: opacity 1s";
  };
  //join array to a one string and put in a container
  travelRoutesContainer[0].innerHTML = render.join(" ");

  // initial state when page is loaded
  let currentActiveSlideIndex = 0;
  makeCurrentValVisible(currentActiveSlideIndex);
  hideAllExceptCurrent(currentActiveSlideIndex);

  //change opacity when click next
  nextButton.onclick = () => {
    if (currentActiveSlideIndex >= allSlides.length - 1) {
      currentActiveSlideIndex = 0;
    }
    currentActiveSlideIndex++;
    makeCurrentValVisible(currentActiveSlideIndex);
    hideAllExceptCurrent(currentActiveSlideIndex);
  };

  prevButton.onclick = () => {
    currentActiveSlideIndex =
      currentActiveSlideIndex === 0
        ? allSlides.length - 1
        : currentActiveSlideIndex - 1;
    makeCurrentValVisible(currentActiveSlideIndex);
    hideAllExceptCurrent(currentActiveSlideIndex);
  };
})();
