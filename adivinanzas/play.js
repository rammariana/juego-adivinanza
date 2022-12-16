export function Play() {
  //creamos variables con let xq van a modificarse mas adelante y const xq no van a modificarse jamas
  let number = 0,
    correct = 0,
    wrong = 0;
  const d = document,
    $section = d.querySelector("section"),
    arrayImg = [],
    aleatorio = [],
    imgId = [],
    countries = [
      "Bélgica",
      "Canadá",
      "Costa Rica",
      "Dinamarca",
      "Egipto",
      "Filipinas",
      "Ghana",
      "Guatemala",
    ],
    $options = {
      0: ["Portugal", "Bélgica", "Dinamarca"],
      1: ["Canadá", "Estados Unidos", "México"],
      2: ["Puerto Rico", "Costa Rica", "Guatemala"],
      3: ["Canadá", "Bélgica", "Dinamarca"],
      4: ["Egipto", "Arabia", "Irán"],
      5: ["Nueva Zelanda", "Filipinas", "Ghana"],
      6: ["Marruecos", "Ghana", "Libia"],
      7: ["Guatemala", "Honduras", "Panamá"],
    };

  const getAleatorio = () => {
    //CREANDO NUMEROS ALEATORIOS
    for (let i = 0; i <= 7; i++) {
      aleatorio.push(i);
    }
    aleatorio.sort(function () {
      return Math.random() - 0.5;
    });

    //CREANDO LOS ID Y LAS URL DE IMG
    aleatorio.forEach((el) => {
      imgId.push(countries[el]);
      arrayImg.push(`assets/${el}.png`);
    });
    console.log(aleatorio, arrayImg, imgId);
  };

  //CREANDO FUNCIÓN QUE RENDERISA LAS IMG Y OPCIONES
  const playing = () => {
    if (number < arrayImg.length) {
      console.log(arrayImg.length);
      let $article = d.createElement("article"),
        img = d.createElement("img"),
        $ul = d.createElement("ul"),
        $li;
      img.src = `${arrayImg[number]}`;
      img.id = imgId[number];
      $article.appendChild(img);
      $ul.classList.add("section-play");
      $article.classList.add("section-play");

      $options[aleatorio[number]].forEach((e) => {
        $li = d.createElement("li");
        $li.id = e;
        $li.textContent = e;
        $ul.appendChild($li);
        $article.appendChild($ul);
      });
      $section.appendChild($article);

      //AÑADIENTO EL EVENTO CLICK Q MODIFICA TODAS LAS OPCIONES

      d.addEventListener("click", (e) => {
        if (e.target.matches("li")) {
          if (e.target.id === img.id) {
            e.target.classList.add("good");

            correct++;
          }
          if (e.target.id !== img.id) {
            e.target.classList.add("bad");
            wrong++;
          }

          //
          setTimeout(() => {
            //CADA MEDIO SEGUNDO SE QUITAN LAS CLASES Y SE REASIGNAN OPCIONES
            e.target.classList.remove("good");
            e.target.classList.remove("bad");

            number++; //esto no se puede mover de aqui
            img.src = `${arrayImg[number]}`;
            img.id = `${imgId[number]}`;

            //reasignando los id de las opciones

            for (let i = 0; i < d.querySelectorAll("li").length; i++) {
              if (number <= 7) {
                d.querySelectorAll("li")[i].id = `${
                  $options[aleatorio[number]][i]
                }`;
                d.querySelectorAll("li")[i].textContent = `${
                  $options[aleatorio[number]][i]
                }`;
              } else {
                if ($article.hasChildNodes()) {
                  $article.removeChild($article.firstChild);
                }
              }
            }

            //CREANDO LA PANTALLA CON LOS RESULTADOS

            if ($article.hasChildNodes() === false) {
              let $correct = d.createElement("p"),
                $incorrect = d.createElement("p"),
                $btnReplay = d.createElement("button");

              $btnReplay.type = "button";
              $btnReplay.classList.add("end");

              $btnReplay.textContent = "Jugar";

              $correct.textContent = `Acertaste: ${correct}`;

              $correct.classList.add("correct");

              $incorrect.textContent = `Fallaste: ${wrong}`;

              $incorrect.classList.add("wrong");

              //colocando gif
              let $gif = d.createElement("iframe");
              if (correct >= wrong) {
                $gif.src = "https://giphy.com/embed/bqUndFqWcZwWPTyICu";
              } else {
                $gif.src = "https://giphy.com/embed/iEq06WOIzSg5UdsQ1D";
              }
              $gif.classList.add("gif");
              $article.appendChild($correct);
              $article.appendChild($incorrect);
              $article.appendChild($gif);

              $article.appendChild($btnReplay);
            }

            console.log($article.hasChildNodes());
          }, 500);
        }
      });
    }
  };

  getAleatorio();
  playing();
}
/**
 * let $correct = d.createElement("p"),
              $incorrect = d.createElement("p");
            $correct.textContent = `Acertaste: ${correct}`;
            $incorrect.textContent = `Fallaste: ${wrong}`;
            $article.appendChild($correct);
 */
