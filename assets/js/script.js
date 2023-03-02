// Cek apakah device itu mobile apa bukan
(window.innerWidth < 768) ?
localStorage.setItem("btnOffer", "left") :
localStorage.setItem("btnOffer", "both");

// Buat fungsi scroll header
const header = document.querySelector("header");
const scrollHeader = (winScroll) => {
  (winScroll > 0) ?
    header.classList.add("active"):
    header.classList.remove("active");
}

// Ambil komponen untuk aktivasi sidebar
const barsMenu = header.querySelector(".box-link i");
const sidebar = header.querySelector(".sidebar");
const boxLink = sidebar.querySelectorAll(".boxLinkSide .boxLink");

// Fungsi untuk aktivasi sidebar
const activedSide = () => {
  sidebar.classList.toggle("active")
  for (let i = 0; i < boxLink.length; i++) {
    setTimeout(() => {
      boxLink[i].classList.toggle("active");
    }, 300 * i);
  }
};

// Ketika icon menu ditekan
barsMenu.addEventListener("click", () => {
  activedSide();
});

// Ketika tombol close ditekan
const btnCloseSide = sidebar.querySelector(".close");
btnCloseSide.addEventListener("click", () => {
  activedSide();
});

// Ambil komponen untuk aktivasi hero
const hero = document.querySelector(".hero");
const imgHero = hero.querySelectorAll(".img-hero");
const barsBullet = hero.querySelector(".bars");
const bullet = barsBullet.querySelectorAll(".bullet");
const lebarWindow = window.innerWidth;

// Fungsi slide img
const slideImg = () => {
  for (let i = 0; i < imgHero.length; i++) {
    // Cek apakah bullet terakhir masih aktif
    if (bullet[bullet.length - 1].classList.contains('active')) {
      // Jika iya, maka hapus
      bullet[bullet.length - 1].classList.remove('active');
    }

    setTimeout(() => {
      bullet[i].classList.add("active");
      if (i != 0) {
        bullet[i-1].classList.remove("active");
      }
      hero.scrollLeft = imgHero[i].offsetLeft;
      barsBullet.style.left = lebarWindow * i + "px";
    }, 5000 * i);
  }
}

// Mejalankan fungsi slide img
slideImg();
setInterval(() => { // untuk loop berulang
  slideImg();
}, 5000 * imgHero.length);

// Ambil komponen offer
const offer = document.querySelector(".offer");
const btnOffer = offer.querySelectorAll(".box-btn .btn");
const boxImgOffer = offer.querySelectorAll(".box-img");
const boxSlideOffer = offer.querySelectorAll(".box-img-slide");

// Fungsi slide
const funcSlider = (boxSlide) => {
  const boxSlider = boxSlide.querySelector(".box-slider");
  const imgSlide2 = boxSlide.querySelector(".img-slide .slide-2");
  const slider = boxSlider.querySelector(".slider");
  // Ubah bentuk cursor ketika mouse ditekan
  boxSlider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    boxSlider.classList.add("active");
  });
  
  // Kembalikan bentuk cursor ketika mouse dilepas
  boxSlider.addEventListener("mouseup", (e) => {
    e.preventDefault();
    boxSlider.classList.remove("active");
  });

  // Ubah ukuran gambar ketika cursor digeser
  boxSlider.addEventListener("mousemove", (e) => {
    if (e.target.id == "box-slider")  {
      let offsetX = Math.ceil((e.offsetX / boxSlider.offsetWidth) * 100);
      imgSlide2.style.clipPath = "polygon("+ offsetX +"% 0, 100% 0%, 100% 100%, "+ offsetX +"% 100%)";
      slider.style.margin = "0 "+ offsetX +"%";
    }
  });
}

// Function ganti offer untuk mobile
const conOffer = () => {
  if (localStorage.getItem("btnOffer") == "left") {
    boxImgOffer[1].classList.remove("active");
    boxSlideOffer[1].classList.remove("active");

    boxImgOffer[0].classList.add("active");
    boxSlideOffer[0].classList.add("active");
    boxSlide = boxSlideOffer[0];
    funcSlider(boxSlideOffer[0]); //Mejalankan fungsi slide
  }

  if (localStorage.getItem("btnOffer") == "right") {
    boxImgOffer[0].classList.remove("active");
    boxSlideOffer[0].classList.remove("active");

    boxImgOffer[1].classList.add("active");
    boxSlideOffer[1].classList.add("active");
    boxSlide = boxSlideOffer[1];
    funcSlider(boxSlideOffer[1]); //Mejalankan fungsi slide
  }

  if (localStorage.getItem("btnOffer") == "both") {
    for (let i = 0; i < boxImgOffer.length; i++) {
      boxImgOffer[i].classList.add("active");
      boxSlideOffer[i].classList.add("active");
      funcSlider(boxSlideOffer[i]); //Mejalankan fungsi slide
    }
  }
};

// Mejalankan fungsi di atas 
conOffer();
btnOffer.forEach(btn => {  // Untuk cek tombol yang ditekan
  btn.addEventListener("click", () => {
    localStorage.setItem("btnOffer", btn.id);  // set kondisi dengan local storage
    conOffer();
  });
});

window.addEventListener("scroll", (e) => {
  let winScroll = this.scrollY;
  scrollHeader(winScroll);
});