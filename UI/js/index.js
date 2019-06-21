console.log("connected");

const rangeSlider = document.querySelector("#range-line");
let rangePoint = document.querySelector("#range-span");

const dropbox = document.getElementById("dropzone");
const imageInput = document.querySelector("#image-input");
const modal = document.querySelector(".modal");
const modalTrigger = document.getElementById("modal-trigger");
const closeButton = document.querySelector(".close-modal-button");
const listingForm = document.querySelector("form.text-dark");

modalTrigger.addEventListener("click", function(event) {
  event.preventDefault();
  toggleModal();
});
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", clickWindow);
const navSlider = () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  hamburgerMenu.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate the links
    navLinks.forEach((link, index) => {
      //check if the link has animation
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.3}s`;
      }
    });

    //Hamburger style
    hamburgerMenu.classList.toggle("hamburger-toggle");
  });
};

navSlider();

//function for the slider in the hero form

const showSliderValue = () => {
  rangePoint.textContent = rangeSlider.value;
  let rangePosition = rangeSlider.value / rangeSlider.max;
  rangePoint.style.left = rangePosition * 180 + "px";
};

rangeSlider.addEventListener("input", showSliderValue, false);

function handleFiles(files) {
  let preview = document.getElementById("preview");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }

    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (aImg => {
      return e => {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}

const dragenter = e => {
  e.stopPropagation();
  e.preventDefault();
  dropbox.classList.add(" image-dropping");
};

const dragover = e => {
  e.stopPropagation();
  e.preventDefault();
  dropbox.classList.add(" image-dropping");
  evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
};

const drop = e => {
  e.stopPropagation();
  e.preventDefault();

  const data = e.dataTransfer;
  const files = data.files;

  handleFiles(files);
};

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

//modal for lsiting form//

function toggleModal() {
  console.log(modal);
  //modal.style.display = "block";
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

/*

function handleFileSelect(evt) {

  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; (f = files[i]); i++) {
    // Only process image files.
    if (!f.type.match("image.*")) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = document.createElement("span");
        span.innerHTML = [
          '<img class="thumb" src="',
          e.target.result,
          '" title="',
          escape(theFile.name),
          '"/>'
        ].join("");
        document.getElementById("previewImg").insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}*/
