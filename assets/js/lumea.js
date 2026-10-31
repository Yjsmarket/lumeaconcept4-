/* Lumea, gedeelde scripts. Alles is aanvullend: zonder JavaScript werkt de
   site gewoon, alleen zonder de rustige overgangen en de vergroting. */

(function () {
  "use strict";

  document.documentElement.classList.add("js-aan");

  var rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Hoogte van de kop doorgeven aan de stylesheet --------------------- */
  /* De categoriebalk op de kaart moet precies onder de zwarte kop blijven
     plakken. De kop is niet overal even hoog, dus meten we hem. */

  var kop = document.querySelector(".kop");
  if (kop) {
    var meetKop = function () {
      document.documentElement.style.setProperty(
        "--kop-hoogte",
        kop.getBoundingClientRect().height + "px"
      );
    };
    meetKop();
    window.addEventListener("resize", meetKop, { passive: true });
    if ("ResizeObserver" in window) {
      new ResizeObserver(meetKop).observe(kop);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(meetKop);
    }
  }

  /* --- Blokken vloeien in bij het scrollen ------------------------------- */

  /* Op scrollpositie, niet met een IntersectionObserver. Die meldt zich via
     een animatieframe en bij een sprong naar een anker krijgt hij voor de
     overgeslagen blokken helemaal geen melding, waardoor die blanco blijven
     als iemand terugscrolt. Dit is minder elegant en altijd goed. */

  var wachtend = Array.prototype.slice.call(
    document.querySelectorAll(".komt-op")
  );

  if (wachtend.length) {
    if (rustig) {
      wachtend.forEach(function (blok) {
        blok.classList.add("erin");
      });
    } else {
      var controleer = function () {
        for (var i = wachtend.length - 1; i >= 0; i--) {
          /* Alles wat de onderkant van het venster is genaderd, en dus ook
             alles wat er al boven hangt, wordt zichtbaar. */
          if (wachtend[i].getBoundingClientRect().top < window.innerHeight * 0.92) {
            wachtend[i].classList.add("erin");
            wachtend.splice(i, 1);
          }
        }
        if (!wachtend.length) {
          window.removeEventListener("scroll", controleer);
          window.removeEventListener("resize", controleer);
        }
      };

      controleer();
      window.addEventListener("scroll", controleer, { passive: true });
      window.addEventListener("resize", controleer, { passive: true });
    }
  }

  /* --- Menukaart: vergroting van een gerecht ----------------------------- */

  var loep = document.getElementById("loep");
  if (loep) {
    var loepFoto = loep.querySelector("img");
    var loepNaam = loep.querySelector("[data-naam]");
    var loepTekst = loep.querySelector("[data-tekst]");
    var loepPrijs = loep.querySelector("[data-prijs]");

    document.querySelectorAll(".gerecht:not(.gerecht--tekst)").forEach(function (gerecht) {
      var toon = function () {
        var foto = gerecht.querySelector("img");
        loepFoto.src = foto.getAttribute("src");
        loepFoto.alt = foto.getAttribute("alt");
        /* Het merkje achter de naam hoort niet in de vergrote titel */
        var naam = gerecht.querySelector("h3").cloneNode(true);
        var merkje = naam.querySelector(".merkje");
        if (merkje) merkje.remove();
        loepNaam.textContent = naam.textContent.trim();
        loepTekst.textContent = gerecht.querySelector("p").textContent;
        loepPrijs.textContent = gerecht.querySelector(".prijs").textContent;
        if (typeof loep.showModal === "function") {
          loep.showModal();
        }
      };

      gerecht.addEventListener("click", toon);
      gerecht.addEventListener("keydown", function (gebeurtenis) {
        if (gebeurtenis.key === "Enter" || gebeurtenis.key === " ") {
          gebeurtenis.preventDefault();
          toon();
        }
      });
    });

    loep.addEventListener("click", function (gebeurtenis) {
      /* Klik buiten de kaart sluit de vergroting */
      if (!gebeurtenis.target.closest(".loep__kaart")) {
        loep.close();
      }
    });

    var sluit = loep.querySelector(".loep__sluit");
    if (sluit) {
      sluit.addEventListener("click", function () {
        loep.close();
      });
    }
  }

  /* --- Menukaart: welke categorie is in beeld ---------------------------- */

  var knoppen = document.querySelectorAll(".categorieen a");
  if (knoppen.length && "IntersectionObserver" in window) {
    var perId = {};
    knoppen.forEach(function (knop) {
      perId[knop.getAttribute("href").slice(1)] = knop;
    });

    var spion = new IntersectionObserver(
      function (regels) {
        regels.forEach(function (regel) {
          if (!regel.isIntersecting) return;
          knoppen.forEach(function (knop) {
            knop.classList.remove("actief");
          });
          var knop = perId[regel.target.id];
          if (knop) {
            knop.classList.add("actief");
            /* De balk mee laten schuiven zodat de actieve chip zichtbaar blijft */
            knop.scrollIntoView({
              behavior: rustig ? "auto" : "smooth",
              block: "nearest",
              inline: "center"
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    document.querySelectorAll(".gang").forEach(function (gang) {
      spion.observe(gang);
    });
  }
})();
