function openNav() {
  if (window.innerWidth < 768 && window.innerWidth > 576) {
    document.getElementById("mobile-nav").style.width = "40%";
  } else if (window.innerWidth <= 576) {
    document.getElementById("mobile-nav").style.width = "100%";
  }
}
function closeNav() {
  document.getElementById("mobile-nav").style.width = "0%";
}

// Custom Slide

(async () => {
  let res = await fetch("/backend/banner/all");
  let slideData = await res.json();
  forLoop();

  // imedietly show data after data come from api
  var firstSlideData = slideData[0];
  var output = `
        <div class="banner-slide-item">
          <h3>${firstSlideData.title}</h3>
          <p style="text-align: justify">
            ${firstSlideData.desc}
          </p>
        </div>
      `;
  $(".banner-col img").attr("src", firstSlideData.photo);
  $(".banner-carousel-custom").html(output);

  async function forLoop() {
    for (let index = 0; index < slideData.length; index++) {
      const data = await buildSlide(slideData[index], 10000);
    }
    forLoop();
  }
})();

function buildSlide(slide, inverval) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // do staff
      var output = `
        <div class="banner-slide-item">
          <h3>${slide.title}</h3>
          <p style="text-align: justify">
            ${slide.desc}
          </p>
        </div>
      `;
      $(".banner-col img").attr("src", slide.photo);
      $(".banner-carousel-custom").html(output);

      resolve(slide);
    }, inverval);
  });
}

// product sections
(async () => {
  let res = await fetch("/backend/product/list");
  let products = await res.json();
  var productSection = document.querySelector(".products");
  productSection.innerHTML = "";
  let count = 0;
  for (product of products) {
    count++;
    if (count == 6) {
      return;
    }
    // add product to products
    productSection.innerHTML += `
    <div class="col-md-4 col-sm-6">
        <div
          class="service-col wow fadeInLeft"
          data-wow-duration="1s"
          data-wow-delay="0s"
        >
          <div class="image-hover-box">
            <figure>
              <img src="${product.photo}" alt="" />
            </figure>
          </div>
          <div class="service-content">
            <h4>${product.productName}</h4>
            <p>
              ${product.desc}
            </p>
          </div>
        </div>
      </div>
    `;
  }
})();

// statictics sections
(async () => {
  let res = await fetch("/backend/statictics/list");
  let statictics = await res.json();
  var staticticsection = document.querySelector(".statictics");
  staticticsection.innerHTML = "";

  let screenCount;
  if (statictics.length == 1) {
    screenCount = "col-md-12";
  } else if (statictics.length == 2) {
    screenCount = "col-md-6";
  } else if (statictics.length == 3) {
    screenCount = "col-md-4";
  } else if (statictics.length == 4) {
    screenCount = "col-md-3";
  } else if (statictics.length == 4) {
    screenCount = "col-md-2";
  }

  for (state of statictics) {
    // add product to statictics
    console.log(state);
    staticticsection.innerHTML += `
    <div class=" ${screenCount} col-sm-6 col-xs-6 fw600">
        <div
          class="counter-box col-default wow fadeInLeft"
          data-wow-duration="1s"
          data-wow-delay="0s"
        >
          <div class="numbar-counter">${state.count}</div>
          <p>${state.StaticticsName}</p>
          <i class="${state.icon}"></i>
        </div>
      </div>
    `;
  }
})();

// send Message
document.querySelector("#sendMessage").addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let subject = document.getElementById("subject");
  let message = document.getElementById("message");

  if (name.value == "") {
    $.toast({
      heading: "Error",
      text: "Please type your name !",
      icon: "error",
      position: "top-right",
    });
  } else if (phone.value == "") {
    $.toast({
      heading: "Error",
      text: "Please type your Phone / email !",
      icon: "error",
      position: "top-right",
    });
  } else if (subject.value == "") {
    $.toast({
      heading: "Error",
      text: "Please message subject !",
      icon: "error",
      position: "top-right",
    });
  } else if (message.value == "") {
    $.toast({
      heading: "Error",
      text: "Please type your message !",
      icon: "error",
      position: "top-right",
    });
  } else {
    $.post(
      "/backend/send-message",
      {
        name: name.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value,
      },
      (res) => {
        if (res.success == true) {
          name.value = "";
          phone.value = "";
          subject.value = "";
          message.value = "";

          $.toast({
            heading: "Success",
            text: "Thank you ! We got your message.",
            icon: "success",
            position: "top-right",
          });
        } else {
          $.toast({
            heading: "Error",
            text: "Something went wrong !",
            icon: "error",
            position: "top-right",
          });
        }
      }
    );
  }
});

(async () => {
  let res = await fetch("/backend/team/list");
  let members = await res.json();
  var team = document.querySelector("#team");
  team.innerHTML = "";
  // team.innerHTML = "";
  for (member of members) {
    team.innerHTML += `
      <div class="item">
        <div class="our-doctor">
          <div class="pic">
            <img src="${member.photo}" alt="${member.memberName}" />
          </div>
          <div class="team-content">
            <ul class="social-group">
              <li>
                <a href="${member.FbLink}"><i class="fa fa-facebook"></i></a>
              </li>
              <li>
                <a href="${member.TwitterLink}"><i class="fa fa-twitter"></i></a>
              </li>
              <li>
                <a href="${member.LinkdinLink}"><i class="fa fa-linkedin"></i></a>
              </li>
            </ul>
            <a class="details-link" href="#">Details</a>
          </div>
        </div>
        <h3><a href="#">${member.memberName}</a></h3>
        <p>${member.position}</p>
    </div>
    `;
  }

  // now call carosual
  if ($(".doctor-carousel").length) {
    $(".doctor-carousel").owlCarousel({
      rtl: false,
      loop: true,
      margin: 30,
      dots: false,
      nav: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 700,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
          center: false,
        },
        480: {
          items: 2,
          center: false,
        },
        600: {
          items: 2,
          center: false,
        },
        768: {
          items: 3,
        },
        992: {
          items: 3,
        },
        1199: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }
})();

(async () => {
  let res = await fetch("/backend/product/social");
  let sites = await res.json();
  console.log(sites);
  if (sites.length > 0) {
    const facebook = sites.find((x) => x.id == "facebook");
    const twitter = sites.find((x) => x.id == "twitter");
    const linkdin = sites.find((x) => x.id == "linkdin");
    const youtube = sites.find((x) => x.id == "youtube");

    document
      .querySelector("#facebookValue")
      .setAttribute("href", facebook.link);
    document.querySelector("#twitterValue").setAttribute("href", twitter.link);
    document.querySelector("#linkdinValue").setAttribute("href", linkdin.link);
    document.querySelector("#youtubeValue").setAttribute("href", youtube.link);
  }
})();

(() => {
  $.get("/backend/utils", (utils) => {
    var rows = document.querySelector(".rows");
    if (utils.length > 0) {
      var logo = utils[1];
      var util = utils[0];

      document.querySelector(".logo-img").setAttribute("src", logo.logo);

      if (util.phone !== "") {
        document.querySelector("#showPhoneNumber").textContent = util.phone;
        document.querySelector("#bannerShowPhoneNumber").textContent =
          util.phone;
      }

      if (util.mail !== "") {
        document.getElementById("showEmailAddress").innerText = util.mail;
        document.getElementById("bannerShowEmailAddress").innerText = util.mail;
      }
      if (util.address1 !== "") {
        document.querySelector("#showAddress1").innerText = util.address1;
      }

      document.querySelector("#companyName").innerText = util.companyName;
      document.querySelector("#footerInfo").innerText = util.footerInfo;
    }
  });
})();
