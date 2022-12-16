import { Play } from "./play.js";

const d = document;
export default function Start() {
  const $btnstart = d.querySelector(".start");

  d.addEventListener("click", (e) => {
    //COMENZAR JUEGO
    if (e.target.matches(".start")) {
      $btnstart.classList.add("none");

      Play();
    } else if (e.target.matches(".end")) {
      //VOLVER A JUGAR

      location.reload();
    }
  });
}
