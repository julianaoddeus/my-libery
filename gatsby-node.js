const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const obterImagens = async (animeUrl, ImagePath) => {
  const imageUrl = animeUrl;
  const imageRes = await fetch(imageUrl);
  const buffer = await imageRes.arrayBuffer();
  fs.writeFileSync(ImagePath, Buffer.from(buffer));
};

exports.onPreBootstrap = ({ reporter }) => {
  const animeDir = path.join(__dirname, "src/content/animes");

  if (!fs.existsSync(animeDir)) {
    fs.mkdirSync(animeDir, { recursive: true });
    reporter.info("Pasta criada: src/content/animes");
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const idsAnimes = ["59027", "20", "38000", "11061", "30276", "31964"];
  const animeDir = path.join(__dirname, "src/content/animes");
  const animeImgDir = path.join(__dirname, "src/content/images/animes");

  reporter.info("Gerando arquivos MDX para os animes...");

  try {
    for (const id of idsAnimes) {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const { data: anime } = await res.json();
      if (!anime) continue;

      const animeData = anime.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const filePath = path.join(animeDir, `${animeData}.mdx`);
      const imagePath = path.join(animeImgDir, `${animeData}.jpg`);

      await obterImagens(anime.images?.jpg?.large_image_url, imagePath);

      const mdxContent = `---
id: "${anime.mal_id}"
title: "${anime.title.replace(/"/g, '\\"')}"
author: "${anime.studios?.[0]?.name || "Desconhecido"}"
year: ${anime.year || "null"}
duration: "${anime.episodes ? `${anime.episodes} episódios` : "episódios"}"
cover: "../images/animes/${animeData}.jpg"
mediaType: "Anime"
synopsis: "${anime.synopsis?.replace(/"/g, '\\"').replace(/\n/g, " ")}"
---
`;

      fs.writeFileSync(filePath, mdxContent);
    }
  } catch (error) {
    console.error("Erro ao buscar dados da Jikan:", error.message);
  }

  reporter.info("Arquivos MDX de animes criados com sucesso!");
  const filmesResult = await graphql(`
    query {
      allMdx(filter: { internal: { contentFilePath: { regex: "/movies/" } } }) {
        nodes {
          id
          frontmatter {
            id
            title
            author
            year
            duration
            mediaType
            synopsis
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (filmesResult.errors) {
    reporter.panicOnBuild(
      "Erro ao executar a query GraphQL",
      filmesResult.errors
    );
    return;
  }

  const filmes = filmesResult.data.allMdx.nodes;

  const templateFilme = path.resolve("./src/templates/movies-template.tsx");

  filmes.forEach((movie) => {
    console.log("Criando página para o filme:", movie.frontmatter.title);
    if (movie.frontmatter.slug) {
      createPage({
        path: `/movies/${movie.frontmatter.slug}`,
        component: `${templateFilme}?__contentFilePath=${movie.internal.contentFilePath}`,
        context: {
          id: movie.id,
        },
      });
      reporter.info(`Página criada: /movies/${movie.frontmatter.slug}`);
    }
  });
  reporter.info("Páginas de filmes criadas!");
};
