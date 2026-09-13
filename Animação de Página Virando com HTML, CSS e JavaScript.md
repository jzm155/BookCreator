# 📖 Animação de Página Virando com HTML, CSS e JavaScript

Este documento explica como criar uma animação de **página virando**, semelhante a um livro físico, utilizando apenas:

- HTML
- CSS
- JavaScript

A ideia é criar uma página que gira em torno da sua lateral usando transformação 3D.

---

# 1. Como funciona a animação

A animação é baseada principalmente em três propriedades CSS:

```css
perspective: 2000px;
transform-origin: left center;
transform: rotateY(-180deg);
```

A combinação delas faz a página parecer uma folha real sendo virada.

Visualmente:

```text
ANTES

┌─────────────────────┐
│                     │
│       Página        │
│                     │
└─────────────────────┘
          │
          │ eixo
          ↓


DURANTE

┌───────────────╲
│                ╲
│                 ╲
│                  ╲
└───────────────────╲


DEPOIS

╲─────────────────────┐
 ╲                    │
  ╲                   │
   ╲                  │
    ╲─────────────────┘
```

A página gira em torno do eixo vertical localizado na sua lateral esquerda.

---

# 2. Estrutura básica do livro

Primeiro criamos um elemento representando o livro:

```html
<div class="book">

    <div class="page">
        <h1>Capítulo 1</h1>

        <p>
            Era uma vez...
        </p>
    </div>

</div>
```

A estrutura pode posteriormente ficar mais complexa:

```text
book
│
├── páginas
│   ├── página 1
│   ├── página 2
│   ├── página 3
│   └── página 4
│
└── controles
    ├── anterior
    └── próxima
```

---

# 3. Criando o tamanho do livro

O livro precisa ter largura e altura.

```css
.book {
    width: 800px;
    height: 550px;

    position: relative;
}
```

Por exemplo:

```text
              800px
       ←────────────────→

       ┌─────────────────┐
       │                 │
 550px │      LIVRO      │
       │                 │
       └─────────────────┘
```

---

# 4. Criando a página

A página pode ocupar metade do livro quando estamos representando um livro aberto.

```css
.page {
    position: absolute;

    width: 50%;
    height: 100%;

    background: #f8f0d8;
}
```

Podemos posicioná-la no lado esquerdo:

```css
.page {
    left: 0;
}
```

Ou no lado direito:

```css
.page {
    left: 50%;
}
```

---

# 5. A perspectiva 3D

Essa é uma das partes mais importantes.

No elemento do livro:

```css
.book {
    perspective: 2000px;
}
```

`perspective` determina o quanto os objetos 3D parecem estar próximos ou distantes.

Sem perspectiva:

```text
┌───────────────┐
│               │
│               │
└───────────────┘

A rotação parece muito "plana".
```

Com perspectiva:

```text
       ╲
        ╲
         ╲
          ╲
           ┐
```

A rotação passa a ter uma aparência muito mais próxima de um objeto real.

---

# 6. O eixo da página

Agora precisamos dizer onde a página deve girar.

Usamos:

```css
transform-origin: left center;
```

Isso significa:

```text
Página

┌──────────────────────┐
↑
│
Eixo de rotação
```

Ou seja, a página ficará presa pela esquerda enquanto gira.

Se usássemos:

```css
transform-origin: center;
```

ela giraria pelo meio:

```text
┌──────────────────────┐
          ↑
          │
       eixo
```

Para uma página de livro, normalmente queremos que ela gire pela lateral.

---

# 7. Girando a página

A rotação é feita com:

```css
transform: rotateY(-180deg);
```

`rotateY()` gira o elemento no eixo Y.

```text
        Y
        ↑
        │
        │
        │
        ●────────→ X
       /
      /
     Z
```

Quando fazemos:

```css
rotateY(-180deg);
```

a página gira para trás.

---

# 8. Criando a animação

Até agora a página simplesmente mudaria de posição.

Precisamos adicionar uma transição:

```css
.page {
    transition: transform 1s ease;
}
```

Agora podemos ter:

```css
.page.flipped {
    transform: rotateY(-180deg);
}
```

Quando a classe `flipped` é adicionada:

```text
rotateY(0deg)
       ↓
rotateY(-180deg)
```

O navegador anima automaticamente essa mudança.

---

# 9. JavaScript controlando a animação

Podemos adicionar um botão:

```html
<button onclick="nextPage()">
    Próxima →
</button>
```

E criar a função:

```javascript
function nextPage() {

    document
        .querySelector(".page")
        .classList.add("flipped");

}
```

O JavaScript adiciona:

```css
.flipped
```

e o CSS faz a animação.

---

# 10. Voltando a página

Para voltar:

```html
<button onclick="previousPage()">
    ← Anterior
</button>
```

JavaScript:

```javascript
function previousPage() {

    document
        .querySelector(".page")
        .classList.remove("flipped");

}
```

Agora temos:

```text
Próxima

flipped
   ↓
rotateY(-180deg)


Anterior

remove flipped
   ↓
rotateY(0deg)
```

---

# 11. Escondendo o verso da página

Uma página 3D pode mostrar o verso durante a rotação.

Para controlar isso:

```css
backface-visibility: hidden;
```

Isso esconde a parte de trás do elemento.

Exemplo:

```css
.page {
    backface-visibility: hidden;
}
```

Isso é importante para evitar que o conteúdo fique aparecendo de maneira estranha durante a rotação.

---

# 12. Criando frente e verso

Para um livro mais realista, podemos criar duas faces:

```html
<div class="flip-page">

    <div class="front">
        Página 13
    </div>

    <div class="back">
        Página 14
    </div>

</div>
```

A frente:

```css
.front {
    position: absolute;
    inset: 0;

    backface-visibility: hidden;
}
```

O verso:

```css
.back {
    position: absolute;
    inset: 0;

    transform: rotateY(180deg);

    backface-visibility: hidden;
}
```

Assim:

```text
        FOLHA

┌─────────────────────┐
│                     │
│      FRENTE         │
│       pág. 13       │
│                     │
└─────────────────────┘

             ↻

┌─────────────────────┐
│                     │
│       VERSO         │
│       pág. 14       │
│                     │
└─────────────────────┘
```

---

# 13. Mantendo a transformação 3D

O elemento pai deve preservar o espaço 3D:

```css
.flip-page {
    transform-style: preserve-3d;
}
```

Isso permite que frente e verso funcionem corretamente durante a rotação.

---

# 14. Exemplo completo da animação

Uma versão mínima fica assim:

```html
<div class="book">

    <div class="flip-page" id="page">

        <div class="front">
            <h1>Página 1</h1>
        </div>

        <div class="back">
            <h1>Página 2</h1>
        </div>

    </div>

</div>

<button onclick="nextPage()">
    Próxima
</button>
```

CSS:

```css
.book {
    width: 800px;
    height: 550px;

    perspective: 2000px;
}

.flip-page {
    width: 50%;
    height: 100%;

    position: absolute;

    left: 50%;

    transform-origin: left center;

    transform-style: preserve-3d;

    transition:
        transform 1s ease;
}

.flip-page.flipped {
    transform: rotateY(-180deg);
}

.front,
.back {
    position: absolute;

    inset: 0;

    backface-visibility: hidden;

    background: #f8f0d8;
}

.back {
    transform: rotateY(180deg);
}
```

JavaScript:

```javascript
function nextPage() {

    document
        .getElementById("page")
        .classList.add("flipped");

}
```

---

# 15. Adicionando sombra

Para deixar a página mais realista, podemos criar uma sombra.

```css
.flip-page {
    box-shadow:
        3px 0 15px rgba(0, 0, 0, .25);
}
```

Também podemos criar um gradiente:

```css
.flip-page::after {
    content: "";

    position: absolute;

    inset: 0;

    pointer-events: none;

    background:
        linear-gradient(
            90deg,
            rgba(0,0,0,.20),
            transparent 40%,
            rgba(0,0,0,.08)
        );

    opacity: 0;
}
```

Durante a virada podemos mostrar essa sombra.

---

# 16. Velocidade da animação

A velocidade é controlada aqui:

```css
transition: transform 1s ease;
```

### Mais rápida

```css
transition: transform .5s ease;
```

### Normal

```css
transition: transform 1s ease;
```

### Mais lenta

```css
transition: transform 1.5s ease;
```

Por exemplo:

```text
0.5s  → rápida
1.0s  → normal
1.5s  → lenta
2.0s  → muito lenta
```

---

# 17. Melhorando o movimento

Podemos usar uma curva personalizada:

```css
transition:
    transform .95s cubic-bezier(.65, .05, .25, 1);
```

Isso deixa o movimento mais natural.

Em vez de:

```text
─────── velocidade constante
```

podemos ter:

```text
devagar
   ↓
rápido
   ↓
devagar
```

Dando uma sensação mais física.

---

# 18. Várias páginas

Para um livro de verdade, não queremos apenas:

```text
Página 13
Página 14
```

Queremos algo como:

```text
1 → 2
3 → 4
5 → 6
7 → 8
...
```

Podemos armazenar as páginas em JavaScript:

```javascript
const pages = [
    {
        number: 1,
        title: "Capítulo I",
        content: "Era uma vez..."
    },
    {
        number: 2,
        title: "Capítulo I",
        content: "O reino estava..."
    },
    {
        number: 3,
        title: "Capítulo II",
        content: "Na manhã seguinte..."
    }
];
```

E criar as páginas dinamicamente.

---

# 19. Controlando a página atual

Podemos guardar a página atual:

```javascript
let currentPage = 0;
```

Ao clicar em próxima:

```javascript
function nextPage() {

    if (currentPage < pages.length - 1) {
        currentPage++;
    }

}
```

Ao clicar em anterior:

```javascript
function previousPage() {

    if (currentPage > 0) {
        currentPage--;
    }

}
```

Assim o livro consegue saber onde o leitor está.

---

# 20. Teclado

Também podemos permitir:

```text
← Anterior
→ Próxima
```

JavaScript:

```javascript
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextPage();
    }

    if (event.key === "ArrowLeft") {
        previousPage();
    }

});
```

Isso permite navegar usando as setas do teclado.

---

# 21. Estrutura recomendada para um editor de livros

Para um projeto maior, uma arquitetura interessante seria:

```text
Livro
│
├── Capa
│
├── Conteúdo
│   │
│   ├── Página esquerda
│   │
│   ├── Página direita
│   │
│   └── Página sendo virada
│
├── Controles
│   ├── Anterior
│   ├── Próxima
│   └── Número da página
│
└── JavaScript
    │
    ├── Controle de páginas
    ├── Animação
    ├── Navegação
    └── Capítulos
```

---

# 22. Dois modos de visualização

Para um editor de livros, é interessante manter dois modos.

## Modo editor

```text
┌─────────────────────────────┐
│ Título                      │
│                             │
│ Era uma vez um reino...     │
│                             │
│ O personagem caminhou...    │
│                             │
│                             │
└─────────────────────────────┘
```

Aqui o escritor pode editar livremente.

## Modo livro

```text
┌────────────────┬────────────────┐
│                │                │
│    Página 12   │    Página 13   │
│                │                │
│    conteúdo    │    conteúdo    │
│                │                │
└────────────────┴────────────────┘

             ←   →
```

Aqui o conteúdo é apresentado como um livro.

A animação de `rotateY()` seria utilizada principalmente no segundo modo.

---

# 23. O conceito principal

Toda a animação pode ser resumida em:

```css
.book {
    perspective: 2000px;
}

.page {
    transform-origin: left center;
    transform-style: preserve-3d;
    transition: transform 1s ease;
}

.page.flipped {
    transform: rotateY(-180deg);
}
```

E o JavaScript simplesmente controla:

```javascript
page.classList.add("flipped");
```

ou:

```javascript
page.classList.remove("flipped");
```

---

# 24. Fluxo completo

Quando o usuário clica em **Próxima**:

```text
Usuário clica
     │
     ↓
nextPage()
     │
     ↓
JavaScript altera estado
     │
     ↓
classe "flipped"
     │
     ↓
CSS aplica rotateY(-180deg)
     │
     ↓
transition anima a transformação
     │
     ↓
Página gira em 3D
     │
     ↓
Próxima página aparece
```

---

# 25. Resultado

O resultado final é uma interface onde o leitor pode navegar assim:

```text
                 LIVRO

       ┌──────────────┬──────────────┐
       │              │              │
       │   Página 12  │   Página 13  │
       │              │              │
       │   conteúdo   │   conteúdo   │
       │              │              │
       └──────────────┴──────────────┘

              ←       →

                     ↓

       ┌──────────────╲
       │               ╲
       │                ╲
       │                 ╲
       └──────────────────╲

                     ↓

       ┌──────────────┬──────────────┐
       │              │              │
       │   Página 14  │   Página 15  │
       │              │              │
       │   conteúdo   │   conteúdo   │
       │              │              │
       └──────────────┴──────────────┘
```

A parte fundamental não é uma biblioteca de livro: é a combinação de **transformação 3D + perspectiva + ponto de origem + transição + controle JavaScript**.

---

# 26. Propriedades mais importantes

| Propriedade | Função |
|---|---|
| `perspective` | Cria profundidade 3D |
| `rotateY()` | Faz a página girar |
| `transform-origin` | Define onde a página gira |
| `transform-style` | Mantém os elementos em 3D |
| `backface-visibility` | Controla o verso da página |
| `transition` | Cria a animação |
| `box-shadow` | Simula sombra |
| `classList.add()` | Ativa a animação |
| `classList.remove()` | Reverte a animação |

---

# 27. Próximo nível

A partir dessa base, é possível transformar o protótipo em um sistema de livro muito mais completo:

- 📖 várias páginas;
- 📚 capítulos e subcapítulos;
- ✍️ edição do texto;
- 💾 salvamento automático;
- 🔢 numeração de páginas;
- 🔖 marcadores;
- 🔍 zoom;
- 📱 suporte para celular;
- 👆 arrastar a página com o mouse;
- 📱 gesto de arrastar no celular;
- ⌨️ navegação pelo teclado;
- 📑 índice;
- 🎨 temas de papel;
- 🌙 modo noturno;
- 🔊 leitura em voz alta;
- 🖨️ exportação;
- 📄 exportação para PDF;
- 🪄 animação diferente para capa, capítulos e páginas;
- ⚙️ controle da velocidade da animação.

A animação de página que foi criada no protótipo é, portanto, apenas a base visual. O próximo passo para um editor de livros seria transformar essa animação em um **motor de paginação**, responsável por saber quais páginas estão abertas, qual página está sendo virada e qual conteúdo deve aparecer em cada lado.