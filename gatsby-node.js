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

exports.createPages = async ({ actions, reporter }) => {
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

      const slug = anime.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const filePath = path.join(animeDir, `${slug}.mdx`);
      const imagePath = path.join(animeImgDir, `${slug}.jpg`);

      await obterImagens(anime.images?.jpg?.large_image_url, imagePath);

      const mdxContent = `---
id: "${anime.mal_id}"
title: "${anime.title.replace(/"/g, '\\"')}"
author: "${anime.studios?.[0]?.name || "Desconhecido"}"
year: ${anime.year || "null"}
duration: "${anime.episodes ? `${anime.episodes} episódios` : "episódios"}"
cover: "../images/animes/${slug}.jpg"
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
};
