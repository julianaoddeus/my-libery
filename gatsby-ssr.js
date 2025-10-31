import React from 'react';

const setInitialTheme = `
(function() {
  try {
    // 1. Tenta obter o tema salvo no localStorage
    let initialTheme = localStorage.getItem('theme');
    
    // 2. Se não houver tema salvo (primeira visita do usuário)
    if (initialTheme === null) {
      // 3. Verifica a preferência do sistema operacional
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (darkQuery.matches) {
        // Se o sistema operacional prefere escuro, usa 'dark'
        initialTheme = 'dark';
      } else {
        // *** ESTE É O PASSO CRUCIAL PARA TORNAR O ESCURO O PADRÃO ***
        // Se não há preferência salva E o sistema não prefere escuro, 
        // define o tema padrão como 'dark' (escuro).
        initialTheme = 'dark'; 
      }
    }
    
    // 4. Aplica a classe CSS no corpo da página imediatamente
    if (initialTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Opcional: Salva o tema inicial no localStorage, se não existia
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', initialTheme);
    }

  } catch (e) {
    console.error('Error setting initial theme:', e);
  }
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="dark-mode-initial-script"
      dangerouslySetInnerHTML={{ __html: setInitialTheme }}
    />,
  ]);
};